import React from 'react'
import { Link } from 'react-router-dom'

import './sideBar.scss'

const SideBar = () => {
  const categories = [
    {
      title: 'pizza',
      path: '/',
    },

    {
      title: 'drinks',
      path: '/',
    },
  ]

  return (
    <div className="sidebar">
      <span>categories:</span>
      {categories.map((el, idx) => (
        <Link to={el.path} key={idx.toString()}>
          {el.title}
        </Link>
      ))}
    </div>
  )
}

export default SideBar
