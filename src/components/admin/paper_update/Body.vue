<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area tab-col4">

            <form action="/baseinfo/admin/addtestqm" name="form" method="post" id="subForm">
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="manualInput">
                  <div class="input-questions-area clearfix">
                    <div class="info-board" style="position: relative; top: 30px;">
                      <div v-for="(testItem,testIndex) in (paperInfo != null? paperInfo.children : [])" class="item group_simple left_group_simple animate" :sort="testItem.id" :key="testIndex">
                        <p>
                        </p><h3 class="test_tittle" :sort="testItem.id">
                        <a :href="'#questions_' +　testItem.id">{{testItem.title}}</a>
                      </h3>
                        <p></p>
                        <p class="left_p">
                          共<span class="test_num" :sort="testItem.id">
                                                    {{testItem.questionNum}}
                                                        </span>题,
                          共<span class="all_fraction" :sort="testItem.id">{{testItem.totalScore}}</span>分数
                        </p>
                        <p class="left_p">每题<input type="text" name="test_peer_score" :sort="testItem.id" :value="testItem.testPeerScore">分</p>

                        <p class="test_icon_a">
                          <a href="javascript:void(0)" class="m-content-trash" aria-hidden="true" title="移除" :sort="testItem.id">
                            <i class="icon-a_operate_delete" data-toggle="tooltip" data-placement="top" data-original-title="删除"></i>
                          </a>
                          <a href="javascript:void(0)" class="m-content-up glyphicon " aria-hidden="true" title="上移" :sort="testItem.id">
                            <i class="icon-a_operate_move_up" data-toggle="tooltip" data-placement="top" data-original-title="上移"></i>
                          </a>
                          <a href="javascript:void(0)" class="m-content-down glyphicon " aria-hidden="true" title="下移" :sort="testItem.id">
                            <i class="icon-a_operate_move_down" data-toggle="tooltip" data-placement="top" data-original-title="下移"></i>
                          </a>
                        </p>
                        <div class="q_s_line"></div>
                      </div>
                      <div class="total">
                        <p>总题数：<span class="test_total">{{paperInfo != null? paperInfo.questionNum : ''}}</span>题</p>
                        <p>当前总分：<span class="total_score">{{paperInfo != null? paperInfo.totalScore : ''}}</span>分</p>
                      </div>
                    </div>


                    <div class="questions-board">
                      <h3><input class="form-control" name="paper_name" :value="paperInfo != null ? paperInfo.name : ''" placeholder="点击输入试卷名称"></h3>
                      <p class="emptyTip">当前试卷还是空空如也，点击下方添加新题型！</p>
                      <div class="group_main" v-if="paperInfo != null && paperInfo.type == 1">
                        <div  v-for="(testItem,testIndex) in (paperInfo != null ? paperInfo.children : [])" class="group_simple" :sort="testItem.id" :questiontype="testItem.type" :key="testIndex">
                          <div class="questions-group group_title">
                            <h4>
                              <input type="text" class="q-ipt q-ipt-t-s" name="test_tittle" :sort="testItem.id" :value="testItem.title">
                              <span class="inline-ite" hidden="">每题<input type="text" class="peerScore" name="test_peer_score" :sort="testItem.id">分</span>
                              <span class="inline-ite" hidden="">时长<input type="text" class="peerTime" name="test_peer_time" :sort="testItem.id">秒</span>
                            </h4>

                            <div class="extract-box-tit">
                              <span class="questionTypeText">{{testItem.title}}</span>
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
                          <div class="diff_div">
                            <div class="empty_q_tip" style="display: none;">当前题型还是空空如也，点击按钮添加试题！</div>
                                        <span class="extract-info selDifficultLink_text add_q_selDifficultLink_text">
                            简单：<span class="diff1"></span>；
                            普通：<span class="diff2"></span>；
                            困难：<span class="diff3"></span>;
                          </span>
                          </div>
                          <div class="group_questionShow">
                            <div class="empty_q_tip" style="display: none;">此大题还未添加试题，请点击"<a class="selQuestionLink" href="javascript:void(0)">添加试题</a>"按钮选择试题</div>
                            <div class="manual-cont">
                              <div v-for="(qItem,qIndex) in testItem.children" class="m-example questions" :questionid="qItem.id" :key="qIndex">
                                <dl v-if="qItem.type== 1 || qItem.type== 2">
                                  <dt v-html="qItem.question"></dt>
                                  <dd  v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) "
                                      :class="[String.fromCharCode('a'.charCodeAt()+option), qItem.key == String.fromCharCode('A'.charCodeAt()+option)? 'correctAnswer' : '']" :key="key" v-html="qItem['answer' + (option + 1)]">
                                    <em class="icon">{{String.fromCharCode('A'.charCodeAt()+option)}}</em>
                                  </dd>
                                </dl>
                                <dl v-else-if="qItem.type== 3">
                                  <dt v-html="qItem.question"></dt>
                                  <dd class="rt" :class="qItem.key == '正确'? 'correctAnswer' : ''"><em class="icon"><span class="icon-a_check"></span></em>正确</dd>
                                  <dd class="wg" :class="qItem.key == '错误'? 'correctAnswer' : ''"><em class="icon"><span class="icon-a_close"></span></em>错误</dd>
                                </dl>
                                <dl v-else-if="qItem.type== 4">
                                  <dt v-html="qItem.question"></dt>
                                </dl>
                                <dl v-else-if="qItem.type== 5">
                                  <dt v-html="qItem.question"></dt>
                                  <p>普通关键词：{{qItem.normalWords.replace(/\|/g,"或")}}</p>
                                  <p>核心关键词：{{qItem.keyWords.replace(/\|/g,"或")}}</p>
                                </dl>
                                <p class="answer" v-html="'答案：'+ (qItem.type == 4?qItem.key.replace(/[&]+/g, '或').replace(/[\|]+/g, '，') : qItem.key)"></p>
                                <p class="analysis" v-html="'解析：'+ ( qItem.analysis)"></p>
                                <span class="m-example-score">分数<input
                                name="per_score" :value="qItem.qscore" style="border: 1px solid rgb(216, 216, 216);">分</span><a
                                href="javascript:void(0)" class="m-example-edit" :questionid="qItem.id"
                                data-toggle="tooltip" data-placement="top" data-original-title="编辑"><i
                                class="icon-a_operate_edit" data-toggle="tooltip" data-placement="top"
                                data-original-title="编辑"></i></a><a href="javascript:void(0)" class="m-example-remove"
                                                                    :questionid="qItem.id"
                                                                    data-toggle="tooltip" data-placement="top"
                                                                    data-original-title="删除"><i
                                class="icon-a_operate_delete" data-toggle="tooltip" data-placement="top"
                                data-original-title="删除"></i></a><a href="javascript:void(0)" class="m-example-up"
                                                                    aria-hidden="true" title="上移"
                                                                    :questionid="qItem.id"
                                                                    data-toggle="tooltip" data-placement="top"
                                                                    data-original-title="上移"><i
                                class="glyphicon icon-a_operate_move_up" data-toggle="tooltip" data-placement="top"
                                data-original-title="上移"></i></a><a href="javascript:void(0)" class="m-example-down"
                                                                    aria-hidden="true" title="下移"
                                                                    :questionid="qItem.id"
                                                                    data-toggle="tooltip" data-placement="top"
                                                                    data-original-title="下移"><i
                                class="glyphicon icon-a_operate_move_down" data-toggle="tooltip" data-placement="top"
                                data-original-title="下移"></i></a>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="group_main" v-else-if="paperInfo != null && (paperInfo.type == 2 || paperInfo.type == 3)">
                        <div  v-for="(testItem,testIndex) in (paperInfo != null ? paperInfo.children : [])" class="group_simple click_add" :sort="testItem.id" :questiontype="testItem.type" :key="testIndex">
                          <div class="questions-group group_title">
                            <h4>
                              <input type="text" class="q-ipt q-ipt-t-s" name="test_tittle" :sort="testItem.id" :value="testItem.title">
                              <span class="now_q_type">
                              {{testItem.title}}
                              </span>
                              <span class="inline-ite">
                              <span hidden="">
                                   每题<input type="text" class="peerScore" name="test_peer_score" :sort="testItem.id" :value="testItem.testPeerScore">分
                                   每题<input type="text" class="peerTime" name="test_peer_time" :sort="testItem.id" :value="testItem.testPeerTime">分
                              </span>
                              </span>
                              <span class="questionTypeText"></span>
                              <div class="extract-box-tit">
                                <div class="extract-box-btnDiv">
                                <span class="t">
                                    <a class="btn btn-blue-border2 selQuestionsTypeLink" href="javascript:void(0)"><span>添加试题</span></a>
                                </span>
                                  <input type="hidden" name="test_classify_id" :value="testItem.questionClasses">
                                  <input type="hidden" class="checked_classify_ids" :value="testItem.questionClasses">
                                  <input type="hidden" name="test_classify_name" class="checked_classify_ids_name" :value="testItem.classNames">
                                  <input type="hidden" name="test_label_id" value="">
                                  <input type="hidden" class="checked_label_ids" value="">
                                  <input type="hidden" name="test_label_Name" class="checked_label_ids_name" value="">
                                  <input type="hidden" name="hard" :value="testItem.hards">
                                </div>
                              </div>
                              <input type="hidden" name="test_type" :value="testItem.type">
                            </h4>
                          </div>

                          <div class="diff_div" style="display: block;">
                          <span class="selDifficultLink_text">

                              简单：<span class="diff1">{{testItem.hards.split(",")[0]}}</span>；普通：<span class="diff2">{{testItem.hards.split(",")[1]}}</span>；困难：<span class="diff3">{{testItem.hards.split(",")[2]}}</span>;
                          </span>
                            <span class="extract-info class-name">分类：{{testItem.classNames}}</span>

                          </div>



                        </div>

                      </div>

                      <div class="ipt-questions-box ipt-questions-box-w com-drop buttonLeft default_create_q_model">
                        <div class="create_q_contain">
                          <div class="create_q_group_icon">
                            <span>+</span>
                          </div><br>
                          <span class="create_q_group_text">创建新的大题</span>
                        </div>
                      </div>
                      <div class="ipt-questions-box ipt-questions-box-w com-drop buttonLeft type_create_q_model">
                        <div class="create_q_contain">
                          <button type="button" class="q_type_btn" num="1"><span>单选题</span></button>
                          <button type="button" class="q_type_btn" num="2"><span>多选题</span></button>
                          <button type="button" class="q_type_btn" num="3"><span>判断题</span></button>
                          <button type="button" class="q_type_btn" num="4"><span>填空题</span></button>
                          <button type="button" class="q_type_btn" num="5"><span>问答题</span></button>
                        </div>
                        <div class="btn-group">

                          <ul class="dropdown-menu" role="menu">
                            <li>
                              <a href="javascript:void(0)" class="questionType_add" num="1">单选题</a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" class="questionType_add" num="2">多选题</a>
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

                <div role="tabpanel" class="tab-pane" id="batchInput"></div>
              </div>
            </form>
          </div>
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

        <div class="btn-up-down-box">
          <i data-toggle="tooltip" data-placement="left" data-original-title="至顶部">
            <div class="circle-btn" id="btnGoTop"><i class="icon-w_top"></i></div>
          </i>
          <i class="bottom" data-toggle="tooltip" data-placement="left" data-original-title="至底部">
            <div class="circle-btn" id="btnGoBottom"><i class="icon-w_down"></i></div>
          </i>
        </div>
      </div>
    </div>
    <form v-if="paperInfo != null" id="asyncForm_paper" class="specLink" action="" method="post" style="display: none" target="theWindow">
      <input type="hidden" name="account" :value="user.account">
      <input type="hidden" name="companyId" :value="user.companyId">
      <input type="hidden" name="paperName" :value="paperInfo.name">
      <input type="hidden" name="paperStyle" :value="paperInfo.classificationId">
      <input type="hidden" name="paperInfoId" :value="paperInfo.id">
      <input type="hidden" name="paperType" :value="paperInfo.type">
      <input type="hidden" name="paperSetNum" :value="paperInfo.setNum">
      <input type="hidden" name="totalScore" :value="paperInfo.totalScore">

      <input type="hidden" name="paperStatus" :value="paperInfo.status">
      <input type="hidden" name="perTimeRestrict" :value="paperInfo.timeRestrict">
      <div></div>
    </form>

    <div v-if="paperInfo != null && paperInfo.type == 1" class="group_simple" id="group_simple">
      <!--旧的模板
      <div class="questions-group group_title">
          <h4><input type="text" class="q-ipt q-ipt-t-s" name="test_tittle" placeholder="请输入题型名称；（例如：选择题）" />
                  <span class="inline-ite">每题<input type="text" name="test_peer_score" style="width:25px">分</span>
          </h4>
      </div>
      -->
      <div class="questions-group group_title">
        <h4>
          <input type="text" class="q-ipt q-ipt-t-s" name="test_tittle">
          <span class="inline-ite" hidden="">每题<input type="text" class="peerScore" name="test_peer_score">分</span>
          <span class="inline-ite" hidden="">时长<input type="text" class="peerTime" name="test_peer_time">秒</span>

          <!--<div class="right_disoeder">-->
            <!--<input type="checkbox" class="disorder question-disorder" name="question_disorder">-->
            <!--<span class="disorder question-disorder" name="selection">试题乱序</span>-->

            <!--<input class="disorder options-disorder" type="checkbox" name="options_disorder">-->
            <!--<span class="disorder options-disorder" name="selection">选项乱序-->
                        <!--<i class="icons8-help tooltip-disorder" data-toggle="tooltip" data-placement="top" data-original-title="打开选项乱序后，每个学员的选项排序均不完全相同，减少抄袭可能性。"></i>-->
                    <!--</span>-->
          <!--</div>-->

          <div id="selection_score" class="selection_score_new_q" style="display:none" data-placement="bottom" title="漏选按正确选项个数计算分数，错选不给分">
            <input type="checkbox" name="less_choice_confirm"><span name="selection" class="disorder options-disorder">漏选给分
                            <i class="icons8-help tooltip-disorder" data-toggle="tooltip" data-placement="top" data-original-title="打开漏选给分后，学员仅选中部分正确选项时，将根据选项数/正确选项总数计算该学员的本题得分。选中错误选项将不得分"></i>
                        </span>
            <span name="vacant">按空给分</span>
          </div>
        </h4>

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

      <div class="diff_div">
        <div class="empty_q_tip">当前题型还是空空如也，点击按钮添加试题！</div>
        <span class="extract-info selDifficultLink_text add_q_selDifficultLink_text">
                简单：<span class="diff1"></span>；
                普通：<span class="diff2"></span>；
                困难：<span class="diff3"></span>;
            </span>
      </div>
      <div class="group_questionShow">
        <div class="empty_q_tip">此大题还未添加试题，请点击"<a class="selQuestionLink" href="javascript:void(0)">添加试题</a>"按钮选择试题</div>
        <div class="manual-cont">
        </div>
      </div>


    </div>
    <div v-else-if="paperInfo != null && (paperInfo.type == 2 || paperInfo.type == 3)" class="group_simple" id="group_simple">
      <!--旧的模板
      <div class="questions-group group_title">
          <h4><input type="text" class="q-ipt q-ipt-t-s" name="test_tittle" placeholder="请输入题型名称；（例如：选择题）" />
                  <span class="inline-ite">每题<input type="text" name="test_peer_score" style="width:25px">分</span>
          </h4>
      </div>
      -->
      <div class="questions-group group_title">
        <h4>
          <input type="text" class="q-ipt q-ipt-t-s" name="test_tittle">
          <span class="inline-ite" hidden="">每题<input type="text" class="peerScore" name="test_peer_score">分</span>
          <span class="inline-ite" hidden="">时长<input type="text" class="peerTime" name="test_peer_time">秒</span>

          <!--<div class="right_disoeder">-->
            <!--<input type="checkbox" class="disorder question-disorder" name="question_disorder">-->
            <!--<span class="disorder question-disorder" name="selection">试题乱序</span>-->

            <!--<input class="disorder options-disorder" type="checkbox" name="options_disorder">-->
            <!--<span class="disorder options-disorder" name="selection">选项乱序-->
                        <!--<i class="icons8-help tooltip-disorder" data-toggle="tooltip" data-placement="top" data-original-title="打开选项乱序后，每个学员的选项排序均不完全相同，减少抄袭可能性。"></i>-->
                    <!--</span>-->
          <!--</div>-->

          <div id="selection_score" class="selection_score_new_q" style="display:none" data-placement="bottom" title="漏选按正确选项个数计算分数，错选不给分">
            <input type="checkbox" name="less_choice_confirm"><span name="selection" class="disorder options-disorder">漏选给分
                            <i class="icons8-help tooltip-disorder" data-toggle="tooltip" data-placement="top" data-original-title="打开漏选给分后，学员仅选中部分正确选项时，将根据选项数/正确选项总数计算该学员的本题得分。选中错误选项将不得分"></i>
                        </span>
            <span name="vacant">按空给分</span>
          </div>
        </h4>

        <div class="extract-box-tit">
          <span class="questionTypeText"></span>
          <div class="extract-box-btnDiv">
            <span class="t"><a class="btn btn-blue-border2 selQuestionsTypeLink" href="javascript:void(0)"><span>添加试题</span></a></span>

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

      <div class="diff_div" style="display: block;">
        <div class="empty_q_tip">当前题型还是空空如也，点击按钮添加试题！</div>
        <span class="extract-info selDifficultLink_text add_q_selDifficultLink_text">
                简单：<span class="diff1"></span>；
                普通：<span class="diff2"></span>；
                困难：<span class="diff3"></span>;
            </span>
      </div>



    </div>
  </div>
</template>

<script>
  import Loading from './Loading'
  import {mapState} from 'vuex'
export default {
  name:'Body',
  data(){
    return{
      paperInfo:null,
      paperId:""
    }
  },
  components:{
    Loading,
  },
  methods:{
    asyncGetPaperInfo: async function () {
      let  that = this
      await that.$post("/api/paper/get_preview_paper",{
        account:that.user.account,
        companyId:that.user.companyId,
        paperId:that.paperId
      }).then(
        (res)=>{
          that.paperInfo = res.data.bizContent;
          // console.log(that.paperInfo)
        }
      )
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
  },
  async created(){
    let that = this
    this.paperId = window.location.href.split("#/")[1].split("?")[0]
    await this.asyncGetPaperInfo()
    this.$nextTick(function () {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '/static/admin/paper_update/js/paper_update_new.js'
      document.getElementsByTagName('body')[0].appendChild(script)
    })
  },

}
</script>
