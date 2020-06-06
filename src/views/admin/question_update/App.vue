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
    let admin_update = document.createElement('script')
    admin_update.type = 'text/javascript'
    admin_update.src = '/static/admin/question_update/js/admin_update.js'
    document.getElementsByTagName('body')[0].appendChild(admin_update)
  },

}
</script>
