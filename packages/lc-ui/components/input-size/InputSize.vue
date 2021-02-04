<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(input-size)

.{$cmp}{
  display flex
  justify-content space-between
  align-items center
}

</style>
<template>
  <div :class='classNames.size'>
    <lc-input-number v-model:value='size' :class='classNames.number'></lc-input-number>
    <lc-size-unit v-model:value='unit' :class='classNames.unit'></lc-size-unit>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
} from 'vue'

import componentName from '../_utils/componentName'
import className from "../_utils/className"
import { InputNumber } from '../input-number'
import { SizeUnit, unitOptions } from '../size-unit'

export default defineComponent({
  name: componentName('input-size'),
  components: {
    [InputNumber.name]: InputNumber,
    [SizeUnit.name]: SizeUnit
  },
  setup(props, ctx){
    const classNames = ref({
      size: className('input-size'),
      nubmer: className('input-size-nubmer'),
      unit: className('input-size-unit'),
    })

    const size = ref(0)
    const unit = ref('px')
    
    const update = () => {
      ctx.emit('update:value', `${size.value}${unit.value}`)
    }

    const parse = (d: string) => {
      console.log(unitOptions)
    }
    
    return {
      classNames,

      size,
      unit
    }
  }
})

</script>