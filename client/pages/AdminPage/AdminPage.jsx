import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import AdminComponent from '../../components/AdminComponent'
import { ADMIN_LIST } from '../../constants/admin'

import '../Page.scss'

const AdminPage = () => {
  const { title } = useParams()
  const user = useSelector((state) => state.user.currentUser)

  const getPageContent = useMemo(() => {
    const category = ADMIN_LIST.find((category) => category.title === title)

    if (category) {
      return category.component
    }
  }, [title])

  return user && user.isAdmin ? (
    <div className="page">
      <AdminComponent title={title} Component={getPageContent} />
      <Sidebar categories={ADMIN_LIST} />
    </div>
  ) : (
    <Redirect to="/log-in" />
  )
}

export default AdminPage
