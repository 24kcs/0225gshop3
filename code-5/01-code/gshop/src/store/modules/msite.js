//引入mutation的typs
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from '../mutation-types.js'
// 引入api目录中的index.js 使用里面的方法
import { reqAddress, reqCategorys, reqShops } from '../../api'
const state={
   // 经度
   longitude: '116.36867',
   // 纬度
   latitude: '40.10038',
   // 地址
   address: {},
   // 食品分类
   categorys: [],
   // 商铺列表
   shops: [],
}
const mutations={
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
    },
}
const actions={
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
    async getCategorys({ commit }, cb) {
      // 发送请求获取数据
      const result = await reqCategorys()
      // 判断是否成功
      if (result.code === 0) {
        // 获取了数据(数组)
        const categorys = result.data
        // 提交,
        commit(RECEIVE_CATEGORYS, categorys)
        typeof cb === 'function' && cb()
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
const getters={}

export default{
  state,
  mutations,
  actions,
  getters
}