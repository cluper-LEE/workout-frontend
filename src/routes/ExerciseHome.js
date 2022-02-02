import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExerciseForm from '../components/ExerciseForm'
import { Link } from 'react-router-dom'

function ExerciseHome() {
  const [exercises, setExercises] = useState([])
  const refreshExercises = async () => {
    const response = await axios.get('/exercises')
    setExercises(response.data)
  }
  useEffect(refreshExercises, [])
  return (
    <div>
      <ExerciseForm onChange={refreshExercises}></ExerciseForm>
      <table>
        <thead>
          <tr>
            <th>운동명</th>
            <th>카테고리</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
                <td>{exercise.category}</td>
                <td>
                  <Link to={`/exercise/edit/${exercise.id}`}>
                    <button type="button">수정</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ExerciseHome
