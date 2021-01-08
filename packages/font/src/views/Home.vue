<style lang='stylus' scoped>
.love-code{
  // display flex;
  // justify-content center;
  // text-align center;
}
</style>
<template>
  <div class="love-code">
    <VHN :node='Root' />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs
} from 'vue'
import {
  baseTagNode,
  baseTextNode,
  baseNativeProp,

  vTagNode,
  vTextNode,
  vModelProp
} from '@love-code/complie'

import {
  Input,
  Button
} from 'ant-design-vue'
import VHN from '../components/VHN.vue'

const Root = baseTagNode('div').addProp(
  baseNativeProp('class', 'container')
)
const UserNameText = vTextNode('userName')
const UserName = vTagNode(Input).addProp(
  baseNativeProp('class', 'user-name'),
  vModelProp('value', 'userName'),
)

const Submit = vTagNode(Button).addProp(
  baseNativeProp('type', 'primary'),
).addChild(
  baseTextNode('click me')
)

Root.addChild(UserNameText, UserName, Submit)

function useCmp(index: number) {
  const context = reactive<any>({})
  const cmp = {
    template: `<div> ${index} ${Root.stringify()} </div>`,
    setup() {
      return {
        context
      }
    }
  }

  return [context, cmp]
}

export default defineComponent({
  components: {
    VHN
  },
  setup() {
    return {
      Root
    }
  }
})
</script>
