import React from 'react';

import Category from '../Category'
import './index.scss'

const SideBar = () => {

    return (
        <div className="sidebar">
        <span>catigories:</span>
        <Category text={'pizzas'} path={'/'} />
        <Category text={'drinks'} path={'/'} />
        </div>
    )
}

export default SideBar;