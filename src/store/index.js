import { Store } from 'vuex'
import modules from './modules'
import createStoragePlugin from './plugins/storage.plugin'

// Configure automatic state persistence
const storagePlugin = createStoragePlugin({
  stateKeys: ['application', 'propertyId', 'segment'],
  namespace: 'app',
  debounce: 300,
  restore: true
})

export default new Store({
  modules,
  plugins: [storagePlugin]
})