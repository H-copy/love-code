import { VTextNode, MixVProp, BaseProp, isVDynamiceProp } from '@love-code/complie'
import { defineComponent, reactive } from 'vue'

function getJsxProp(p: MixVProp[], globalCtx: any, localCtx: any) {

  const props: any = {}
  console.log('>>>', localCtx)

  for (let i = p.length; i < p.length; i++) {

    const current = p[i]

    if (current instanceof BaseProp) {
      props[current.name] = current.value
    }

    if (isVDynamiceProp(current)) {
      props[current.name] = globalCtx[current.value]
    }

  }


  return
}





function render(n: any, globalCtx: any, localCtx: any = {}) {
  const _localCtx = reactive({ ...localCtx })
  const Cmp = n.component || n.tag
  const children = n.children ? n.children.map((child: any) => render(child, globalCtx)) : []
  const props = n.props ? getJsxProp(n.props, globalCtx, _localCtx) : {}
  if (n.type === '__TEXT') {
    return <> {n instanceof VTextNode ? globalCtx[n.tag] : n.tag} </>
  }

  return <Cmp {...props}> {children} </Cmp>
}

export default defineComponent({
  props: ['root'],
  setup(props) {
    const globalCtx = reactive({
      userName: 'init'
    })
    setTimeout(() => {
      console.log('change')
      globalCtx.userName = 'new name'
      const p = props.root.children
      p.push(props.root.children[0])
    }, 1000)
    return () => render(props.root, globalCtx)
  }
})
