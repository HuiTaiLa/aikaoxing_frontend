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

    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '/static/admin/paper_manage/js/initial_paperList.js'
    document.getElementsByTagName('body')[0].appendChild(script)

    let script1 = document.createElement('script')
    script1.type = 'text/javascript'
    script1.src = '/static/admin/paper_manage/js/admin_paperManager.js'
    document.getElementsByTagName('body')[0].appendChild(script1)
  }
}
</script>

