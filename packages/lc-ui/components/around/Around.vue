<template>
  <div :class='classNames.around'>
    <div :calss='classNames.composite'>
    </div>
    <a-row :class='classNames.items' :gutter='10'>
      <a-col :span='12' :class='classNames.item' v-for='item of sides' :key='item'>
        <lc-props-item :label='item' layoutType='vertical'>
          <lc-input-size></lc-input-size>
        </lc-props-item>
      </a-col>
    </a-row>
  </div>
</template>
<script lang='ts'>
import {
  PropType,
  defineComponent,
  ref,
} from 'vue'

import componentName from '../_utils/componentName'
import className from "../_utils/className"

import { AroundSide } from './model'

export default defineComponent({
  name: componentName('around'),
  props: {
    value: {
      type: String
    },
    sides: {
      tpye: Array as PropType<AroundSide[]>,
      default: []
    }
  },
  setup(){
    const classNames = ref({
      around: className('around'),
      composite: className('around-composite'),
      items: className('around-items'),
      item: className('around-item'),
    })

    return {
      classNames
    }
  }
})
</script>