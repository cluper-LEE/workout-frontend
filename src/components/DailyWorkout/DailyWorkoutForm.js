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

  const refreshData = async () => {
    let response = await axios.get('/dailyWorkouts', { params: { date } })
    if (response.status === 204) {
      response = await axios.post('/dailyWorkouts', {
        memo: '',
        date,
      })
    }
    setDailyWorkoutForm(response.data)
  }

  useEffect(() => refreshData(), [date])

  useEffect(async () => {
    const response = await axios.get('/exercises')
    if (response.status === 204) {
      return
    } else setExercises(response.data)
  }, [])

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

  const addWorkoutForm = () => {
    setDailyWorkoutForm((data) => ({
      ...data,
      workoutForms: [...data.workoutForms, null],
    }))
  }

  // const onChangeWorkout = (workoutForm) => {
  //   const index = dailyWorkoutForm.workoutForms.findIndex(
  //     (form) => form.id == workoutForm.id
  //   )
  //   setDailyWorkoutForm((data) => {
  //     const temp = data.workoutForms
  //     temp[index] = workoutForm
  //     return { ...data, workoutForms: temp }
  //   })
  // }
  // const onFlushWorkout = async (workoutForm) => {
  //   if (workoutForm.id === -1) {
  //     await axios.post('/workouts', workoutForm)
  //   } else {
  //     await axios.patch('/workouts', workoutForm)
  //   }
  //   refreshData()
  // }

  const events = {
    workout: {
      onChange: (workoutForm) => {
        const index = dailyWorkoutForm.workoutForms.findIndex(
          (form) => form.id == workoutForm.id
        )
        setDailyWorkoutForm((data) => {
          const temp = data.workoutForms
          temp[index] = workoutForm
          return { ...data, workoutForms: temp }
        })
      },
      onFlush: async (workoutForm) => {
        if (workoutForm.id === -1) {
          await axios.post('/workouts', workoutForm)
        } else {
          await axios.patch('/workouts', workoutForm)
        }
        refreshData()
      },
    },
  }

  return (
    <div className="pl-2">
      <br></br>
      {dailyWorkoutForm.workoutForms.length > 0
        ? dailyWorkoutForm.workoutForms.map((form, index) => (
            <WorkoutForm
              key={index}
              workout={form}
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
