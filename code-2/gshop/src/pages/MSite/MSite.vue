<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name||'正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span
          class="header_login_text"
        >{{user._id?(user.name?(user.name):(user.phone?(user.phone):(' 登录|注册'))):(' 登录|注册')}}</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category,index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com`+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>
<script>
//引入商铺列表的组件
import ShopList from "../../components/ShopList/ShopList.vue";
//引入swiper
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
//引入vuex
import { mapState } from "vuex";
export default {
  name: "MSite",
  components: {
    ShopList
  },
  async mounted() {
    // 获取商铺列表信息
    this.$store.dispatch("getShops");
    // 获取食品分类的数据数组
    await this.$store.dispatch("getCategorys");
    //第三种方式
    this.$nextTick(() => {
      //必须是界面显示后才有效果
      // eslint-disable-next-line
      var mySwiper = new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      });
    });

    // this.$store.dispatch("getCategorys", ()=> {
    //   this.$nextTick(() => {
    //     //必须是界面显示后才有效果
    //     var mySwiper = new Swiper(".swiper-container", {
    //       loop: true, // 循环模式选项
    //       // 如果需要分页器
    //       pagination: {
    //         el: ".swiper-pagination"
    //       }
    //     });
    //   });
    // });

    //创建实例对象---第一个参数:轮播图的容器(最外面的父级元素的选择器)
    //要想使用下面的方式实现轮播,必须要在界面内容加载完毕(DOM加载后)---有bug--坑
    // var mySwiper = new Swiper(".swiper-container", {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   }
    // });
  },

  // 计算属性------
  // 1. 获取地址的数据
  computed: {
    ...mapState(["address", "categorys", "user"]),
    // 产生一个二维数组
    categorysArr() {
      // 食品分类数据--数组
      const { categorys } = this;
      const bigArr = []; // 大容器---两个小数组
      let smallArr = []; // 小容器----8个数组
      categorys.forEach(category => {
        // 判断当前的小容器是否有数据
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        smallArr.push(category); //把数据加入到大的容器中

        // 判断当前的小容器是否装满数据(8个值)
        if (smallArr.length === 8) {
          smallArr = [];
        }
      });

      return bigArr; // 大容器是二维数组
    }
  }
  //在vue中数据如果发生变化,立即同步调用监视中的回调函数,异步更新界面
  // watch: {
  //   categorys() {

  //     this.$nextTick(()=>{
  //        //必须是界面显示后才有效果
  //       var mySwiper = new Swiper(".swiper-container", {
  //       loop: true, // 循环模式选项
  //       // 如果需要分页器
  //       pagination: {
  //         el: ".swiper-pagination"
  //       }
  //     });
  //     })
  //   }
  // }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >.span.swiper-pagination-bullet-active
          background #02a774
</style> 