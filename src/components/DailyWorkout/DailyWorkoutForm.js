import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import axios from 'axios'
import WorkoutForm from './WorkoutForm'

function DailyWorkoutForm({ date }) {
  const [dailyWorkoutForm, setDailyWorkoutForm] = useState({
    id: -1,
    date,
    memo: '',
    workoutForms: [],
  })
  const [exercises, setExercises] = useState([])

  const refreshDailyWorkout = async () => {
    let response = await axios.get('/dailyWorkouts', { params: { date } })
    if (response.status === 204) {
      response = await axios.post('/dailyWorkouts', {
        memo: '',
        date,
      })
    }
    setDailyWorkoutForm(response.data)
  }
  const refreshExercises = async () => {
    const response = await axios.get('/exercises')
    if (response.status === 204) {
      await axios.post('/exercises', { name: '운동', category: '' })
      refreshExercises()
    } else setExercises(response.data)
  }

  useEffect(() => refreshDailyWorkout(), [date])
  useEffect(() => refreshExercises(), [])

  const changeMemo = (event) => {
    setDailyWorkoutForm((data) => ({
      ...data,
      memo: event.target.value,
    }))
  }
  const flushMemo = async () => {
    const response = await axios.patch('/dailyWorkouts', {
      id: dailyWorkoutForm.id,
      memo: dailyWorkoutForm.memo,
    })
    setDailyWorkoutForm((data) => ({
      ...data,
      memo: response.data.memo,
    }))
  }

  const addWorkoutForm = async () => {
    const response = await axios.post('/workouts', {
      dailyWorkoutForm,
      exerciseForm: exercises[0],
      memo: '',
      workoutSetForms: [],
    })
    setDailyWorkoutForm((data) => ({
      ...data,
      workoutForms: [...data.workoutForms, response.data],
    }))
  }

  const events = {
    workout: {
      change: (workoutForm) => {
        const index = dailyWorkoutForm.workoutForms.findIndex(
          (form) => form.id == workoutForm.id
        )
        setDailyWorkoutForm((data) => {
          const temp = data.workoutForms
          temp[index] = workoutForm
          return { ...data, workoutForms: temp }
        })
      },
      flush: async (workoutForm) => {
        await axios.patch('/workouts', workoutForm)
        refreshDailyWorkout()
      },
      remove: async (workoutForm) => {
        await axios.delete(`/workouts/${workoutForm.id}`)
        refreshDailyWorkout()
      },
    },
  }

  return (
    <div className="pl-2">
      {dailyWorkoutForm.workoutForms.length > 0
        ? dailyWorkoutForm.workoutForms.map((form, index) => (
            <WorkoutForm
              key={index}
              workoutForm={form}
              events={events}
              exercises={exercises}
            />
          ))
        : null}
      <button onClick={addWorkoutForm}>+ 운동 추가</button> <br /> <br />
      <label htmlFor="memo">이 날의 메모</label>
      <input
        type="text"
        name="memo"
        id="memo"
        value={dailyWorkoutForm.memo}
        onChange={changeMemo}
        onBlur={flushMemo}
      />
      <br />
    </div>
  )
}

DailyWorkoutForm.propTypes = {
  date: propTypes.string.isRequired,
}

export default DailyWorkoutForm
