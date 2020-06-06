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
  import Side from '../../comtwo/Side'
  import HeaderMiddle from './HeaderMiddle'
  import Body from  './Body'
  export default {
    name: 'QuestionExcelImportView',
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
  }
</script>
