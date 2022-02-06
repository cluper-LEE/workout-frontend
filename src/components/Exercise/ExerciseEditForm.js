import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

function ExerciseEdit({ onChange, exerciseId }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  useEffect(async () => {
    const response = await axios.get(`/exercises/${exerciseId}`)
    setName(response.data.name)
    setCategory(response.data.category)
  }, [])

  const onClick = async () => {
    await axios.patch(`/exercises/${exerciseId}`, {
      id: exerciseId,
      name,
      category,
    })
    onChange()
  }
  return (
    <form>
      <label htmlFor="name">운동명</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="운동명을 입력하세요"
      />
      <label htmlFor="category">카테고리</label>
      <input
        type="text"
        name="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        placeholder="운동 부위를 입력하세요"
      />
      <Link to={`/exercise`}>
        <button type="button" onClick={onClick}>
          확인
        </button>
      </Link>
    </form>
  )
}

ExerciseEdit.propTypes = {
  onChange: propTypes.func.isRequired,
  exerciseId: propTypes.number.isRequired,
}

export default ExerciseEdit
