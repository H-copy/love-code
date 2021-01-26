# vue 标签生成器
通过json配置生成对应的标签对象

## 使用 
```js

const c_1 = tagCreator({
  component: 'div',
  type: 'nativeTag',
  name: 'inner',
  props: [{ type: 'nativeProp', name: 'id', value: 'child' }]
})

const c_2 = tagCreator({
  component: 'div',
  type: 'nativeTag',
  name: 'out',
  props: [{ type: 'nativeProp', name: 'id', value: 'parent' }],
})

c_2.children = [ c_1 ]

```

## 标签生成类型
- [x] nativeTag 一般标签 例如：<div></div>
- [x] selfTag 自闭和标签 例如：<hr />
- [x] textTag 文本 例如: content
- [x] dynamiceTag 动态值 例如: {{ content }}

## 属性生成类型
- [x] nativeProp 一般属性 例如： id='box'
- [x] selfProp 单一属性 例如: diabled
- [x] vEventProp v-on 例如: v-on:click='onclick'
- [x] vDynamiceProp v-bind
- [x] vModelProp v-model
- [x] vIfProp v-if
- [ ] vSlotProp v-slot
- [ ] isDynamicFor v-for
- [ ] vRefProp ref


## 方法
- tagCreator 标签生成器 `tagCreator(mod 标签配置, parentId 父标签id)`
- propCreator 属性生成器
- propListCreator 属性列表生成器

