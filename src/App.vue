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
html, body {
  height: 100%;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>
