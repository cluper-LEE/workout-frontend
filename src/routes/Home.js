import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/exercise">
        <button type="button">운동 목록</button>
      </Link>
      <Link to="/dailyWorkouts">
        <button type="button">운동 기록</button>
      </Link>
    </div>
  )
}

export default Home
