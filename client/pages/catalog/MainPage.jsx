import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactGA from 'react-ga'

import Header from '../../components/Header'
import Catalog from '../../components/Catalog'
import Sidebar from '../../components/Sidebar'
import Cart from '../../components/Cart'

import { fetchProducts } from '../../redux/catalog'
import { getData } from '../../redux/user'
import { getCookies } from '../../../shared/utils/getCookie'
import { getOrderStatus } from '../../redux/order'
import { getCartProducts } from '../../redux/cart/actions'

import '../Page.scss'

const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const token = getCookies('jwt')

  // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
  const categories = [
    {
      title: 'pizza',
      path: '/',
    },

    {
      title: 'drinks',
      path: '/',
    },
  ]

  useEffect(() => {
    // ReactGA.initialize('UA-202046657-1')
    // ReactGA.pageview('/')

    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchProducts()),
        dispatch(getCartProducts()),
        dispatch(getOrderStatus()),
        token ? dispatch(getData(token)) : () => {},
      ])
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="page">
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <>
          <div className="container_main">
            <Header />
            <Catalog />
          </div>
          <Sidebar categories={categories} />
          <Cart />
        </>
      )}
    </div>
  )
}

export default MainPage
