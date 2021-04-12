import React from 'react'
import FilterSettings from './FilterSettings'
import HashtagContainer from './HashTag/HashtagContainer'

import './Filter.scss'

const Filter = () => {
  return (
    <div className="container_filter">
      <span className="filter__title">Filters :</span>
      <div className="container_settings">
        <HashtagContainer />
        <FilterSettings />
      </div>
    </div>
  )
}

export default Filter
