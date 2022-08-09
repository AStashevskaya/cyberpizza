import { restrictedRegister } from '../../utils'
import Card from './Card'

restrictedRegister(
  Card,
  {
    name: 'ProductBox',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/inpicture.svg',
    description:
      'Product details, should only be used in product page template, dynamically bind to product in context.',
    defaults: {
      bindings: {
        'component.product': 'state.productsItem',
        'component.options.name': 'state.productsItem.name',
        'component.description': 'state.productsItem.description',
        'component.price': 'state.productsItem.price',
        'component.item': 'state.productsItem',
      },
    },
  },
  ['product-page', 'character-for-test', 'page', 'theme']
)

restrictedRegister(
  Card,
  {
    name: 'ProductBox',
    inputs: [
      {
        name: 'product',
        type: `object`,
      },
      {
        name: 'description',
        richText: true,
        type: 'html',
        helperText: 'Override product description from swell',
      },
      {
        name: 'name',
        type: 'text',
        helperText: 'Override product title from swell',
      },
      {
        name: 'image',
        type: 'text',
        helperText: 'Override product title from swell',
      },
      {
        name: 'price',
        type: 'text',
        helperText: 'Override product price from swell',
      },
    ],
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show its details on page',
  },
  ['page', 'collection-page', 'character-for-test', 'theme']
)
