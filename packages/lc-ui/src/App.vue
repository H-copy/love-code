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
.switch{
  transform rotate(90deg)
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
          <a-input></a-input>
        </lc-props-item>

        <lc-props-item label='padding'>
          <a-input></a-input>
        </lc-props-item>
        
      </lc-type-dropdown>
      
      <lc-type-dropdown title='props'>

        <lc-props-item label='number'>
          <lc-input-number v-model:value='n'></lc-input-number>
        </lc-props-item>

        <lc-props-item label='size' :label-width='60'>
          <lc-input-size v-model:value='curentSize' :disabled='true' ></lc-input-size>
        </lc-props-item>

        <lc-props-item label='unit' layoutType='vertical'>
          <lc-around :sides='["left", "right", "top", "bottom"]'> </lc-around>
        </lc-props-item>

        <lc-props-item label='margin'>
          <lc-mini-drawer>
            <template #pref>
              <lc-select style='width: 100%' type='OPTIONS' :options='options'></lc-select>
            </template>

            <template #next>
              <a-input />
            </template>

          </lc-mini-drawer>
        </lc-props-item>

      

        <!-- <a-row :gutter='10'>
          <a-col :span='12'>
          <lc-props-item label='unit' layoutType='vertical'>
            <lc-input-size v-model:value='curentSize'></lc-input-size>
          </lc-props-item>
          </a-col>
          <a-col :span='12'>
          <lc-props-item label='unit' layoutType='vertical'>
            <lc-input-size v-model:value='curentSize'></lc-input-size>
          </lc-props-item>
          </a-col>
        </a-row> -->

      </lc-type-dropdown>
      
    </lc-props-panel>


  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'

export default defineComponent({
  setup(){
    const n = ref(10)
    const unit = ref('px')
    const curentSize = ref('20px')
    const checked = ref(false)
    const options = [
      {
        label: 'inherit',
        value: 'inherit'
      },
      {
        label: 'initial',
        value: 'initial'
      },
      {
        label: 'unset',
        value: 'unset'
      }
    ]
    
    return {
      n,
      unit,
      curentSize,
      checked,
      options
    }
  }
})
</script>
