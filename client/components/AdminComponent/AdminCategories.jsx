import React from 'react'
import pt from 'prop-types'

const AdminCategories = ({ data }) => {
  console.log(data)
  return <div className="admin__wrapper">products from componen</div>
}

AdminCategories.propTypes = {
  data: pt.array,
}

AdminCategories.defaultProps = {
  data: [],
}

export default AdminCategories
