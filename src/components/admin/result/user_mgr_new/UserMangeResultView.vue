<template>
  <div class="viewFrameWork" :class="setFullOrMini" id="viewFrameWork">
    <Header>
      <HeaderMiddle slot="header-middle"></HeaderMiddle>
    </Header>
    <div class="viewFrameWork-main">
      <Side @fold="onClickFold"></Side>
      <Body></Body>
    </div>
  </div>
</template>
<script>
  import Header from '../../comtwo/Header'
  import HeaderMiddle from './HeaderMiddle'
  import Side from '../../comtwo/Side'
  import Body from './Body'
  export default {
    name: 'UserMangeResultView',
    data(){
      return{
        flag:false
      }
    },
    components:{Header,HeaderMiddle,Side,Body},
    methods:{
      onClickFold(){
        this.flag = !this.flag
      },
    },
    computed:{
      setFullOrMini(){
        return this.flag? "sidebar-min":"sidebar-full"
      }
    },
    mounted(){
      let setting = document.createElement('script')
      setting.type = 'text/javascript'
      setting.src = '/static/admin/result/user_mgr_new/js/initial_resultSetting.js'
      document.getElementsByTagName('body')[0].appendChild(setting)

      let mark = document.createElement('script')
      mark.type = 'text/javascript'
      mark.src = '/static/admin/result/user_mgr_new/js/admin_person_results.js'
      document.getElementsByTagName('body')[0].appendChild(mark)
    }
  }
</script>

