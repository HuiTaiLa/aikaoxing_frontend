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
  import Header from '../comtwo/Header'
  import HeaderMiddle from './HeaderMiddle'
  import Side from '../comtwo/Side'
  import Body from './Body'
  export default {
    name: 'PaperAddNewView',
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

