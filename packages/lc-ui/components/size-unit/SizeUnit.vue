<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(size-unit)

.{$cmp}{
  color $color_black_3
  
  &-current{
    width 2rem
    text-align center
    background $lightBlue
    border-radius 2px
    height 30px
    line-height 30px
    cursor pointer
  }

  &-item{
    margin auto
    display block
    width 2rem
    text-align center
    background $lightBlue
    border-bottom 1px solid $color_black_3
  }
}

</style>
<template>
<div :class='classNames.unit'>
  <a-dropdown>
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
  ref
} from "vue"

import componentName from '../_utils/componentName'
import className from "../_utils/className"
import { SaSelect } from "../sa-select";
import { unitOptions } from './model'

export default defineComponent({
  name: componentName('size-unit'),
  props: {
    value: {
      type: String,
      default: 'px'
    }
  },
  components: {
    [SaSelect.name]: SaSelect
  },
  setup(__, ctx){
    const classNames = ref({
      unit: className('size-unit'),
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