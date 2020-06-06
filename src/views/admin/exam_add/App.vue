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
    let script0 = document.createElement('script')
    script0.type = 'text/javascript'
    script0.src = 'https://s5.kaoshixing.com/static/plugins/honeySwitch/honeySwitch.js?v=94e23bd13c57'
    document.getElementsByTagName('body')[0].appendChild(script0)

    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '/static/admin/exam_add/js/admin_addExam.js'
    document.getElementsByTagName('body')[0].appendChild(script)

    let script1 = document.createElement('script')
    script1.type = 'text/javascript'
    script1.src = '/static/admin/exam_add/js/admin_examSetting.js'
    document.getElementsByTagName('body')[0].appendChild(script1)
  },

}
</script>
