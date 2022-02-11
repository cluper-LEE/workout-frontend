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
  useEffect(async () => {
    let response = await axios.get('/dailyWorkouts', { params: { date } })
    if (response.status === 204) {
      response = await axios.post('/dailyWorkouts', {
        memo: '',
        date,
      })
    }
    setDailyWorkoutForm(response.data)
  }, [date])

  useEffect(async () => {
    const response = await axios.get('/exercises')
    if (response.status === 204) {
      return
    } else setExercises(response.data)
  }, [])

  const setMemo = (event) => {
    setDailyWorkoutForm((data) => ({
      ...data,
      memo: event.target.value,
    }))
  }
  const updateMemo = async () => {
    const response = await axios.patch('/dailyWorkouts', {
      id: dailyWorkoutForm.id,
      memo: dailyWorkoutForm.memo,
    })
    setDailyWorkoutForm((data) => ({
      ...data,
      memo: response.data.memo,
    }))
  }

  const addWorkoutForm = () => {
    setDailyWorkoutForm((data) => ({
      ...data,
      workoutForms: [...data.workoutForms, null],
    }))
  }

  const updateWorkout = (index, workout) => {
    setDailyWorkoutForm((data) => {
      const temp = data.workoutForms
      temp[index] = workout
      return { ...data, workoutForms: temp }
    })
  }
  return (
    <div>
      <br></br>
      {dailyWorkoutForm.workoutForms.length > 0
        ? dailyWorkoutForm.workoutForms.map((form, index) => (
            <WorkoutForm
              key={index}
              index={index}
              workout={form}
              onChange={updateWorkout}
              exercises={exercises}
              dailyWorkoutForm={dailyWorkoutForm}
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
        onChange={setMemo}
      />
      <button type="button" onClick={updateMemo}>
        확인
      </button>
      <br />
    </div>
  )
}

DailyWorkoutForm.propTypes = {
  date: propTypes.string.isRequired,
}

export default DailyWorkoutForm
