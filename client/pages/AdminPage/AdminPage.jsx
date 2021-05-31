import React, { useMemo } from 'react'
import pt from 'prop-types'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

import { deleteProduct, updateProduct, createProduct } from '../../api/catalog'
import '../Page.scss'
import AdminComponent from '../../components/AdminComponent'
import { ADMIN_LIST } from '../../constants/adminRoutes'

const AdminPage = () => {
  const { title } = useParams()

  const getPageContent = useMemo(() => {
    const category = ADMIN_LIST.find((category) => category.title === title)

    if (category) {
      return category.component
    }
  }, [title])

  // const product = {
  //   name: 'Marinara',
  //   image: 'files/img',
  //   price: '14.88',
  //   description: 'pizza with seafood',
  //   enabled: [],
  // }

  const handleCLick = () => {
    console.log('from click')
    // // createProduct(product)
    // updateProduct({ name: 'salami' }, '60ab751501a6cc2734514f61')
    deleteProduct('60ab751501a6cc2734514f61')
  }

  return (
    <div className="page">
      <AdminComponent title={title} Component={getPageContent} />
      <Sidebar categories={ADMIN_LIST} />
    </div>
  )
}

export default AdminPage
