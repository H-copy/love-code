declare module '*.vue' {
  import type { compile, DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue/dist/vue.esm-bundler'
declare module 'gao-vue-dragable'