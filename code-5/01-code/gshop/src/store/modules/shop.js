import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-types.js'
// 引入api目录中的index.js 使用里面的方法
import { reqGoods, reqRatings, reqInfo } from '../../api'
import Vue from 'vue'
const state = {
  //goods,info,ratings
  goods: [],  //点餐
  ratings: [], //评价
  info: {}, //商家信息
  cartFood: [] //保存购物车中的食物数据
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

  // 添加食物适量
  [ADD_FOOD_COUNT](state, { food }) {
    // 没有count属性则添加这个属性，并且默认值是1
    if (!food.count) {
      // food.count=1
      Vue.set(food, 'count', 1)
      // 数量增加,就把食物添加到当前的数组中
      state.cartFood.push(food)
    } else {
      food.count++
    }
  },
  // 减少食物数量
  [REDUCE_FOOD_COUNT](state, { food }) {
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        // 从当前数组中移除当前食物
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

  // 添加和减少食物
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      // 增加操作
      commit(ADD_FOOD_COUNT, { food })
    } else {
      // 减少操作
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }
}
const getters = {
  // 获取所有食物的总数量
  totalCount(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count, 0)
  },
  // 获取所有食物的总价格
  totalPrice(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count * food.price, 0)
  },
    /*
  总商家评论数
   */
  totalRatingsCount (state) {
    return state.ratings.length
  },

  /*
  总商家推荐评论数
   */
  positiveRatingsCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}