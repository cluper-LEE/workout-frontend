import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExerciseForm from '../components/Exercise/ExerciseForm'
import ExerciseEdit from '../components/Exercise/ExerciseEditForm'

function ExerciseHome() {
  const [exercises, setExercises] = useState([])
  const [editHidden, setEditHidden] = useState(true)
  const [idForEdit, setIdForEdit] = useState(-1)

  const getState = (initialValue) => {
    const toggle = useState(initialValue)
    return { value: toggle[0], set: toggle[1] }
  }

  const toggle = {
    addition: getState(true),
    edition: getState(true),
  }

  const refreshExercises = async () => {
    const response = await axios.get('/exercises')
    if (response.status === 204) {
      return
    }
    setExercises(response.data)
  }
  useEffect(refreshExercises, [])

  const onClickEditBtn = (id) => () => {
    setEditHidden((value) => !value)
    setIdForEdit(id)
  }
  const onEdit = async () => {
    await refreshExercises()
    setEditHidden(true)
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => toggle.addition.set((value) => !value)}
      >
        추가하기 {toggle.addition.value ? <span>▽</span> : <span>▷</span>}
      </button>
      {toggle.addition.value ? (
        <ExerciseForm onChange={refreshExercises}></ExerciseForm>
      ) : null}
      <hr />
      운동 목록
      <div>
        <ul className="w-fit pl-4">
          {exercises.map((exercise) => (
            <li
              key={exercise.id}
              className="grid grid-rows-1 grid-cols-3 gap-2 mb-2"
            >
              <span>{exercise.name}</span>
              <span>{exercise.category}</span>
              <button type="button" onClick={onClickEditBtn(exercise.id)}>
                수정
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      {editHidden ? null : (
        <div>
          수정하기
          <ExerciseEdit onChange={onEdit} exerciseId={idForEdit} />
        </div>
      )}
    </div>
  )
}

export default ExerciseHome
