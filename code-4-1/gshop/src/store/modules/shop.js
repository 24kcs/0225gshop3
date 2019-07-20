import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-types.js'
// 引入api目录中的index.js 使用里面的方法
import { reqGoods, reqRatings, reqInfo } from '../../api'
import Vue from 'vue'
const state = {
  //goods,info,ratings
  goods: [],  //点餐
  ratings: [], //评价
  info: {}, //商家信息
  cartFood: [] //存储食物对象的数组
}
const mutations = {
  // 获取goods和info和ratings数据
  // 获取goods点餐的数据,是结构
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  // 获取的ratings的数据
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  // 获取的是info的数据  商家信息
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },

  // food加的操作---count
  [ADD_FOOD_COUNT](state, { food }) {
    // food对象就没有count属性
    if (!food.count) {
      // js是动态类型语言,没有什么,点了,赋值了,就有了
      //food.count=1
      // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
      Vue.set(food, 'count', 1)
      // 添加食物对象
      state.cartFood.push(food)

    } else {
      // 有了
      food.count++
    }
  },

  // food减的操作--count
  [REDUCE_FOOD_COUNT](state, { food }) {
    // 判断数量大于0才可以减
    if (food.count > 0) {
      food.count--
      // 如果当前的食物的数量为0,就可以删除这个食物了
      if (food.count === 0) {
        // 干掉购物车中某个食物
        state.cartFood.splice(state.cartFood.indexOf(food), 1)
      }
    }
  }
}
const actions = {


  // 获取goods的数据
  async getGoods({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  async getRatings({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
    }
  },
  async getInfo({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 对food的数量操作的方法
  updateFoodCount({ commit }, { isAdd, food }) {
    // 判断isAdd是true还是false,加或者是减
    if (isAdd) {
      commit(ADD_FOOD_COUNT, { food })
    } else {
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }
}
const getters = {
  // 总数量
  totalCount(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}