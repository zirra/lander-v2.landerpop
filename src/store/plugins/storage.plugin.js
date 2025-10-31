import Storage from '@/com/system/storage'

/**
 * Vuex plugin for automatic state persistence using Storage
 *
 * Usage in store/index.js:
 * import createStoragePlugin from './plugins/storage.plugin'
 *
 * export default new Store({
 *   modules,
 *   plugins: [createStoragePlugin()]
 * })
 */

export default function createStoragePlugin(options = {}) {
  const {
    // Which state keys to persist
    stateKeys = ['application', 'propertyId', 'segment'],

    // Storage namespace to avoid collisions
    namespace = 'app',

    // Debounce delay for saving (ms)
    debounce = 300,

    // Restore state on initialization
    restore = true,

    // Only sync on specific mutations (empty = all mutations)
    mutations = [],

    // Custom storage instance (optional)
    storage = null,

    // Transform state before saving
    serialize = null,

    // Transform state after loading
    deserialize = null
  } = options

  const storageInstance = storage || Storage.clone().setNamespace(namespace)
  let debounceTimer = null

  return store => {
    // Restore persisted state on store initialization
    if (restore) {
      stateKeys.forEach(key => {
        let stored = storageInstance.restoreStateFromStorage(key)

        if (stored !== null) {
          // Apply deserialize if provided
          if (deserialize && typeof deserialize === 'function') {
            stored = deserialize(key, stored)
          }

          // Try to find and commit the appropriate mutation
          const mutationName = `mutate${key.charAt(0).toUpperCase() + key.slice(1)}`

          if (store._mutations[mutationName]) {
            store.commit(mutationName, stored)
          } else {
            // Fallback: directly set state if mutation not found
            console.warn(`Mutation ${mutationName} not found, state not restored for ${key}`)
          }
        }
      })
    }

    // Subscribe to store mutations for auto-save
    store.subscribe((mutation, state) => {
      // Filter mutations if specified
      const shouldSync = mutations.length === 0 || mutations.includes(mutation.type)

      if (shouldSync) {
        // Debounce saves to avoid excessive writes
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          stateKeys.forEach(key => {
            if (state[key] !== undefined) {
              let valueToStore = state[key]

              // Apply serialize if provided
              if (serialize && typeof serialize === 'function') {
                valueToStore = serialize(key, valueToStore)
              }

              storageInstance.syncStateToStorage(key, valueToStore)
            }
          })
        }, debounce)
      }
    })

    // Optional: expose storage methods to store
    store.$storage = storageInstance
  }
}

/**
 * Create a plugin for a specific module
 *
 * Usage:
 * export const userStoragePlugin = createModuleStoragePlugin('user', {
 *   stateKeys: ['profile', 'preferences']
 * })
 */
export function createModuleStoragePlugin(moduleName, options = {}) {
  return createStoragePlugin({
    namespace: `${moduleName}`,
    ...options
  })
}

/**
 * Selective field persistence within a state object
 *
 * Usage:
 * const plugin = createSelectiveStoragePlugin({
 *   application: ['branding', 'propertyId'], // Only persist these fields
 *   segment: true // Persist entire segment
 * })
 */
export function createSelectiveStoragePlugin(fieldMap, options = {}) {
  const stateKeys = Object.keys(fieldMap)

  return createStoragePlugin({
    ...options,
    stateKeys,
    serialize: (key, value) => {
      const fields = fieldMap[key]

      // If true, persist entire value
      if (fields === true) return value

      // If array, persist only specified fields
      if (Array.isArray(fields)) {
        const filtered = {}
        fields.forEach(field => {
          if (value && value[field] !== undefined) {
            filtered[field] = value[field]
          }
        })
        return filtered
      }

      return value
    },
    deserialize: (key, stored) => {
      const fields = fieldMap[key]

      // If we're selectively persisting, we might need to merge with defaults
      if (Array.isArray(fields) && options.mergeDefaults) {
        // This would need access to default state, which could be passed in options
        return { ...options.defaults?.[key], ...stored }
      }

      return stored
    }
  })
}
