import React from 'react'
import { Link } from 'react-router-dom'

import './SideBar.scss'

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
    <aside className="sidebar">
      <span>categories:</span>
      <nav>
        <ul className="sidebar__nav">
          {categories.map((category) => (
            <li
              className={`sidebar__nav-link ${
                category.title === 'pizza' ? 'active' : ''
              }`}
              key={category.title}
            >
              <Link to={category.path}>{category.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar
