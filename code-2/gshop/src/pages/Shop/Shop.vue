<template>
  <div>
    <ShopHeader></ShopHeader>
    Shop组件
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods">点餐</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/shop/ratings">评价</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/shop/info">商家</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
//引入ShopHeader
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
export default {
  components: {
    ShopHeader
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
后天引入
</style>