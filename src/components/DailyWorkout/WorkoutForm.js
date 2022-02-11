import axios from 'axios'
import React, { useState } from 'react'
import WorkoutSetForm from './WorkoutSetForm'
import propTypes from 'prop-types'

function WorkoutForm({
  workout,
  onChange,
  index,
  exercises,
  dailyWorkoutForm,
}) {
  const [workoutForm, setWorkoutForm] = useState(
    workout
      ? workout
      : {
          id: -1,
          exerciseForm:
            exercises.length > 0
              ? exercises[0]
              : { id: -1, name: '', category: '' },
          memo: '',
          dailyWorkoutForm,
          workoutSetForms: [],
        }
  )
  // const [exercises, setExercises] = useState([])
  // useEffect(async () => {
  //   const response = await axios.get('/exercises')
  //   if (response.status === 204) {
  //     return
  //   } else setExercises(response.data)
  // }, [])

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
    console.log(workoutForm)
    if (workoutForm.id === -1) {
      response = await axios.post('/workouts', workoutForm)
    } else {
      response = await axios.patch('/workouts', workoutForm)
    }

    onChange(index, response.data)
  }

  const addToWorkoutSets = (newId) => {
    setWorkoutForm((data) => ({
      ...data,
      workoutSetForms: [...data.workoutSetForms, newId],
    }))
  }
  return (
    <div>
      <label htmlFor="exercise">exercise</label>
      <select
        name="exercise"
        id="exercise"
        onChange={setExerciseId}
        value={workoutForm.exerciseId}
      >
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
      {workoutForm.workoutSetForms.length > 0
        ? workoutForm.workoutSetForms.map((workoutSet) => (
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
  workout: propTypes.object,
  onChange: propTypes.func,
  index: propTypes.number.isRequired,
  exercises: propTypes.arrayOf(propTypes.object),
  dailyWorkoutForm: propTypes.object,
}

export default WorkoutForm
