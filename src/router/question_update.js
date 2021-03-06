import Vue from 'vue'
import Router from 'vue-router'
import db from 'utils/localstorage'
import request from 'utils/request'
import QuestionUpdateView from '@/components/admin/question_update/QuestionUpdateView'

Vue.use(Router)

let constRouter = [
  {
    path: '/:id?',
    name: '试题更新',
    component: QuestionUpdateView
  },
  {
    path: '/index',
    name: '试题更新',
    component: QuestionUpdateView
  },
]

let router = new Router({
  routes: constRouter
})

let asyncRouter
let jumpView = "view:admin/question_update"
// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  let token = db.get('USER_TOKEN')
  let user = db.get('USER')
  let userRouter = get('USER_ROUTER')
  let permissions = get('PERMISSIONS')
  if (token.length && user&& permissions) {//一旦token过期，路由将重新构建
    if(!permissions.includes(jumpView)){
      next(false)
      window.location.href = '/admin/login'
    }
    else if (!asyncRouter) {
      if (!userRouter) {//已经有路由的话，就不重新构建路由了
        request.get(`/api/menu/${user.account}/${user.companyId}`).then((res) => {  //后端路由已全部构建完毕，并返回
          asyncRouter = res.data
          save('USER_ROUTER', asyncRouter)
          go(to, next)
        })
      } else {
        asyncRouter = userRouter
        go(to, next)
      }
    } else {
      var path_match = to.path.split('/')[to.path.split('/').length - 1?1:0]
      if(/^\d+$/.test(path_match)){//判断是否是正常数字ID
        next()
      }
      else if(to.path == '/'){
        next()
      }
      else{
        next('/')
      }
    }
  } else {
    next(false)
    window.location.href = "/admin/login"
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
