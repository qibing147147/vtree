<template>
  <div id="app">
    <!-- <tree :data="data"></tree> -->
  </div>
</template>

<script>
import tree from './components/tree.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    tree
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    axios.get('/data.json').then(res => {
      this.data = res.data
    })
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
