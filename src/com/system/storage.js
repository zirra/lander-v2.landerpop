class Storage {

  saveJson (item, ctx) {
    let res = JSON.stringify(ctx)
    localStorage.setItem(item, res)
  }

  saveData (item, ctx) {
    localStorage.setItem(item, ctx)
  }

  load (item) {
    if (localStorage.getItem(item)) {
      return localStorage.getItem(item)
    } else {
      return false
    }
  }

  loadNullable (item) {
    if (localStorage.getItem(item)) {
      return JSON.parse(localStorage.getItem(item))
    } else {
      return null
    }
  }

  loadJSON (item) {
    if (localStorage.getItem(item)) {
      return JSON.parse(localStorage.getItem(item))
    } else {
      return false
    }
  }

  kill (item) {
    if(localStorage.getItem(item)) {
      localStorage.removeItem(item)
    }
  }

}

export default new Storage()