import axios from 'axios'
import React, { useState } from 'react'

function WorkoutSetForm() {
  const [workoutSetForm, setWorkoutSetForm] = useState({
    id: -1,
    setNum: 0,
    weight: 0,
    reps: 0,
  })

  const onClick = async () => {
    const response = await axios.post('/workoutSets', {
      setNum: workoutSetForm.setNum,
      weight: workoutSetForm.weight,
      reps: workoutSetForm.reps,
    })
    setWorkoutSetForm((data) => ({
      ...data,
      id: response.data.id,
    }))
  }
  return (
    <form>
      <label htmlFor="setNum">setNum</label>
      <input type="number" name="setNum" value={workoutSetForm.setNum} />
      <label htmlFor="weight">weight</label>
      <input type="number" name="weight" value={workoutSetForm.weight} />
      <label htmlFor="reps">reps</label>
      <input type="number" name="reps" value={workoutSetForm.reps} />
      <button type="button" onClick={onClick}>
        확인
      </button>
    </form>
  )
}

export default WorkoutSetForm
