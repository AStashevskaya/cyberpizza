import React, { useEffect, useState, useCallback } from 'react'
import pt from 'prop-types'

import { getData } from '../../api/admin'
import AdminProducts from './AdminProducts'
import './AdminComponent.scss'

const AdminComponent = ({ title, Component }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getNewData = useCallback(async () => {
    setLoading(true)
    setData([])

    const response = await getData(title)

    if (response && response.data) {
      setData([...response.data])
      setLoading(false)
    }
  }, [title])

  useEffect(() => {
    getNewData()
  }, [getNewData])

  return (
    <div className="container_admin">
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <Component data={data} setData={setData} />
      )}
    </div>
  )
}

AdminComponent.propTypes = {
  title: pt.string,
  Component: pt.func,
}

AdminComponent.defaultProps = {
  title: 'products',
  Component: AdminProducts,
}
export default AdminComponent
