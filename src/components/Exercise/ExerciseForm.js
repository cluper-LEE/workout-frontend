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
  const formElements = [
    {
      label: '운동명',
      name: 'name',
      onChange: setName,
      placeHolder: '운동명을 입력하세요',
    },
    {
      label: '카테고리',
      name: 'category',
      onChange: setCategory,
      placeHolder: '운동 부위를 입력하세요',
    },
  ]
  return (
    <form className="flex flex-col items-start w-fit gap-2 pl-3 pt-2">
      {formElements.map((element) => (
        <div key={element.name} className="grid grid-cols-3 grid-rows-1">
          <label className="col-span-1" htmlFor={element.name}>
            {element.label}
          </label>
          <input
            className="col-span-2"
            type="text"
            name={element.name}
            id={element.name}
            onChange={(event) => element.onChange(event.target.value)}
            placeholder={element.placeHolder}
          />
        </div>
      ))}
      <button type="button" className="ml-auto" onClick={onClick}>
        확인
      </button>
    </form>
  )
}

ExerciseForm.propTypes = {
  onChange: propTypes.func,
}

export default ExerciseForm
