import React from 'react'
import WorkoutSetForm from './WorkoutSetForm'
import propTypes from 'prop-types'

function WorkoutForm({ workout, events, exercises }) {
  const { onChange, onFlush } = events.workout

  const changeMemo = (event) => {
    onChange({ ...workout, memo: event.target.value })
  }
  const flushMemo = (event) => {
    onFlush({ ...workout, memo: event.target.value })
  }
  const flushExerciseForm = (event) => {
    const form = exercises.find((exercise) => exercise.id == event.target.value)
    onChange({ ...workout, exerciseForm: form })
    onFlush({ ...workout, exerciseForm: form })
  }

  return (
    <div className="pl-2 border-l-2 mb-2">
      <label htmlFor="exercise">운동: </label>
      <select
        name="exercise"
        id="exercise"
        onChange={flushExerciseForm}
        value={workout.exerciseForm.id}
      >
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>

      {workout.workoutSetForms.length > 0
        ? workout.workoutSetForms.map((workoutSet) => (
            <WorkoutSetForm key={workoutSet}></WorkoutSetForm>
          ))
        : null}
      <WorkoutSetForm></WorkoutSetForm>
      <label htmlFor="memo">{workout.exerciseForm.name} 메모</label>
      <input
        type="text"
        name="memo"
        value={workout.memo}
        onBlur={flushMemo}
        onChange={changeMemo}
      />
      <br />
    </div>
  )
}

WorkoutForm.propTypes = {
  workout: propTypes.object,
  exercises: propTypes.arrayOf(propTypes.object),
  events: propTypes.shape({
    workout: propTypes.objectOf(propTypes.func),
    workoutSet: propTypes.objectOf(propTypes.func),
  }),
}

export default WorkoutForm
