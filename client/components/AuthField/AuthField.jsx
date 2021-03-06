import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../../redux/user'

import './AuthField.scss'

const AuthField = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault()

      dispatch(logout())
    },
    [dispatch]
  )

  return (
    <div className="auth__container">
      {isAuth ? (
        <>
          <span>{`Hello, ${user.name ? user.name : ''}`}</span>
          <button className="auth__logout" onClick={handleClick}>
            Log out
          </button>
          {user.isAdmin ? <Link to="/admin">admin</Link> : ''}
        </>
      ) : (
        <>
          <Link to="/register">Sign in</Link>
          <Link to="/log-in">Log in</Link>
        </>
      )}
    </div>
  )
}

export default AuthField
