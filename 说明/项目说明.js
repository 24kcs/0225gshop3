/**
 * 下载脚手架2 npm install -g vue-cli
 * 脚手架2安装webpack: vue init webpack vue-gshop2
 * 运行: npm start
 * 打包: npm run build
 * 运行打包: serve dist
 * 注意:下载脚手架3之前一定要全局卸载脚手架2
 * 下载脚手架3 npm install -g @vue/cli
 * 脚手架3安装webpack: vue create gshop3
 * 运行: npm run serve  /yarn serve
 * 打包: npm run build
 * 运行打包: serve dist
 * 如果想要从脚手架3降级到脚手架2:npm install -g @vue/cli-init 此时脚手架2和脚手架3都可以使用(命令不同而已)
 * api:存放接口的js文件目录
 * common:存放全局使用的相关资源,如:mixins.styl
 * components:普通的组件
 * filter:存放相关的过滤器内容
 * mock:模拟劫持ajax数据
 * pages:路由相关组件
 * router:配置路由
 * store:存放数据状态管理内容
 * 该路径:引入iconfont <link rel="stylesheet" href="http://at.alicdn.com/t/font_518606_5kcf4pgw3tc.css">
 * 安装stylus和stylus-loader 方便stylus书写
 * npm install stylus stylus-loader
 * 安装vue-router 路由 和axios 发送异步 和 swiper 轮播
 * npm install vue-router swiper axios
 * 安装 vuex 数据状态管理
 * npm install vuex
 * 项目分上下两块
 * 上面显示的是:对应的路由组件
 * 下面显示的是:对应的路由链接
 * 4个一级路由
 * 2个一级路由
 * 总结:6个一级路由
 * 上面显示路由组件: <router-view></router-view>
 * 下面的一块: FooterGuide
 * 在App.vue中设置
 * components目录: FooterGuide.vue的组件(同名的目录中)
 * router目录:index.js和routes.js----配置路由
 * 安装插件(包)
 * npm install vue-router stylus stylus-loader axios
 * 轮播图的swiper 也需要安装
 * 下面的四个组件都放在了pages中-----路由组件
 * MSite组件----外卖
 * Search组件---搜索
 * Order组件---订单
 * Profile组件---我的
 * App.vue中引入了FooterGuide.vue组件,并注册,并使用
 * 坑-------路由组件没有注册呢=====停止
 * index.html中
 * 1.引入reset.css----该文件在static的css目录中
 * 2.引入外部的图标字体的地址---使用图标字体
 * 3.设置meat标签---移动端
 * 4.解决移动端延迟的
 * 
 * 
 * 
 * 
 * 问题1: 在下面的代码中()中应该使用:A. $route=======B.  $router    答案是A  ,应该是每个路由组件对象.path
 * 在FooterGuide.vue中,每个链接上 :class="{on:`/msite`===().path}" @click="goTo('/msite')"
 * 问题2: 为什么Header.vue抽取成了一个公共组件?,如果是公共组件,那么在其他组件中如何使用?
 * 答案: 多个组件都会使用该组件,那么就会抽取成一个公共组件,直接使用(不需要引入,不需要注册).
 * 问题3: 公共组件应该在哪里引入,哪里注册? 在main.js中引入并注册成公共组件.Vue.component('组件的名字',组件的名字)
 * 问题4: 发送异步请求,访问 localhost:5000 的时候报错，在哪配置?
 * 答案: 跨域问题,在config目录中index.js文件中配置----在脚手架2中
 * proxyTable:{
 *  '/api':{
 *    target:'请求的目录的路径',
 *    changeOrigin:true   支持跨域
 *    pathRewrite:'^/api':'' 重写路径
 *  },
 *  '/xinlang':{同上}
 * }
 * 
 * 
 * 
 * 脚手架3中安装相关的包或者是插件
 * stylus stylus-loader
 * vue-router 
 * axios
 * swiper
 * vuex
 * 
 */
