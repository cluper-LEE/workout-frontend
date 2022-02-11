import React from 'react'
import WorkoutSetForm from './WorkoutSetForm'
import propTypes from 'prop-types'

function WorkoutForm({ workoutForm, events, exercises }) {
  const { change, flush, remove } = events.workout

  const changeMemo = (event) => {
    change({ ...workoutForm, memo: event.target.value })
  }
  const flushMemo = (event) => {
    flush({ ...workoutForm, memo: event.target.value })
  }
  const flushExerciseForm = (event) => {
    const form = exercises.find((exercise) => exercise.id == event.target.value)
    change({ ...workoutForm, exerciseForm: form })
    flush({ ...workoutForm, exerciseForm: form })
  }
  const removeWorkout = () => {
    remove(workoutForm)
  }

  return (
    <div className="pl-2 border-l-2 mb-2">
      <label htmlFor="exercise">운동: </label>
      <select
        name="exercise"
        id="exercise"
        onChange={flushExerciseForm}
        value={workoutForm.exerciseForm.id}
      >
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>

      {workoutForm.workoutSetForms.length > 0
        ? workoutForm.workoutSetForms.map((workoutSet) => (
            <WorkoutSetForm key={workoutSet}></WorkoutSetForm>
          ))
        : null}
      <WorkoutSetForm></WorkoutSetForm>
      <label htmlFor="memo">{workoutForm.exerciseForm.name} 메모</label>
      <input
        type="text"
        name="memo"
        value={workoutForm.memo}
        onBlur={flushMemo}
        onChange={changeMemo}
      />
      <button onClick={removeWorkout}>삭제</button>
      <br />
    </div>
  )
}

WorkoutForm.propTypes = {
  workoutForm: propTypes.object,
  exercises: propTypes.arrayOf(propTypes.object),
  events: propTypes.shape({
    workout: propTypes.objectOf(propTypes.func),
    workoutSet: propTypes.objectOf(propTypes.func),
  }),
}

export default WorkoutForm
