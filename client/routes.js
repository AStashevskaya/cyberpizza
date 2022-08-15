import CatalogPage from './pages/catalog'
import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SigninPage'
import AdminPage from './pages/AdminPage'
// import { ADMIN_LIST } from './constants/adminRoutes'

const ROUTES = [
  // {
  //   component: CatalogPage,
  //   path: '/',
  // },

  {
    component: LoginPage,
    path: '/log-in',
  },

  {
    component: SignInPage,
    path: '/register',
  },

  {
    component: AdminPage,
    path: '/admin',
  },
  {
    component: AdminPage,
    path: '/admin/:title',
  },
]

export default ROUTES
