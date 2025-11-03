import Storage from '@/com/system/storage'
const MUTATE_USER = 'mutateUser'

const state = {
  user: null
}

const getters = {
  user: state => state.user
}

const mutations = {
  mutateUser (state, _user) {
    state.user = _user
  }
}

const actions = {
  setUser ({ commit }, _user) {
    Storage.saveJson(_user)
    commit(MUTATE_USER, _user)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}