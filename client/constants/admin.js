import AdminProducts from '../components/AdminComponent/AdminProducts'
import AdminUsers from '../components/AdminComponent/AdminUsers'
import AdminOrders from '../components/AdminComponent/AdminOrders'

import ProductForm from '../components/AdminComponent/Form/ProductForm'
import OrderForm from '../components/AdminComponent/Form/OrderFrom'
import UserForm from '../components/AdminComponent/Form/UserForm'

export const ADMIN_LIST = [
  {
    title: 'products',
    component: AdminProducts,
    form: ProductForm,
  },
  {
    title: 'orders',
    component: AdminOrders,
    form: OrderForm,
  },
  {
    title: 'users',
    component: AdminUsers,
    form: UserForm,
  },
]
