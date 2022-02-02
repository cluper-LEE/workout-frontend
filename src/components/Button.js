import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Button({ text, link }) {
  return (
    <div>
      <Link to={link}>
        <button type="button">{text}</button>
      </Link>
    </div>
  )
}

Button.propTypes = {
  text: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
}

export default Button
