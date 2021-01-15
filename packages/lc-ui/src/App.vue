<style lang="stylus" scoped>
.container{
  width: 500px;
  margin: auto;
}
</style>
<template>
  <div class="container">
    {{ formData }}

    
    <zz-form
    :label-col='{ span: 6 }' 
    :wrapper-col='{ span: 18 }' 
    :formData='formData'
    :items='conf'
    ></zz-form>

    <zz-searchbar-btns></zz-searchbar-btns>

    <zz-tips-model :countDown='10' title="title">
      content
    </zz-tips-model>

    <zz-date-and-time v-model:value="formData.time">
    </zz-date-and-time>

  </div>
  
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Input } from 'ant-design-vue'
import { 
  Select, 
  TableBtns, 
  FormBtns, 
  DynamicSelect, 
  CommunitySelect,
  Checkbox,
  SearchbarBtns,
  DateAndTime
} from '../components'

const conf = [
  {
    label: 'community',
    cmp: {
      name: CommunitySelect,
      prop: 'community'
    }
  },
  {
    label: 'x',
    cmp: {
      name: Checkbox,
      prop: 'Checkbox',
      type: 'GROUP',
      _options:[
        {
          label: 'x',
          value: 0
        },
        {
          label: 'y',
          value: 1
        }       
      ]
    }
  },
  {
    label: 'name',
    cmp: {
      name: Input,
      prop: 'name'
    }
  },
  {
    label: 'sex',
    cmp: {
      name: Select,
      options: [
        {
          label:'01',
          value: 1
        },
        {
          label: '02',
          value: 2
        }
      ],
      prop: 'sex'
    }
  },
  {
    label: 'age',
    cmp: {
      name: Input,
      prop: 'age'
    }
  },
  {
    label: 'date-and-time',
    cmp: {
      name: DateAndTime,
      prop: 'time'
    }
  },
  {
    label: 'tab-btn',
    cmp: {
      name: TableBtns,
      prop: '',
      items: [
        { 
          _type: 'button',
          _label: 'submit',
          onClick(){ console.log('submit') }
        }
      ],
    }
  },
  {
    label: 'form-btn',
    cmp: {
      name: FormBtns,
      prop: '',
      okText: '好的',
      cancelText: '不好',
    }
  },
  {
    label: 'DynamicSelect',
    cmp: {
      name: DynamicSelect,
      prop: 'dynamicSelect',
      cacheKey: 'dd',
      API: async () => {
        return {
          _options: [
            {
              label: 'x01',
              value: 'x01',
              key: 1
            },
            {
              label: 'x02',
              value: 'x02',
              key: 2
            }
          ]
        }
      }
    }
  },
  {
    label: 'SearchbarBtns',
    cmp: {
      name: SearchbarBtns,
      props: '',
      onSearch:(formData:any) => console.log('search', formData),
      onReset:(formData:any) => console.log('reaset', formData),
    }
  }
]


export default defineComponent({
  setup(){
    const formData = ref({
      time: '2019-10-10 10:57:04'
    })
  
    return {
      formData,
      conf
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
