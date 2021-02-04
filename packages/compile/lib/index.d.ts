
/**
 * dom 属性类型
 */
export declare enum BasePropType {
    NATIVE = "__NATIVE",
    SELF = "__SELF"
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
export declare function buildPropsByList(p?: Prop[]): Props;

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
export declare function dataFormatter(data: any): string;

/**
 * v-for 指令默认配置
 */
export declare const DEFAULT_FOR_VALUE: {
    value: string;
    dynamice: string;
    item: string;
    index: string;
    key: string;
};

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
export declare function dynamiceTag(tag: any): Tag;

export declare interface GetTagName {
    (t: Tag): string;
}

/**
 * 获取节点名称
 * @param t
 * @returns
 */
export declare function getTagName(t: any): string;

export declare const IS_PROP = "__Prop";

export declare const IS_TAG = "__TAG";

export declare function isDynamicFor(d: any): d is VForValue;

/**
 * 是否为动态属性
 * @param d
 */
export declare function isDynamicProp(d: any): d is Prop;

/**
 * 是否为动态值
 * @param d
 * @returns
 */
export declare function isDynamicTag(d: any): boolean;

export declare function isDynamicTagType(d: any): d is Tag;

/**
 * 是否为 v-on属性
 * @param d
 * @returns
 */
export declare function isEventProp(d: any): d is Prop;

/**
 * 是否为 v-for属性
 * @param d
 * @returns
 */
export declare function isForProp(d: any): d is Prop;

/**
 * 是否为 v-if属性
 * @param d
 * @returns
 */
export declare function isIfProp(d: any): d is Prop;

/**
 * 是否为 v-model属性
 * @param d
 * @returns
 */
export declare function isModelProp(d: any): d is Prop;

/**
 * 是否为默认属性
 * @param d
 * @returns
 */
export declare function isNativeProp(d: any): d is Prop;

/**
 * 是否为默认节点
 * @param d
 * @returns
 */
export declare function isNativeTag(d: any): boolean;

export declare function isNativeTagType(d: any): d is Tag;

/**
 * 是否为属性对象
 * @param d
 * @returns
 */
export declare function isProp(d: any): d is Prop;

/**
 * 是否为 ref属性
 * @param d
 * @returns
 */
export declare function isRefProp(d: any): d is Prop;

/**
 * 是否为单属性
 * @param d
 */
export declare function isSlefProp(d: any): d is Prop;

/**
 * 是否为自闭和节点
 * @param d
 * @returns
 */
export declare function isSlefTag(d: any): boolean;

export declare function isSlefTagType(d: any): d is Tag;

/**
 * 是否为 v-slot属性
 * @param d
 * @returns
 */
export declare function isSlotProp(d: any): d is Prop;

/**
 * 是否为节点对象
 * @param d
 * @returns
 */
export declare function isTag(d: any): boolean;

export declare function isTagType(d: any): d is Tag;

/**
 * 是否为文本节点
 * @param d
 * @returns
 */
export declare function isTextTag(d: any): boolean;

export declare function isTextTagType(d: any): d is Tag;

export declare function mixDefaultForValue(v: VForValue | VForValueDynamice): {
    value: string | number | any[] | ObjectConstructor;
    item: string;
    index: string;
    key: string;
    dynamice: string;
} | {
    dynamice: string;
    item: string;
    index: string;
    key: string;
    value: string;
};

export declare function nativeProp(name: string, value?: string): Prop;

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
export declare function nativeTag(tag: any, props?: Prop | Prop[], children?: any): Tag;

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
export declare function node(type: TagType, tag: any, props?: Props, children?: Tag[]): Tag;

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
export declare function parseArray(arr: any[]): string;

/**
 * 基础数据类型转字符
 * @param data
 * @returns
 */
export declare function parseBase(data: any): string;

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
export declare function parseObj(data: {
    [s: string]: unknown;
}): string;

/**
 * 基础属性对象
 * @prop name 属性名
 * @prop type 属性类型
 * @prop value 属性值
 * @prop isProp Prop 属性对象判断标识
 */
export declare interface Prop {
    name: string;
    type: string;
    value: any;
    isProp: '__Prop';
    [s: string]: any;
}

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
export declare function prop(type: string, name: string, value?: any): Prop;

/**
 * 属性集合
 */
export declare interface Props {
    [k: string]: Prop;
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
export declare function propStrinify(d: Prop): string;

/**
 * 属性模板生成器
 * @example
 * ``` typescript
 * propToString(vEventProp({ arg: 'click',  modifiers: ['stop'] }, 'onClick'))
 * => v-on:click.stop='onClick'
 * ```
 */
export declare const propToString: (d: Prop) => string | boolean;

export declare function selfProp(name: string): Prop;

/**
 * 生成自闭和标签模板
 * @param d
 * @example
 * ``` typescript
 * selfPropStrinify(selfProp('disabled'))
 * => 'disabled'
 * ```
 */
export declare const selfPropStrinify: (d: Prop) => string;

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
export declare function selfTag(tag: any, props?: Prop | Prop[]): Tag;

export declare interface Tag {
    isTag: '__TAG';
    tag: any;
    type: TagType;
    props?: Props;
    children?: Tag[];
    parent?: Tag;
    [s: string]: any;
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
export declare function tagtoString(t: Tag, gTag?: GetTagName): string;

export declare enum TagType {
    NATIVE = "__NATIVE",
    SELF = "__SELF",
    DYNAMIC = "__DYNAMIC",
    TEXT = "__TEXT"
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
export declare function textTag(tag: any): Tag;

/**
 * 指令参数配置
 * @prop name 指令名 例如: v-on
 * @prop arg 指令参数 例如: v-on:click
 * @prop modifiers 修饰符 例如: v-on:click.stop
 * @prop isDynamic 是否为动态属性 例如: v-bind:[prop]
 * @prop isSelf 是否为单指令 例如: v-pre
 */
export declare interface VDirective {
    name: string;
    arg?: string;
    modifiers?: string[];
    isDynamic?: boolean;
    isSelf?: boolean;
}

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
export declare function vDirective(type: VPropType, directive: VDirective, value?: any): VDirectiveProp;

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
export declare function vDirectiveNameFormatter(d: VDirective): string;

/**
 * vue 指令属性
 * @prop directive 指令配置
 */
export declare interface VDirectiveProp extends Prop {
    directive: VDirective;
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
export declare function vDirectiveProp(name: VDirective, value: any): VDirectiveProp;

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
export declare function vDynamiceProp(name: string, value: any): VDirectiveProp;

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
export declare function vEventProp(name: VPreDirective | string, value: VEventValue): VDirectiveProp;

/**
 * 函数类型
 */
export declare type VEventValue = string | ((...args: any) => any);

/**
 * TODO
 * v-for
 * @example
 */
export declare const vForPropStringify: (d: Prop) => string;

/**
 * v-for 指令接口
 */
export declare interface VForValue {
    value: number | string | any[] | typeof Object;
    item?: string;
    index?: string;
    key?: string;
}

export declare interface VForValueDynamice {
    dynamice: string;
    item?: string;
    index?: string;
    key?: string;
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
export declare function vIfProp(value: string | boolean): VDirectiveProp;

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
export declare function vModelProp(model: any, value?: any): VDirectiveProp;

/**
 * vue 指令配置对象
 */
export declare interface VPreDirective {
    arg?: string;
    modifiers?: string[];
    isDynamic?: boolean;
}

/**
 * vue 指令属性类型
 */
export declare enum VPropType {
    FOR = "__FOR",
    SLOT = "__SLOT",
    MODEL = "__MODEL",
    IF = "__IF",
    EVENT = "__EVENT",
    DIRECTIVE = "__DIRECTIVE",
    REF = "__REF",
    DYNAMIC = "__DYNAMIC"
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
export declare function vRefProp(value: string | ((...args: any) => any)): VDirectiveProp;

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
export declare const vRefPropStringify: (d: Prop) => string;

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
export declare function vSlotProp(poistion?: string, value?: any): VDirectiveProp;

export { }
