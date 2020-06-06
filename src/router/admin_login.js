import Vue from 'vue'
import Router from 'vue-router'
import db from 'utils/localstorage'
import request from 'utils/request'
import LoginView from '@/components/admin/login/LoginView'

Vue.use(Router)

let constRouter = [
  {
    path: '/:companyId?',
    name: '登录页',
    component: LoginView
  },
]

let router = new Router({
  routes: constRouter
})

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  var path_match = to.path.split('/')[to.path.split('/').length - 1?1:0]
  if(/^\d+$/.test(path_match)){//判断是否是正常数字公司ID
    next()
  }
  else if(to.path == '/'){
    next()
  }
  else{
    next('/')
  }
})

function go (to, next) {
  // asyncRouter = filterAsyncRouter(asyncRouter)
  // router.addRoutes(asyncRouter)
  next({...to, replace: true})
}

function save (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function get (name) {
  return JSON.parse(localStorage.getItem(name))
}

// function filterAsyncRouter (routes) {
//   // console.log("ok")
//   return routes.filter((route) => {
//     let component = route.component
//     if (component) {
//       switch (route.component) {
//         case 'MenuView':
//           route.component = MenuView
//           break
//         case 'PageView':
//           route.component = PageView
//           break
//         case 'EmptyPageView':
//           route.component = EmptyPageView
//           break
//         case 'HomePageView':
//           route.component = HomePageView
//           break
//         case 'HomeView':
//           route.component = HomeView
//           break
//         default:
//           route.component = view(component)
//       }
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children)
//       }
//       return true
//     }
//   })
// }

// function view (path) {
//   return function (resolve) {
//     import(`@/views/${path}.vue`).then(mod => {
//       resolve(mod)
//     })
//   }
// }

export default router
