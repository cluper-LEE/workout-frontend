import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import axios from 'axios'
import WorkoutForm from './WorkoutForm'

function DailyWorkoutForm({ date }) {
  const [dailyWorkoutForm, setDailyWorkoutForm] = useState({
    id: -1,
    date,
    memo: '',
    workouts: [],
  })
  useEffect(async () => {
    let response = await axios.get('/dailyWorkouts', { params: { date } })
    if (response.data === '') {
      response = await axios.post('/dailyWorkouts', {
        memo: '',
        date,
      })
    }
    setDailyWorkoutForm(() => ({
      id: response.data.id,
      date: response.data.date,
      memo: response.data.memo,
      workouts: [],
    }))
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

  const addToWorkouts = (newId) => {
    setDailyWorkoutForm((data) => ({
      ...data,
      workouts: [...data.workouts, newId],
    }))
  }

  return (
    <div>
      <span>{date}</span> <br></br>
      <label htmlFor="memo">memo</label>
      <input
        type="text"
        name="memo"
        value={dailyWorkoutForm.memo}
        onChange={setMemo}
      />
      <button type="button" onClick={updateMemo}>
        확인
      </button>
      {dailyWorkoutForm.workouts.length > 0 ? (
        dailyWorkoutForm.workouts.map((workout) => (
          <WorkoutForm key={workout} onChange={addToWorkouts}></WorkoutForm>
        ))
      ) : (
        <WorkoutForm onChange={addToWorkouts}></WorkoutForm>
      )}
      <br />
    </div>
  )
}

DailyWorkoutForm.propTypes = {
  date: propTypes.string.isRequired,
}

export default DailyWorkoutForm
