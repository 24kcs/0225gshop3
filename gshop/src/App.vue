<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
// 引入FooterGuide.vue组件
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";

export default {
  name: "App",
  components: {
    // 注册组件
    FooterGuide
  },
  mounted() {
    //向ations提交
    //this.$store.dispatch("getAddress");
  }
};
</script>

<style scoped>
</style>
