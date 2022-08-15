import { withChildren } from '@builder.io/react'
import { restrictedRegister } from '../../utils'
import Order from './Order'

const OrderWithChildren = withChildren(Order)

restrictedRegister(
  OrderWithChildren,
  {
    name: 'Cart',
    description:
      'Product details, should only be used in product page template, dynamically bind to product in context.',
  },
  ['product-page', 'character-for-test', 'page', 'theme', 'new-header']
)

restrictedRegister(
  OrderWithChildren,
  {
    name: 'Cart',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show its details on page',
  },
  ['page', 'collection-page', 'character-for-test', 'theme', 'new-header']
)
