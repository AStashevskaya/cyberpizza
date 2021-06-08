import nconf from 'nconf'
import dotenv from 'dotenv'

dotenv.config({ silent: true })
nconf.env().defaults({
  ACCESS_TOKEN: '123',
})

export const ACCESS_TOKEN = nconf.get('ACCESS_TOKEN')
