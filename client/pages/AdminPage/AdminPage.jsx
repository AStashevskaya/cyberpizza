import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

import { deleteProduct, updateProduct, createProduct } from '../../api/catalog'
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

  const product = {
    name: 'Marinara',
    image: 'files/img',
    price: '14.88',
    description: 'pizza with seafood',
    enabled: [],
  }

  const handleCLick = () => {
    console.log('from click')
    // // createProduct(product)
    // updateProduct({ name: 'salami' }, '60ab751501a6cc2734514f61')
    deleteProduct('60ab751501a6cc2734514f61')
  }

  return (
    <div className="page_admin">
      <div className="container_main">
        <button onClick={handleCLick}>post</button>
      </div>
      <Sidebar categories={categories} />
    </div>
  )
}

export default AdminPage
