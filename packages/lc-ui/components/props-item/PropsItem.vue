<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(props-item)

.{$cmp}{
  & + &{
    margin-top $margin_sm
  }
  
  .{$cmp}-label{
    display flex
    align-items center
  }

  &.vertical{
    .{$cmp}-label{
      display block
      margin-bottom $margin_sm
    }
  }

  &.horizontal{
    display flex
    justify-content space-between
    align-items stretch

    .{$cmp}-label{
      margin-right $margin_sm
    }

    & + &{
      margin-bottom $margin_sm
    }
  }
}

</style>
<template>
  <div :class='classNames.item'>
    <label v-if='label' :class='classNames.label' :style='labelWidthStyleProxy'>
      {{ label }}
    </label>
    <slot name='label'></slot>
    <slot name='default'></slot>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  PropType,
  ref,
  computed
} from "vue"
import { assert } from 'vx-tools'

import componentName from '../_utils/componentName'
import className from "../_utils/className"


type LayoutType = 'horizontal' | 'vertical'

export default defineComponent({
  name: componentName('props-item'),
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String as PropType<string | number | undefined>
    },
    layoutType: {
      type: String as PropType<LayoutType>,
      default: 'horizontal'
    }
  },
  setup(props){
    const classNames = ref({
      item: [className('props-item'), props.layoutType],
      label: className('props-item-label')
    })

    const labelWidthStyleProxy = computed(() => {

      if(assert.isNumber(props.labelWidth)){
        return { flex: '0 0 auto', width: `${props.labelWidth}px` }
      }

      if(assert.isString(props.labelWidth)){
        return { flex: '0 0 auto', width: props.labelWidth }   
      }

      return {}
    })
    
    return {
      classNames,
      labelWidthStyleProxy
    }
  }
})
</script>