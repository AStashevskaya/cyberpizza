import React, { useEffect, useState, useMemo, useCallback } from 'react'
import pt from 'prop-types'

import { getData } from '../../api/admin'
import AdminProducts from './AdminProducts'
import './AdminComponent.scss'

const AdminComponent = ({ title, Component }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const newData = useMemo(async () => {
    console.log('title from usememo', title)
    setLoading(true)
    setData([])
    const { data: newData } = await getData(title)
    setData(newData)
  }, [title])

  useEffect(() => {
    setLoading(false)
  }, [newData])


  const deleteItem = useCallback((e) => {
    console.log(e, 'delete')
  })

  const updateItem = useCallback((e) => {
    console.log(e, 'update')
  })

  return (
    <div className="container_admin">
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <Component data={data} deleteItem={deleteItem} updateItem={updateItem} />
        // <Popup />
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
