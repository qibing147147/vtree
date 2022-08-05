<template>
  <div id="app">
    <tree ref="tree" :treeData="treeData"></tree>
  </div>
</template>

<script>
import tree from './components/tree.vue'

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
  },
  mounted () {
    this.$refs.tree.setData()
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>
