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
    script.src = '/static/admin/question_batch_import/js/editor-check.js'
    document.getElementsByTagName('body')[0].appendChild(script)
  },

}
</script>
