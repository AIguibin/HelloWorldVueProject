语法： Vue.component( id, [definition] )

参数：
  {string} id    组件的名字，可以当HTML标签用，注意组件的名字都是小写，而且最好有横线和字母组合。
  {Function | Object} [definition]   组件的设置

用法：
注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))
// 注册组件，传入一个选项对象（自动调用 Vue.extend）
Vue.component('my-component', { /* ... */ })
// 获取注册的组件（始终返回构造器）
var MyComponent = Vue.component('my-component')