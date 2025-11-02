import { mapActions, mapGetters } from 'vuex'

const core = {
  data: () => ({
    imageRoot: process.env.VUE_APP_IMAGE_ROOT,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    domain: window.location.hostname
  }),
  computed: {
    ...mapGetters({
      application: 'application',
      isMain: 'isMain',
      propertyId: 'propertyId',
      segment: 'segment'
    })
  },
  methods: {
    ...mapActions({
      setPropertyId: 'setPropertyId',
      setIsMain: 'setIsMain',
      setSegment: 'setSegment'
    }),
    setBranding (_object) {
      console.log(_object)
    },
    showSettings () {
      this.$router.push({ name: 'settings'})
    },
    mainMenu () {
      this.$router.push('/')
    },
    openUrl (target) {
      window.open(target)
    }
  }
}

export default core