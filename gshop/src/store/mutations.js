// 包含了多个可以直接修改状态数据的方法的对象

//引入mutation的typs
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types.js'
export default {
  // 更新地址信息
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  // 更新食品分类
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },

  // 更新商铺列表
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  }
}