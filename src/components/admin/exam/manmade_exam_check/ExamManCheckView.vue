<template>
<div>
  <div class="main manmade-mode">
    <div class="header-wrapper">
      <div class="logo-wrapper">
        <a href="/admin/exam" title="logo" id="companyLogo"><img class="icon-logo logo-ksx" src="/static/images/logo.jpg"></a>
      </div>
      <div class="exam-name ellipsis">{{ resultInfo&&resultInfo.exam&&resultInfo.exam.examName}}</div>
      <div class="user ellipsis">
        <i class="icon icon-a_nav_my"></i>
        {{ resultInfo&&resultInfo.user&&resultInfo.user.userName}}
      </div>
      <a type="button" class="btn btn-default logout" id="logoutBtn">
        <i class="icon icon-a_btn_sign_out btn-icon-left"></i>
        退出
      </a>
    </div>

    <div class="body-wrapper">
      <div class="body paper" :class="onlyError?'select-error-paper':''">
        <div v-for="(testItem,testIndex) in  resultInfo == null ? [] : resultInfo.children" class="questions" :key="testIndex">
          <div class="questions-title">{{testItem.title + "(共" + testItem.questionNum + "题，合计" + testItem.totalScore + "分" + (testItem.lessChoiceConfirm?")":"，漏选错选不得分)")}}</div>
          <div class="questions-content">
            <div :id="qItem.id" :data-id="qItem.id" :data-commit="resultInfo.exam.examVersionNumber != null ? 'true' : 'false'" v-for="(qItem,qIndex) in testItem.children" class="question-content" :class="onlyError&&(qItem.rightStatus == 1)? 'right-question-content':''" :key="qIndex">
              <div class="question-operation operation-check">
                <i class="icon icon-right icon-m_prompt_correct1" :class="qItem.rightStatus == 1? 'icon-checked' : ''"></i>
                <i class="icon icon-wrong  icon-m_prompt_error1" :class="qItem.rightStatus != 1? 'icon-checked' : ''"></i>
                <div class="input-group">
                  <input type="text" name="questionScore" class="form-control question-score"
                         :data-score="Number(qItem.questionGrade).toFixed(2)" :value="Number(qItem.questionGrade).toFixed(2)" :data-qscore="qItem.qscore"/>
                  <span class="input-group-addon">分</span>
                </div>
              </div>
              <div class="exam-question">
                <span class="question-index ellipsis">{{qIndex + 1 + "."}}</span>
                <div v-html="qItem.question + '(' + qItem.qscore + '分)'"></div>
              </div>
              <div v-if="qItem.type == 1" class="answers">
                <div v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) " :class="['select', 'single-select',  String.fromCharCode('a'.charCodeAt()+option) + '.' ]" :key="key">
                  <input :id="String(qItem.id) + (key + 1)" type="radio" :disabled="String.fromCharCode('A'.charCodeAt()+option) == qItem.userAnswer? !1 : 1"  class="radioOrCheck hidden" :class="[String(qItem.id) + (key + 1)]" :data-name="'key' + (key + 1)"
                         :data-keyid="String(qItem.id) + (key + 1)" data-type="1" :name="'keyChk_questions_' + qItem.id + '_'">
                  <label :for="String(qItem.id) + (key + 1)">
                    <span class="select-icon"><i class="icon icon-m_exam_correct"></i></span>
                    <span class="words"><span class="words-option">{{String.fromCharCode('A'.charCodeAt()+option) + '.'}}</span><div v-html="qItem['answer' + (option + 1)]"></div></span>
                  </label>
                </div>
              </div>
              <div v-else-if="qItem.type == 2" class="answers">
                <div v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) " :class="['select', 'multi-select',  String.fromCharCode('a'.charCodeAt()+option) + '.' ]" :key="key">
                  <input :id="String(qItem.id) + (key + 1)" type="checkbox" :disabled=" qItem.userAnswer && qItem.userAnswer.indexOf(String.fromCharCode('A'.charCodeAt()+option)) != -1? !1 : 1" class="radioOrCheck hidden" :class="[ String(qItem.id) + (key + 1)]" :data-name="'key' + (key + 1)"
                         :data-type="2" :name="'keyChk_questions_' + qItem.id + '_'"
                         :data-keyid="String(qItem.id) + (key + 1)">
                  <label :for="String(qItem.id) + (key + 1)">
                    <span class="select-icon"><i class="icon icon-m_exam_correct2"></i></span>
                    <span class="words"><span class="words-option">{{String.fromCharCode('A'.charCodeAt()+option) + '.'}}</span><div v-html="qItem['answer' + (option + 1)]"></div></span>
                  </label>
                </div>
              </div>
              <div v-else-if="qItem.type == 3" class="answers">
                <div class="select judge rt">
                  <input :id="String(qItem.id) + 1" type="radio" :disabled="'正确' == qItem.userAnswer? !1 : 1" class="radioOrCheck hidden" :class="[ String(qItem.id) + 1]" value="1" data-name="key1"
                         :data-keyid="String(qItem.id) + 1" data-type="3" :name="'keyJudge_questions_'+qItem.id + '_'">
                  <label :for="String(qItem.id) + 1">
                    <span class="select-icon"><i class="icon icon-m_exam_correct"></i></span>
                    <span class="words">正确</span>
                  </label>
                </div>
                <div class="select judge wg">
                  <input :id="String(qItem.id) + 2" type="radio" :disabled="'错误' == qItem.userAnswer? !1 : 1" class="radioOrCheck hidden" :class="[String(qItem.id) + 2]" value="0" data-name="key2"
                         :data-keyid="String(qItem.id) + 2" :name="'keyJudge_questions_'+qItem.id + '_'">
                  <label :for="String(qItem.id) + 2">
                    <span class="select-icon"><i class="icon icon-m_exam_error"></i></span>
                    <span class="words">错误</span>
                  </label>
                </div>
              </div>
              <div v-else-if="qItem.type == 4" class="answers">
                <dd v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) " class="filled" :key="key">
                  <div class="input-group">
                    <span class="input-group-addon">{{option + 1}}</span>
                    <textarea :name=" 'key' + (key + 1)" disabled data-type="4" class="keyFill form-control expanding" onpaste="return false" oncopy="return false">
                      {{ qItem.userAnswer && (option < qItem.userAnswer.split("|").length ? qItem.userAnswer.split("|")[option] : '')}}
                    </textarea>
                  </div>
                </dd>
              </div>
              <div v-else-if="qItem.type == 5" class="answers">
                <div class="filled">
                  <div class="keyCloze wangEditor-txt" data-type="5" :id="'keyCloze_' + qItem.id"
                       style="min-height: 300px" v-html="qItem.userAnswer">
                  </div>
                  <input type="hidden" name="key1">
                  <input type="file" name="uploadFile" class="wang-upload-file hidden">
                  <div class="file-list">
                  </div>
                </div>
              </div>
              <div class="analysis">

                <div class="analysis-row" v-if="qItem.type == 1 || qItem.type == 2 || qItem.type == 3">
                  <div class="analysis-title">学员答案：</div>
                  <div class="analysis-content question-com-answer" :class="qItem.rightStatus == 1?'right':'error'">{{qItem.type == 4?qItem.userAnswer.replace(/[&]+/g, '或').replace(/[\|]+/g, '，') : qItem.userAnswer}}</div>
                </div>
                <div class="analysis-row">
                  <div class="analysis-title">正确答案：</div>
                  <div class="analysis-content question-ans-right" v-html="qItem.type == 4?qItem.key.replace(/[&]+/g, '或').replace(/[\|]+/g, '，') : qItem.key"></div>
                </div>
                <div class="analysis-row">
                  <div class="analysis-title">解释说明：</div>
                  <div class="analysis-content question-analysis textalign-justify display-block" v-html="qItem.analysis"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tech-support">
        <span class="company-name">爱考星</span>
        提供技术支持
      </div>

    </div>

    <div class="nav-wrapper nav-wrapper-l">
      <div class="nav nav-status">
        <ul class="menu-items">
          <li class="menu-item menu-item-user">
            <div class="item-label">学员姓名</div>
            <div class="item-data">{{resultInfo&&resultInfo.user&&resultInfo.user.userName}}</div>
          </li>
          <li class="menu-item menu-item-exam menu-item-score ">
            <div class="item-label">考试成绩</div>
            <div class="item-data" id="examScore">{{resultInfo&&resultInfo.exam&&Number(resultInfo.exam.examGrade).toFixed(2)}}</div>
          </li>
          <li class="menu-item menu-item-exam menu-item-status ">
            <div class="item-label">考试状态</div>
            <div class="item-data">{{resultInfo&&resultInfo.exam&&(resultInfo.exam.examPassStatus == 1) ? "通过" : "未通过"}}</div>
          </li>
          <li class="menu-item menu-operation-item menu-item-exam menu-item-status ">
            <div class="item-label">仅看错题</div>
            <div class="item-operation">
              <span class="switch-select-error" :class="onlyError?'switch-on':'switch-off'"></span>
            </div>
          </li>
          <li class="menu-item menu-operation-item menu-item-exam menu-item-status ">
            <div class="item-label">判分框下至</div>
            <div class="item-operation">
              <span class="switch-checkbox-after switch-off"></span>
            </div>
          </li>
        </ul>
      </div>
      <a href="#" onclick="closePage()" class="btn btn-primary btn-nav">关闭</a>


      <div class="nav nav-bottom nav-operation">
        <ul class="menu-items">
          <li class="menu-item menu-item-prev disabled" id="prevOneBtn">
            <span class="item-label">上一人</span>
          </li>
          <li class="menu-item menu-item-next disabled" id="nextOneBtn">
            <span class="item-label">下一人</span>
          </li>
        </ul>
      </div>

      <button type="button" class="btn btn-primary btn-nav btn-bottom position-left-0" id="saveCheckResultsBtn">保存</button>
    </div>
  </div>

  <div class="left-side">
  <div class="picture-list" id="pictureList">
  </div>
  <div class="numberCardModal" id="numberCardModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-number-card" role="document">
      <div class="fold_btn" id="answercardFoldBtn"><i class="icon icons8-icon"  data-toggle="tooltip" data-placement="top" data-container="body" title="收起" data-original-title="收起"></i></div>
      <div class="open_btn" id="answercardOpenBtn"><i class="icon icons8-icon-3"  data-toggle="tooltip" data-placement="top" data-container="body" title="展开" data-original-title="展开"></i></div>
      <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">
          <div class="title">
            <div class="title_border"></div>
            <div class="title_content">答题卡</div>
          </div>

          <div class="card-content-list">
            <div v-for="(testItem,testIndex) in resultInfo == null ? [] : resultInfo.children" class="card-content" :key="testIndex">
              <div class="card-content-title">{{testItem.title + "(共" + testItem.questionNum + "题，合计" + testItem.totalScore + "分" + (testItem.lessChoiceConfirm?")":"，漏选错选不得分)")}}</div>
              <div class="box-list">
                <div v-for="(qItem,qIndex) in testItem.children" class="box normal-box" :class="[qItem.rightStatus == 1 ? 's2' : 's4']" :key="qIndex">
                  <a :href="'#'+qItem.id" :class="'iconBox questions_' + qItem.id"
                     :questionsid="qItem.id">{{qIndex + 1}}</a>
                </div>
              </div>
              <div class="split"></div>
            </div>

          </div>

        </div>
        <div class="modal-footer">
          <span class="box icon-box s2"></span>
          <span class="icon-label">正确</span>
          <span class="box icon-box s4"></span>
          <span class="icon-label">错误</span>
        </div>
      </div>
    </div>
  </div>
  </div>

