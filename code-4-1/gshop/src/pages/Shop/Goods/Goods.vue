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
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="showFood(food)"
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
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
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
import { mapState } from "vuex";
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
      if (this.index !== index && this.leftScroll) {
        //把当前右侧滑动的li对应的索引值保存起来
        this.index = index;
        // 获取索引值,让左侧的对应这个索引的li也滑动,滑动到对应的索引位置即可
        const li = this.$refs.leftUl.children[index];
        // 让当前的li去移动
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
        /**
         *
         * probeType:1,2,3
         * 1:非实时,触摸
         * 2:实时,触摸,
         * 3:实时的,触摸,惯性,编码
         * 实时的:时间间隔很短
         * 非实时的:时间间隔很长
         *
         *
         */
      });
      this.rightScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y); //abs取绝对值
      });
      this.rightScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y); //abs取绝对值
      });
    },
    // 初始化tops数据---数组
    _initTops() {
      // 装载数据--tops
      const tops = [];
      let top = 0;
      tops.push(top);
      // 获取右侧列表中li
      const list = this.$refs.rightUl.children;
      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      // console.log(tops);
      // 更新数据
      this.tops = tops;
    },
    // 点击左侧的分类列表---右侧的li向上或者向下滑动到某个指定的位置(左侧的li就会被自动的选中)
    clickItem(index) {
      // 根据索引获取tops数组中对应的scrollY值
      const scrollY = this.tops[index];
      // 解决不卡的问题
      this.scrollY = scrollY;
      // 右侧列表滑动到某个指定的位置
      this.rightScroll.scrollTo(0, -scrollY, 300);
    },
    // 点击右侧食物的li 显示Food组件
    showFood(food) {
      // 更新food对象数据
      this.food = food;

      // 如何显示Food组件
      this.$refs.food.toggleShow();
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

