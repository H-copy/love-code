<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(type-dropdown)
  
.{$cmp}{

  &-header{
    display flex
    justify-content space-between
    align-items center
    padding $padding_sm
    background $lightYellow
    cursor pointer
    user-select none
    
    .title{
      font-size $fontSize_subHead
    }
    .icon-arr_down{
      transition all .3s
      &.active{
        transform rotate(-180deg)
      }
    }
  }

  &-container{
    overflow hidden
    box-sizing border-box
    border-bottom 1px solid $color_border_df
    font-size $fontSize_text
    color $color_font_text
    height 0
    padding 0
    
    &.active{
      padding $padding_df
      height auto
    }
  }
}

</style>
<template>
<div :class='classNames["dropdown"]'>
  <div :class='classNames["header"]' @click.stop.prevent='() => optionsSwitch()'>
    <h1 class='title'> {{ title }} </h1>
    <span class='icon-arr_down' :class='{active: optionsVisibal}'>
      <CaretUpOutlined />
    </span>
  </div>
  <div :class='classNames["container"]'>
    <slot></slot>
  </div>

</div>
</template>
<script lang='ts'>
import { defineComponent, ref, computed } from "vue"
import { CaretUpOutlined } from '@ant-design/icons-vue'
import { useBool } from 'vx-hooks'

import componentName from '../_utils/componentName'
import className from "../_utils/className"


export default defineComponent({
  name: componentName('type-dropdown'),
  components: {
    CaretUpOutlined
  },
  props:{
    title: {
      type: String,
      default: ''
    },
    initStatus: {
      type: Boolean,
      default: true
    }
  },
  setup(props){
   
    const {
      state: optionsVisibal,
      toggle: optionsSwitch,
    } = useBool(props.initStatus)
    
     const classNames = ref({
      dropdown: className('type-dropdown'),
      header: className('type-dropdown-header'),
      container: computed(() => {
        return {
          [className('type-dropdown-container') as string]: true,
          active: optionsVisibal.value
        }
      }),
    })

    return {
      classNames,

      optionsVisibal,
      optionsSwitch
    }
  }
  
})
</script>