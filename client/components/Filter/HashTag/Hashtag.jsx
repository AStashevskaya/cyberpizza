import React from 'react'
import pt from 'prop-types'

import './Hashtag.scss'

const Hashtag = ({ text }) => <span className="hashtag">{`#${text}`}</span>

Hashtag.propTypes = {
  text: pt.string,
}

export default Hashtag
