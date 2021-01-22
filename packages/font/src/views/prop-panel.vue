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
  <div class='prop-panel' v-if='currentProps  && propsConf'>
    <div class='prop-group' v-for='(group, key) of propsConf' :key='key'>
      <h1 class='prop-group-title'> {{ group.title }} </h1>
      <div class='prop-item' v-for='p of group.props' :key='p.key'>
        <h2 class='prop-item-label'> {{ p.label }} </h2>
        <component :is='p.component' v-model:value='currentProps[p.key]'>
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

export default defineComponent({
  setup(){
    const store = useStore()
    const currentCmp = computed(() => {
      return store.state.active 
    })
    const currentProps = computed(() => {
      const _p = store.getters.currentProp
      return _p ? _p.reduce((acc: { [k: string]: Prop }, next: Prop) => {
        return { ...acc, [next.name]: next.value }
      }, {}) : null
    })

    const propsConf = computed(() => {
      if (currentCmp.value){
        return store.state.s_props.propsList[currentCmp.value.name] || null
      }
      return null
    })

    return {
      propsConf,
      currentProps,

      currentCmp,
    }
  }
})
</script>
