import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ExerciseEdit from './components/ExerciseEditForm'
import ExerciseHome from './routes/ExerciseHome'
import Home from './routes/Home'
import { Link } from 'react-router-dom'
import DailyWorkoutHome from './routes/DailyWorkoutHome'

function App() {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Link to="/">홈</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<ExerciseHome />} />
          <Route path="/exercise/edit/:exerciseId" element={<ExerciseEdit />} />
          <Route path="/dailyWorkouts" element={<DailyWorkoutHome />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
