<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix">
      <div class="body-toolbar-left pull-left toolbar-left-nav">
        <!--<button type="button" class="btn btn-default" id="previewBtn"><i class="icons8-eye"></i>预览</button>-->

        <!--<button type="button" class="btn btn-default" id="downloadBtn"><i class="icons8-icon-7"></i>下载</button>-->

        <!--<button type="button" class="btn btn-default" id="addQuestionsBtn"><i class="icon-a_btn_add"></i>录入试题</button>-->

        <button type="button" class="btn btn-default" id="changeClassBtn"><i class="icon-a_btn_classify"></i>

          <span>试卷分类</span>

        </button>
      </div>
      <div class="body-toolbar-right pull-right toolbar-right-operation">

        <button type="button" class="btn btn-primary " id="savePaperBtn">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderMiddle',
  }
</script>
