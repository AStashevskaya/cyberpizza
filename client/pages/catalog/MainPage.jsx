import React, { useState, useEffect } from 'react'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header/Header'
import Catalog from '../../components/Catalog'

import { fetchPizza } from '../../api/index'

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
          <SideBar />
        </>
      )}
    </div>
  )
}

export default MainPage
