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
        <lc-props-item label='padding'>
          <template #name>
            padding by slot
          </template>
        </lc-props-item>
      </lc-type-dropdown>
      
       <lc-type-dropdown title='ccc'>
      </lc-type-dropdown>
      
    </lc-props-panel>

  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'


export default defineComponent({
  setup(){
    return {}
  }
})
</script>
