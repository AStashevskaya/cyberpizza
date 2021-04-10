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
      {/* <div className="background"></div>  */}
      <span>categories:</span>
      <nav >
        <ul className="sidebar__nav">
        {categories.map((el, idx) => (
        <li className={`sidebar__nav-link ${el.title === 'pizza' ? 'active' : ''}`} key={idx.toString()}>
   <Link to={el.path} >
          {el.title}
        </Link>
        </li>   
      ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar
