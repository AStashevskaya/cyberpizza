import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Header from '../../components/Header'
import Catalog from '../../components/Catalog'
import Sidebar from '../../components/Sidebar'
import Cart from '../../components/Cart'

import { fetchPizza } from '../../api/index'
// import { createCart } from '../../api/cart'

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
         <Cart />
        </>
      )}
    </div>
  )
}

export default MainPage
