import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '短信验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '图形验证码'

  }
});

//扩展的验证方法
VeeValidate.Validator.extend('phone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    return /^1\d{10}$/.test(value)
  }
});
//密码
VeeValidate.Validator.extend('password', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {

    return /[0-9a-zA-Z]/.test(value)
  }
});

