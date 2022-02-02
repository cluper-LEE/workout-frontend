import React, { useState } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'

function ExerciseForm({ onChange }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const onClick = async (event) => {
    event.preventDefault()
    await axios.post('/exercises', { name, category })
    onChange()
  }
  return (
    <form>
      <label htmlFor="name">운동명</label>
      <input
        type="text"
        name="name"
        onChange={(event) => setName(event.target.value)}
        placeholder="운동명을 입력하세요"
      />
      <label htmlFor="category">카테고리</label>
      <input
        type="text"
        name="category"
        onChange={(event) => setCategory(event.target.value)}
        placeholder="운동 부위를 입력하세요"
      />
      <button type="button" onClick={onClick}>
        확인
      </button>
    </form>
  )
}

ExerciseForm.propTypes = {
  onChange: propTypes.func,
}

export default ExerciseForm
