import React from 'react'
import WorkoutSetForm from './WorkoutSetForm'
import propTypes from 'prop-types'

function WorkoutForm({ workoutForm, events, exercises }) {
  const changeMemo = (event) => {
    events.change('/workouts', { ...workoutForm, memo: event.target.value })
  }
  const patchMemo = (event) => {
    events.patch('/workouts', { ...workoutForm, memo: event.target.value })
  }
  const patchExerciseForm = (event) => {
    const form = exercises.find((exercise) => exercise.id == event.target.value)
    events.change('/workouts', { ...workoutForm, exerciseForm: form })
    events.patch('/workouts', { ...workoutForm, exerciseForm: form })
  }
  const removeWorkout = () => {
    events.remove('/workouts', workoutForm)
  }

  const addWorkoutSetForm = async () => {
    events.create('/workoutSets', {
      workoutForm,
      setNum: workoutForm.workoutSetForms.length + 1,
      weight: 0,
      reps: 0,
    })
  }

  const workoutSetEvents = {
    ...events,
    change: (workoutSetForm) => {
      const index = workoutForm.workoutSetForms.findIndex(
        (form) => form.id == workoutSetForm.id
      )
      const temp = workoutForm.workoutSetForms
      temp[index] = workoutSetForm
      events.change({ ...workoutForm, workoutSetForms: temp })
    },
  }

  return (
    <div className="pl-2 border-l-2 mb-2">
      <label htmlFor="exercise">운동: </label>
      <select
        name="exercise"
        id="exercise"
        onChange={patchExerciseForm}
        value={workoutForm.exerciseForm.id}
      >
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>
      {workoutForm.workoutSetForms.length > 0
        ? workoutForm.workoutSetForms.map((workoutSetForm) => (
            <WorkoutSetForm
              key={workoutSetForm.id}
              workoutSetForm={workoutSetForm}
              events={workoutSetEvents}
            ></WorkoutSetForm>
          ))
        : null}
      <button onClick={addWorkoutSetForm}>+ 세트 추가</button> <br /> <br />
      <label htmlFor="memo">{workoutForm.exerciseForm.name} 메모</label>
      <input
        type="text"
        name="memo"
        value={workoutForm.memo}
        onBlur={patchMemo}
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
  events: propTypes.objectOf(propTypes.func),
}

export default WorkoutForm
