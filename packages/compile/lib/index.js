(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['@love-code/compile'] = {}));
}(this, (function (exports) { 'use strict';

  (function (TagType) {
      TagType["NATIVE"] = "__NATIVE";
      TagType["SELF"] = "__SELF";
      TagType["DYNAMIC"] = "__DYNAMIC";
      TagType["TEXT"] = "__TEXT";
  })(exports.TagType || (exports.TagType = {}));
  const IS_TAG = '__TAG';

  const IS_PROP = '__Prop';
  (function (BasePropType) {
      BasePropType["NATIVE"] = "__NATIVE";
      BasePropType["SELF"] = "__SELF";
  })(exports.BasePropType || (exports.BasePropType = {}));
  (function (VPropType) {
      VPropType["FOR"] = "__FOR";
      VPropType["SLOT"] = "__SLOT";
      VPropType["MODEL"] = "__MODEL";
      VPropType["IF"] = "__IF";
      VPropType["EVENT"] = "__EVENT";
      VPropType["DIRECTIVE"] = "__DIRECTIVE";
      VPropType["REF"] = "__REF";
      VPropType["DYNAMIC"] = "__DYNAMIC";
  })(exports.VPropType || (exports.VPropType = {}));
  /**
   * 构建指令属性名
   * @summary 构建通用vue执行
   * 构建目标模式：
   * v-pre
   * v-model='value'
   * v-slot:footer='links'
   * v-on:click.stop='onChange'
   * v-bind:[prop]='value'
   */
  function vDirectiveNameFormatter(d) {
      const { name, arg, modifiers, isDynamic, isSelf } = d;
      if (isSelf) {
          return name;
      }
      const _arg = !arg ? '' : isDynamic ? `:[${arg}]` : `:${arg}`;
      const _modifiers = (modifiers || []).join('.');
      return `${name}${_arg}${_modifiers ? '.' + _modifiers : ''}`;
  }
  /**
   * v-for 指令默认配置
   */
  const DEFAULT_FOR_VALUE = {
      value: '',
      dynamice: '',
      item: 'item',
      index: 'index',
      key: 'index',
  };

  /**
   * async 格式化包装
   * @param { promise } promise 被包装promise
   * @returns { pormise } 包装后的promise
   * @summary 将 aysnce await 错误作为返回值的处理方式
   *
   * @example
   *  asynce load(){
   *
   *      const [ res, err ] = await asyncFormat( api(...) )
   *
   *      if(res === null){
   *        console.log(err)
   *        return
   *      }
   *
   *  }
   */

  /**
   * 获取对象类型字符
   * @param data
   * @returns 类型字符
   */
  function type(data) {
      const type = Object.prototype.toString.call(data);
      return type.replace(/\[object|\]|\s/igm, '').toLocaleLowerCase();
  }
  /**
   * 类型校验
   * @param data
   * @param typeStr
   */
  function isType(data, typeStr) {
      return type(data) === typeStr;
  }
  // 基础类型
  const isString = (data) => type(data) === 'string';
  const isNumber = (data) => type(data) === 'number';
  const isBoolean = (data) => type(data) === 'boolean';
  const isUndefined = (data) => data === undefined;
  const isNull = (data) => data === null;
  const isArray = (data) => type(data) === 'array';
  const isFunction = (data) => type(data) === 'function';
  const isObject = (data) => type(data) === 'object';
  // 特定类型
  const isEventName = (data) => (/^on[A-Z]+[a-z]+$/).test(data);
  const isSlotName = (data) => (/^v-slot(\:{1}[a-zA-Z]+)?$/).test(data);

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    type: type,
    isType: isType,
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isUndefined: isUndefined,
    isNull: isNull,
    isArray: isArray,
    isFunction: isFunction,
    isObject: isObject,
    isEventName: isEventName,
    isSlotName: isSlotName
  });

  /**
   * 创建基础属性对象
   * @param type 属性类型
   * @param name 属性名称
   * @param value 属性值
   * @returns { Prop }
   * @example
   * ``` typescript
   * prop(BasePropType.NATIVE, 'id', 'container')
   * => {
   *    name: 'id',
   *    value: 'container',
   *    type: '__NATIVE',
   *    isProp: '__Prop'
   *  }
   * ```
   */
  function prop(type, name, value) {
      return { name, type, value, isProp: IS_PROP };
  }
  /* 基础 DOM 属性 */
  function nativeProp(name, value) {
      return prop(exports.BasePropType.NATIVE, name, value);
  }
  function selfProp(name) {
      return prop(exports.BasePropType.SELF, name, true);
  }
  /* VUE 指令属性 */
  /**
   * 创建基础指令对象
   * @summary
   * 这里将指令看做一类 vue 标签属性, 通过指令配置生成对应的
   * 属性名称, 例如： { name: 'v-on', arg: 'click', modifiers: ['stop] }
   * => 'v-on:click.stop'
   *
   * @param type 属性类型
   * @param directive 指令配置
   * @param value 属性值
   * @returns { VDirectiveProp }
   * @example
   * ``` typescript
   * vDirective(VPropType.DIRECTIVE, { name: 'h-size', arg: 'full' }, { width: 100, height: 100 })
   * => {
   *    name: 'h-size:full',
   *    value: { width: 100, height: 100 },
   *    type: '__DIRECTIVE',
   *    isProp: '__Prop',
   *    directive: { name: 'h-size', arg: 'full' } // 指令配置缓存, 提供给渲染器生成对应指令
   *  }
   * ```
   */
  function vDirective(type, directive, value) {
      return {
          ...prop(type, vDirectiveNameFormatter({ ...directive }), value),
          directive
      };
  }
  /**
   * 创建基础指令对象
   * @param name 指令配置
   * @param value
   * @returns { VDirectiveProp }
   * @example
   * ``` typescript
   * vDirectiveProp({ name: 'v-on', arg: 'click' }, 'onClick')
   * => {
   *   name: 'v-on:click',
   *   type: '__DIRECTIVE',
   *   value: 'onClick',
   *   isProp: '__Prop',
   *   directive: { name: 'v-on', arg: 'click' }
   * }
   * ```
   */
  function vDirectiveProp(name, value) {
      return vDirective(exports.VPropType.DIRECTIVE, name, value);
  }
  /**
   * 创建事件指令对象
   * @param name 指令对象 | 事件名
   * @param value 挂载属性 | 事件函数
   * @example
   * ``` typescript
   * 1. vEventProp('click', 'onClick')
   * => {
   *    name: 'v-on:click',
   *    type: '__EVENT',
   *    value: 'onClick',
   *    isProp: '__Prop',
   *    directive: { name: 'v-on', arg: 'click' }
   * }
   *
   * 2. vEventProp('click', () => {})
   * => {
   *   value: () => {},
   *   ...
   *  }
   *
   * 3. vEventProp({ arg: 'click', modifiers: ['stop'] }, 'onClick')
   * => {
   *  name: 'v-on:click.stop',
   *  value: 'onClick',
   *  ...
   * }
   * ```
   */
  function vEventProp(name, value) {
      const _directive = index.isString(name) ? { arg: name, name: 'v-on' } : { ...name, name: 'v-on' };
      return vDirective(exports.VPropType.EVENT, _directive, value);
  }
  /**
   * 创建动态绑定指令对象
   * @param name 绑定属性名
   * @param value 挂载属性
   * @example
   * ``` typescript
   * 1. vDynamiceProp('name', 'userName')
   * => {
   *    name: 'v-bind:name',
   *    type: '__DYNAMIC',
   *    value: 'userName',
   *    isProp: '__Prop',
   *    directive: { name: 'v-bind', arg: 'name' }
   * }
   *
   * 2. vDynamiceProp('name', ['01', '02'])
   * => {
   *   value: ['01', '02']
   * }
   * ```
   */
  function vDynamiceProp(name, value) {
      const _directive = { name: 'v-bind', arg: name };
      return vDirective(exports.VPropType.DYNAMIC, _directive, value);
  }
  /**
   * v-model 指令属性
   * @summary
   * 需要匹配形式:
   * 1. v-model='value'
   * 2. v-model:change='value'
   * @example
   * ``` typescript
   * 1. vModelProp('title')
   * => {
   *    name: 'v-model:modelValue',
   *    type: '__MODEL',
   *    value: 'title',
   *    isProp: '__Prop',
   *    directive: { name: 'v-model', arg: 'modelValue' }
   * }
   *
   * 2. vModelProp('value', 'id')
   * => {
   *    name: 'v-model:value',
   *    type: '__MODEL',
   *    value: 'id',
   *    isProp: '__Prop',
   *    directive: { name: 'v-model', arg: 'value' }
   * }
   * ```
   */
  function vModelProp(model, value) {
      // 匹配参数模式 v-model='value'
      if (!value && model) {
          value = model;
          model = { arg: 'modelValue' };
      }
      else if (index.isString(model)) {
          model = { arg: model };
      }
      if (!index.isObject(model)) {
          throw new Error(`v-model 属性设置错误 ${model} ${value}`);
      }
      const _directive = { name: 'v-model', ...model };
      return vDirective(exports.VPropType.MODEL, _directive, value);
  }
  /**
   * v-slot 指令属性
   * @param poistion 插槽名称
   * @param value 插槽值
   * @example
   * ``` typescript
   * 1. vSlotProp()
   * => {
   *  name: 'v-slot:default',
   *  type: '__SLOT',
   *  value: undefined,
   *  isProp: '__Prop',
   *  directive: { name: 'v-slot', arg: 'default' }
   * }
   * ```
   */
  function vSlotProp(poistion = 'default', value) {
      const _directive = { name: 'v-slot', arg: poistion };
      return vDirective(exports.VPropType.SLOT, _directive, value);
  }
  /**
   * v-if 指令属性
   * @param value 挂载属性名 | 布尔值
   * @example
   * ``` typescript
   * 1. vIfProp('visibal')
   * => {
   *   name: 'v-if',
   *   type: '__IF',
   *   value: 'visibal',
   *   isProp: '__Prop',
   *   directive: { name: 'v-if' }
   * }
   *
   * 2. vIfProp(true)
   * => {
   *   value: true,
   *   ...
   * }
   * ```
   */
  function vIfProp(value) {
      const _directive = { name: 'v-if' };
      return vDirective(exports.VPropType.IF, _directive, value);
  }
  /**
   * ref 指令
   * @param value 挂载名称，或挂载方法
   * @returns 返回指令属性对象
   * @example
   * ``` typescript
   * 1. vRefProp('formEle')
   * => {
   *  name: 'ref,
   *  type: __IF,
   *  value: 'formEle',
   *  isProp: '__Prop',
   *  _directive: { name: 'ref' }
   * }
   *
   * 2. vRefProp(ele => {...})
   * => {
   *  value: ele => {...},
   *  ...
   * }
   * ```
   */
  function vRefProp(value) {
      const _directive = { name: 'ref' };
      return vDirective(exports.VPropType.REF, _directive, value);
  }
  function mixDefaultForValue(v) {
      return { ...DEFAULT_FOR_VALUE, ...v };
  }
  // TODO
  // v-if
  function isDynamicFor(d) {
      return !!d.value;
  }

  /**
   * 属性断言
   */
  /**
   * 是否为属性对象
   * @param d
   * @returns
   */
  function isProp(d) {
      return d.isProp === IS_PROP;
  }
  /**
   * 是否为默认属性
   * @param d
   * @returns
   */
  function isNativeProp(d) {
      return isProp(d) && d.type === exports.BasePropType.NATIVE;
  }
  /**
   * 是否为单属性
   * @param d
   */
  function isSlefProp(d) {
      return isProp(d) && d.type === exports.BasePropType.SELF;
  }
  /**
   * 是否为动态属性
   * @param d
   */
  function isDynamicProp(d) {
      return isProp(d) && d.type === exports.VPropType.DYNAMIC;
  }
  /**
   * 是否为 v-on属性
   * @param d
   * @returns
   */
  function isEventProp(d) {
      return isProp(d) && d.type === exports.VPropType.EVENT;
  }
  /**
   * 是否为 v-model属性
   * @param d
   * @returns
   */
  function isModelProp(d) {
      return isProp(d) && d.type === exports.VPropType.MODEL;
  }
  /**
   * 是否为 v-slot属性
   * @param d
   * @returns
   */
  function isSlotProp(d) {
      return isProp(d) && d.type === exports.VPropType.SLOT;
  }
  /**
   * 是否为 v-if属性
   * @param d
   * @returns
   */
  function isIfProp(d) {
      return isProp(d) && d.type === exports.VPropType.IF;
  }
  /**
   * 是否为 v-for属性
   * @param d
   * @returns
   */
  function isForProp(d) {
      return isProp(d) && d.type === exports.VPropType.FOR;
  }
  /**
   * 是否为 ref属性
   * @param d
   * @returns
   */
  function isRefProp(d) {
      return isProp(d) && d.type === exports.VPropType.REF;
  }

  /**
   * 属性集生成器
   * @param p 属性列表
   * @returns
   * @example
   * ``` typescript
   * const p1 = { name: 'p_1', ... }
   * const p2 = { name: 'p_2', ... }
   * buildPropsByList([p1, p2])
   * => { 'p_1': p1, 'p_2': p2 }
   * ```
   */
  function buildPropsByList(p) {
      if (index.isUndefined(p)) {
          return {};
      }
      return p.reduce((acc, next) => {
          return { ...acc, [next.name]: next };
      }, {});
  }
  /**
   * 基础数据类型转字符
   * @param data
   * @returns
   */
  function parseBase(data) {
      if (index.isUndefined(data)) {
          return "undefined";
      }
      return JSON.stringify(data);
  }
  /**
   * 数组转字符
   * @param arr
   * @returns
   * @example
   * ``` typescript
   * parseArray([1, 2, 3, 'one'])
   * => '[1, 2, 3, "one"]'
   * ```
   */
  function parseArray(arr) {
      return `[${arr.map(item => {
        if (index.isArray(item)) {
            return parseArray(item);
        }
        if (index.isFunction(item)) {
            return item.toString();
        }
        if (index.isObject(item)) {
            return parseObj(item);
        }
        return parseBase(item);
    }).join(',')}]`;
  }
  /**
   * 对象转字符
   * @param data
   * @returns
   * @example
   * ``` typescript
   *  parseObj({id: 12, type: 'div'})
   *  => '{id: 12, type: "div"}'
   *
   * ```
   */
  function parseObj(data) {
      const d = Object.entries(data).reduce((acc, [key, val]) => {
          let d;
          const setData = (data) => {
              return `${acc}${acc ? ',' : ''}${key}:${data}`;
          };
          if (index.isArray(val)) {
              d = parseArray(val);
          }
          if (index.isFunction(val)) {
              d = val.toString();
          }
          if (index.isObject(val)) {
              d = parseObj(val);
          }
          if (!d) {
              d = parseBase(val);
          }
          return setData(d);
      }, '');
      return `{${d}}`;
  }
  /**
   * 数据转字符
   * @param data
   * @returns string
   * @example
   * ``` typescript
   *
   * // 1. 函数
   *  dataFormatter(() => {})
   * => '() => {}'
   *
   * // 2. 对象
   * dataFormatter({ name: 'c', age: 12 })
   * => '{ name: "c" , age: 12 }'
   *
   * // 3. 数组
   *  dataFormatter(['c', 12])
   * => '["c", 12]'
   * // 4. 基础类型
   * dataFormatter(true)
   * => 'true'
   *
   * ```
   */
  function dataFormatter(data) {
      if (index.isObject(data)) {
          return parseObj(data);
      }
      if (index.isArray(data)) {
          return parseArray(data);
      }
      if (index.isFunction(data)) {
          return data.toString();
      }
      if (index.isString(data)) {
          return data;
      }
      return parseBase(data);
  }

  /**
   * 生成基础属性模板
   * @param d 属性对象
   * @example
   * ``` typescript
   * propStrinify(nativeProp('id', 'box'))
   * => id='box'
   * ```
   */
  function propStrinify(d) {
      return `${d.name}='${dataFormatter(d.value)}'`;
  }
  /**
   * 生成自闭和标签模板
   * @param d
   * @example
   * ``` typescript
   * selfPropStrinify(selfProp('disabled'))
   * => 'disabled'
   * ```
   */
  const selfPropStrinify = (d) => {
      return `${d.name}`;
  };
  /* vue 指令属性 */
  /**
   * ref
   * @example
   * ``` typescript
   * 1. vRefPropStringify(vRefProp('formEle'))
   * => ref='formEle'
   *
   * 2. vRefPropStringify(vRefProp(e => {...}))
   * => :ref='e => {...}'
   * ```
   */
  const vRefPropStringify = (d) => {
      if (index.isFunction(d.value)) {
          return `:ref='${d.value.toString()}'`;
      }
      return `ref='${d.value}'`;
  };
  function isDynamicFor$1(d) {
      return !!d.value;
  }
  /**
   * TODO
   * v-for
   * @example
   */
  const vForPropStringify = (d) => {
      const { item, index, key } = d.forset;
      const _value = isDynamicFor$1(d.forset) ? `"${d.forset.value}"` : d.forset.dynamice;
      const _index = index === key ? `, ${index}` : index;
      return `v-for='(${item}${_index}) of ${_value}' ${d._key.stringify()}`;
  };
  /**
   * 属性模板生成器
   * @example
   * ``` typescript
   * propToString(vEventProp({ arg: 'click',  modifiers: ['stop'] }, 'onClick'))
   * => v-on:click.stop='onClick'
   * ```
   */
  const propToString = (d) => {
      const formatterMap = [
          [isNativeProp, propStrinify],
          [isDynamicProp, propStrinify],
          [isEventProp, propStrinify],
          [isModelProp, propStrinify],
          [isIfProp, propStrinify],
          [isSlefProp, selfPropStrinify],
          [isRefProp, vRefPropStringify],
      ];
      for (let i = 0; i < formatterMap.length; i++) {
          const [_if, _formatter] = formatterMap[i];
          if (_if(d)) {
              return _formatter(d);
          }
      }
      return propStrinify(d);
  };

  /**
   * 标签类型断言
   */
  /**
   * 是否为节点对象
   * @param d
   * @returns
   */
  function isTag(d) {
      return !!d && d.isTag === IS_TAG;
  }
  /**
   * 是否为默认节点
   * @param d
   * @returns
   */
  function isNativeTag(d) {
      return isTag(d) && d.type === exports.TagType.NATIVE;
  }
  /**
   * 是否为自闭和节点
   * @param d
   * @returns
   */
  function isSlefTag(d) {
      return isTag(d) && d.type === exports.TagType.SELF;
  }
  /**
   * 是否为动态值
   * @param d
   * @returns
   */
  function isDynamicTag(d) {
      return isTag(d) && d.type === exports.TagType.DYNAMIC;
  }
  /**
   * 是否为文本节点
   * @param d
   * @returns
   */
  function isTextTag(d) {
      return isTag(d) && d.type === exports.TagType.TEXT;
  }
  /* ts 类型断言 */
  function isTagType(d) {
      return !!d && d.isTag === IS_TAG;
  }
  function isNativeTagType(d) {
      return isTag(d) && d.type === exports.TagType.NATIVE;
  }
  function isSlefTagType(d) {
      return isTag(d) && d.type === exports.TagType.SELF;
  }
  function isDynamicTagType(d) {
      return isTag(d) && d.type === exports.TagType.DYNAMIC;
  }
  function isTextTagType(d) {
      return isTag(d) && d.type === exports.TagType.TEXT;
  }

  /**
   * 标签节点生成器
   * @param type 标签类型
   * @param tag 标签名
   * @param props 标签属性
   * @param children 嵌套子标签
   * @returns { Tag }
   * @example
   * ``` typescript
   * node(TagType.NATIVE, 'div', nativeProp('id', 'box'), node(TagType.NATIVE, 'span'))
   * => {
   *  isTag: '__TAG',
   *  tag: 'div',
   *  type: '__NATIVE',
   *  props: { id: { ... } },
   *  children: [ { tag: 'span', ... } ]
   * }
   * ```
   */
  function node(type, tag, props, children) {
      return {
          tag,
          type,
          props,
          children,
          isTag: IS_TAG,
          parent: undefined
      };
  }
  /**
   * 文本节点
   * @param tag 节点内容
   * @example
   * ``` typescript
   * 1. textTag(null)
   * => ''
   *
   * 2. textTag(undefined)
   * => ''
   *
   * 3. textTag({ name: 'coco' })
   * => `
   *    {
   *      name: 'coco'
   *    }
   *  `
   *
   * 4. textTag('container')
   * => 'container'
   *
   * 5. textTag(() => {...})
   * => '() => {...}'
   * ```
   */
  function textTag(tag) {
      if (index.isNull(tag) || index.isUndefined(tag)) {
          return node(exports.TagType.TEXT, '');
      }
      if (index.isObject(tag) || index.isArray(tag)) {
          return node(exports.TagType.TEXT, JSON.stringify(tag, null, 2));
      }
      if (index.isString(tag) || index.isNumber(tag)) {
          return node(exports.TagType.TEXT, tag);
      }
      return node(exports.TagType.TEXT, tag.toString());
  }
  /**
   * 自闭和标签
   * @param tag 标签名
   * @param props 标签属性
   * @example
   * ``` typescript
   * 1. selfTag('hr', nativeProp('class', 'line'))
   * => {
   *    isTag: '__TAG',
   *    tag: 'hr',
   *    type: '__SELF',
   *    props: { class: { ... } },
   *    children: undefined
   *  }
   *
   * 2. selfTag('hr', [ nativeProp('class', 'line'), nativeProp('style', 'width: 100px') ])
   * => {
   *    props: { class: { ... }, styl: { ... } },
   *    ...
   *  }
   * ```
   */
  function selfTag(tag, props) {
      const _props = index.isArray(props) ? props : props ? [props] : props;
      return node(exports.TagType.SELF, tag, buildPropsByList(_props));
  }
  /**
   * 一般标签对象
   * @param tag 标签名称
   * @param props 标签属性
   * @param children 子标签
   * @returns Tag
   * @example
   * ``` typescript
   * 1. nativeTag('div')
   * 2. nativeTag('div', nativeProp('id', 'body'))
   * 3. nativeTag('div', [nativeProp('id', 'body'), nativeProp('class', 'full')])
   * 4. nativeTag('div', nativeProp('id', 'body'), nativeTag('div'))
   * 5. nativeTag('div', nativeProp('id', 'body'), 'body')
   * ```
   */
  function nativeTag(tag, props, children) {
      const _props = index.isArray(props) ? props : !!props ? [props] : undefined;
      let _children;
      if (index.isArray(children)) {
          // children 为标签列表
          _children = children.map((child) => {
              return isTag(child) ? child : textTag(child);
          });
      }
      else if (isTag(children)) {
          // children 为单一 标签对象
          _children = [children];
      }
      else if (index.isUndefined(children)) {
          // children 为空
          _children = undefined;
      }
      else {
          // 其他非标签对象类型，统一转为文本标签
          _children = [textTag(children)];
      }
      return node(exports.TagType.NATIVE, tag, buildPropsByList(_props), _children);
  }
  /**
   * 动态属性标签
   * @param tag 挂载属性
   * @example
   * ``` typescript
   * dynamiceTag('content')
   * => {
   *   isTag: '__TAG',
   *   tag: 'content',
   *   type: '__DYNAMIC',
   *   props: {},
   *   children: undefined
   * }
   * ```
   */
  function dynamiceTag(tag) {
      return node(exports.TagType.DYNAMIC, tag);
  }

  /**
   * 多空格转单空格
   * @param tmp
   * @returns
   */
  /**
   * 驼峰名称转类名
   * @param tagName
   * @returns
   * @example
   * ``` typescript
   * tagNameFormatter('ABC)
   * => 'a-b-c'
   * ```
   */
  function tagNameFormatter(tagName) {
      const wordList = tagName.split('');
      return wordList.map((word, index) => /[A-Z]+/gm.test(word) ? `${index === 0 ? '' : '-'}${word.toLowerCase()}` : word).join('');
  }

  /**
   * 获取节点名称
   * @param t
   * @returns
   */
  function getTagName(t) {
      return tagNameFormatter(index.isString(t) ? t : !!t ? t.name : '');
  }
  /**
   * 节点对象转模板
   * @param t 节点对象
   * @param gTag 节点名获取函数, 默认 getTagName
   * @returns
   *
   * @example
   * ``` typescript
   *
   * 1. 一般节点
   * const n = nativeTag('div')
   * tagtoString(n)
   * => `<div></div>`
   *
   * 2. 文本节点
   * const t = textTag('text')
   * => `text`
   *
   * 3. 自闭和节点
   * const s = selfTag('hr')
   * => `<hr/>`
   *
   * 4. 动态节点
   * const d = dynamiceTag('content')
   * => `{{ content }}`
   *
   * ```
   */
  function tagtoString(t, gTag = getTagName) {
      const { tag, props, children } = t;
      if (isTextTag(t)) {
          return tag;
      }
      const _tag = gTag(tag);
      if (!_tag) {
          console.error(`无法找到标签名称: ${JSON.stringify(t, null, 2)}`);
          return '';
      }
      const _propsStr = props ? Object.values(props).map(p => propToString(p)).join(' ') : '';
      if (isDynamicTag(t)) {
          return `{{ ${_tag} }}`;
      }
      if (isSlefTag(t)) {
          return `<${_tag} ${_propsStr}/>`;
      }
      const _childrenStr = children ? children.map(item => tagtoString(item)).join(' ') : '';
      return `<${_tag} ${_propsStr}>${_childrenStr}</${_tag}>`;
  }

  exports.DEFAULT_FOR_VALUE = DEFAULT_FOR_VALUE;
  exports.IS_PROP = IS_PROP;
  exports.IS_TAG = IS_TAG;
  exports.buildPropsByList = buildPropsByList;
  exports.dataFormatter = dataFormatter;
  exports.dynamiceTag = dynamiceTag;
  exports.getTagName = getTagName;
  exports.isDynamicFor = isDynamicFor;
  exports.isDynamicProp = isDynamicProp;
  exports.isDynamicTag = isDynamicTag;
  exports.isDynamicTagType = isDynamicTagType;
  exports.isEventProp = isEventProp;
  exports.isForProp = isForProp;
  exports.isIfProp = isIfProp;
  exports.isModelProp = isModelProp;
  exports.isNativeProp = isNativeProp;
  exports.isNativeTag = isNativeTag;
  exports.isNativeTagType = isNativeTagType;
  exports.isProp = isProp;
  exports.isRefProp = isRefProp;
  exports.isSlefProp = isSlefProp;
  exports.isSlefTag = isSlefTag;
  exports.isSlefTagType = isSlefTagType;
  exports.isSlotProp = isSlotProp;
  exports.isTag = isTag;
  exports.isTagType = isTagType;
  exports.isTextTag = isTextTag;
  exports.isTextTagType = isTextTagType;
  exports.mixDefaultForValue = mixDefaultForValue;
  exports.nativeProp = nativeProp;
  exports.nativeTag = nativeTag;
  exports.node = node;
  exports.parseArray = parseArray;
  exports.parseBase = parseBase;
  exports.parseObj = parseObj;
  exports.prop = prop;
  exports.propStrinify = propStrinify;
  exports.propToString = propToString;
  exports.selfProp = selfProp;
  exports.selfPropStrinify = selfPropStrinify;
  exports.selfTag = selfTag;
  exports.tagtoString = tagtoString;
  exports.textTag = textTag;
  exports.vDirective = vDirective;
  exports.vDirectiveNameFormatter = vDirectiveNameFormatter;
  exports.vDirectiveProp = vDirectiveProp;
  exports.vDynamiceProp = vDynamiceProp;
  exports.vEventProp = vEventProp;
  exports.vForPropStringify = vForPropStringify;
  exports.vIfProp = vIfProp;
  exports.vModelProp = vModelProp;
  exports.vRefProp = vRefProp;
  exports.vRefPropStringify = vRefPropStringify;
  exports.vSlotProp = vSlotProp;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
