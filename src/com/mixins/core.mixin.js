import { mapActions, mapGetters } from 'vuex'

const core = {
  data () {
    return {
      imageRoot: process.env.VUE_APP_IMAGE_ROOT,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      domain: window.location.hostname
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      propertyId: 'propertyId',
      segment: 'segment'
    })
  },
  methods: {
    ...mapActions({
      setPropertyId: 'setPropertyId',
      setSegment: 'setSegment'
    }),
    setBranding (_object) {
      console.log(_object)
    }
  }
}

export default core