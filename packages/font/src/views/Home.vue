<template>
  <div class="love-code">
    <component :is='cp'></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { T, createCmp } from './T'

export default defineComponent({
  setup() {
    const cp = ref<any>(T)
    setTimeout(() => {
      cp.value = createCmp()
    }, 1000);
    return {
      cp
    }
  }
})
</script>
