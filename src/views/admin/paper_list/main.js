import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import router from '@/router/paper_list'
import Antd from 'ant-design-vue'
import Mint from 'mint-ui';
import ElementUI from 'element-ui';
import store from '@/store/index'
import request from '@/utils/request'
import db from '@/utils/localstorage'

import '@/utils/install'
Es6Promise.polyfill()
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Mint)
Vue.use(ElementUI)
Vue.use(db)


Vue.use({
  install (Vue) {
    Vue.prototype.$db = db
  }
})
//
Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$export = request.export
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#index')
