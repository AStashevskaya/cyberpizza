import React from 'react'
import pt from 'prop-types'

const AdminUsers = ({ data }) => {
  console.log(data)
  return <div className="admin__container">users from componen</div>
}

AdminUsers.propTypes = {
  data: pt.array,
}

AdminUsers.defaultProps = {
  data: [],
}

export default AdminUsers
