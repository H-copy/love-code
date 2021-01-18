<style lang='stylus' scoped>
.love-code{
  box-sizing border-box
  width  100vw
  height 100vh
  position relative
  display grid
  grid-template-columns 200px auto 200px
  grid-template-rows 100%
  background #171A21
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
  }
}

</style>
<template>
  <div class="love-code">
   
    <div class='lc-left'>
      <CmpPanel @select='onSelect' />
    </div>
    <div class='lc-content'>
      <BabySitter>
        <Render :root='root' />
        <Dragable :data="cmpSize" @update='moveBlockUpdate'>
          <div class='box' :style='style'></div>
        </Dragable>
      </BabySitter>
    </div>
    <div class='lc-right'>
      <PropPanel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import {
  Node,
  baseTagNode,
  baseTextNode,
  baseNativeProp,
  vTagNode
} from '@love-code/complie'
import { MoveBlock, Dragable } from '../components/dragable'
import { BabySitter } from '../components/baby-sitter'
import CmpPanel from './cmp-panel.vue'
import { Cmp } from '../types'
import PropPanel from './prop-panel.vue'
import { Render } from '../components/render'

export default defineComponent({
  components: {
    CmpPanel,
    PropPanel,
    Dragable,
    BabySitter,
    Render
  },
  setup() {
    const store = useStore()
    const pushNewNode = (n: Node) => {
      store.commit('pushNewNode', n)
    }
    
    const root = ref<Node>(baseTagNode('div', [
      baseNativeProp('style', 'color:#fff')
    ], baseTextNode('show me')))
    const cmpSize = ref({
      width: 200,
      height: 200
    })
    const style = computed(() => {
      const { width, height } = cmpSize.value
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    })
  
    const moveBlockUpdate = (d: MoveBlock) => {
      cmpSize.value = {
        width: d.width,
        height: d.height
      }
    }

    const onSelect = (d: {key: string, cmp: Cmp}) => {
      const _n = vTagNode(d.cmp.component, [], baseTextNode('clic me'))
      const _root = root.value
      _root.children = _root.children ? [..._root.children, _n] : [_n]
      console.log(_root)
      setTimeout(() => {
        console.log('change')
        _n.props = [
          baseNativeProp('type', 'primary')
        ]
        console.log('change', _n)
      }, 1000);
    }

    pushNewNode(root.value)

    
    return {
      cmpSize,
      style,
      moveBlockUpdate,
      root,

      onSelect
    }
  }
})
</script>
