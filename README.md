# love-code
vue low-code tool


## 安装
``` shell

// 全局安装 lerna 
yarn global lerna 

// 安装依赖
lerna bootstrap

```
## 命令
``` shell
// compile 打包
lerna run build:compile

// compile 文档
lerna run doc:compile

// font 开发
lerna run serve:font

// lc-ui 打包
lerna run build:lc-ui

// lc-ui 开发
lerna run serve:lc-ui

```


## 目录
- packages/ 
  - compile/ 节点编译
  - lc-ui/ 组件库
  - font/ 编辑器

## 功能

1. 画布
  - [] 拖拽
  
2. 组件树
  - [] 拖拽排版
  - [] 删除
  - [] 复制
  - [] 
  
3. 属性编辑器
  - [] 盒模型
  
4. 渲染器
  - [x] 
  
5. 代码生成器
  - [x] vue 模板
  - [x] vue 逻辑包装

6. 组件解析器
  - [] vue 组件属性解析




## 参考
- [lerna](https://lernajs.bootcss.com/)
