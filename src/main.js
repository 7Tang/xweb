// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

// 引用API文件
import api from './api/index'
import tool from './util/tool'

import verify from 'vue-verify-plugin'
Vue.use(verify, {
  blur: true
})

// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$tool = tool

Vue.config.productionTip = false

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
