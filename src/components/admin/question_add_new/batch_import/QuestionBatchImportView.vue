<template>
  <div class="viewFrameWork" :class="setFullOrMini" id="viewFrameWork">
    <Header>
      <HeaderMiddle slot="header-middle"></HeaderMiddle>
    </Header>
    <div class="viewFrameWork-main">
      <Side @fold="onClickFold"></Side>
      <Body></Body>
    </div>
    <div class="modal fade" id="txtImport" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document" style="width:440px;">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">导入结果</h4>
          </div>
          <div class="modal-body">
            <div class="import_row" style="text-align:center">
              <div style="margin:20px auto 20px;">
                <span id="import_result" style="font-size:18px;"></span>
              </div>
              <div>
                <button type="button" class="btn btn-warning" id="continueAddQuestion">继续录入</button>
                <button v-has-permission="['view:admin/exam_add_new']" type="button" class="btn btn-default" id="conResult">去创建考试</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../../comtwo/Header'
  import HeaderMiddle from './HeaderMiddle'
  import Side from '../../comtwo/Side'
  import Body from './Body'
  export default {
    name: 'QuestionBatchImportView',
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

