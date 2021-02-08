<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(size-unit)

.{$cmp}{
  color $color_black_3
  
  $size = 30px
  &-current{
    width $size
    text-align center
    background $lightBlue
    border-radius 2px
    height $size
    line-height $size
    cursor pointer
  }

  &-item{
    margin auto
    display block
    width $size
    text-align center
    background $lightBlue
    border-bottom 1px solid $color_black_3
  }

  &__disabled{
    .{$cmp}-current{
      background $color_grey_1
      color $color_black_5
      cursor not-allowed 
    }
  }
  
}



</style>
<template>
<div :class='classNames.unit'>
  <a-dropdown :disabled='disabled'>
    <template #overlay>
      <a-menu @click='onSelect'>
        <a-menu-item v-for='item of unitOptions' :key="item.value">
          <span :class='classNames.item'>
           {{ item.label }}
          </span>
        </a-menu-item>
      </a-menu>
    </template>
    
    <div :class='classNames.current'>
      {{ value }}
    </div>
  </a-dropdown>
</div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  computed
} from "vue"

import componentName from '../_utils/componentName'
import className from "../_utils/className"
import { SaSelect } from "../sa-select";
import { unitOptions } from './model'

export default defineComponent({
  name: componentName('size-unit'),
  components: {
    [SaSelect.name]: SaSelect
  },
  props: {
    value: {
      type: String,
      default: 'px'
    },
    disabled: {
      type: Boolean,
      defautl: false
    }
  },
  setup(props, ctx){
    const classNames = ref({
      unit: computed(() => {
        const c = className('size-unit')
        return className({
          'size-unit': true,
          'size-unit__disabled': props.disabled
        })
      }),
      item: className('size-unit-item'),
      current: className('size-unit-current')
    })
    
    const onSelect = (e: {key: string}) => {
      ctx.emit('update:value', e.key)
    }

    return {
      classNames,
      unitOptions,
      onSelect
    }
  }
})
</script>