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
        'component.options.product': 'state.products[index]',
        // 'component.options.title': 'state.product.title',
        // 'component.options.description': 'state.product.descriptionHtml',
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
        type: `SwellProductHandle`,
      },
      {
        name: 'description',
        richText: true,
        type: 'html',
        helperText: 'Override product description from swell',
      },
      {
        name: 'title',
        type: 'text',
        helperText: 'Override product title from swell',
      },
    ],
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show its details on page',
  },
  ['page', 'collection-page', 'character-for-test', 'theme']
)
