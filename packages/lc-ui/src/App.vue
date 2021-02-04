<style lang="stylus" scoped>
.editor{
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  margin auto
  box-size border-box
  
  display flex
  justify-content space-between
  align-items stretch
}


</style>
<template>
  <div class="editor">

    <div class='cmp-panel'>

    </div>
    
    <div class='box'>

    </div>
    
    <lc-props-panel>
      
      <lc-type-dropdown title='style'>
        show me
      </lc-type-dropdown>
      
      <lc-type-dropdown title='options'>

        <lc-props-item label='padding' layoutType='vertical'>
          <a-input></a-input>
        </lc-props-item>

        <lc-props-item label='padding' layoutType='vertical'>
          <a-input></a-input>
        </lc-props-item>
        
      </lc-type-dropdown>
      
      <lc-type-dropdown title='props'>

        <lc-props-item label='number' layoutType='vertical'>
          <lc-input-number v-model:value='n'></lc-input-number>
        </lc-props-item>

        <lc-props-item label='size' layoutType='vertical'>
          <lc-input-size></lc-input-size>
        </lc-props-item>

        <lc-props-item label='unit' layoutType='vertical'>
          <lc-size-unit v-model:value='unit'></lc-size-unit>
        </lc-props-item>

      </lc-type-dropdown>
      
    </lc-props-panel>

  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'


export default defineComponent({
  setup(){
    const n = ref(10)
    const unit = ref('px')
    return {
      n,
      unit
    }
  }
})
</script>
