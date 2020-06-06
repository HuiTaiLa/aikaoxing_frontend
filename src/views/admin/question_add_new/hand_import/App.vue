<template>
  <router-view/>
</template>

<script>
import enquireScreen from '@/utils/device'

export default {
  name: 'App',
  data () {
    return {
    }
  },

  created () {
    let editor_init = document.createElement('script')
    editor_init.type = 'text/javascript'
    editor_init.src = '/static/admin/question_hand_import/js/editor-init.js'
    document.getElementsByTagName('body')[0].appendChild(editor_init)
    let admin_hand_import = document.createElement('script')
    admin_hand_import.type = 'text/javascript'
    admin_hand_import.src = '/static/admin/question_hand_import/js/admin_addQuestions.js'
    document.getElementsByTagName('body')[0].appendChild(admin_hand_import)
  },

}
</script>
