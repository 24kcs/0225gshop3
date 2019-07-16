// 包含了多个间接修改状态数据的方法的对象
// 引入mutation的type
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types.js'
// 引入api目录中的index.js 使用里面的方法
import { reqAddress, reqCategorys, reqShops } from '../api'
export default {
  // 发送请求获取地址的数据(对象)---需要的参数:经纬度
  async getAddress({ commit, state }) {
    const { longitude, latitude } = state
    // 传入经纬度,获取数据,但是需要判断
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      // 已经获取到了地址的数据(对象)
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 发送请求获取食品分类信息---
  async getCategorys({ commit }) {
    // 发送请求获取数据
    const result = await reqCategorys()
    // 判断是否成功
    if (result.code === 0) {
      // 获取了数据(数组)
      const categorys = result.data
      // 提交,
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },

  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    // 传入经纬度,获取数据,但是需要判断
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      // 已经获取到了地址的数据(对象)
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },


}