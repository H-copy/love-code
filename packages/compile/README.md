# love-code/complie
标签对象生成函数, 根据不同的标签类型生成不同的标签对象，
提供转换方法，例如 生成对应标签字符

## 使用
```js

// 生成一般标签对象
// 对应模板 <div></div>
nativeTag('div')

// 带属性标签
// 对应模板 <div id='box'></div>
nativeTag('div', nativeProp('id', 'box'))

// 标签嵌套
// 对应模板 <div id='box'> <h1> title </h1> </div>
nativeTag(
  'div', 
  nativeProp('id', 'box'),
  nativeTag('h1', {}, textTag('title'))
)

// vue 指令

// 对应模板 <input v-model='username'>
nativeTag('input', vModelProp('username'))

// 对应模板 <button v-on:click='onClick'></button>
nativeTag('button', vEventProp('click', 'onClick'))

```

## 命令
```shell

dev  // 开发
build // 生成包
test // 测试

```

## 目录
- `./src/tag` 标签
  - `/pro.ts` 标签生成器
  - `/stringify.ts` 标签模板生成器
- `./src/prop` 属性
  - `/pro.ts` 属性生成器
  - `/stringify.ts` 属性模板生成器
