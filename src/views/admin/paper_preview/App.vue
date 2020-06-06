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
    script.src = '/static/admin/paper_preview/js/exam-base.js'
    document.getElementsByTagName('body')[0].appendChild(script)

  },

}
</script>
