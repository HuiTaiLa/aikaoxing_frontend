<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },

  created () {
    let login_variebles = document.createElement('script')
    login_variebles.type = 'text/javascript'
    login_variebles.src = '/static/admin/login/js/login_variebles.js'
    document.getElementsByTagName('body')[0].appendChild(login_variebles)
    let login_setting = document.createElement('script')
    login_setting.type = 'text/javascript'
    login_setting.src = '/static/admin/login/js/login_setting.js'
    document.getElementsByTagName('body')[0].appendChild(login_setting)
    let login = document.createElement('script')
    login.type = 'text/javascript'
    login.src = '/static/admin/login/account/login.js'
    document.getElementsByTagName('body')[0].appendChild(login)

  }
}
</script>

