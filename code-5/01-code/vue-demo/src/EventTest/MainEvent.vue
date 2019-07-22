<template>
  <div>

    <h2>原生DOM事件</h2>
    <!-- <button @click="showMsg">这是一个按钮</button>
    <Event1 @click.native="showMsg2" /> -->
    <h2>自定义事件</h2>
    <Event2 @click="showMsg3" @xxx="showMsg4" />






    <!-- <h2>原生DOM事件</h2>
    <p @click="showMsg">这是一个p</p>
    <hr />
    <Event1 @click.native="showMsg2" />
    <hr />
    <h2>自定义事件</h2>
    <Event2 @click="showMsg3" @xxx="showMsg4" /> -->
  </div>
</template>
<script>

/**
 * 原生DOM事件
 * button @click=""
 * <Component @click.native="show" />
 * 自定义DOM事件
 * button @xxx="show"
 * <Component @click="show">
 * 
 * 
 */
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";
export default {
  components: {
    Event1,
    Event2
  },
  methods: {
    showMsg() {
      alert("原生DOM事件");
    },
    showMsg2() {
      alert("原生DOM事件");
    },
    showMsg3() {
      alert("自定义DOM事件1");
    },
    showMsg4() {
      alert("自定义DOM事件2");
    }
  }
};
</script>
<style scoped>
</style>