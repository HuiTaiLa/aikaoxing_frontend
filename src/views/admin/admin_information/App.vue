<template>
      <router-view/>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  },

  created () {
    let info_setting = document.createElement('script')
    info_setting.type = 'text/javascript'
    info_setting.src = '/static/admin/admin_information/js/admin_set.js'
    document.getElementsByTagName('body')[0].appendChild(info_setting)
  }
}
</script>

