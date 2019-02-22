<template>
  <div>
    <VUserSearchForm @submitted="searchUser" />
    <VUserProfile :user="user" :aProp="aProp" />
    <p>hello</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VUserProfile from '../components/VUserProfile'
import VUserSearchForm from '../components/VUserSearchForm'
export default {
  name: 'UserView',
  data () {
    return {
      aProp: {
        name: ''
      }
    }
  },
  methods: {
    searchUser (username) {
      this.$store.dispatch('SEARCH_USER', {username})
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  components: {
    VUserProfile,
    VUserSearchForm
  }
}
</script>
