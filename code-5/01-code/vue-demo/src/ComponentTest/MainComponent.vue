<template>
  <div>
    <!-- <button @click="toggle">切换组件</button>
    <component :is="current"></component>-->

    <!-- <button @click="toggle">切换组件</button>
    <keep-alive>
      <component :is="current"></component>
    </keep-alive>-->

    <h2>异步组件</h2>
    <!-- <async-component1 /> -->
    <!-- <async-component2 /> -->
    <async-component3 />

    <!-- <h2>动态组件</h2>
    <button @click="toggle">切换组件</button>
    <component :is="current"></component>
    <h2>缓存组件</h2>
    <button @click="toggle">切换组件</button>
    <keep-alive>
      <component :is="current"></component>
    </keep-alive>
    <h2>异步组件</h2>
    <async-component1></async-component1>
    <async-component2></async-component2>
    <async-component3></async-component3>-->
  </div>
</template>
<script>
import Vue from "vue";
/**
 * 动态组件:使用<component>标签 配合 :is="表达式" 表达式内部存储的是一个组件的名字
 * 异步组件:将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
 * 静态引入不能单独打包,动态引入才可以单独的打包
 * 动态打包两种写法:require()和import()
 *
 */

// Vue.component('async-component1', function (resolve, reject) {
//   setTimeout(function () {
//     // 向 `resolve` 回调传递组件定义
//     resolve({
//       data(){return {msg:'哈哈' }},
//       template: '<div>I am async!{{msg}}</div>'
//     })
//   }, 1000)
// })

// Vue.component("async-component2", function(resolve) {
//   // 这个特殊的 `require` 语法将会告诉 webpack
//   // 自动将你的构建代码切割成多个包，这些包
//   // 会通过 Ajax 请求加载
//   require(["./AsyncComponent2.vue"], resolve);
// });


Vue.component(
  'async-component3',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./AsyncComponent3.vue')
)

import Dynamic1 from "./Dynamic1.vue";
import Dynamic2 from "./Dynamic2.vue";
export default {
  data() {
    return {
      current: "Dynamic1"
    };
  },
  // 注册组件
  components: {
    Dynamic1,
    Dynamic2
  },
  methods: {
    // 切换组件
    toggle() {
      this.current = this.current === "Dynamic2" ? "Dynamic1" : "Dynamic2";
    }
  }
};
</script>
<style scoped>
</style>