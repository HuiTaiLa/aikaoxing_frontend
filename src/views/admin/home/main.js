import Vue from 'vue'
import App from './App'
import router from '@/router/admin_home'
import Antd from 'ant-design-vue'
import Mint from 'mint-ui';
import ElementUI from 'element-ui';
import store from '@/store/index'
import request from '@/utils/request'
import db from '@/utils/localstorage'
// import VueApexCharts from 'vue-apexcharts'

// import 'ant-design-vue/dist/antd.css'
// import '../../assets/common/css/common.styl'
// import mixins from './mixins'
import '@/utils/install'

// import '../../../static/admin/home/css/application.css'
// import '../../../static/admin/home/css/global.css'
// import '../../../static/admin/home/stylesheets/chatStyle.css'
// import '../../../static/admin/home/vue/css/theme/default/index.css'
// import '../../../static/admin/home/vue/css/introjs.css'
// import '../../../static/admin/home/vue/css/kalendae.css'
// import '../../../static/admin/home/vue/fonts/20200302/style.css'
// import '../../../static/admin/home/vue/js/katex/katex.min.css'
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Mint);
Vue.use(ElementUI);
Vue.use(db);
// Vue.use(VueApexCharts)
// Vue.mixin(mixins) // 全局混合
// Vue.component('apexchart', VueApexCharts)

Vue.use({
  install (Vue) {
    Vue.prototype.$db = db
  }
});
//
Vue.prototype.$post = request.post;
Vue.prototype.$get = request.get;
Vue.prototype.$put = request.put;
Vue.prototype.$delete = request.delete;
Vue.prototype.$export = request.export;
Vue.prototype.$download = request.download;
Vue.prototype.$upload = request.upload;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#index');
