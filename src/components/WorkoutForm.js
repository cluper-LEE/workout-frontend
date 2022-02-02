import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WorkoutSetForm from './WorkoutSetForm'

function WorkoutForm() {
  const [workoutForm, setWorkoutForm] = useState({
    id: -1,
    exerciseId: -1,
    memo: '',
    workoutSets: [],
  })
  const [exercises, setExercises] = useState([])
  useEffect(async () => {
    const response = await axios.get('/exercises')
    console.log(response.data)
    setExercises(response.data)
  }, [])

  const setMemo = (event) => {
    setWorkoutForm((data) => ({
      ...data,
      memo: event.target.value,
    }))
  }

  const setExerciseId = (event) => {
    setWorkoutForm((data) => ({
      ...data,
      exerciseId: event.target.value,
    }))
  }

  const onClick = async () => {
    const response = await axios.post('/workouts', {
      memo: workoutForm.memo,
      exerciseId: workoutForm.exerciseId,
    })
    setWorkoutForm((data) => ({
      ...data,
      id: response.data.id,
    }))
  }

  const addToWorkoutSets = (newId) => {
    setWorkoutForm((data) => ({
      ...data,
      workoutSets: [...data.workoutSets, newId],
    }))
  }

  return (
    <div>
      <label htmlFor="exercise">exercise</label>
      <select name="exercise" id="exercise" onChange={setExerciseId}>
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>
      <label htmlFor="memo">memo</label>
      <input
        type="text"
        name="memo"
        value={workoutForm.memo}
        onChange={setMemo}
      />
      {workoutForm.workoutSets.length > 0 ? (
        workoutForm.workoutSets.map((workoutSet) => (
          <WorkoutSetForm
            key={workoutSet}
            onChange={addToWorkoutSets}
          ></WorkoutSetForm>
        ))
      ) : (
        <button type="button" onClick={onClick}>
          확인
        </button>
      )}
      <br />
    </div>
  )
}

export default WorkoutForm
