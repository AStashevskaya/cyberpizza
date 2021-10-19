import ProductForm from '../components/AdminComponent/Form/ProductForm'
import OrderForm from '../components/AdminComponent/Form/OrderFrom'
import UserForm from '../components/AdminComponent/Form/UserForm'

export const ADMIN_LIST = [
  {
    title: 'products',
    form: ProductForm,
  },
  {
    title: 'orders',
    form: OrderForm,
  },
  {
    title: 'users',
    form: UserForm,
  },
]
