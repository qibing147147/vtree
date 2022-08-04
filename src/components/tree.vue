<template>
  <div>
    <div v-for="item in treeData" :key="item.id">
      <div>
        {{item.id}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree',
  data () {
    return {
      treeData: []
    }
  },
  created () {
    this.data = []
  },
  methods: {
    setData (data) {
      this.data = this.flat(JSON.parse(JSON.stringify(data)))
      this.treeData = this.data.slice(0, 50)
      console.log(this.data)
    },
    flat (data) {
      const res = []
      while (data.length) {
        const cur = data.shift()
        res.push(cur)
        if (Array.isArray(cur.children)) {
          data.unshift(...cur.children)
        }
      }
      return res
    }
  }
}
</script>

<style lang="less" scoped>

</style>
