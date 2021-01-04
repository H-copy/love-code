<template>
  <div class="love-code">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  createTagNode,
  createTextNode,
  createDynamicProp,
  html
} from '@love-code/complie'

const root = createTagNode(
  'div',
  createDynamicProp(
    'style',
    {
      color: 'orange',
      fontSize: '14px'
    }
  ),
  createTextNode('show me')
)

console.log('>>>', root, html.parse(root))

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
