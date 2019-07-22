<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li
            class="menu-item"
            :class="{current:currentIndex===index}"
            v-for="(good,index) in goods"
            :key="index"
            @click="clickItem(index)"
          >
            <img class="icon" :src="good.icon" v-if="good.icon" />
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li
            class="food-list-hook"
            v-for="(good,index) in goods"
            :key="index"
          >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click.stop="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// 引入滚动的插件
import BScroll from "better-scroll";
// 引入Food组件
import Food from "./Food.vue";
// 引入购物车
import ShopCart from './ShopCart.vue'
export default {
  components: {
    Food,
    ShopCart
  },
  data() {
    return {
      scrollY: 0, // 纵向滚动的值
      tops: [], // 存储每个选项高度的值的数组
      food: {}
    };
  },
  async mounted() {
    // 向actions提交,getGoods---数据存储到了vuex中--通过计算属性获取属性--从vuex中获取数据
    await this.$store.dispatch("getGoods");

    // 初始化滚动
    this._initScroll();
    // 初始化tops数据---数组----所有li的高度的数据集合
    this._initTops();
  },
  // 什么时候会使用到计算属性呢? 初始化的时候,相关联的数据发生变化,
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    // 实时的获取当前的索引值----scrollY和tops数组
    currentIndex() {
      const { scrollY, tops } = this;
      const index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      );
      // =====坑====
      if (this.index !== index && this.leftScroll) {
        //同时判断当前左侧的滚动对象的存在
        // 获取当前的索引,然后右侧列表移动的过程中直接获取索引,通过该索引,直接设置左侧li对应的移动
        this.index = index; // 始终保存该索引,目的只有一个,就是和index不停的对应,是否一致,所以，一开始就要保存起来
        // 获取左侧ul中对应的li进行元素的滚动
        const li = this.$refs.leftUl.children[index];
        // 直接移动左侧li
        this.leftScroll.scrollToElement(li, 300);
      }

      return index;
    }
  },
  methods: {
    _initScroll() {
      // 左侧列表
      this.leftScroll = new BScroll(".menu-wrapper", {
        click: true
      });
      // 右侧列表
      this.rightScroll = new BScroll(".foods-wrapper", {
        click: true,
        probeType: 1
      });
      this.rightScroll.on("scroll", ({ x, y }) => {
        //把scrollY的值实时的绑定上
        //console.log(y)
        this.scrollY = Math.abs(y); //abs取绝对值
      });
      this.rightScroll.on("scrollEnd", ({ x, y }) => {
        //把scrollY的值实时的绑定上
        //console.log(y)
        this.scrollY = Math.abs(y); //abs取绝对值
      });
    },
    // 初始化tops数据---数组
    _initTops() {
      //装载数据--tops
      const tops = [];
      let top = 0;
      tops.push(top);
      //获取右侧列表中li
      const list = this.$refs.rightUl.children;
      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      console.log(tops);
      // 更新数据
      this.tops = tops;
    },
    // 点击左侧li右侧列表移动到对应的位置
    clickItem(index) {
      // 根据索引获取tops数组中的scrollY的值,然后进行移动
      const scrollY = this.tops[index];
      // 此时有bug,样式移动速度跟不上点击速度,那是因为,scrollY的值在进行计算--所以慢
      // 直接更新当前的scrollY的值
      this.scrollY = scrollY;
      // 设置右侧列表移动
      this.rightScroll.scrollTo(0, -scrollY, 300);
    },
    // 显示Food
    showFood(food) {
      // 更新数据
      this.food = food;
      // 父级组件调用子级组件方法,
      this.$refs.food.toggle();
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>

