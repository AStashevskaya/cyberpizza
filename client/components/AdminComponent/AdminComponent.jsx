import React, { useEffect, useState, useMemo } from 'react'
import pt from 'prop-types'

import { getData } from '../../api/admin'
import AdminProducts from './AdminProducts'
import './AdminComponent.scss'

const AdminComponent = ({ title, Component }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const newData = useMemo(async () => {
    setLoading(true)
    setData([])

    const { data: newData } = await getData(title)
    console.log(newData)
    setData(newData)
  }, [title])

  useEffect(() => {
    setLoading(false)
  }, [newData])

  return (
    <div className="container_admin">
      {data.length ? (
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
