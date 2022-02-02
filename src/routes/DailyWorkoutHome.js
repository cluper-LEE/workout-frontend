import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import DailyWorkoutForm from '../components/DailyWorkoutForm'

function DailyWorkoutHome() {
  const [date, setDate] = useState(
    useParams().date
      ? useParams.date
      : new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0]
  )

  return (
    <div>
      <input
        type="date"
        name="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      {<DailyWorkoutForm date={date} />}
    </div>
  )
}

export default DailyWorkoutHome
