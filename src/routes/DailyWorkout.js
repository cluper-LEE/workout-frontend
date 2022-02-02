import axios from 'axios'
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'

function DailyWorkout({ date }) {
  const [dailyWorkout, setDailyWorkout] = useState({})
  useEffect(async () => {
    const response = await axios.get('/dailyWorkouts', { params: { date } })
    setDailyWorkout(response.data)
  }, [])
  return <div>{dailyWorkout === {} ? null : dailyWorkout.name}</div>
}

DailyWorkout.propTypes = {
  date: propTypes.string.isRequired,
}

export default DailyWorkout
