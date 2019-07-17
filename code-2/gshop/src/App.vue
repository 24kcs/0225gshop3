<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
// 引入FooterGuide.vue组件
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
// 引入api
import {reqUser} from './api'
import {RECEIVE_USER} from './store/mutation-types.js'
export default {
  name: "App",
  components: {
    // 注册组件
    FooterGuide
  },
  async mounted() {

    // 获取地址数据的对象
    this.$store.dispatch("getAddress");

    //发送请求获取用户信息---生成了session---sid----cookie--客户端---cookie(sid)------服务端(sid-----userId)
    const result= await reqUser()
   
    if(result.code===0){
      const user=result.data
      //立刻更新user数据
      this.$store.commit(RECEIVE_USER,user)
    }
  }
};
</script>

<style scoped>
</style>
