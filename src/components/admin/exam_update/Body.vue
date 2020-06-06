<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <input type="hidden" name="select_deps" value="">
          <div class="update-area">
            <form id="uploadForm" class="upload-form" enctype="multipart/form-data" method="post" action="/examadmin/admin/uploadPhoneWhiteList" target="phone_form">
              <iframe class="hidden" name="phone_form" id="phoneFrame"></iframe>
              <div class="btn btn-primary phone-upload" style="font-size: 12px;">上传<input type="file" name="phoneExcelFile" class="phoneUpload"></div>
            </form>
            <form class="form-horizontal" action="/examadmin/admin/exam_add" name="form" method="post" id="subForm">
              <div class="exam-setting normal-setting">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="examName" class="col-sm-2 control-label">考试名称</label>
                      <div class="col-sm-10">
                        <input type="text" name="examName" class="form-control hasUsingFormDom" maxlength="30" id="examName" placeholder="请输入考试名称" :value="examInfo.examName">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-2 control-label">考试分类</label>
                      <div class="col-sm-10">
                        <input type="hidden" class="" name="examStyle" :value="examInfo.examStyle">
                        <button type="button" class="btn btn-default btn-sm" id="selTypeLink">
                          <span>{{examInfo.examStyleName}}</span>
                          <i class="icon icon-a_btn_classify btn-icon-right"></i>
                        </button>
                      </div>
                    </div>

                    <div class="form-group loginWay process_hidden " id="threeCreateExam1">
                      <label class="col-sm-2 control-label">学员登录方式</label>
                      <div class="col-sm-10 radio-group">
                        <div class="radio">
                          <label>
                            <input type="radio" name="skipLogin" :checked="examInfo.skipLogin == 0 ? 1 : !1" value="0">账号密码登录
                          </label>
                        </div>



                      </div>
                    </div>
                    <div class="form-group info-group hidden-group examInformation">
                      <div class="phone-white-list">
                        <span>手机号白名单：</span>
                        <input type="hidden" name="phoneWhiteStatus">
                        <a class="btn btn-primary phone-download" href="https://kaoshixing.oss-cn-beijing.aliyuncs.com/template-for-phone-white-list.xlsx">下载模版</a>
                        <div id="success-div" hidden="">
                          <div class="success-top">
                            <div class="success-tip">
                              <div class="success">
                                <span class="accessory"></span>
                                <div class="title success-title" style="display: inline-block;margin-bottom: 10px;">
                                  <a style="color: #6D717C;" href="#"></a>
                                </div>
                                <input type="hidden" name="phones">
                                <input type="hidden" name="phoneExcelName">
                                <input type="hidden" name="phoneExcelUrl">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span>考前预留信息：姓名、手机号、邮箱等10项目</span>
                      <button type="button" class="btn btn-default btn-sm" id="loginAnswerLink">编辑</button>
                    </div>
                    <div id="threeCreateExam2">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">考试时间</label>
                        <div class="col-sm-10">
                          <div class="btn-group">
                            <div class="calendar-wrap">
                              <i class="icons8-calendar start"></i>
                              <input :value="examInfo.startTime" name="examStartTime" id="dateFrom" autocomplete="off">
                            </div>
                            <span>到</span>
                            <div class="calendar-wrap">
                              <i class="icons8-calendar end"></i>
                              <input :value="examInfo.endTime" name="examEndTime" id="dateTo" autocomplete="off">
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="form-group answer-time">
                        <label class="col-sm-2 control-label">答卷时长</label>
                        <div class="col-sm-10 radio-group">
                          <div class="radio">
                            <label>
                              <input type="radio" name="examTimeRestrict" :checked="examInfo.examTimeRestrict == 1 ? 1 : !1" :value="1">
                              <input type="text" :value="examInfo.examTime" name="examTime" class="form-control form-control-inline width-62 fl hasUsingFormDom"><span> 分钟</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="examTimeRestrict" :checked="examInfo.examTimeRestrict == 0 ? 1 : !1" value="0"> 不限时长
                            </label>
                          </div>
                        </div>
                      </div>

                      <input type="hidden" value="0" name="perTimeRestrict">

                    </div>

                    <div class="form-group form-inline answerLimit  ">
                      <label class="col-sm-2 control-label letter-s4">答题次数</label>
                      <div class="col-sm-8 radio-group">
                        <div class="radio">
                          <label>
                            <input type="radio" name="examTimesRestrict" :checked="examInfo.examTimesRestrict == 1 ? 1 : !1" value="1"> 无限次
                          </label>
                        </div>
                        <div class="radio">
                          <label>
                            <input type="radio" name="examTimesRestrict" :checked="examInfo.examTimesRestrict == 0 ? 1 : !1"  value="0"> 有限次
                            <input type="text" class="form-control form-control-inline width-62" name="examTimes" :value="examInfo.examTimes" :style="examInfo.examTimesRestrict == 0 ? 'display: inline-block;' : 'display: none;'">
                          </label>
                        </div>
                        <input type="hidden" name="examMode" value="1">
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="passMark" class="col-sm-2 control-label">及格分数</label>
                      <div class="col-sm-10">
                        <input type="text" name="passMark" class="form-control form-control-inline width-62 fl hasUsingFormDom" id="passMark" :value="examInfo.passMark">
                      </div>
                    </div>
                    <div class="department-box" id="threeCreateExam3">
                      <div class="form-group party-person">
                        <label class="col-sm-2 control-label">参与学员</label>
                        <div class="col-sm-10 control-label">
                          <div class="radio-box">
                            <input type="radio" :checked="examInfo.joinStatus == 0 ? 1 : !1" name="joinStatus" value="0">&nbsp;&nbsp;全员参加
                            <input type="radio" :checked="examInfo.joinStatus == 1 ? 1 : !1" style="margin-left:10px" name="joinStatus" value="1">&nbsp;&nbsp;按部门/学员参与
                          </div>
                        </div>
                      </div>

                      <div class="form-group selGroupLink process_hidden department-show" :style="examInfo.joinStatus == 1 ? 'display:block;' : 'display:none;'">
                        <label class="col-sm-2 control-label letter-s4">可考部门</label>
                        <div class="col-sm-8">

                          <button type="button" class="btn btn-default btn-sm" id="selGroupLink">选择部门</button>
                          <input class="hasSelectedDeptIds" type="hidden" name="deptIds" value="">

                          <div class="label-wrap depsName">
                            <div class="label-list depNameLabel" id="depName"></div>
                            <div class="collapse-label">
                              <span class="glyphicon-title">展开</span>
                              <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form-group selUserLink process_hidden department-show" :style="examInfo.joinStatus == 1 ? 'display:block;' : 'display:none;'">
                        <label class="col-sm-2 control-label letter-s4">可考学员</label>
                        <div class="col-sm-8">
                          <button type="button" class="btn btn-default btn-sm" id="selUserLink">选择学员</button>
                          <!--<button type="button" class="btn btn-default btn-sm selectUsers" id="selUsersLink">批量录入</button>-->
                          <button type="button" disabled="" class="btn btn-default btn-sm" id="clearUsers">清空可考学员</button>
                          <input class="hasSelectedUserIds" type="hidden" name="userIds">

                          <div class="label-wrap usersName">
                            <div class="label-list userNameLabel" id="usersName"></div>
                            <div class="collapse-label">
                              <span class="glyphicon-title">展开</span>
                              <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="panel panel-default panel-paper" id="paperPanel">
                      <div class="panel-heading clearfix">
                        <div class="paper-title">
                          <span class="paper-name">{{examInfo.paperName}}</span>
                          <span class="paper-type">

                                                                （{{examInfo.paperType == 1?"选题组卷":examInfo.paperType==2?"抽题组卷":examInfo.paperType==3?"随机组卷":examInfo.paperType}}）

                                                    </span>
                        </div>
                        <div class="paper-operation">
                          <a class="changePaper border-right" href="#">更换试卷</a>
                          <a class="border-right" target="_blank" :href="'/admin/paper_preview/?paper_info_id='+examInfo.paperInfoId">预览试卷</a>
                          <a class="border-right" :href="'/admin/paper_update/#/'+ examInfo.paperInfoId +'?examInfoId=' + examInfo.id" target="_blank">编辑试卷</a>
                        </div>
                      </div>
                      <div class="panel-body">
                        <div class="form-row">
                          <span class="title">总分:</span>
                          <span class="content paper-total-score">{{examInfo.paperTotalScore}}</span>
                        </div>
                        <div class="form-row">
                          <span class="title">创建人:</span>
                          <span class="content paper-create-user-name">{{examInfo.paperCreatorName}}</span>
                        </div>
                        <div class="form-row">
                          <span class="title">试题数量:</span>
                          <span class="content paper-test-count">{{examInfo.paperQuestionNum}}</span>
                        </div>
                        <div class="form-row">
                          <span class="title">创建日期:</span>
                          <span class="content paper-created-time">{{examInfo.paperCreateTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="panel panel-default panel-answer-notice">
                      <div class="panel-heading clearfix">考试说明</div>
                      <div class="panel-body">
                        <textarea class="beforeAnswerNotice notice-textarea" placeholder="请填写考试说明" name="beforeAnswerNotice">{{examInfo.beforeAnswerNotice}}</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="more_settings_split"></div>
              <div class="exam-setting toolbar-setting">
                <a href="#superSetting" class="btn-href-collapse collapsed" data-toggle="collapse" aria-expanded="false"
                   aria-controls="superSetting" style="color: rgb(39, 39, 74);">展开更多设置<span href="#superSetting"
                                                                                            class="glyphicon icon-a_pull_down"
                                                                                            aria-hidden="true"
                                                                                            data-toggle="collapse"
                                                                                            aria-expanded="false"
                                                                                            aria-controls="superSetting"
                                                                                            style="color: rgb(193, 193, 203);"></span></a>
              </div>
              <div class="exam-setting super-setting collapse" id="superSetting">
                <div class="row">
                  <div class="col-md-6 left-setting">
                    <div class="exam-title">考试信息</div>
                    <div class="form-group">
                      <div class="col-sm-12">
                        考试状态:<span class="exam-staus">{{examInfo.status == 0 ? '已开启' : '已禁止'}}</span>
                        <button type="button" class="btn  btn-sm exam-status-btn" :class="examInfo.status == 0 ? 'btn-warning' : 'btn-default'">{{examInfo.status == 0 ? '禁用考试' : '开启考试'}}</button>
                        <input type="hidden" name="status" :value="examInfo.status">
                      </div>
                    </div>

                    <div class="form-group form-inline">
                      <label class="col-sm-2 control-label">最短答题时长
                        <el-tooltip content="开启后，学员开始答题后必须达到设置时长才能交卷" placement="top">
                          <i class="icons8-help"></i>
                        </el-tooltip>
                      </label>
                      <div class="col-sm-8">
                        <span class="switch-min-time"
                              :class="examInfo.setMinExamTime == 1 ? 'switch-on' : 'switch-off '"
                              :style="examInfo.setMinExamTime == 1 ? 'border-color: rgb(77, 143, 225);box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset;background-color: rgb(77, 143, 225);' :
                              'border-color: rgb(223, 223, 223);box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset;background-color: rgb(255, 255, 255);'">
                          <!--<span class="slider"></span>-->
                        </span>
                        <input class="setMinExamTime" type="hidden" name="setMinExamTime" :value="examInfo.setMinExamTime">
                        <div class="input-group-box min-time-box isHide" :style="examInfo.setMinExamTime == 1 ? 'display: block;' : 'display: none;'">
                          学员开始答卷 <input type="text" name="minExamTime" class="form-control width-62" :value="examInfo.minExamTime"> 分钟后才能交卷
                        </div>
                      </div>
                    </div>
                    <div class="invigilation-title">
                      <div class="exam-title" style="margin-bottom: 23px;">考试防作弊</div>
                    </div>

                    <div class="form-group invigilation">
                      <label class="col-sm-2 control-label">无操作强制交卷</label>
                      <div class="col-sm-4">
                        <span class="switch-all  setTimeLimitChkBtn " :class="examInfo.restTime > 0 ? 'switch-on' : 'switch-off'"
                              :style="examInfo.restTime > 0 ? 'border-color: rgb(77, 143, 225);box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset;background-color: rgb(77, 143, 225);' :
                              'border-color: rgb(223, 223, 223);box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset;background-color: rgb(255, 255, 255);'"
                              ></span>
                      </div>
                    </div>
                    <div class="form-group info-group preventCheat" :class="examInfo.restTime > 0 ? '' : 'hidden'">
                      <div class="form-inline">
                        <div class="checkbox">
                          <label>
                            答题时超过
                            <input type="text" class="form-control form-control-inline width-48" name="restTime" :value="examInfo.restTime">
                            秒没有新操作会强制交卷
                            <el-tooltip content="学员答题时，没有新操作后会出现10秒倒计时交卷提示，点击屏幕即可取消。（可适当设置较短时间，避免学员离开页面查找答案" placement="top">
                              <i class="icons8-help"></i>
                            </el-tooltip>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group invigilation">
                      <label class="col-sm-2 control-label">切屏后强制交卷</label>
                      <div class="col-sm-4">
                        <span class="switch-all  setFullScreenBtn"
                              :class="examInfo.blurCount > 0 ? 'switch-on' : 'switch-off'"
                              :style="examInfo.blurCount > 0 ? 'border-color: rgb(77, 143, 225);box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset;background-color: rgb(77, 143, 225);' :
                              'border-color: rgb(223, 223, 223);box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset;background-color: rgb(255, 255, 255);'"
                              >
                          </span>
                      </div>
                    </div>
                    <div class="form-group info-group hidden-group preventCheat" :class="examInfo.blurCount > 0 ? '' : 'hidden'">
                      <div class="form-inline">
                        <div class="checkbox">
                          <label>
                            学员切换页面超过
                            <input type="text" class="form-control form-control-inline width-48" name="blurCount" :value="examInfo.blurCount">
                            次后将被强制交卷，切换到其他页面
                            <input type="text" class="form-control form-control-inline width-48 switchScreenSecond" name="switchScreenSecond" :value="examInfo.switchScreenSecond">
                            秒后即判定为切屏
                            <el-tooltip content="学员切出页面后，未在设置时间范围内返回页面，则判定为切屏，切屏次数过多将被强制交卷。" placement="top">
                              <i class="icons8-help"></i>
                            </el-tooltip>
                          </label>
                        </div>
                      </div>



                      <input type="hidden" name="setDisablePaste">

                      <input type="hidden" name="setRandomOrderTest">
                      <input type="hidden" name="setBanAfterMin" value="0">
                      <input type="hidden" name="setBanWthinMin" value="0">
                      <input type="hidden" class="" name="paperInfoId" :value="examInfo.paperInfoId">
                      <input type="hidden" class="" id="examInfoId" name="id" :value="examInfo.id">
                      <input type="hidden" class="" name="hasUsing" :value="examInfo.examHasUsing">
                    </div>

                  </div>
                  <div class="col-md-6 right-setting">
                    <div class="exam-title">分数设置</div>
                    <div class="form-group form-inline switch-showScore">
                      <label class="col-sm-3 control-label letter-9">试题分数对学员可见
                        <el-tooltip content="关闭后，学员答卷时不显示试题分数，该功能与考后是否显示成绩无关" placement="top">
                          <i class="icons8-help"></i>
                        </el-tooltip>
                      </label>
                      <div class="col-sm-6">
                        <span class="switch-isVisible" :class="examInfo.isVisible == 0 ? 'switch-on' : 'switch-off'"
                              :style="examInfo.isVisible == 0 ? 'border-color: rgb(77, 143, 225);box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset;background-color: rgb(77, 143, 225);' :
                              'border-color: rgb(223, 223, 223);box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset;background-color: rgb(255, 255, 255);'"
                              >
                        </span>
                      </div>
                      <input class="hidden scoreIsVisible" type="hidden" name="isVisible" :value="examInfo.isVisible">
                    </div>

                    <div class="exam-title">成绩设置</div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label letter-6">显示成绩</label>
                      <div class="col-sm-9">
                        <span class="switch-all switch-exam" :class="examInfo.releaseWaySwitch != 3 ? 'switch-on' : 'switch-off'"
                              :style="examInfo.releaseWaySwitch  != 3 ? 'border-color: rgb(77, 143, 225);box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset;background-color: rgb(77, 143, 225);' :
                              'border-color: rgb(223, 223, 223);box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset;background-color: rgb(255, 255, 255);'"
                              >
                        </span>
                      </div>
                    </div>

                    <div class="form-group set_up_score add info-group" :style="examInfo.releaseWaySwitch  != 3 ? '' : 'display: none;'">
                      <div class="col-sm-8 radio-group">
                        <div class="radio">
                          <label>
                            <input type="radio" name="releaseWay" :checked="examInfo.releaseWay == 1 ? 1 : !1" value="1"> 考后显示成绩
                          </label>
                        </div>
                        <div class="radio">
                          <label>
                            <input type="radio" name="releaseWay" :checked="examInfo.releaseWay == 2 ? 1 : !1" value="2"> 批改后显示成绩
                          </label>
                        </div>
                      </div>
                    </div>


                    <input type="hidden" id="releaseWaySwitch" name="releaseWaySwitch" :value="examInfo.releaseWaySwitch">

                    <div class="form-group setScanPaper hidden_answer" :style="examInfo.releaseWaySwitch != 3 ? '' : 'display: none;'">
                      <label class="col-sm-3 control-label letter-7">允许查看试卷
                        <el-tooltip content="查看历史考试时，支持查看试卷进行回顾考试" placement="top">
                          <i class="icons8-help"></i>
                        </el-tooltip>
                      </label>
                      <div class="col-sm-9">
                        <span class="switch-all switch_scan_paper " :class="examInfo.setAllowPaper == 0 ? 'switch-on' : 'switch-off'"
                              :style="examInfo.setAllowPaper  == 0 ? 'border-color: rgb(77, 143, 225);box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset;background-color: rgb(77, 143, 225);' :
                              'border-color: rgb(223, 223, 223);box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset;background-color: rgb(255, 255, 255);'"
                              >
                        </span>
                        <input type="checkbox" name="setAllowPaper" :checked="examInfo.setAllowPaper == 0 ? 1 : !1" class="hidden" :value="examInfo.setAllowPaper">
                        <div class="radio-group set_allow_answer in_add" :style="examInfo.setAllowPaper == 0 ? '' : 'display: none;'">
                          <div class="radio">
                            <label>
                              <input type="radio" name="setAllowsPaperAnswer" :checked="examInfo.setAllowsPaperAnswer == 0 ? 1 : !1" value="0">显示正确答案和解析
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="setAllowsPaperAnswer" :checked="examInfo.setAllowsPaperAnswer == 1 ? 1 : !1" value="1">
                              不显示正确答案和解析
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--允许查看试卷选项-->
                    <div class="form-group  add info-group set_up_paper">
                      <div class="col-sm-8 radio-group">
                        <div class="radio">
                          <label>
                            <input type="radio" name="is_paper_forever" :checked="examInfo.is_paper_forever == 0 ? 1 : !1" value="0"> 永久查看
                          </label>
                        </div>
                        <div class="radio">
                          <label>
                            <input type="radio" name="is_paper_forever" :checked="examInfo.is_paper_forever == 1 ? 1 : !1" value="1">
                            考试结束后
                            <input type="text" class="form-control form-control-inline width-62 allow_p_a_days" id="allow_p_a_days" :value="examInfo.allowsPaperDays"><!--用于填写-->
                            天内可查看
                          </label>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" class="form-control form-control-inline width-62 " id="allowsPaperDays" name="allowsPaperDays" :value="examInfo.allowsPaperDays"><!--用于提交-->


                    <div class="form-group releaseNotice">
                      <label class="col-sm-3 control-label letter-5">考试结束语</label>
                    </div>
                    <div class="form-group info-group hidden-group setReleaseNotice add">
                      <textarea name="setReleaseNotice" id="set_release_notice" maxlength="100">{{examInfo.setReleaseNotice}}</textarea>
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
  import Loading from './Loading'
  import {mapState} from 'vuex'
export default {
  name:'Body',
  data(){
    return{
      examInfo:{},
      examId:""
    }
  },
  components:{
    Loading,
  },
  computed:{
    ...mapState({
      user: state => state.account.user
    }),
  },

  created(){
    let that = this
    this.examId = window.location.href.split("#/")[1]
    this.$post("/api/exam/get_detail_exam",{
      account:that.user.account,
      companyId:that.user.companyId,
      examId:that.examId
    }).then(
      (res)=>{
        that.examInfo = res.data.bizContent;
      }
    )
  },
}
</script>
