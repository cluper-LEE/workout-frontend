import React from 'react'
import { NavLink } from 'react-router-dom'
import propTypes from 'prop-types'

const Header = ({ paths }) => {
  const defaultStyle = 'border-b-2 pb-1'
  const selected = 'border-sky-300'
  return (
    <header className="z-50 bg-white w-full  shadow fixed top-0 h-header">
      <nav className="flex items-center space-x-4 h-full pl-3">
        <div className="h-full">
          <img className="h-full" src="logo192.png" alt="" />
        </div>
        <ul className="flex space-x-4">
          {paths.map((path) => (
            <li key={path.path}>
              <NavLink to={path.path}>
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? defaultStyle + ' ' + selected : defaultStyle
                    }
                  >
                    {path.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  paths: propTypes.arrayOf(propTypes.object),
}

export default Header
