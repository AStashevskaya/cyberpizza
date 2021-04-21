import React, { useState, useEffect } from 'react'

import Header from '../../components/Header'
import Catalog from '../../components/Catalog'
import Sidebar from '../../components/Sidebar'

import { fetchPizza } from '../../api/index'
import { createCart } from '../../api/cart'

import './MainPage.scss'

const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const [pizzaData, setPizzaData] = useState([])

  useEffect(() => {
    async function getData() {
      const result = await fetchPizza()
      const { data } = result
      setPizzaData([...data])
      setLoading(false)
    }

    const cart = {
      products: []
    }
    createCart(cart)

    if (loading) {
      getData()
    }
  }, [])

  return (
    <div className="page_main">
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <>
          <div className="container_main">
            <Header />
            <Catalog data={pizzaData} />
          </div>
          <Sidebar />
        </>
      )}
    </div>
  )
}

export default MainPage
