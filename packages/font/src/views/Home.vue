<style lang='stylus' scoped>
.love-code{
  padding 20px
  position relative
  // display flex;
  // justify-content center;
  // text-align center;
}
.box{
  width 200px
  height 200px
  border 1px solid #eee
}
</style>
<template>
  <div class="love-code">

    <HtmlTag :root='Root' />
    <Dragable>
      <div class='box'></div>
    </Dragable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import VHN from '../components/VHN.vue'
import { Root } from './model'
import HtmlTag from '../components/html-tag'
import Dragable from '../components/dragable/index.vue'

export default defineComponent({
  components: {
    // VHN,
    HtmlTag,
    Dragable
  },
  setup() {
    return {
      Root,
    }
  }
})
</script>
