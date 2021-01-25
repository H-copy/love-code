import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Prop } from '@love-code/compile'
import * as PropsPanel from '../props-panel'
import './prop-panel.stylus'

export default defineComponent({

  setup(){
    const store = useStore()
    // 当前编辑组件
    const currentCmp = computed(() => {
      return store.state.active 
    })
    
    // 当前组件属性配置
    const currentProps = computed(() => {
      const _p = store.getters.currentProp
      return _p ? _p.reduce((acc: { [k: string]: Prop }, next: Prop) => {
        return { ...acc, [next.name]: next.value }
      }, {}) : null
    })

    // 面板配置属性列表转为对象
    const propsConf = computed<PropsPanel.PropGroup>(() => {
      if (currentCmp.value){
        return store.state.s_props.propsList[currentCmp.value.name] || null
      }
      return null
    })
    
    return () => {
      if (!currentProps.value || !propsConf.value){
        return null
      }

      const _props = Object.entries(propsConf.value).map(([key, group]) => {
        const items = Object.entries(group.props).map(([k, p]) => {
          const _options = p.options || {}
          return (
            <div class='prop-item' key={ k }>
              <h2 class='prop-item-label'> { p.label } </h2>
              <p.component 
                { ...{ value: currentCmp.value[p.key] || p.default, ..._options } } 
                onInput={ (d: any) => { currentCmp.value[p.key] = d.target.value } }>
              </p.component>
            </div>
          )
        })

        return (
          <div class='prop-group' key={key}>
            <h1 class='prop-group-title'> { group.title } </h1>
            { items }
          </div>
        )
      })
      
      return <div class='prop-panel'> { _props } </div>
    }
  }
})
