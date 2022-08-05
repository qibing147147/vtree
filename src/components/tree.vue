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
let now = null
let i = 1
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

    worker.onmessage = (e) => {
      if (typeof e.data === 'string') {
        this.data = JSON.parse(e.data)
      } else {
        this.data = JSON.parse(e.data.data)
        console.log('onmessage', Date.now() - now)
        console.log('onmessage startIndex', e.data.startIndex)
        console.log('onmessage i', i)
        i += 1
      }
      this.treeData = this.data
    }
  },
  methods: {
    setData () {
      worker.postMessage({
        type: 'init'
      })
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
      e.preventDefault()
      const startIndex = Math.floor(e.target.scrollTop / 25)
      console.log('startIndex', startIndex)
      if (now) {
        console.log('scroll', Date.now() - now)
      }
      console.log('scroll i', i)
      now = Date.now()
      worker.postMessage({
        startIndex
      })
      this.scrollTop = e.target.scrollTop
      // this.treeData = this.data.slice(startIndex, startIndex + 50)
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
  height: 25000000px;
}

.item {
  height: 25px;
  line-height: 25px;
}
</style>
