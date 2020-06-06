<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area tab-col4">

            <div id="introTopDialog" hidden="">
              <div class="hornBox"></div>
              <div class="intro-box">
                <span class="title-tip"><span class="txt">功能菜单</span><span class="blue"></span></span>
                <p class="content-tip">快捷添加试题入口，没有试题时可通过此处录入试题</p>
              </div>
              <div class="intro-bottom clearfix">
                <div class="circularBox">
                  <span class="circularCh first"></span>
                  <span class="circularCh last introButton"></span>
                </div>
                <div class="buttonBox">
                  <a class="introjs-button closeIntroBtn" role="button" tabindex="0">跳过</a>
                  <a role="button" tabindex="0" class="introjs-button introjs-nextbutton introButton">下一步<i class="icon-a_arrow_right"></i></a>
                </div>
              </div>
            </div>


            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="step1">
                <a href="/admin/paper_add_new/#/index">
                  第一步:创建试卷
                </a>
              </li>
              <li role="presentation" class="active step3">
                <a href="#createTest3" aria-controls="create3" role="tab" data-toggle="tab">
                  第二步:<span id="tabTitleText">组卷方式</span>
                </a>
              </li>
              <li role="presentation">
                <a href="#createTest4" aria-controls="create4" role="tab" data-toggle="">
                  第三步:发布考试
                </a>
              </li>
            </ul>


            <div class="line"></div>

            <!-- Tab panes -->
            <form action="/baseinfo/admin/addtestqm" name="form" method="post" id="subForm">
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="manualInput">
                  <div class="input-questions-area clearfix">
                    <div class="info-board">
                      <div class="total">
                        <p>总题数：<span class="test_total">0</span>题</p>
                        <p>当前总分：<span class="total_score">0</span>分</p>

                      </div>
                    </div>

                    <div id="introTopDialog2" hidden="">
                      <div class="hornBox"></div>
                      <div class="intro-box">
                        <span class="title-tip"><span class="txt">组卷过程</span><span class="blue"></span></span>
                        <p class="content-tip">1. 创建大题 <br> 2. 在大题内选择试题进行组卷 <br>3. 左侧为大题列表</p>
                      </div>
                      <div class="intro-bottom clearfix">
                        <div class="circularBox">
                          <span class="circularCh first prevIntroBtn"></span>
                          <span class="circularCh last"></span>
                        </div>
                        <div class="buttonBox">
                          <button class="again-button prevIntroBtn">再看一遍</button>
                          <a class="introjs-button introjs-skipbutton closeIntroDialog introjs-donebutton" role="button" tabindex="0">知道了</a>
                        </div>
                      </div>
                    </div>

                    <div class="questions-board">
                      <h3><input class="edit-paper-name form-control" type="text" name="edit_paper_name" value="" placeholder="点击输入试卷名称"></h3>
                      <p class="emptyTip">当前试卷还是空空如也，点击下方添加新题型！</p>
                      <div class="group_main"></div>

                      <div class="ipt-questions-box ipt-questions-box-w com-drop buttonLeft default_create_q_model" style="display: inline-block;">
                        <div class="create_q_contain">
                          <div class="create_q_group_icon">
                            <span>+</span>
                          </div><br>
                          <span class="create_q_group_text">创建新的大题</span>
                        </div>
                      </div>
                      <div class="ipt-questions-box ipt-questions-box-w com-drop buttonLeft type_create_q_model" style="display: none;">
                        <div class="create_q_contain">
                          <button type="button" class="q_type_btn questionType_add" num="1"><span>单选题</span></button>
                          <button type="button" class="q_type_btn questionType_add" num="2"><span>多选题</span></button>
                          <button type="button" class="q_type_btn questionType_add" num="3"><span>判断题</span></button>
                          <button type="button" class="q_type_btn questionType_add" num="4"><span>填空题</span></button>
                          <button type="button" class="q_type_btn questionType_add" num="5"><span>问答题</span></button>
                        </div>
                        <div class="btn-group">

                          <ul class="dropdown-menu" role="menu">
                            <li>
                              <a href="javascript:void(0)"  class="questionType_add" num="1">单选题</a>
                            </li>
                            <li>
                              <a href="javascript:void(0)"  class="questionType_add" num="2">多选题</a>
                            </li>
                            <li>
                              <a href="javascript:void(0)"  class="questionType_add" num="3">判断题</a>
                            </li>
                            <li>
                              <a href="javascript:void(0)"  class="questionType_add" num="4">填空题</a>
                            </li>
                            <li>
                              <a href="javascript:void(0)"  class="questionType_add" num="5">问答题</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="batchInput">
                </div>
              </div>
            </form>
          </div>

          <div class="questionContet_simple">
            <div class="questionContent_radio">
              <div class="q-item keyFillContent_first">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck" checked="checked">A</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer1">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">B</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer2">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">C</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer3">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">D</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer4">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">E</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer5">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">F</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer6">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">G</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer7">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">H</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer8">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">I</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer9">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">J</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer10">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">K</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer11">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">L</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer12">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">M</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer13">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">N</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer14">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">O</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer15">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">P</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer16">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">Q</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer17">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">R</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer18">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">S</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer19">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="radio" value="" name="radioOrCheck" class="radioOrCheck">T</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer20">
              </div>

              <div class="q-opra">
                <a class="q-opra-add addKeyRadioOrCheck" href="javascript:void(0)"><em class="icons8-plus"></em><span>增加选项</span></a>
                <a class="q-opra-reduce removeKeyRadioOrCheck" href="javascript:void(0)"><em class="icons8-trash-can"></em><span>删除选项</span></a>
              </div>
            </div>

            <div class="questionContent_checkbox">
              <div class="q-item keyFillContent_first">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck" checked="checked">A</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer1">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">B</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer2">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">C</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer3">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">D</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer4">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">E</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer5">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">F</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer6">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">G</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer7">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">H</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer8">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">I</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer9">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">J</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer10">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">K</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer11">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">L</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer12">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">M</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer13">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">N</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer14">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">O</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer15">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">P</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer16">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">Q</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer17">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">R</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer18">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">S</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer19">
              </div>
              <div class="q-item keyFillContentAdd">
                <span><input type="checkbox" value="" name="radioOrCheck" class="radioOrCheck">T</span>
                <input type="text" placeholder="请输入内容" class="q-ipt q-ipt-i" name="answer20">
              </div>
              <div class="q-opra">
                <a class="q-opra-add addKeyRadioOrCheck" href="javascript:void(0)"><em class="icons8-plus"></em><span>增加选项</span></a>
                <a class="q-opra-reduce removeKeyRadioOrCheck" href="javascript:void(0)"><em class="icons8-plus"></em><span>删除选项</span></a>
              </div>
            </div>

            <div class="questionContent_judge">
              <div class="q-item">
                    <span class="judgeDom">
                        <input type="radio" value="" name="judge" has="judgeYes" class="radioOrCheck" checked=""> 正确
                        <input type="radio" value="" name="judge" has="judgeNo" class="radioOrCheck"> 错误
                        <input type="hidden" class="radioOrCheck" name="key1" value="">
                        <input type="hidden" class="radioOrCheck" name="key2" value="">
                    </span>
              </div>
            </div>

            <div class="questionContent_fill">
              <div class="q-item keyFillContent keyFillContent_first">
                <span>答案</span>
                <input name="keyFill" type="text" class="q-ipt q-ipt-t">
              </div>
              <div class="q-opra">
                <a class="q-opra-add addKeyFill" href="javascript:void(0)"><em class="icons8-plus"></em><span>增加选项</span></a>
                <a class="q-opra-reduce removeKeyFill" href="javascript:void(0)"><em class="icons8-plus"></em><span>删除选项</span></a>
              </div>
            </div>

            <div class="questionContent_cloze">
              <div class="q-item">
                <span>答案</span>
                <div class="textareaDom" contenteditable="true"></div>
                <input type="hidden" class="radioOrCheck" name="key1" value="1">
              </div>
            </div>
          </div>

          <div class="group_simple" id="group_simple">
            <div class="questions-group group_title">
              <h4>
                <input type="text" class="q-ipt q-ipt-t-s" name="test_tittle">
                <span class="inline-ite" hidden="">每题分数<input type="text" name="test_peer_score">分</span>
                <span class="inline-ite" hidden="">每题答题时长<input type="text" name="test_peer_time">秒</span>
                <span class="right_disoeder">
                        <!--<input class="disorder question-disorder" type="checkbox" name="question_disorder">-->
                        <!--<span class="disorder question-disorder" name="selection">试题乱序</span>-->
                        <!--<input class="disorder options-disorder" type="checkbox" name="options_disorder">-->
                        <!--<span class="disorder options-disorder" name="selection">选项乱序-->
                            <!--<i class="icons8-help tooltip-disorder" data-toggle="tooltip" data-placement="top" title="" data-original-title="打开选项乱序后，每个学员的选项排序均不完全相同，减少抄袭可能性。"></i>-->
                        <!--</span>-->
                    </span>

                <div id="selection_score" style="display:none" data-placement="bottom" title="漏选按正确选项个数计算分数，错选不给分">
                  <input type="checkbox" name="less_choice_confirm">
                  <span name="selection" class="disorder options-disorder">漏选给分
                            <i class="icons8-help tooltip-disorder" data-toggle="tooltip" data-placement="top" data-original-title="打开漏选给分后，学员仅选中部分正确选项时，将根据选项数/正确选项总数计算该学员的本题得分。选中错误选项将不得分"></i>
                        </span>
                  <span name="vacant" class="hidden">按空给分</span>
                  <span class="inline-ite" name="option_peer_score_show" style="display:none;margin-left: 10px;"><span name="selection">每个选项</span>
                        <span name="vacant">每空</span>
                        <input type="text" name="option_peer_score" style="width: 36px;height: 28px;margin: 0 7px;">分</span>
                </div>
              </h4>
            </div>
            <div class="diff_div">
              <div class="empty_q_tip">当前题型还是空空如也，点击按钮添加试题！</div>
              <span class="extract-info selDifficultLink_text"></span>
            </div>
            <div class="group_questionShow">
              <div class="empty_q_tip">此大题还未添加试题，请点击"<a class="selQuestionLink" href="javascript:void(0)">添加试题</a>"按钮选择试题</div>
              <div class="manual-cont"></div>
            </div>
            <div class="group_questionAdd">
              <div class="questions-group">
                <h4><input type="text" placeholder="试题描述" name="question" class="q-ipt q-ipt-t"></h4>
                <div class="questionContent">
                </div>
                <div class="analysisDom">
                  <span>解析</span>
                  <div class="textareaDom" contenteditable="true" id="analysisEditor" name="analysis"></div>
                </div>
                <div class="btn-div">
                  <button class="btn btn-blue-border2 saveQuestionBtn btn-default" type="button">保存</button>
                  <input type="hidden" name="tab_num" value="4">
                </div>
              </div>
            </div>
          </div>
          <!---->
          <div id="paperTpye1" style="display:none">
            <div class="extract-box-tit">
              <span class="questionTypeText"></span>
              <div class="extract-box-btnDiv">
                    <span class="t">
                        <a class="btn btn-blue-border2 selQuestionLink" href="javascript:void(0)">

                        <span>添加试题</span>
                        </a>
                    </span>
              </div>
              <input type="hidden" class="questions" name="test_ids" value="">
            </div>
          </div>

          <div id="paperTpye2" style="display:none">
            <div class="extract-box-tit">
              <span class="questionTypeText"></span>
              <div class="extract-box-btnDiv">
                <span class="t">
                    <a class="btn btn-blue-border2 selQuestionsTypeLink" href="javascript:void(0)">
                    <span>添加试题</span>
                    </a>
                </span>

              </div>

              <input type="hidden" name="test_classify_id" value="">
              <input type="hidden" class="checked_classify_ids" value="">
              <input type="hidden" name="test_classify_name" class="checked_classify_ids_name" value="">
              <input type="hidden" name="test_label_id" value="">
              <input type="hidden" class="checked_label_ids" value="">
              <input type="hidden" name="test_label_Name" class="checked_label_ids_name" value="">
              <input type="hidden" class="" name="is_avgChk" value="">
              <input type="hidden" name="is_avg" value="">
              <input type="hidden" class="" name="hard" value="">
              <input type="hidden" class="" name="totelNum" value="">
            </div>
          </div>

          <input type="hidden" name="add_style" value="">

          <form id="asyncForm_question" style="display: none">
            <input type="hidden" name="id" value="">
            <input type="hidden" name="classification" value="0">
            <input type="hidden" name="label" value="">
            <input type="hidden" name="type" value="">
            <input type="hidden" name="tab_num" value="">
            <input type="hidden" name="status" value="enable">
            <input type="hidden" name="difficult" value="middle">
            <input type="hidden" name="encrypt" value="0">
            <textarea name="question"></textarea>
            <textarea name="analysis"></textarea>
            <input type="hidden" name="testTittle" value="">
            <input type="hidden" name="testPeerScore" value="">
            <input type="hidden" name="testPeerTime" value="">
            <div></div>
          </form>

          <form id="asyncForm_paper" action="" method="post" target="theWindow" style="display: none">
            <input type="hidden" name="account" :value="user.account">
            <input type="hidden" name="companyId" :value="user.companyId">
            <input type="hidden" name="paperName" value="">
            <input type="hidden" name="paperStyle" value="0">
            <input type="hidden" name="paperType" value="">
            <input type="hidden" name="paperSetNum" value="">
            <input type="hidden" name="totalScore" value="">
            <input type="hidden" name="totalTime" value="">
            <input type="hidden" name="paperStatus" value="0">
            <input type="hidden" name="perTimeRestrict" value="">
            <div></div>
          </form>

          <div id="iframe-box"></div>

          <input type="hidden" name="paper_name" value="">
          <input type="hidden" name="paper_style" value="0">
        </div>

        <div id="addNewQuestionFixed" class="fixed-add-btn">
          <div class="circle">创建<br>新的大题</div>
          <ul class="question-container">
            <li class="questionType_add" num="1"><span>单选题</span></li>
            <li class="questionType_add" num="2"><span>多选题</span></li>
            <li class="questionType_add" num="3"><span>判断题</span></li>
            <li class="questionType_add" num="4"><span>填空题</span></li>
            <li class="questionType_add" num="5"><span>问答题</span></li>
          </ul>
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
