import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ExerciseHome from './routes/ExerciseHome'
import Home from './routes/Home'
import DailyWorkoutHome from './routes/DailyWorkoutHome'
import Header from './components/Layout/Header'
import './index.css'

function App() {
  const [paths] = useState([
    { name: '홈', path: '/', element: <Home /> },
    { name: '운동', path: '/exercise', element: <ExerciseHome /> },
    { name: '기록', path: '/dailyWorkouts', element: <DailyWorkoutHome /> },
  ])
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Header paths={paths} />
        <div className="h-header"></div>
        <main className="mt-10 mx-32">
          <Routes>
            {paths.map((path) => (
              <Route key={path.path} path={path.path} element={path.element} />
            ))}
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
