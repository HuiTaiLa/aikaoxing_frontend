<template>
  <div class="viewFrameWork" :class="setFullOrMini" id="viewFrameWork">
    <Header>
      <HeaderMiddle slot="header-middle"></HeaderMiddle>
    </Header>
    <div class="viewFrameWork-main">
      <Side @fold="onClickFold"></Side>
      <Body></Body>
    </div>
    <div class="modal fade" id="saveQuestionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index: 99999;">
      <div class="modal-dialog modal-small" role="document" style="width:440px;">
        <div class="modal-content">
          <div class="modal-header">
            <span class="icon-a_success"></span>

            <h4 class="modal-title">试题保存成功</h4>
          </div>

          <div class="modal-body">
            <span>试题保存成功，是否去创建考试？</span>
          </div>

          <div class="modal-footer">

            <button type="button" class="btn btn-default" data-dismiss="modal" id="paperList">继续录题</button>
            <button  type="button" class="btn btn-primary" id="createExam">去创建考试</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../comtwo/Header'
  import Side from '../../comtwo/Side'
  import Body from  './Body'
  import HeaderMiddle from './HeaderMiddle'
  export default {
    name: 'QuestionHandImportView',
    data(){
      return{
        flag:false
      }
    },
    components:{Header,Side,Body,HeaderMiddle},
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
