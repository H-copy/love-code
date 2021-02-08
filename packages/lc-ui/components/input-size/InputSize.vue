<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(input-size)

.{$cmp}{
  display flex
  justify-content space-between
  align-items center

  &-number{
    flex: 1 1
  }
}

</style>
<template>
  <div :class='classNames.size'>
    <div :class='classNames.number'>
      <lc-input-number :disabled='disabled' v-model:value='size' ></lc-input-number>
    </div>
    <lc-size-unit :disabled='disabled' v-model:value='unit' :class='classNames.unit'></lc-size-unit>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  watch
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
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      defautl: false
    }
  },
  setup(props, ctx){
    const classNames = ref({
      size: className('input-size'),
      number: className('input-size-number'),
      unit: className('input-size-unit'),
    })

    const size = ref(0)
    const unit = ref('px')
    
    const update = () => {
      ctx.emit('update:value', `${size.value}${unit.value}`)
    }

    const parse = (d: string) => {
      const unitSetting = unitOptions.find(option => {
        return d.endsWith(option.value)
      })

      if(unitSetting === undefined){
        console.error(`参数值错误,未找到匹配单位 ${d}`)
        return [0, 'px']
      }
      
      const unit = unitSetting.value
      const size = parseFloat(d.replace(unit, '')) || 0
      
      return [size, unit]
    }

    watch(() => props.value, (newVal, oldVal) => {

      if(newVal === oldVal){
        return
      }

      if(newVal === undefined || newVal === '' || newVal === null){
        size.value = 0
        update()
        return
      }
      
      const [_size, _unit] = parse(newVal)
      size.value = _size as number
      unit.value = _unit as string
    }, { immediate: true })

    watch([size, unit], () => {
      update()
    })
    
    return {
      classNames,

      size,
      unit
    }
  }
})

</script>