</div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'ExamManCheckView',
    data(){
      return{
        resultInfo: null,
        examResultsId:"",
        examInfoId:"",
        userName: "",//账号

      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user
      }),
      onlyError() {
        return this.getQueryString("selectError");
      }
    },
    methods:{
      // 获取url中参数
      getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return '';
      },
    },
    created(){
      let that = this;
      this.examResultsId = this.getQueryString("examResultsId");
      this.examInfoId = this.getQueryString("examInfoId");
      this.userName = this.getQueryString("userName");

      this.$post("/api/exam/get_check_info",{
        account:that.user.account,
        companyId:that.user.companyId,
        examResultsId:that.examResultsId,
        examInfoId: that.examInfoId,
        userName: that.userName
      }).then(
        (res)=>{
          that.resultInfo = res.data.bizContent;
          if(res.data.success){
            // if(res.data.code == '233'){
            //   window.location.href="/admin/error/examLimit";
            // }
          }else{
            window.location.href="/admin/error/historyPerm";
          }
        }
      )
    },
    mounted(){
      let setting = document.createElement('script')
      setting.type = 'text/javascript'
      setting.src = '/static/admin/exam/js/initial_checkSetting.js'
      document.getElementsByTagName('body')[0].appendChild(setting)

      let check = document.createElement('script')
      check.type = 'text/javascript'
      check.src = '/static/admin/exam/js/exam_check_result.js'
      document.getElementsByTagName('body')[0].appendChild(check)
    }
  }
</script>
