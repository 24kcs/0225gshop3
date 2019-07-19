//引入mutation的typs
import { RECEIVE_USER, RESET_USER} from '../mutation-types.js'
// 引入api目录中的index.js 使用里面的方法
import { reqLoginOut } from '../../api'
const state={
  
  // 用户信息
  user: {},
}
const mutations={
  
  // 更新用户信息
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  // 干掉用户
  [RESET_USER](state) {
    state.user = {}
  },

}
const actions={
  
  // 干掉用户信息
  async loginOut({ commit }) {
    const result = await reqLoginOut()
    if (result.code === 0) {
      commit(RESET_USER)
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