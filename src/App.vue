<template>
  <div id="app">
    <router-view/>
    <foot-guide v-if="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FootGuide from './components/FootGuide/FootGuide'
export default {
  name: 'App',
  components: {
    FootGuide
  },
  data() {
    return {
      
    }
  },
  mounted () {
    this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress','getUserInfo'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app  
    width 100%
    height 100%
    background #f5f5f5
</style>

