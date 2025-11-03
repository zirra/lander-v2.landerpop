import { mapActions, mapGetters } from 'vuex'

const user = {
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapActions({
      setUser: 'setUser'
    })
  }
}

export default user