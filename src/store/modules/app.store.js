//import Storage from '@/com/system/storage'
const MUTATE_APPLICATION = 'mutateApplication'
const MUTATE_PROPERTY_ID = 'mutatePropertyId'
const MUTATE_SEGMENT = 'mutateSegment'

const state = {
  segment: null,
  application: {
    "propertyId": "lpuEkSePpwewsvqsCtzvqRMz",
    "applicationId": "default",
    "branding": {
      "appName": "Prairie Band Casino and Resort",
      "primary": "rgb(255, 255, 255)",
      "secondary": "rgb(81, 47, 235)",
      "highlight": "rgb(81, 47, 235)",
      "heading": "rgb(255,255,255)",
      "content": "rgb(255,255,255)",
      "background": {
        "color": "#000",
        "font": "#fff",
        "image": null
      },
      "logo": {
        "url": "PrairieBandLogo.png",
        "alt": "Prairie Band Casino and Resort",
      },
    },
    "includes": [
      {
        "scriptId": "chalkline",
        "scriptUrl":
          "https://demo.chalklinegames.com/integration/embed.js?ts=s",
      },
    ],
    "content": [    
    ]
  },
  propertyId: null
}

const getters = {
  application: state => state.application,
  propertyId: state => state.propertyId,
  segment: state => state.segment
}

const mutations = {
  mutateApplication (state, _app) {
    state.application = _app
  },
  mutatePropertyId (state, _pid) {
    state.propertyId = _pid
  },
  mutateSegment (state, _segment) {
    state.segment = _segment
  }
}

const actions = {
  setApplication ({ commit }, _app) {
    commit(MUTATE_APPLICATION, _app)
  },
  setPropertyId ({ commit }, _pid) {
    commit(MUTATE_PROPERTY_ID, _pid)
  },
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