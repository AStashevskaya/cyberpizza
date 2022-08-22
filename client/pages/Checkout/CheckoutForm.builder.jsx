import { withChildren } from '@builder.io/react'
import { restrictedRegister } from '../../utils'
import Checkout from './CheckoutForm'

const CheckoutWithChildren = withChildren(Checkout)

restrictedRegister(
  CheckoutWithChildren,
  {
    name: 'Checkout',
    description: 'checkout form',
  },
  ['page']
)

restrictedRegister(
  CheckoutWithChildren,
  {
    name: 'Checkout',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'checkout',
  },
  ['page']
)
