<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div id="threeCreateExam4">
          <div class="btn btn-warning guide-btn" id="saveBtn">发布考试</div>
        </div>
        <div class="cont-r">
          <input type="hidden" name="select_deps" value="">
          <div role="tabpanel" class="tab-area tab-col4">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="step1">
                <a href="javascript:;" aria-controls="create1" role="tab" data-toggle="tab">
                  第一步:创建试卷
                </a>
              </li>
              <li role="presentation" class="step3">
                <a href="javascript:;" aria-controls="create3" role="tab" data-toggle="">
                  第二步:选题组卷
                </a>
              </li>
              <li role="presentation" class="step4 active">
                <a href="javascript:;" aria-controls="create4" role="tab" data-toggle="">
                  第三步:发布考试
                </a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="createTest4">
                <div class="issue-area">
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
                              <input type="text" name="examName" class="form-control hasUsingFormDom" maxlength="30" id="examName" placeholder="请输入考试名称" :value="paperInfo.name">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">考试分类</label>
                            <div class="col-sm-10">
                              <input type="hidden" class="" name="examStyle" value="">
                              <button type="button" class="btn btn-default btn-sm" id="selTypeLink">
                                <span>考试分类</span>
                                <i class="icon icon-a_btn_classify btn-icon-right"></i>
                              </button>
                            </div>
                          </div>

                          <div class="form-group loginWay process_hidden " id="threeCreateExam1">
                            <label class="col-sm-2 control-label">学员登录方式</label>
                            <div class="col-sm-10 radio-group">
                              <div class="radio">
                                <label>
                                  <input type="radio" name="skipLogin" checked="" value="0">账号密码登录
                                </label>
                              </div>
                              <!--<div class="radio">-->
                                <!--<label>-->
                                  <!--<input type="radio" name="skipLogin" value="1">免登录考试-->
                                <!--</label>-->
                              <!--</div>-->
                              <!--<div class="radio ">-->
                                <!--<label>-->
                                  <!--<input type="radio" name="skipLogin" value="2">微信免登录考试-->
                                <!--</label>-->
                              <!--</div>-->



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
                                    <input value="" name="examStartTime" id="dateFrom" autocomplete="off">
                                  </div>
                                  <span>到</span>
                                  <div class="calendar-wrap">
                                    <i class="icons8-calendar end"></i>
                                    <input value="" name="examEndTime" id="dateTo" autocomplete="off">
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div class="form-group answer-time">
                              <label class="col-sm-2 control-label">答卷时长</label>
                              <div class="col-sm-10 radio-group">
                                <div class="radio">
                                  <label>
                                    <input type="radio" name="examTimeRestrict" checked="" value="1">
                                    <input type="text" value="60" name="examTime" class="form-control form-control-inline width-62 fl hasUsingFormDom"><span> 分钟</span>
                                  </label>
                                </div>
                                <div class="radio">
                                  <label>
                                    <input type="radio" name="examTimeRestrict" value="0"> 不限时长
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
                                  <input type="radio" name="examTimesRestrict" checked="" value="1"> 无限次
                                </label>
                              </div>
                              <div class="radio">
                                <label>
                                  <input type="radio" name="examTimesRestrict" value="0"> 有限次
                                  <input type="text" class="form-control form-control-inline width-62 examTimes isHide" name="examTimes" value="1">
                                </label>
                              </div>
                              <input type="hidden" name="examMode" value="1">
                            </div>
                          </div>

                          <!--<div class="form-group">-->
                            <!--<label class="col-sm-2 control-label setProcess">-->
                              <!--关联自定义任务-->
                              <!--<i class="icons8-help" data-container="body" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="开启后，需在自定义任务中添加该考试，学员方可进入。可考部门与可考学员请您前往任务页面进行设置" data-original-title="" title=""></i>-->
                            <!--</label>-->

                            <!--<div class="col-sm-2">-->

                              <!--<span class="switch-off switch-hidden isProcess" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>-->
                              <!--<input type="hidden" value="" name="setProcess">-->
                            <!--</div>-->
                          <!--</div>-->

                          <div class="form-group">
                            <label for="passMark" class="col-sm-2 control-label">及格分数</label>
                            <div class="col-sm-10">
                              <input type="text" name="passMark" class="form-control form-control-inline width-62 fl hasUsingFormDom" id="passMark" value="">
                            </div>
                          </div>
                          <div class="department-box" id="threeCreateExam3">
                            <div class="form-group party-person">
                              <label class="col-sm-2 control-label">参与学员</label>
                              <div class="col-sm-10 control-label">
                                <div class="radio-box">
                                  <input type="radio" checked="" name="joinStatus" value="0">&nbsp;&nbsp;全员参加
                                  <input type="radio" style="margin-left:10px" name="joinStatus" value="1">&nbsp;&nbsp;按部门/学员参与
                                </div>
                              </div>
                            </div>

                            <div class="form-group selGroupLink process_hidden department-show" style="display:none">
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

                            <div class="form-group selUserLink process_hidden department-show" style="display:none">
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
                                <span class="paper-name">{{paperInfo.name}}</span>
                                <span class="paper-type">

                                                                （{{paperInfo.type == 1?"选题组卷":paperInfo.type==2?"抽题组卷":paperInfo.type==3?"随机组卷":paperInfo.type}}）

                                                    </span>
                              </div>
                              <div class="paper-operation">
                                <a class="border-right" target="_blank" :href="'/admin/paper_preview/?paper_info_id='+paperInfo.id">预览试卷</a>
                                <a class="border-right" :href="'/admin/paper_update/#/' + paperInfo.id + '?sourceFrom=examAdd'" target="_blank">编辑试卷</a>
                              </div>
                            </div>
                            <div class="panel-body">
                              <div class="form-row">
                                <span class="title">总分:</span>
                                <span class="content paper-total-score">{{paperInfo.totalScore}}</span>
                              </div>
                              <div class="form-row">
                                <span class="title">创建人:</span>
                                <span class="content paper-create-user-name">{{paperInfo.creatorName}}</span>
                              </div>
                              <div class="form-row">
                                <span class="title">试题数量:</span>
                                <span class="content paper-test-count">{{paperInfo.questionNum}}</span>
                              </div>
                              <div class="form-row">
                                <span class="title">创建日期:</span>
                                <span class="content paper-created-time">{{paperInfo.createTime}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default panel-answer-notice">
                            <div class="panel-heading clearfix">考试说明</div>
                            <div class="panel-body">
                              <textarea class="beforeAnswerNotice notice-textarea" placeholder="请填写考试说明" name="beforeAnswerNotice"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="more_settings_split"></div>
                    <div class="exam-setting toolbar-setting">
                      <a href="#superSetting" class="btn-href-collapse collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="superSetting" style="color: rgb(39, 39, 74);">展开更多设置<span href="#superSetting" class="glyphicon icon-a_pull_down" aria-hidden="true" data-toggle="collapse" aria-expanded="false" aria-controls="superSetting" style="color: rgb(193, 193, 203);"></span></a>
                    </div>
                    <div class="exam-setting super-setting collapse" id="superSetting" aria-expanded="false" style="height: 40px;">
                      <div class="row">
                        <div class="col-md-6 left-setting">
                          <div class="exam-title">考试信息</div>
                          <div class="form-group">
                            <div class="col-sm-12">
                              考试状态:<span class="exam-staus">已开启</span>
                              <button type="button" class="btn btn-warning btn-sm exam-status-btn">禁用考试</button>
                              <input type="hidden" name="status" value="0">
                            </div>
                          </div>

                          <!-------zs,考前校验密码------->
                          <!--<div class="form-group form-inline">-->
                            <!--<label class="col-sm-2 control-label">考前校验密码-->
                              <!--<el-tooltip content="开启后，学员需填写正确的考试密码，才能进入考试" placement="top">-->
                                <!--<i class="icons8-help"></i>-->
                              <!--</el-tooltip>-->
                            <!--</label>-->
                            <!--<div class="col-sm-8">-->
                              <!--<span class="switch-off" id="switch-passSetting" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>-->
                              <!--<input type="hidden" name="setExamPwd" value="0">-->
                              <!--<div class="change-pwd-box input-group-box hidden">-->
                                <!--<input class="form-control width-100 active-input first-input" name="examPwd" type="text" oninput="inputWatch(this)" onfocus="$(this).addClass('active-input')" onblur="$(this).removeClass('active-input')">-->
                                <!--<span class="pwd-input-tips input-group-tips">密码可以设置为6-8位的非中文字符组合</span>-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</div>-->


                          <!--<div class="form-group form-inline">-->
                            <!--<label class="col-sm-2 control-label">考试迟到限时-->
                              <!--<el-tooltip content="开启后，当考试已开始的时长超过迟到限时后，学员无法进入考试" placement="top">-->
                                <!--<i class="icons8-help"></i>-->
                              <!--</el-tooltip>-->
                            <!--</label>-->
                            <!--<div class="col-sm-8">-->
                              <!--<span class="switch-off switch-all switch-late-time" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>-->
                              <!--<input class="lateCheck" type="hidden" name="lateCheck" value="0">-->
                              <!--<div class="input-group-box late-time-box isHide">-->
                                <!--学员可迟到 <input type="text" name="lateTime" class="form-control width-62" value="0"> 分钟-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</div>-->

                          <div class="form-group form-inline">
                            <label class="col-sm-2 control-label">最短答题时长
                              <el-tooltip content="开启后，学员开始答题后必须达到设置时长才能交卷" placement="top">
                                <i class="icons8-help"></i>
                              </el-tooltip>
                            </label>
                            <div class="col-sm-8">
                              <span class="switch-off switch-min-time" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>
                              <input class="setMinExamTime" type="hidden" name="setMinExamTime" value="0">
                              <div class="input-group-box min-time-box isHide">
                                学员开始答卷 <input type="text" name="minExamTime" class="form-control width-62" value=""> 分钟后才能交卷
                              </div>
                            </div>
                          </div>
                          <div class="invigilation-title">
                            <div class="exam-title" style="margin-bottom: 23px;">考试防作弊</div>
                          </div>

                          <div class="form-group invigilation">
                            <label class="col-sm-2 control-label">无操作强制交卷</label>
                            <div class="col-sm-4">
                              <span class="switch-all  setTimeLimitChkBtn switch-off" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>
                            </div>
                          </div>
                          <div class="form-group info-group preventCheat hidden">
                            <div class="form-inline">
                              <div class="checkbox">
                                <label>
                                  答题时超过
                                  <input type="text" class="form-control form-control-inline width-48" name="restTime" value="">
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
                              <span class="switch-all  setFullScreenBtn switch-off" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>
                            </div>
                          </div>
                          <div class="form-group info-group hidden-group preventCheat hidden">
                            <div class="form-inline">
                              <div class="checkbox">
                                <label>
                                  学员切换页面超过
                                  <input type="text" class="form-control form-control-inline width-48" name="blurCount" value="">
                                  次后将被强制交卷，切换到其他页面
                                  <input type="text" class="form-control form-control-inline width-48 switchScreenSecond" name="switchScreenSecond" value="">
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
                            <input type="hidden" class="" name="paperInfoId" :value="paperInfo.id">
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
                              <span class="switch-on switch-isVisible" style="border-color: rgb(77, 143, 225); box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset; background-color: rgb(77, 143, 225);"><span class="slider"></span></span>
                            </div>
                            <input class="hidden scoreIsVisible" type="hidden" name="isVisible">
                          </div>

                          <div class="exam-title">成绩设置</div>
                          <div class="form-group">
                            <label class="col-sm-3 control-label letter-6">显示成绩</label>
                            <div class="col-sm-9">
                              <span class="switch-on switch-exam" style="border-color: rgb(77, 143, 225); box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset; background-color: rgb(77, 143, 225);"><span class="slider"></span></span>
                            </div>
                          </div>

                          <div class="form-group set_up_score add info-group">
                            <div class="col-sm-8 radio-group">
                              <div class="radio">
                                <label>
                                  <input type="radio" name="releaseWay" checked="" value="1"> 考后显示成绩
                                </label>
                              </div>
                              <div class="radio">
                                <label>
                                  <input type="radio" name="releaseWay" value="2"> 批改后显示成绩
                                </label>
                              </div>
                            </div>
                          </div>


                          <input type="hidden" id="releaseWaySwitch" name="releaseWaySwitch" value="1">

                          <div class="form-group setScanPaper hidden_answer">
                            <label class="col-sm-3 control-label letter-7">允许查看试卷
                              <el-tooltip content="查看历史考试时，支持查看试卷进行回顾考试" placement="top">
                                <i class="icons8-help"></i>
                              </el-tooltip>
                            </label>
                            <div class="col-sm-9">
                              <span class="switch-all switch_scan_paper switch-on " style="border-color: rgb(77, 143, 225); box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset; background-color: rgb(77, 143, 225);"><span class="slider"></span></span>
                              <input type="checkbox" name="setAllowPaper" checked="" class="hidden">
                              <div class="radio-group set_allow_answer in_add">
                                <div class="radio">
                                  <label>
                                    <input type="radio" name="setAllowsPaperAnswer" checked="" value="0">显示正确答案和解析
                                  </label>
                                </div>
                                <div class="radio">
                                  <label>
                                    <input type="radio" name="setAllowsPaperAnswer" value="1">
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
                                  <input type="radio" name="is_paper_forever" checked="" value="0"> 永久查看
                                </label>
                              </div>
                              <div class="radio">
                                <label>
                                  <input type="radio" name="is_paper_forever" value="1">
                                  考试结束后
                                  <input type="text" class="form-control form-control-inline width-62 allow_p_a_days" id="allow_p_a_days" value=""><!--用于填写-->
                                  天内可查看
                                </label>
                              </div>
                            </div>
                          </div>
                          <input type="hidden" class="form-control form-control-inline width-62 " id="allowsPaperDays" name="allowsPaperDays" value="0"><!--用于提交-->

                          <!--<div class="form-group setCorrectComment">-->
                            <!--<label class="col-sm-3 control-label letter-4">显示批改评语-->
                              <!--<el-tooltip content="管理员批改试卷时可针对小题和整卷添加评语，学员在查看试卷时可以看到评语" placement="top">-->
                                <!--<i class="icons8-help"></i>-->
                              <!--</el-tooltip>-->
                            <!--</label>-->
                            <!--<div class="col-sm-9">-->
                              <!--<span class="switch-off switch-correct-comment" style="border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);"><span class="slider"></span></span>-->
                              <!--<input type="checkbox" name="setCorrectComment" class="hidden">-->
                            <!--</div>-->
                          <!--</div>-->


                          <!--<div class="form-group showRanking">-->
                            <!--<label class="col-sm-3 control-label letter-4">显示名次</label>-->
                            <!--<div class="col-sm-9">-->
                              <!--<span class="switch-on switch-all switch-showing" style="border-color: rgb(77, 143, 225); box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset; background-color: rgb(77, 143, 225);"><span class="slider"></span></span>-->
                              <!--<input type="checkbox" name="showRanking" class="hidden" checked="">-->
                            <!--</div>-->
                          <!--</div>-->


                          <!--<div class="form-group showRankingList">-->
                            <!--<label class="col-sm-3 control-label letter-4">显示排行榜-->
                              <!--<el-tooltip content="开启后，学员进入考试前与考试交卷后-->
                                                    <!--可查看排行榜，排行榜显示内容为实时排名前十名的学员姓名与成绩。显示成绩开关将会影响排行榜内容的展示" placement="top">-->
                                <!--<i class="icons8-help"></i>-->
                              <!--</el-tooltip>-->
                            <!--</label>-->
                            <!--<div class="col-sm-9">-->
                              <!--<span class="switch-on switch-all switch-ranking-list" style="border-color: rgb(77, 143, 225); box-shadow: rgb(77, 143, 225) 0px 0px 0px 16px inset; background-color: rgb(77, 143, 225);"><span class="slider"></span></span>-->
                              <!--<input type="checkbox" name="showRankingList" class="hidden" checked="">-->
                            <!--</div>-->
                          <!--</div>-->

                          <div class="form-group releaseNotice">
                            <label class="col-sm-3 control-label letter-5">考试结束语</label>
                          </div>
                          <div class="form-group info-group hidden-group setReleaseNotice add">
                            <textarea name="setReleaseNotice" id="set_release_notice" maxlength="100">感谢您的作答！</textarea>
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
      paperInfo:{},
      paperId:""
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
    this.$post("/api/paper/get_paper",{
      account:that.user.account,
      companyId:that.user.companyId,
      paperId:that.paperId
    }).then(
      (res)=>{
        that.paperInfo = res.data.bizContent;
      }
    )
  },
}
</script>
