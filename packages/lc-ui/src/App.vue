<style lang="stylus" scoped>
.container{
  width: 500px;
  margin: auto;
}
</style>
<template>
  <div class="container">
    {{ formData }}
  </div>
  
  
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'

export default defineComponent({
  setup(){
    const formData = ref({
      time: '2019-10-10 10:57:04'
    })

    watch(formData, () => {
      console.log('change', formData.value)
    })
  
    onMounted(() => {
      formData.value = {
        time: '0000'
      }
    })
  
    return {
      formData,
    }
  }
})
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
