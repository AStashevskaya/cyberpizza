import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import './AdminPage.scss'

const AdminPage = () => {
    const title = useParams()
    console.log(title)
  const categories = [
    {
      title: 'products',
      path: '/admin/products',
    },

    {
      title: 'categories',
      path: '/admin/categories',
    },
  ]

  return (
    <div className="page_admin">
      <div className="container_main"></div>
      <Sidebar categories={categories} />
    </div>
  )
}

export default AdminPage
