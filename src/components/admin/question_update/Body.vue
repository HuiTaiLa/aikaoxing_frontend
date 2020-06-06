<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area tab-col2">
            <form action="/baseinfo/admin/addtestqm" name="form" method="post" id="subForm">
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="manualInput">
                  <div class="batch-type">
                    <span class="intro">试题分类</span>
                    <button type="button" class="btn btn-default" id="selTypeLink">请选择</button>
                    <input type="hidden" class="" name="classification" value="">
                    <div id="classDialog" hidden="">
                      <iframe width="100%" height="300px" name="selTypeModal" id="selTypeModal"></iframe>
                    </div>
                    <span class="intro">试题类型</span>
                    <div class="simulationSelect testType">
                      <span class="title-font"></span>
                      <em class="glyphicon glyphicon-triangle-bottom"></em>
                      <div class="simulationOption testType" style="display: none;">
                        <div class="one">单选题</div>
                        <div class="two">多选题</div>
                        <div class="three">判断题</div>
                        <div class="four">填空题</div>
                        <div class="five">问答题</div>
                      </div>
                    </div>
                    <select name="type" class="form-control hidden">
                      <option value="1">单选题</option>
                      <option value="2">多选题</option>
                      <option value="3">判断题</option>
                      <option value="4">填空题</option>
                      <option value="5">问答题</option>
                    </select>
                    <span class="intro">试题难度</span>
                    <div class="simulationSelect difficult">
                      <span class="title-font"></span>
                      <em class="glyphicon glyphicon-triangle-bottom"></em>
                      <div class="simulationOption difficult" style="display: none;">
                        <div class="one">简单</div>
                        <div class="two">普通</div>
                        <div class="three">困难</div>
                      </div>
                    </div>
                    <select name="difficult" class="form-control hidden">
                      <option value="simple">简单</option>
                      <option value="middle">普通</option>
                      <option value="hard">困难</option>
                    </select>
                  </div>
                  <div class="combPanel" style="display:none;">
                    <div class="title">
                      <span class="tip">题干</span>
                      <span class="intro">这里填写题目描述</span>
                    </div>
                      <div id="combEditor" class="questions_add wangEditor-txt" contenteditable="true"
                           style="height: 85px;"><p><br></p>
                      </div>
                    <input name="comb_question" type="hidden">
                  </div>
                  <div class="questionPanel" style="display:none;">
                    <div class="title">
                      <span class="tip">小题</span>
                    </div>
                    <div class="questionList"></div>
                  </div>
                  <div class="combBatchPanel" style="display:none;">
                    <div class="title">
                      <span class="tip">小题</span>
                      <span class="intro">选择录入的题型，并按格式输入题目，保存后将录入题目</span>
                    </div>
                    <div class="combBatchBlock">
                      <div class="button-bar">
                        <input type="radio" name="insert_type" id="type1" class="hidden" value="1" checked="">
                        <label class="btn btn-default" for="type1">单选题</label>
                        <input type="radio" name="insert_type" id="type2" class="hidden" value="2">
                        <label class="btn btn-default" for="type2">多选题</label>
                        <input type="radio" name="insert_type" id="type3" class="hidden" value="3">
                        <label class="btn btn-default" for="type3">判断题</label>
                        <input type="radio" name="insert_type" id="type4" class="hidden" value="4">
                        <label class="btn btn-default" for="type4">填空题</label>
                        <input type="radio" name="insert_type" id="type5" class="hidden" value="5">
                        <label class="btn btn-default" for="type5">问答题</label>
                        <button type="button" class="btn btn-warning pull-right" id="importBtn">
                          <span id="import" style="display:inline-block;">保存</span>
                          <span id="import_questions" style="display:none;">导入中<span class="ani_dot">...</span></span>
                        </button>
                      </div>
                      <div class="batch-cont" id="inputArea">
                        <div class="batch-input clearfix">
                          <div class="batch-input-box">
                            <div class="toolbar">
                              <span class="title">输入区：<span class="example" id="showExample">查看例题</span></span>
                            </div>
                            <Example></Example>
                            <div id="text-input" class="box fr-box fr-ltr fr-basic fr-top">
                            </div>
                          </div>
                          <div class="batch-preview-box">
                            <div class="toolbar">
                              <span class="title">检查区：</span>
                              <span class="error-text" id="errorText">
                                                 <span class="count" id="errorCount"></span>处错误，请参照例题修改
                                            </span>
                              <button class="btn btn-s-blue" id="nextError">下一处</button>
                            </div>
                            <div class="box">
                              <div id="preview"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="question-content">
                    <div class="descPanel">
                      <div class="title">
                        <span class="tip">题干</span>
                        <span class="intro">这里填写题目描述</span>
                      </div>
                        <div id="questionEditor" class="questions_add wangEditor-txt" contenteditable="true"
                             style="height: 85px;"><p><br></p>
                        </div>
                      <input name="question" type="hidden">
                      <input name="rawQuestion" type="hidden">
                    </div>
                    <div class="keyRadio keyPanel">
                      <div class="title">
                        <span class="tip">选项</span>
                        <span class="intro">单/多选题的选项范围从&nbsp;2&nbsp;到&nbsp;20&nbsp;</span>
                      </div>
                      <div class="addKeyBtn">
                        <button type="button" class="btn btn-l-gray addKey"><i class="plus-style icons8-plus"></i>添加一个选项</button>
                      </div>
                    </div><!-- /.keyRadio keyPanel -->
                    <div class="keyJudge keyPanel" style="display: none;">
                      <div class="title">
                        <span class="tip">选项</span>
                        <span class="intro">选择正确或者错误（默认正确）</span>
                      </div>
                      <div class="button-box">
                        <input type="radio" class="hidden" name="keyChk" id="judgeYes" value="" checked="">
                        <label for="judgeYes" class="btn btn-border-gray">正确</label>
                        <input type="radio" class="hidden" name="keyChk" id="judgeNo" value="">
                        <label for="judgeNo" class="btn btn-border-gray">错误</label>
                      </div>
                      <input type="hidden" class="radioOrCheck" name="key1" id="keyYes" value="">
                      <input type="hidden" class="radioOrCheck" name="key2" id="keyNo" value="">
                    </div>
                    <div class="keyFill keyPanel" style="display: none;">
                      <div class="title">
                        <span class="tip">答案</span>
                        <span class="intro">请填写每个填空的答案<i class="icons8-help answer-help"></i></span>
                        <div class="answer-prompt" style="display: none">
                          <span class="importent">同义词</span><br>
                          同义词是答案的关键信息。填写后，系统可根据同义词自动判分。<span class="importent">一个答案有不同的答法，可加入多个同义词，满足其一即可得分。</span> （如：china 和 CHINA）
                        </div>
                        <div class="pull-right form-group answer_disorder_container">
                          <div class="col-sm-9">
                            <span class="switch-on switch-all answerDisorder" style="border-color: rgb(77, 143, 225); box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset; background-color: rgb(77, 143, 225);"><span class="slider"></span></span>
                          </div>
                          <label class="placeholder">答案乱序<i class="icons8-help disorder-help"></i></label>
                          <div class="disorder-prompt" style="display: none">
                            <span class="importent">答案乱序</span><br>
                            只需要对相应的关键信息，而 <span class="importent">对答案的顺序不做要求。</span>
                          </div>
                        </div>
                      </div>
                      <div class="addKeyFillBtn">
                        <button type="button" class="btn btn-l-gray addKeyFill"><i class="plus-style icons8-plus"
                                                                                   style="top: 0"></i>增加一个填空
                        </button>
                      </div>
                    </div>
                    <div class="keyCloze keyPanel" style="display: none;">
                      <div class="title">
                        <span class="tip">答案</span>
                        <span class="intro">这里填写答案</span>
                      </div>
                        <div id="clozeEditor" class="questions_add wangEditor-txt" contenteditable="true"
                             style="height: 85px;"><p><br></p>
                        </div>
                      <input name="answer1" type="hidden">
                      <input name="rawAnswer" type="hidden">
                      <input type="hidden" class="radioOrCheck" name="key1" value="1">
                      <div class="keyWordPanel">
                        <div class="title" style="position: relative;">
                          <span class="tip">关键词</span>
                          <span class="intro">这里添加答案关键词</span><span class="keyWordBadge">?</span>
                          <div id="keyWordContent">系统将自动根据关键字进行判分,每个核心词是普通词分数的2倍。并列关键词（或的关系）用 | 去分隔。</div>
                        </div>
                        <div class="key_block" id="keyBlock" style="display:none"></div>
                        <input type="text" name="key_word" class="form-control" placeholder="添加关键词">
                        <div class="button-bar">
                          <button type="button" class="btn btn-gray btn-normal-word" id="normalWord"><em class="icons8-plus"></em>普通关键词</button>
                          <button type="button" class="btn btn-warning btn-key-word" id="keyWord"><em class="icons8-plus"></em>核心关键词</button>
                        </div>
                      </div>
                    </div>
                    <div class="analysisPanel">
                      <div class="title">
                        <span class="tip">解析</span>
                        <span class="intro">这里填写该问题对应的答案解释</span>
                      </div>
                        <div id="analysisEditor" class="questions_add wangEditor-txt" contenteditable="true"
                             style="height: 85px;"><p><br></p>
                        </div>
                      <input name="analysis" type="hidden">
                      <input name="rawAnalysis" type="hidden">
                    </div>
                  </div>
                </div><!-- /#manualInput -->
                <div class="add-questions-btn">
                  <button type="button" class="btn btn-warning" id="saveAllBtn">全部保存</button>
                </div>
              </div><!-- /.tab-content -->
              <!--<div role="tabpanel" class="tab-pane" id="batchInput"></div>-->
            </form>
            <script type="text/plain" id="editor"></script>

          </div><!-- /.tab-area tab-col2 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading'
  import Example from './Example'

export default {
  name:'Body',
  components:{
    Loading,
    Example
  },
}
</script>
