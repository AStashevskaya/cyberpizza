import React from 'react'

import settings from '../../assets/icons/settings.svg'

const FilterSettings = () => (
  <span className="filter__settings">
    All filters
    <img src={settings} alt="settings" />
  </span>
)

export default FilterSettings
