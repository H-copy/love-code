<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls('props-panel')

.{$cmp}{
  width 260px
  background $color_bg
}

</style>
<template>
  <div :class='classNames["props-panel"]'>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue"
import componentName from '../_utils/componentName'
import className from "../_utils/className"


export default defineComponent({
  name: componentName('props-panel'),
  setup(){
    const classNames = className([
      'props-panel'
    ])
    
    return {
      classNames
    }
  }
})
</script>