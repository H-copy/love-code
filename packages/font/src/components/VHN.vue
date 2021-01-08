<template>
  <div>
    <component v-if='node.type !== "__TEXT"' :is='node.tag'>
      <VHN v-for='(item, index) of node.children' :node='item' :key='index'></VHN>
    </component>
    <span v-else>
      {{ node.tag }}
    </span>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  watch
} from 'vue'

function create(n) {
  const ctx = reactive({
    userName: 'init'
  })
  const cmp = {
    template: n.stringify(),
    setup() {
      return ctx
    }
  }
  return [ctx, cmp]
}

export default {
  name: 'VHN',
  props: ['node'],
  setup(props) {
    const context = ref({
      usernam: 'init'
    })
    return {
      context
    }
  }
}
</script>
