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
      segment: 'segment'
    })
  },
  methods: {
    ...mapActions({
      setSegment: 'setSegment'
    })
  }
}

export default core