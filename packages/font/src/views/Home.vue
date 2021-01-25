<style lang='stylus' scoped>
.love-code{
  box-sizing border-box
  width  100vw
  height 100vh
  position relative
  display grid
  grid-template-columns 200px auto 200px
  grid-template-rows 100%
  // background #171A21
}
.box{
  box-size border-box
  width 200px
  height 200px
  border 1px solid #eee
}

.lc{
  &-left{
    background #eee
  }
  &-right{
    background orange
  }
  &-content{
    position relative
    padding 40px;
  }
}

.drag{
  &-area{
    $size = 600px
    margin: 10px;
    width $size
    height $size
    background #eee
  }
  &-move{
   $size = 40px
   width $size
   height $size
   background orange
  }
}

</style>
<template>
  <div class="love-code">
    <div class='lc-left'>
      <CmpPanel @select='onSelect' />
    </div>
    <div class='lc-content' v-on='dragEvents'>
      <Render v-if='root' :node='root' :globalCtx='globalCtx' :localCtx='localCtx' />
      <div>
        {{ strinify(root) }}
      </div>
      <!-- <BabySitter>
        <Move :data="cmpSize" @update='moveBlockUpdate'>
          <div class='box' :style='style'></div>
        </Move>
      </BabySitter> -->

    </div>
    <div class='lc-right'>
      <PropPanel />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  onMounted,
} from 'vue'
import { useStore } from 'vuex'
import * as compile from '@love-code/compile'
import prettify from 'html-prettify'
import { Button, Input } from 'ant-design-vue'
import CmpPanel from './cmp-panel.vue'
import PropPanel from './prop-panel.vue'
import { Render } from '../components/render'
import { useDragArea } from '../hooks'
import * as creator from '../creator'


export default defineComponent({
  components: {
    CmpPanel,
    PropPanel,
    Render,
  },
  setup() {
    const globalCtx = ref({})
    const localCtx = ref({})
    const store = useStore()

    const root = ref(
      creator.tagCreator({
        component: 'div',
        name: 'div',
        type: 'nativeTag',
        props: [
          {
            type: 'vDynamiceProp',
            name: 'style',
            value: {
              margin: 'auto',
              width: '800px',
              height: '800px',
              background: '#eee'
            }
          }
        ]
      })
    )

    store.commit('pushNewTag', root.value)

    const onDrag = {
      onDom(d: any){
        if (!d.id){
          const _c = store.state.s_components.cmpList[d.key]()
          const _n = creator.tagCreator(_c, root.value.id)
          store.commit('pushNewTag', _n)
          root.value.children = root.value.children ? [
            ...root.value.children,
            _n
          ] : [_n]
        }
      }
    }
    const { dragEvents } = useDragArea(onDrag)

    return {
      root,
      globalCtx,
      localCtx,

      dragEvents,
      strinify: compile.tagtoString
    }
  }
})
</script>
