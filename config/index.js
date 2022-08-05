if (!process.env.BUILDER_PUBLIC_KEY) {
  throw new Error('Missing env varialbe BUILDER_PUBLIC_KEY')
}

export default {
  apiKey: process.env.BUILDER_PUBLIC_KEY,
  productsModel: 'swell-product',
  collectionsModel: 'swell-collection',
  isDemo: Boolean(process.env.IS_DEMO),
  storeId: process.env.SWELL_STORE_ID,
  publicKey: process.env.SWELL_PUBLIC_KEY,
  secretKey: process.env.SWELL_SECRET_KEY,
}
