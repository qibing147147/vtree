<template>
  <div>
    <div v-for="item in data" :key="item.id">
      <div>
        {{item.id}}
      </div>
      <div v-if="item.children">
        <tree :data="item.children"></tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
