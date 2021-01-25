<style lang='stylus' scoped>
.prop-panel{
  padding 10px
}
.prop{
  &-group{
    &-title{
      border-bottom 1px  solid #eee
      font-size 18
    }
  }
  
  &-item{
    &-label{
      font-size 14px
    }
    margin-top 8px
  }
}

</style>
<template>
  <div>
  <div class='prop-panel' v-if='propsConf'>
    <div class='prop-group' v-for='(group, key) of propsConf' :key='key'>
      <h1 class='prop-group-title'> {{ group.title }} </h1>
      <div class='prop-item' v-for='p of group.props' :key='p.name'>
        <h2 class='prop-item-label'> {{ p.label }} </h2>
        <component
        :is='p.component' 
        :default='p.default'
        :modelValue='getProp(p)'
        @update:modelValue='d => setProp(d, p)'
        >
        </component>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Prop } from '@love-code/compile'
import * as creator from '../creator' 
import * as assert from '../utils/assert'

export default defineComponent({
  setup(){
    const store = useStore()
    const currentCmp = computed(() => {
      return store.state.active 
    })
    
    const currentProps = computed(() => store.getters.currentProp)

    const propsConf = computed(() => {
      if (currentCmp.value){
        return store.state.s_props.propsList[currentCmp.value.name] || null
      }
      return null
    })

    
    const getProp = (p: Prop): Prop => {
      // 当属性为空时，初始化属性对象
      if (assert.isUndefined(currentProps.value[p.name])){
        currentCmp.value.props = {
          ...currentProps.value,
          [p.name]: creator.propCreator({
            type: p.createType,
            name: p.name,
            value: p.default
          })
        } 
      } 
      return currentProps.value[p.name].value
    }
    
    const setProp = (d: any, p: Prop) => {
      currentCmp.value.props[p.name].value = d
    }

    return {
      propsConf,
      currentProps,
      currentCmp,
      
      getProp,
      setProp
    }
  }
})
</script>
