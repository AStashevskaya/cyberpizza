import React from 'react'
import {Link} from 'react-router-dom' 

const Category = ({ text, path }) => {
    return (
        <div className="sidebar__category">
            <Link to={path} >
            {text}
            </Link>
        </div>
    )
}

export default Category;