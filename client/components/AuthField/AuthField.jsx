import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getData, logout } from '../../redux/user'
import { getCookies } from '../../utils/getCookie'

import './AuthField.scss'

const AuthField = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()

  const handleClick = useCallback((e) => {
    e.preventDefault()
    console.log(e, 'from click')
    dispatch(logout())
  })

  useEffect(() => {
    if (isAuth) {
      const token = getCookies('token')
      console.log(token, 'from auth')
      dispatch(getData(token))
    }
  }, [])

  return (
    <div className="auth__container">
      {isAuth ? (
        <>
          <span>{`Hello, ${user.name ? user.name : ''}`}</span>
          <button className="auth__logout" onClick={handleClick}>
            Log out
          </button>
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
