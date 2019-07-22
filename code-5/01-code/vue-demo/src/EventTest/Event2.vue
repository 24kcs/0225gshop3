<template>
  <div>


    <!--点击第一个按钮去分发传过来的第一个click自定义事件-->
    <button @click="$emit('click','showMsg3')">我是组件2中的按钮</button>
    <!--点击第二个按钮去分发传过来的第二个xxx事件自定义事件-->
    <button @click="$emit('xxx','showMsg4')">第二个按钮</button>














    <!-- <button @click="$emit('click','showMsg3')">按钮1</button>
    <button @click="$emit('xxx','showMsg4')">按钮2</button> -->
    <button @click="showMessage">按钮3</button>
  </div>
</template>
<script>
export default {
  methods: {
    showMessage(){
      this.$bus.$emit('eventName','真好')
    }
  }
}
</script>
<style scoped>
</style>