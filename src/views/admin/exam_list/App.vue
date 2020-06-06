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
    script.src = '/static/admin/exam_manage/js/admin_examManager.js'
    document.getElementsByTagName('body')[0].appendChild(script)
  }
}
</script>

