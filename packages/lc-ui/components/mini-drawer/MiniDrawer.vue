<style lang='stylus' scoped>
@import '../_assets/stylus/reset.stylus'
@import '../_assets/stylus/variable.stylus'
@import '../_assets/stylus/tools.stylus'

$cmp = prefixCls(mini-drawer)

.{$cmp}{
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box

  width 100%
  
  &-container{
    overflowX hidden
    flex 1 1
    position relative
  }

  &-pref{
    
  }

  &-next{

  }

  &-switch{ 
    $size = 32px
    flex 0 0 auto
    display flex
    justify-content center
    align-items center

    width $size
    height $size
    border-radius $radius_sm
    background $lightBlue_2
    color $color_black_1

    transition background .3s
    cursor pointer

    .icon{
      height 18px
      transition transform .3s
    }

    &__active{
      background $lightBlue
      .icon{
        transform rotate(180deg)
      }
    }
  }

  &__disabled{
    .{$cmp}-switch{
      background $color_grey_1
      cursor not-allowed 
    }
  }
}



</style>
<template>
  <div :class='classNames.drawer'>
    <div :class='classNames.container'>
      <div v-if='drawerStatus' :class='classNames.pref'>
        <slot name='pref' :status='{ disabled, drawerStatus }'></slot> 
      </div>
      <div v-else :class='classNames.next'>
        <slot name='next' :status='{ disabled, drawerStatus }'></slot>
      </div>
    </div>

    <div :class='classNames.switch' @click.stop='() => { !disabled && onSwitch() }'>
      <CaretLeftOutlined class='icon' />
    </div>
    
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  computed,
  watch
} from 'vue'
import {
  CaretLeftOutlined
} from '@ant-design/icons-vue'
import { useBool } from 'vx-hooks'

import componentName from '../_utils/componentName'
import className from "../_utils/className"


export default defineComponent({
  name: componentName('mini-drawer'),
  components: {
    CaretLeftOutlined
  },
  props: {
    initStatus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx){

    const { state: drawerStatus, toggle } = useBool(props.initStatus)
    
    const classNames = ref({
      drawer: computed(() => className({
        'mini-drawer': true,
        'mini-drawer__disabled': props.disabled
      })),
      container: className('mini-drawer-container'),
      pref: className('mini-drawer-pref'),
      next: className('mini-drawer-next'),
      switch: computed(() => {
        return className({
          'mini-drawer-switch': true,
          'mini-drawer-switch__active': drawerStatus.value
        })
      }),
    })

    const onSwitch = () => {
      toggle()
      ctx.emit('update:value', drawerStatus.value)
      ctx.emit('change', drawerStatus.value)
    }

    watch(() => props.initStatus, (newVal, oldVal) => {
      if(newVal === oldVal){
        return 
      }
      
      drawerStatus.value = newVal
    })

    return {
      classNames,

      drawerStatus,
      onSwitch
    }
  }
})

</script>