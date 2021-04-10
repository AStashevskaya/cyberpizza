import React from 'react'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header/Header'
import Catalog from '../../components/Catalog'

import './MainPage.scss'

const MainPage = () => {
  return (
    <div className="page_main">
      <div className="container_main container">
      <Header />
      <Catalog />
      </div> 
      <SideBar />
    </div>
  )
}

export default MainPage
