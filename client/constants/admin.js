import AdminProducts from '../components/AdminComponent/AdminProducts'
import AdminUsers from '../components/AdminComponent/AdminUsers'

export const ADMIN_LIST = [
  {
    title: 'products',
    component: AdminProducts,
  },
  {
    title: 'categories',
    component: AdminUsers,
  },
  {
    title: 'users',
    component: AdminUsers,
  },
]
