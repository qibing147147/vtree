<template>
  <div class="scroller" @scroll="handleScroll">
    <div class="container" :style="{ paddingTop: `${scrollTop}px` }">
      <div v-for="item in treeData" :key="item.id" class="item" :style="{paddingLeft: item.level * 20 + 'px'}">
        {{ item.id }}
      </div>
    </div>
  </div>
</template>

<script>

const worker = new Worker('worker.js')
export default {
  name: 'tree',
  data () {
    return {
      treeData: [],
      scrollTop: 0
    }
  },
  created () {
    this.data = []
  },
  methods: {
    setData (data) {
      const start = performance.now()
      console.log(1, performance.now())
      worker.postMessage({
        type: 'init',
        data: JSON.stringify(data)
      })
      worker.onmessage = (e) => {
        console.log(4, Date.now())
        console.log(5, performance.now())
        this.data = JSON.parse(e.data)
        this.treeData = this.data
        const end = performance.now()
        console.log(6, performance.now())
        console.log(end - start)
      }
    },
    flat (data, level = 1) {
      const res = []
      const len = data.length

      for (let i = 0; i < len; i++) {
        const cur = data[i]
        res.push({
          ...cur,
          level
        })
        if (cur.children) {
          res.push(...this.flat(cur.children, level + 1))
        }
      }
      return res
    },
    handleScroll (e) {
      const startIndex = Math.floor(e.target.scrollTop / 25)
      this.scrollTop = e.target.scrollTop
      this.treeData = this.data.slice(startIndex, startIndex + 50)
    }
  }
}
</script>

<style lang="less" scoped>
.scroller {
  height: 100%;
  overflow: auto;
}

.container {
  height: 25025250px;
}

.item {
  height: 25px;
  line-height: 25px;
}
</style>
