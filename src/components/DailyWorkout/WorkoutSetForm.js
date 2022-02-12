import React from 'react'
import propTypes from 'prop-types'

function WorkoutSetForm({ workoutSetForm, events }) {
  const { change, patch, remove } = events

  const changeWeight = (event) => {
    change({ ...workoutSetForm, weight: event.target.value })
  }
  const patchWeight = (event) => {
    patch('/workoutSets', { ...workoutSetForm, weight: event.target.value })
  }
  const changeReps = (event) => {
    change({ ...workoutSetForm, reps: event.target.value })
  }
  const patchReps = (event) => {
    patch('/workoutSets', { ...workoutSetForm, reps: event.target.value })
  }
  const removeForm = () => {
    remove('/workoutSets', workoutSetForm)
  }
  return (
    <div className="pl-2 flex gap-2 ">
      <span>{workoutSetForm.setNum} 세트</span>
      <div className="border-2">
        <input
          className="text-right w-12"
          type="number"
          name="weight"
          value={workoutSetForm.weight}
          onChange={changeWeight}
          onBlur={patchWeight}
        />
        <label htmlFor="weight">kg</label>
      </div>
      <div className="border-2">
        <input
          className="text-right w-10"
          type="number"
          name="reps"
          value={workoutSetForm.reps}
          onChange={changeReps}
          onBlur={patchReps}
        />
        <label htmlFor="reps">reps</label>
      </div>
      <button type="button" onClick={removeForm}>
        X
      </button>
    </div>
  )
}

WorkoutSetForm.propTypes = {
  workoutSetForm: propTypes.object,
  events: propTypes.objectOf(propTypes.func),
}

export default WorkoutSetForm
