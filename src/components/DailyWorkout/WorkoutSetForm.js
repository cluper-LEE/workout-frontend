import axios from 'axios'
import React, { useState } from 'react'
import propTypes from 'prop-types'

function WorkoutSetForm({ onChange }) {
  const [workoutSetForm, setWorkoutSetForm] = useState({
    id: -1,
    setNum: 0,
    weight: 0,
    reps: 0,
  })

  const setSetNum = (event) => {
    setWorkoutSetForm((data) => ({
      ...data,
      setNum: event.target.value,
    }))
  }
  const setWegith = (event) => {
    setWorkoutSetForm((data) => ({
      ...data,
      weight: event.target.value,
    }))
  }
  const setReps = (event) => {
    setWorkoutSetForm((data) => ({
      ...data,
      reps: event.target.value,
    }))
  }
  const onClick = async () => {
    let response = null
    if (workoutSetForm.id === -1) {
      response = await axios.post('/workoutSets', {
        setNum: workoutSetForm.setNum,
        weight: workoutSetForm.weight,
        reps: workoutSetForm.reps,
      })
    } else {
      response = await axios.patch('/workoutSets', {
        setNum: workoutSetForm.setNum,
        weight: workoutSetForm.weight,
        reps: workoutSetForm.reps,
      })
    }
    setWorkoutSetForm((data) => ({
      ...data,
      id: response.data.id,
    }))
    onChange(workoutSetForm.id)
  }
  return (
    <form>
      <label htmlFor="setNum">setNum</label>
      <input
        type="number"
        name="setNum"
        value={workoutSetForm.setNum}
        onChange={setSetNum}
      />
      <label htmlFor="weight">weight</label>
      <input
        type="number"
        name="weight"
        value={workoutSetForm.weight}
        onChange={setWegith}
      />
      <label htmlFor="reps">reps</label>
      <input
        type="number"
        name="reps"
        value={workoutSetForm.reps}
        onChange={setReps}
      />
      <button type="button" onClick={onClick}>
        확인
      </button>
    </form>
  )
}

WorkoutSetForm.propTypes = {
  onChange: propTypes.func.isRequired,
}

export default WorkoutSetForm
