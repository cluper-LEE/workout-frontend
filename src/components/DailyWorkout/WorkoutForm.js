import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WorkoutSetForm from './WorkoutSetForm'
import propTypes from 'prop-types'

function WorkoutForm({ onChange, workoutId }) {
  const [workoutForm, setWorkoutForm] = useState({
    id: workoutId ? workoutId : -1,
    exerciseId: -1,
    memo: '',
    workoutSets: [],
  })
  const [exercises, setExercises] = useState([])
  useEffect(async () => {
    const response = await axios.get('/exercises')
    if (response.status === 204) {
      return
    } else setExercises(response.data)
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
    let response = null
    if (workoutForm.id === -1) {
      response = await axios.post('/workouts', {
        memo: workoutForm.memo,
        exerciseId: workoutForm.exerciseId,
      })
    } else {
      response = await axios.patch('/workouts', {
        memo: workoutForm.memo,
        exerciseId: workoutForm.exerciseId,
      })
    }

    setWorkoutForm((data) => ({
      ...data,
      id: response.data.id,
    }))
    console.log(response)
    onChange(workoutForm.id)
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
      <button type="button" onClick={onClick}>
        확인
      </button>
      {workoutForm.workoutSets.length > 0
        ? workoutForm.workoutSets.map((workoutSet) => (
            <WorkoutSetForm
              key={workoutSet}
              onChange={addToWorkoutSets}
            ></WorkoutSetForm>
          ))
        : null}
      <WorkoutSetForm onChange={addToWorkoutSets}></WorkoutSetForm>
      <br />
    </div>
  )
}

WorkoutForm.propTypes = {
  onChange: propTypes.func.isRequired,
  workoutId: propTypes.number,
}

export default WorkoutForm
