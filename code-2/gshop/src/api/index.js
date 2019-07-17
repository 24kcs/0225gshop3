// 引入ajax.js
import ajax from './ajax.js'
const BASE = '/api'
// 1.根据经纬度获取位置详情---latitude:  longitude
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)
// 2.获取食品分类列表
export const reqCategorys = () => ajax(BASE + `/index_category`)
// 3.根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE + `/shops`, { latitude, longitude })

// 4. 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + `/sendcode`, { phone })

// 5. 手机号验证码登陆  POST
export const reqSmsLogin = (phone, code) => ajax(BASE + `/login_sms`, { phone, code }, 'POST')

// 6. 用户名密码登陆  POST
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(BASE + `/login_pwd`, { name, pwd, captcha }, 'POST')

// 7. 根据会话获取用户信息---持久登录---cookie---session
export const reqUser = () => ajax(BASE + `/userinfo`)

// 8. 用户登出----退出
export const reqLoginOut = () => ajax(BASE + `/logout`)


