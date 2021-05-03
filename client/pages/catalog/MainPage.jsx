import React, { useState, useEffect } from 'react'

import Header from '../../components/Header'
import Catalog from '../../components/Catalog'
import Sidebar from '../../components/Sidebar'
import Cart from '../../components/Cart'

import { fetchProducts } from '../../redux/catalog'

import './MainPage.scss'
import { useSelector, useDispatch } from 'react-redux'

const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const catalogLoading = useSelector((state) => state.catalog.loading)

  useEffect(() => {
    if (catalogLoading) {
      dispatch(fetchProducts())
    } else {
      setLoading(catalogLoading)
    }
  }, [catalogLoading, dispatch])

  return (
    <div className="page_main">
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <>
          <div className="container_main">
            <Header />
            <Catalog />
          </div>
          <Sidebar />
          <Cart />
        </>
      )}
    </div>
  )
}

export default MainPage
