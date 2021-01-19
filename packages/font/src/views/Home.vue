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
        <Render v-if='root' :node='root' :globalCtx='globalCtx' :localCtx='localCtx' />
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
import {
  defineComponent,
  computed,
  ref,
  watch
} from 'vue'
import { useStore } from 'vuex'
import * as compile from '@love-code/compile'
import prettify from 'html-prettify'
import { Button } from 'ant-design-vue'
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
    
    const globalCtx = ref({})
    const localCtx = ref({})
    
    const root = ref<compile.Tag>(
      compile.nativeTag(
        'div',
        compile.nativeProp('style', 'color: orange'),
        [
          
          compile.nativeTag(
            Dragable,
            [],
            'show me',
          ),

          compile.nativeTag(
            Dragable,
            [],
            [
              compile.nativeTag(
                Button,
                [
                  compile.vEventProp('onClick', 'submit'),
                  compile.nativeProp('type', 'primary')
                ],
                'click me'
              )
            ]
          ),

         
        ]
      )
    )

    return {
      cmpSize,
      style,
      moveBlockUpdate,

      root,
      globalCtx,
      localCtx
    }
  }
})
</script>
