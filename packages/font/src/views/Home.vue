<style lang='stylus' scoped>
.love-code{
  // display flex;
  // justify-content center;
  // text-align center;
}
</style>
<template>
  <div class="love-code">
    <!-- <VHN :node='Root' /> -->
    <HtmlTag :root='Root' />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import VHN from '../components/VHN.vue'
import { Root } from './model'
import HtmlTag from '../components/html-tag'

export default defineComponent({
  components: {
    // VHN,
    HtmlTag
  },
  setup() {
    return {
      Root
    }
  }
})
</script>
