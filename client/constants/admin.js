import AdminProducts from '../components/AdminComponent/AdminProducts'
import AdminUsers from '../components/AdminComponent/AdminUsers'
import AdminOrders from '../components/AdminComponent/AdminOrders'

export const ADMIN_LIST = [
  {
    title: 'products',
    component: AdminProducts,
  },
  {
    title: 'orders',
    component: AdminOrders,
  },
  {
    title: 'users',
    component: AdminUsers,
  },
]
