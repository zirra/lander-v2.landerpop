//import Storage from '@/com/system/storage'
const MUTATE_SEGMENT = 'mutateSegment'

const state = {
  segment: null
}

const getters = {
  segment: state => state.segment
}

const mutations = {
  mutateSegment (state, _segment) {
    state.segment = _segment
  }
}

const actions = {
  setSegment ({ commit }, _segment) {
    commit(MUTATE_SEGMENT, _segment)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}