<style lang='stylus' scoped>
.control-box{
  position relative
  display inline-block

  &-shade{
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    
    border 1px solid transparent
    transition all .3s
    z-index 1

    &.ative{
      border-color: orange
    }

    &:hover{
      .cbs-header{
        opacity 1
      }
    }
  }
  
}

.cbs{
  $headerH = 30px
  &-header{
    opacity 0
    display flex
    justify-content space-between
    align-items center
    position absolute
    box-sizing border-box
    padding: 6px 8px
    top $headerH * -1 
    left 0
    right 0
    margin auto
    height $headerH
    background #aaa
    transition all .3s
    &-title{
      font-size 12px
    }
  }
}

</style>
<template>
  <div class='control-box'>
    <!-- :class='{ active: overing }' -->
    <!-- @mouseover.stop.prevent='onMouseover' -->
    <!-- @mouseleave.stop.prevent='onMouseleave' -->
    <div class='control-box-shade'
    v-on='dragEvents'
    @click='onActive'
    @blur='onUnAtive'
    >
      <div class='cbs-header'>
        <h1 class='cbs-header-title'> {{ current.name }} </h1>
        <div class='cbs-header-tools'>
          <a-button size='small' @click.stop.prevent='onRemove'> close </a-button>
        </div>
      </div>
    </div>
      
    <div class='baby-sitter-container'>
      <slot></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import { useDragArea, useBool } from '../../hooks'
import * as creator from '../../creator'


export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props){
    const store = useStore()
    const current = computed(() => {
      return props.id ? (store.state.nodes[props.id] || {}) : {}
    })

    const onDrag = {
      onDom(d: any){
        if (!d.id){
          const _c = store.state.s_components.cmpList[d.key]()
          const _n = creator.tagCreator(_c, current.value.id)
          store.commit('pushNewTag', _n)
          current.value.children = current.value.children ? [
            ...current.value.children,
            _n
          ] : [_n]
        }
      }
    }

    const { dragEvents } = useDragArea(onDrag)

    const { state: overing, setTrue: over, setFalse: leave } = useBool()
    const onMouseover = over
    const onMouseleave = leave
    
    const onRemove = () => {
      store.commit('removeTag', current.value)
    }

    const onActive = () => {
      store.commit('setActive', current.value)
      console.log(store.state.active)
    }

    const onUnAtive = () => {
      store.commit('cleanActive')
    }


    return {
      current,
      dragEvents,

      onMouseover,
      onMouseleave,

      overing,
      onRemove,

      onActive,
      onUnAtive,
    }
  }
})
</script>
