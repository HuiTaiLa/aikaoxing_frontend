<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area tab-col2">
            <ul class="ksx-tabs-card" role="tablist">
              <li class="ksx-tab-item ksx-tab-item-border-0">
                <a href="/admin/question_add_new/batch_import#/index">
                  批量录入
                </a>
              </li>
              <li class="ksx-tab-item">
                <a href="/admin/question_add_new/hand_import#/index">
                  <span class="ksx-tab-item-span">手动录入</span>
                </a>
              </li>
              <li class="ksx-tab-item active" id="showExcelItem">
                <a href="javascript:void(0);">Excel导入</a>
              </li>
            </ul>
          </div>
          <div id="excel_import">
            <img class="img-top" src="/static/admin/question_excel_import/images/a_upload.svg">
            <span class="title-excel">Excel批量导入试题</span>
            <div class="tip-excel">
              <p>Excel导入试题功能支持“单选题、多选题、判断题、填空题、问答题”五类题型的导入</p>
              <p>第一步：下载Excel试题模版</p>
              <p>第二步：使用模版整理试题，点击“上传Excel”完成试题导入</p>
            </div>
            <div class="btn-excel">
              <span style="display: none;color: #FF4B50;margin-bottom: 10px;" class="error-text-tip">表格大小不得大于1MB，请您重新编辑表格后再次上传</span>
              <form id="uploadForm" class="upload-form" enctype="multipart/form-data" method="post" action="/admin/online_import_html" target="excel_form" style="display:inline-block">
                <iframe class="hidden" name="excel_form" id="excelFrame"></iframe>
                <div class="btn btn-primary upload" style="font-size: 14px;">上传excel<input type="file" name="uploadFile" id="excelUpload"></div>
                <input type="hidden" name="account" :value="user.account">
                <input type="hidden" name="companyId" :value="user.companyId">
              </form>
              <a class="btn btn-primary download" style="margin: 0 10px;" href="/static/admin/question_excel_import/nolable/试题上传模版.xlsx">下载模版</a>
            </div>
          </div>
          <div id="error-div" hidden="">
            <span class="title-excel">Excel导入结果</span>
            <div class="error-top">
              <div class="error-tip">
                <div class="error">
                  <span class="icon-a_error"></span>
                  <div class="title error-title" style="display: inline-block;margin-bottom: 10px;"> 上传失败:导入格式错误</div>
                  <ol></ol>
                </div>
              </div>
            </div>
            <div class="error-btn">
              <button class="btn excelBtn btn-default" type="button">重新导入</button>
            </div>
          </div>
          <div id="success-div" hidden="">
            <span class="title-excel">Excel导入结果</span>
            <div class="success-top">
              <div class="success-tip">
                <div class="success">
                  <span class="icon-a_success"></span>
                  <div class="title success-title" style="display: inline-block;margin-bottom: 10px;"> 上传成功:</div>
                  <ol></ol>
                </div>
              </div>
            </div>
            <div class="success-btn">

              <button class="btn excelAgainBtn btn-default" type="button">继续导入</button>
              <button v-has-permission="['view:admin/exam_add_new']" class="btn btn-default" id="createExam" type="button">去创建考试</button>
              <button class="btn btn-default" id="questionsList" type="button">查看试题</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading'
  import {mapState} from 'vuex'
export default {
  name:'Body',
  components:{
    Loading,
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
}
</script>
