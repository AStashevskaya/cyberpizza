import React from 'react'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header/Header'
import Main from '../../components/Main'

import './mainPage.scss'

const MainPage = () => {
  return (
    <div className="page_main">
      <div className="container_main">
      <Header />
      <Main />
      </div> 
      <SideBar />
    </div>
  )
}

export default MainPage
