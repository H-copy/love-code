<template>
  <a-input v-model:value='valueWarp' v-bind='options'></a-input>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: ['modelValue', 'default', 'options'],
  emits: ['update:modelValue'],
  setup(props, ctx){
    const valueWarp = computed({
      get(){
        return props.modelValue
      },
      set(v: any) { 
        ctx.emit('update:modelValue', v)
      }
    })

    // console.log(valueWarp.value, props)
    // if (valueWarp.value === undefined && props.default !== undefined){
    //   /* eslint-disable-next-line vue/no-setup-props-destructure */
    //   valueWarp.value = props.default
    // }
    
    return {
      valueWarp
    }
  }
})
</script>
