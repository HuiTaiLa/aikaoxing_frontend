<template>
  <div>
    <div class="main">
      <div class="header-wrapper">
        <div class="logo-wrapper">
          <a href="#" title="logo" id="companyLogo"><img class="icon-logo logo-ksx" src="/static/images/logo.jpg"></a>
        </div>
        <div class="exam-name ellipsis">{{paperInfo.name}}</div>
        <div class="user ellipsis">
          <i class="icon icon-p_top_user"></i>
          {{user.userName}}
        </div>
        <a type="button" class="btn btn-default logout" id="logoutBtn">
          <i class="icon icon-a_btn_sign_out btn-icon-left"></i>
          退出
        </a>
      </div>
      <div class="body-wrapper">
        <div class="body paper">
          <div v-for="(testItem,testIndex) in paperInfo.children" class="questions" :key="testIndex">
            <div class="questions-title">{{testItem.title + "(共" + testItem.questionNum + "题，合计" + testItem.totalScore + "分" + (testItem.lessChoiceConfirm?")":"，漏选错选不得分）")}}</div>
            <div class="questions-content">
              <div :id="'question'+qIndex" v-for="(qItem,qIndex) in testItem.children" class="question-content" :key="qIndex">
                <div class="exam-question">
                  <span class="question-index ellipsis">{{qIndex + 1 + "."}}</span>
                  <div v-html="qItem.question + '(' + qItem.qscore + '分)'"></div>
                </div>
                <div v-if="qItem.type == 1" class="answers">
                  <div v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) " :class="['select', 'single-select',  String.fromCharCode('a'.charCodeAt()+option) + '.' ]" :key="key">
                    <input type="radio" class="radioOrCheck hidden" disabled="">
                    <label>
                      <span class="select-icon"><i class="icon icon-m_exam_correct"></i></span>
                      <span class="words"><span class="words-option">{{String.fromCharCode('A'.charCodeAt()+option) + '.'}}</span><div v-html="qItem['answer' + (option + 1)]"></div></span>
                    </label>
                  </div>
                </div>
                <div v-else-if="qItem.type == 2" class="answers">
                  <div v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) " :class="['select', 'multi-select',  String.fromCharCode('a'.charCodeAt()+option) + '.' ]" :key="key">
                    <input type="checkbox" class="radioOrCheck hidden" disabled="">
                    <label>
                      <span class="select-icon"><i class="icon icon-m_exam_correct2"></i></span>
                      <span class="words"><span class="words-option">{{String.fromCharCode('A'.charCodeAt()+option) + '.'}}</span><div v-html="qItem['answer' + (option + 1)]"></div> </span>
                    </label>
                  </div>
                </div>
                <div v-else-if="qItem.type == 3" class="answers">
                  <div class="select judge rt">
                    <input type="radio" class="radioOrCheck hidden" disabled="" value="1">
                    <label>
                      <span class="select-icon"><i class="icon icon-m_exam_correct"></i></span>
                      <span class="words">正确</span>
                    </label>
                  </div>
                  <div class="select judge wg">
                    <input type="radio" class="radioOrCheck hidden" disabled="" value="0">
                    <label>
                      <span class="select-icon"><i class="icon icon-m_exam_error"></i></span>
                      <span class="words">错误</span>
                    </label>
                  </div>
                </div>
                <div v-else-if="qItem.type == 4" class="answers">
                  <dd v-for="(option,key) in Array.from({length:qItem.tab_num},(x,y)=>y) " class="filled" :key="key">
                    <div class="input-group">
                      <span class="input-group-addon">{{option + 1}}</span>
                      <textarea disabled="" class="keyFill form-control expanding" onpaste="return false" oncopy="return false" style="margin: 0px; width: 355px; height: 43px;"></textarea>
                    </div>
                  </dd>
                </div>
                <div v-else-if="qItem.type == 5" class="answers">
                  <div class="filled">
                    <div class="keyCloze" style="min-height: 250px">
                    </div>
                    <input type="hidden" value="">
                    <input type="file" name="uploadFile" class="wang-upload-file hidden">
                    <div class="file-list">
                    </div>
                  </div>
                </div>
                <div class="analysis">
                  <div class="analysis-row">
                    <div class="analysis-title">学员答案：</div>
                    <div class="analysis-content question-com-answer "></div>
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
      </div>

      <div class="nav-wrapper">
        <div class="nav nav-status nav-operation">
          <ul class="menu-items">
            <li class="menu-item menu-item-time">
              <div class="item-label">剩余时间</div>
              <div class="item-data" id="timeDown">00:59:59</div>
            </li>
            <li class="menu-item menu-item-process">
              <div class="item-label">当前进度</div>
              <div class="item-data">
                <span id="commitCount">0</span>/<span id="totalCount">0</span>
              </div>
              <div class="item-process">
                <div class="item-process-bar" id="commitProcess"></div>
              </div>
            </li>
            <li class="menu-item menu-item-fontsize">
              <span class="item-icon fontsize-minus">－</span>
              <span class="item-label">字号</span>
              <span class="item-icon fontsize-plus">＋</span>
            </li>
            <li class="menu-item menu-item-lang" id="switchLangBtn">
              <i class="icon item-icon icon-a_landing_english"></i>
              <span class="item-label">English</span>
            </li>
          </ul>
        </div>
        <button class="btn btn-primary btn-nav" id="endExamBtn">提交</button>
      </div>
    </div>
    <div class="left-side">
    <div class="numberCardModal" id="numberCardModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-number-card" role="document">
      <div class="fold_btn" id="answercardFoldBtn"><i class="icon icons8-icon" data-toggle="tooltip" data-placement="top" data-container="body" title="" data-original-title="收起"></i></div>
      <div class="open_btn" id="answercardOpenBtn"><i class="icon icons8-icon-3" data-toggle="tooltip" data-placement="top" data-container="body" title="" data-original-title="展开"></i></div>
      <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">
          <div class="title">
            <div class="title_border"></div>
            <div class="title_content">答题卡</div>
          </div>
          <div class="card-content-list">
            <div v-for="(testItem,testIndex) in paperInfo.children" class="card-content" :key="testIndex">
              <div class="card-content-title">{{testItem.title + "(共" + testItem.questionNum + "题，合计" + testItem.totalScore + "分" + (testItem.lessChoiceConfirm?")":"，漏选错选不得分）")}}</div>
              <div class="box-list">
                <div v-for="(qItem,qIndex) in testItem.children" class="box normal-box s1" :key="qIndex">
                  <a :href="'#question'+qIndex" :class="['iconBox', 'questions_question'+qIndex]" :questionsid="'question'+qIndex">{{qIndex + 1}}</a>
                </div>
              </div>
              <div class="split"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <span class="box icon-box s1"></span>
          <span class="icon-label">未答</span>
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
    name:"PaperPreviewView",
    data(){
      return{
        paperInfo:{},
        paperId:""
      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user
      }),
    },
    methods:{
      getQueryString:function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return '';
      },
    },
    created(){
      let that = this
      this.paperId = this.getQueryString("paper_info_id")
      this.$post("/api/paper/get_preview_paper",{
        account:that.user.account,
        companyId:that.user.companyId,
        paperId:that.paperId
      }).then(
        (res)=>{
          that.paperInfo = res.data.bizContent;
          // console.log(that.paperInfo)
        }
      )
    },
  }
</script>
