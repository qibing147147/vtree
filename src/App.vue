<template>
  <div id="app">
    <tree ref="tree" :treeData="treeData"></tree>
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
      treeData: []
    }
  },
  created () {
    this.data = []
    axios.get('/data.json').then(res => {
      const a = performance.now()
      this.data = JSON.stringify(res.data)
      const b = performance.now()
      this.$refs.tree.setData(res.data)
      const c = performance.now()
      console.log('a-b', b - a)
      console.log('a-c', c - a)
      console.log('b-c', c - b)
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
