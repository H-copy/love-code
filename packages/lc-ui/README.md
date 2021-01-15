# zz-ui
## Summary
基于 antd-vue 的ui库


## cli
```javascript


// 开发
yarn serve

// 打包
yarn build

// 提取ts类型定义
yarn types

// 组件打包
yarn lib


```

## Use

```javascript

// 全局安装

// main.js
import '@micro/zz-ui/lib/zz-ui.css'
import zzUi from '@micro/zz-ui'
app.use(zzUi)

<template>
  <zz-form></zz-form>
</template>



// 局部使用
import { Form } from '@micro/zz-ui'

export default = {
  components: {
    Form
  }
}

<template>
  <Form></Form>
</template>

```


## Components

- [Form](./components/Form/README.md) 表单容器
- [Select](./components/Select/README.md) 选择器
- [TableBtns](./components/Table-btns/README.md) 表格内嵌按钮
- [Checkbox](./components/Checkbox/README.md) 复选框
- [Dynamic-select](./components/Dynamic-select//README.md) 动态下拉框
- [Form-btns](./components/Form-btns/README.md) 表单提交按钮
- [Radio](./components/Radio/README.md) 单选
- [DateAndTime](./components/DateAndTime/README.md) 日期-时间


## Business components
- [Community-select](./components/Community-select//README.md) 小区下拉选择器
- [tips-model](./components/tips-model/README.md) 信息提示窗
- [searchbar-btns](./components/searchbar-btns/README.md) 搜索条按钮

