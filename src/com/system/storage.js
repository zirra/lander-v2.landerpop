class Storage {
  constructor() {
    this.namespace = ''
    this.listeners = {}
    this.errorHandlers = []
  }

  // Namespace support for key prefixing
  setNamespace(prefix) {
    this.namespace = prefix ? `${prefix}:` : ''
    return this
  }

  _getKey(item) {
    return `${this.namespace}${item}`
  }

  // Enhanced save with error handling
  saveJson(item, ctx) {
    try {
      const res = JSON.stringify(ctx)
      localStorage.setItem(this._getKey(item), res)
      this._triggerListeners(item, ctx)
      return true
    } catch (error) {
      this._handleError('saveJson', error, { item, ctx })
      return false
    }
  }

  saveData(item, ctx) {
    try {
      localStorage.setItem(this._getKey(item), ctx)
      this._triggerListeners(item, ctx)
      return true
    } catch (error) {
      this._handleError('saveData', error, { item, ctx })
      return false
    }
  }

  // Batch operations
  saveMultiple(items) {
    const results = {}
    for (const [key, value] of Object.entries(items)) {
      results[key] = this.saveJson(key, value)
    }
    return results
  }

  load(item) {
    try {
      const value = localStorage.getItem(this._getKey(item))
      return value || false
    } catch (error) {
      this._handleError('load', error, { item })
      return false
    }
  }

  loadNullable(item) {
    try {
      const value = localStorage.getItem(this._getKey(item))
      return value ? JSON.parse(value) : null
    } catch (error) {
      this._handleError('loadNullable', error, { item })
      return null
    }
  }

  loadJSON(item) {
    try {
      const value = localStorage.getItem(this._getKey(item))
      return value ? JSON.parse(value) : false
    } catch (error) {
      this._handleError('loadJSON', error, { item })
      return false
    }
  }

  // Load with default value
  loadWithDefault(item, defaultValue) {
    const value = this.loadJSON(item)
    return value !== false ? value : defaultValue
  }

  kill(item) {
    try {
      const key = this._getKey(item)
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key)
        this._triggerListeners(item, null, 'delete')
      }
      return true
    } catch (error) {
      this._handleError('kill', error, { item })
      return false
    }
  }

  // Clear namespace or multiple items
  clearNamespace(prefix = null) {
    try {
      const targetPrefix = prefix ? `${prefix}:` : this.namespace
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(targetPrefix)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      this._handleError('clearNamespace', error, { prefix })
      return false
    }
  }

  // State sync methods
  syncStateToStorage(stateKey, stateValue) {
    return this.saveJson(stateKey, stateValue)
  }

  restoreStateFromStorage(stateKey, defaultValue = null) {
    const stored = this.loadJSON(stateKey)
    return stored !== false ? stored : defaultValue
  }

  // Check if item exists
  has(item) {
    return localStorage.getItem(this._getKey(item)) !== null
  }

  // Get all keys in current namespace
  getKeys() {
    const keys = Object.keys(localStorage)
    if (this.namespace) {
      return keys
        .filter(key => key.startsWith(this.namespace))
        .map(key => key.substring(this.namespace.length))
    }
    return keys
  }

  // Event listeners for storage changes
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
    return () => this.off(event, callback)
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }

  _triggerListeners(key, value, action = 'set') {
    const listeners = this.listeners['change'] || []
    listeners.forEach(callback => {
      try {
        callback({ key, value, action })
      } catch (error) {
        console.error('Storage listener error:', error)
      }
    })
  }

  // Error handling
  onError(handler) {
    this.errorHandlers.push(handler)
    return () => {
      this.errorHandlers = this.errorHandlers.filter(h => h !== handler)
    }
  }

  _handleError(method, error, context) {
    const errorInfo = { method, error, context, timestamp: Date.now() }

    // Call registered error handlers
    this.errorHandlers.forEach(handler => {
      try {
        handler(errorInfo)
      } catch (handlerError) {
        console.error('Error handler failed:', handlerError)
      }
    })

    // Log to console if no handlers or in development
    if (this.errorHandlers.length === 0 || process.env.NODE_ENV === 'development') {
      console.error(`Storage.${method} error:`, error, context)
    }
  }

  // Vuex integration helper
  createVuexPlugin(config = {}) {
    const {
      mutations = [],
      stateKeys = [],
      namespace = '',
      debounce = 300,
      restore = true
    } = config

    let debounceTimer = null
    const storageInstance = namespace ? this.clone().setNamespace(namespace) : this

    return store => {
      // Restore state on initialization
      if (restore) {
        stateKeys.forEach(key => {
          const stored = storageInstance.restoreStateFromStorage(key)
          if (stored !== null) {
            const mutationName = `mutate${key.charAt(0).toUpperCase() + key.slice(1)}`
            if (store._mutations[mutationName]) {
              store.commit(mutationName, stored)
            }
          }
        })
      }

      // Subscribe to mutations
      store.subscribe((mutation, state) => {
        const shouldSync = mutations.length === 0 || mutations.includes(mutation.type)

        if (shouldSync) {
          clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            stateKeys.forEach(key => {
              if (state[key] !== undefined) {
                storageInstance.syncStateToStorage(key, state[key])
              }
            })
          }, debounce)
        }
      })
    }
  }

  // Clone storage instance with different namespace
  clone() {
    const instance = new Storage()
    instance.errorHandlers = [...this.errorHandlers]
    return instance
  }

  // Get storage info
  getInfo() {
    try {
      const keys = this.getKeys()
      let totalSize = 0

      keys.forEach(key => {
        const value = localStorage.getItem(this._getKey(key))
        if (value) {
          totalSize += value.length
        }
      })

      return {
        keys: keys.length,
        size: totalSize,
        sizeKB: (totalSize / 1024).toFixed(2),
        namespace: this.namespace || 'global'
      }
    } catch (error) {
      this._handleError('getInfo', error, {})
      return null
    }
  }

}

export default new Storage()