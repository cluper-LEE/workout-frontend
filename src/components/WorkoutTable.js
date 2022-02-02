import React from 'react'
import propTypes from 'prop-types'

function WorkoutTable({ workout }) {
  return <table>{workout.exerciseName}</table>
}

WorkoutTable.propTypes = {
  workout: {
    id: propTypes.number.isRequired,
    exerciseName: propTypes.string.isRequired,
    memo: propTypes.string,
  },
}

export default WorkoutTable
