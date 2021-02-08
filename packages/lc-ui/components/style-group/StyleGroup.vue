<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(style-group)

</style>
<template>
  <div :className='classNmaes.styleGrup'>
    show me
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  watch,
  computed
} from 'vue'

import componentName from '../_utils/componentName'
import className from "../_utils/className"

export default defineComponent({
  name: componentName('style-group'),
  props:{},
  setup(){
    const classNmaes = ref({
      styleGrup: className('style-group'),
    })
    
    return {
      classNmaes
    }
  }
})
  
</script>