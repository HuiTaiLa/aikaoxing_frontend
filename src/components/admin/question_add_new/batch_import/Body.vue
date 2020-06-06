<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area tab-col2">
            <ul class="ksx-tabs-card">
              <div id="addQuestion1">
                <li class="ksx-tab-item active">
                  <a href="javascript:void(0);" style="text-decoration: none">批量录入</a>
                </li>
                <li class="ksx-tab-item ksx-tab-item-border-0">

                  <a href="/admin/question_add_new/hand_import#/index" style="text-decoration: none">
                    <span class="ksx-tab-item-span">手动录入</span>
                  </a>

                </li>
                <li class="ksx-tab-item">

                  <a href="/admin/question_add_new/excel_import#/index" style="text-decoration: none">
                    Excel导入
                  </a>

                </li>

              </div>
            </ul>
          </div>

          <div class="tab-content">
            <form action="" name="form" method="post" id="subForm1">
              <div role="tabpanel" class="tab-pane active" id="manualInput">
                <div class="batch-type">
                  <div id="addQuestion2">
                    <div style="display: inline-block;">
                      <span class="intro">试题分类</span>
                      <button type="button" class="btn btn-default" id="selTypeLink">
                        试题分类
                      </button>
                      <input type="hidden" class="" name="classification" value="">
                      <div id="classDialog" hidden="">
                        <iframe width="100%" height="300px" name="selTypeModal" id="selTypeModal">
                        </iframe>
                      </div>
                    </div>

                    <span class="intro">批量补充难度</span>
                    <div class="simulationSelect difficult">
                      <span class="title-font" >简单</span>
                      <em class="glyphicon glyphicon-triangle-bottom" ></em>
                      <div class="simulationOption difficult" >
                        <div class="one" >简单</div>
                        <div class="two" >普通</div>
                        <div class="three">困难</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="batch-cont" id="inputArea">

                <div class="addQuestion4"></div>
                <div class="batch-input clearfix">
                  <div class="batch-input-box">
                    <div class="toolbar">
                      <span class="title">输入区：</span>
                      <div class="toolbar-right">
                        <span class="example" id="showExample">输入范例 <span class="icon icon-a_arrow_down" style="font-size: 12px;"></span> </span>
                        <span class="standard" id="showStandard">输入规范 <span class="icon icon-a_arrow_down" style="font-size: 12px;"></span> </span>
                      </div>
                    </div>
                    <Example></Example>
                    <Standard></Standard>
                    <Standard1></Standard1>
                    <!--<div class="textarea-group" style="width: 100%; height: 569px; display: inline-block;">-->
                      <div id="text-input" class="box fr-box fr-ltr fr-basic fr-top"
                           style="white-space: pre; resize: none; margin-left: 0px; width: 546px; height: 100%; overflow: auto;">
                        <!--<QuestionBatchImportToolBar></QuestionBatchImportToolBar>-->
                        <!--<div class="fr-wrapper show-placeholder" dir="ltr">-->
                          <!--<div class="fr-element fr-view" dir="ltr" contenteditable="true" aria-disabled="false"-->
                               <!--spellcheck="false"><p><br></p></div>-->
                          <!--<span class="fr-placeholder"-->
                                <!--style="font-size: 12px; line-height: 31px; margin-top: 0px; padding-top: 16px; padding-left: 16px; margin-left: 0px; padding-right: 16px; margin-right: 0px; text-align: start;">请将所选试题复制到这里</span>-->
                        <!--</div>-->
                      </div>
                    <!--</div>-->
                  </div>

                  <div class="batch-preview-box">
                    <div class="toolbar">
                      <span class="title">检查区：</span>
                      <span class="error-text" id="errorText"><span class="count" id="errorCount"></span>处错误，请参照例题修改</span>
                      <button class="btn btn-s-blue" id="nextError">下一处</button>
                    </div>
                    <div class="box">
                      <div id="preview"></div>
                    </div>
                  </div>

                  <div class="dialog-style-button" hidden="">
                    <div class="body-toolbar-right toolbar-right-operation">
                      <button type="button" class="btn btn-warning btn-size" id="importButton">
                        <span id="import1" style="display:inline-block;">录入</span>
                        <span id="import_questions1" style="display:none;">录入中<span class="ani_dot">...</span></span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Example from './Example'
  import Standard from './Standard'
  import Standard1 from './Standard1'
  import Loading from './Loading'

export default {
  name:'Body',
  components:{
    Example,
    Standard,
    Standard1,
    Loading,
  },
}
</script>
