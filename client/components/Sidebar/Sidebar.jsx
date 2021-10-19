import React from 'react'
import pt from 'prop-types'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

const SideBar = ({ categories }) => {
  return (
    <aside className="sidebar">
      <span>categories:</span>
      <nav>
        <ul className="sidebar__nav">
          {categories.map((category) => (
            <li
              className={`sidebar__nav-link ${category.title === 'pizza' ? 'active' : ''}`}
              key={category.title}
            >
              <Link to={category.path || `/admin/${category.title}`}>{category.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

SideBar.propTypes = {
  categories: pt.array,
}

export default SideBar
