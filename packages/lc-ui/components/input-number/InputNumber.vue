<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(input-number)

.{$cmp}{

  &-input{
    width 100%
  }
  
}

</style>
<template>
  <div :class='classNames.inputSize' @mousewheel='onMousewheel'>
    {{ atters }}
    <a-input-number
    v-bind='$attrs'
    v-on='$listener'
    @focus.stop='onFocus' 
    @blur.stop='onBlur'
    v-model:value='valueProxy'
    :class='classNames.input' >
    </a-input-number>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  watch,
  computed
} from 'vue'

import componentName from '../_utils/componentName'
import className from "../_utils/className"
import useMousewheel from '../_hooks/useMousewheel'

export default defineComponent({
  name: componentName('input-number'),
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  setup(props, ctx){
    const classNames = ref({
      number: className('input-number'),
      input: className('input-number-input')
    })

    const valueProxy = computed<number>({
      get(){
        return props.value
      },
      set(d: number){
        ctx.emit('update:value', d)
      }
    })

    const {
      isUp,
      canUse,
      unUse,
      wheelEvent,
      onMousewheel
    } = useMousewheel()

    watch(wheelEvent, () =>  {
      isUp.value ? valueProxy.value -= props.step : valueProxy.value += props.step
    })
    
    const onFocus = canUse
    const onBlur = unUse

    return {
      classNames,

      onMousewheel,
      onBlur,
      onFocus,

      valueProxy
    }
  }
})
</script>