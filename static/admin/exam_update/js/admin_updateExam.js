$(document).ready( function() {
  $(".navbarCustomer li").mouseover(function (e) {
    if (!$(this).hasClass("navSel")) {
      $(this).addClass("navHover");
    }
  });
  $(".navbarCustomer li").mouseout(function (e) {
    $(this).removeClass("navHover");
  });
  // 付费功能提示
  $(".readonly").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    alert("此功能为付费功能，如有需要请联系客服");
  })

  //点击考试名称选中全部内容
  $("input[name=examName]").on("click", function () {
    $(this).select();
  });
  //学员是否需要支付显示支付金额输入框
  $("body").on("change", "input[name='userPayConfirm']", function (e) {
    if ($(this).is(":checked")) {
      $(this).parents(".radio").next().css("display", "inline-table");
    }
    else {
      $(this).parents(".radio").next().css("display", "none");
    }
  });
  //选择是否限制考试次数
  $("select[name=examTimesRestrict]").change(function (e) {
    if ($(this).val() == 0) {
      $("input[name=examTimes]").show().val(1);
    } else {
      $("input[name=examTimes]").hide().val(0);
    }
  });
  //闯关模式  显示答错次数
  $("body").on("change", "input[name='passMode']", function (e) {
    if ($(this).is(":checked")) {
      $("input[name='errorTimes']").val(0);
      $(this).parents(".radio").next().css("display", "inline-table");
    }
    else {
      $(this).parents(".radio").next().css("display", "none");
    };
  });

  //编辑考试说明
  $("#noticeEditor").summernote({
    lang: 'zh-CN',
    height: 101,
    focus: true,
    dialogsInBody: true,
    dialogsFade: true,
    toolbar: [
      ['style', ['bold']],
      ['fontsize', ['fontsize']],
      ['para', ['ul', 'ol']],
      ['insert', ['link']],
      ['Misc', ['fullscreen']]
    ],
    placeholder: '这里填写考试说明',
    shortcuts: false,
    callbacks: {
      onInit: function () {
        $(this).summernote('code', notice);
        $(this).summernote('focus');
        $(".note-editor").addClass("needsclick");
        $(".note-editable").addClass("needsclick");
      },
      onBlur: function () {
        var notice = $("#noticeEditor").summernote("code");
        var isEmpty = $(".note-editable").text();

        if(isEmpty !=""){
          // notice = notice.replace(/"/g,"&quot;").replace(/'/g,"&apos;");
          $("input[name=beforeAnswerNotice]").val(notice);
        }else{
          $("input[name=beforeAnswerNotice]").val("");
        }
      }
    }
  });
  $("#notice_save_btn").click(function () {
    var notice = $("#notice_editor").summernote("code");
    var exam_id = $("input[name=examInfoId]").val();
    notice = notice.replace(/"/g,"&quot;").replace(/'/g,"&apos;");
    $("input[name=beforeAnswerNotice]").val(notice);
    var notice_data = $("input[name=beforeAnswerNotice]").serialize();
    $.ajax({
      type: "POST",
      cache: false,
      headers: {"cache-control": "no-cache"},
      dataType: "json",
      url: "/examadmin/admin/exam/update_before_notice/" + exam_id + "/",
      data: notice_data,
      success: function (msg) {
        if (msg.success == true) {
          alert("保存成功！");
        } else {
          alert("保存失败！");
        }
      }
    });
  })
  //选择分类
  $("body").on("click", "#selTypeLink", function (e) {
    e.stopPropagation();
    e.preventDefault();
    showSelType(this);
  });
  //更换试卷
  $("body").on("click", ".changePaper", function (e) {
    e.stopPropagation();
    e.preventDefault();
    showSelPaper(this);
  });

  //展开和收起
  $(".toolbar-setting .btn-href-collapse").on("click",function(e){
    // e.stopPropagation();
    // e.preventDefault();
    var _this = $(this);
    if($("#superSetting").hasClass("in")){
      _this.text("展开更多设置");
      _this.append("<span href='#superSetting' class='glyphicon icon-a_pull_down' aria-hidden='true' data-toggle='collapse' aria-expanded='false' aria-controls='superSetting'></span>");
    }else{
      _this.text("收起更多设置");
      _this.append("<span href='#superSetting' class='glyphicon icon-a_pack_up' aria-hidden='true' data-toggle='collapse' aria-expanded='true' aria-controls='superSetting'></span>");
    }
    $(".toolbar-setting a,.toolbar-setting span").css('color','#1A8CFE');
  });
  $(".toolbar-setting .btn-href-collapse").on("mouseover",function(e){
    $(".toolbar-setting a,.toolbar-setting span").css('color','#1A8CFE');
  });
  $(".toolbar-setting .btn-href-collapse").on("mouseout",function(e){
    $(".toolbar-setting a").css('color',' #27274A');
    $(".toolbar-setting span").css('color','#C1C1CB');
  });

  //选择部门
  $("body").on("click", "#selGroupLink", function (e) {
    e.stopPropagation();
    e.preventDefault();
    showSelGroup(this);
  });
  //点击更多显示全部选择组数据
  $("body").on("click", "#moreDepInfo", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("#moreDepInfo").hide();
    $("#partDepInfo").show();
    $(".depsName").css("height", "auto");
    $(".depsName").css("overflow", "auto");
  })
  //点击收起
  $("body").on("click", "#partDepInfo", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("#moreDepInfo").show();
    $("#partDepInfo").hide();
    $(".depsName").css("height", "25px");
    $(".depsName").css("overflow", "hidden");
  })
  //选择用户
  $("body").on("click", "#selUserLink", function (e) {
    e.stopPropagation();
    e.preventDefault();
    showSelUser(this);
  });
  // 选择标签
  $("#selUserLabelLink").click(function(e){
    e.stopPropagation();
    e.preventDefault();
    showSelUserlabel(this)
  });
  //点击更多显示全部选择组数据
  $("body").on("click", "#moreUserInfo", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("#moreUserInfo").hide();
    $("#partUserInfo").show();
    $(".usersName").css("height", "auto");
    $(".usersName").css("overflow", "auto");
  })
  //点击收起
  $("body").on("click", "#partUserInfo", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("#moreUserInfo").show();
    $("#partUserInfo").hide();
    $(".usersName").css("height", "25px");
    $(".usersName").css("overflow", "hidden");
  })
  //选择免登录信息
  $("body").on("click", "#loginAnswerLink", function (e) {
    e.stopPropagation();
    e.preventDefault();
    showSelLogin(this);
  });

  // 实现作弊功能模块的展开折叠功能
  $(".main-cheat").click(function () {
    $(".sub-cheat").slideToggle();
    if ($(this).children(".glyphicon").hasClass("glyphicon-triangle-right")) {
      $(this).children(".glyphicon").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom");
    } else {
      $(this).children(".glyphicon").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right");
    }
  });

  // 防作弊切换次数鼠标悬停
  $(".tab-limit .glyphicon-question-sign").hover(function () {
    $(".tab-limit .help-info").css("display", "inline");
  }, function () {
    $(".tab-limit .help-info").css("display", "none");
  });
  //练习模式鼠标悬停
  $(".practice .glyphicon-question-sign").hover(function () {
    $(".practice .help-info").show();
  }, function () {
    $(".practice .help-info").hide();
  });
  //防作弊限制时间鼠标悬停
  $(".time-limit .glyphicon-question-sign").hover(function () {
    $(".time-limit .help-info").css("display", "inline");
  }, function () {
    $(".time-limit .help-info").css("display", "none");
  });

  //拍照防作弊鼠标悬停
  $(".capture .glyphicon-question-sign").hover(function () {
    $(".capture .help-info").css("display", "inline");
  }, function () {
    $(".capture .help-info").css("display", "none");
  });

  $("input[name=verifyCount]").change(function () {
    if ($("input[name=verifyCount]").is(":checked")) {
      $("input[name=setVerifyBeforeMin]").val('0');
      $("input[name=maxVerifyTimes]").val('5');
    }else {
      $("input[name=setVerifyBeforeMin]").val('');
      $("input[name=maxVerifyTimes]").val('');
    }
  });

  //提交表单
  $("#saveBtn").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    if ($(this).attr('disabled')=='disabled') return;

    var reg=/^[1-9]\d*$|^0$/;
    var mark_value=$("input[name=passMark]").val();
    if(reg.test(mark_value)==false){
      alert("请检查及格分数！");
      return false;
    }
    if (checkForm()) {

      var  val = $('input[name=setProcess]').val();
      val = 0;// 后面需修改
      var flag = '';//判断是否更改过，0未更改/1已更改

      val == initSetProcessVal ? flag=0 :flag = 1;

      if(flag === 1){ //按钮状态已更改，发送请求

        $.ajax({
          url:'/api/admin/is_process_using',
          type:'post',
          dataType: "json",
          data:{
            examInfoId:examInfoId,
            account:user.account,
            companyId:user.companyId
          },
          success:function(res){

            var data = res;

            if(data.code == 1){

              alert("有学员正在答题，暂不能更改自定义任务！");

              return false
            }else if(data.code == 2){

              alert("该考试关联自定义任务，不能解除关联！");

              return false

            }else{
              $(this).attr("disabled", "disabled");
              $("#loading").show();
              //表单数据拼装
              formDataFormat();
              savePaperFn("/examadmin/admin/exam/update/");
            }
          }
        });
      }else{
        $(this).attr("disabled", "disabled");
        $("#loading").show();
        //表单数据拼装
        formDataFormat();
        savePaperFn("/api/exam/exam_update/");
      }
    }
  });
  //新增一行
  $("body").on("click", "a.addKeyRadioOrCheck", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var prevDom = $(this).prev();
    var on_state_count = $(this).parents(".onShow_state").find(".on_state").length;
    if (on_state_count > 4) {
      return;
    }
    $(this).parents(".onShow_state").find(".on_state").each(function (index, element) {
      $(this).children(".minScore").attr("name", "min_score" + index);
      $(this).children(".maxScore").attr("name", "max_score" + index);
      $(this).children(".markedWords").attr("name", "marked_words" + index);
      $(this).children(".urlAddress").attr("name", "url_address" + index);
    });
    var html = '<div class="on_state on_stateAdd" style="margin-left:0">' +
      '<input type="text" name="minScore' + on_state_count + '" class="score min_score" placeholder="最小值"> ' +
      '<div class="state-sign">' +
      '<span class="less-sign less-than-equal-to"></span>分数' +
      '<span class="less-sign"></span></div> ' +
      '<input type="text" name="maxScore' + on_state_count + '" class="score max_score" placeholder="最大值"> ' +
      '<input type="text" name="markedWords' + on_state_count + '" class="marked_words" maxlength="100" placeholder="提示语"> ' +
      '<input type="text" name="urlAddress' + on_state_count + '" class="url_address" placeholder="跳转链接"> ' +
      '<a class="q-opra-reduce removeKeyRadioOrCheck" href="javascript:void(0)"><em class="icons8-trash-can"></em></a>' +
      '</div>'
    prevDom.after(html);
  });

  //删除一行
  $("body").on("click", "a.removeKeyRadioOrCheck", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().remove();
    //如果删除的是微信红包行，显示微信红包的"增加选项"
    if($(this).parent().hasClass("grade-item")){
      $(".addGradeItem").show();
    }
  });

  //微信红包新增一行
  $("body").on("click", "a.addGradeItem", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var item_count = $(this).parents(".showRedPackage").find(".grade-item").length;
    if (item_count > 3) {
      $(this).parents(".showRedPackage").find(".addGradeItem").hide();
    }
    if (item_count > 4) {
      return;
    }
    $(this).parents(".showRedPackage").find(".grade-item").each(function (index, element) {
      $(this).children(".red-packet-min-score").attr("name", "redPackMinScore" + index);
      $(this).children(".red-packet-max-score").attr("name", "redPackMaxScore" + index);
      $(this).children(".min-money").attr("name", "minMoney" + index);
      $(this).children(".max-money").attr("name", "maxMoney" + index);
      $(this).children(".red-packet-tip").attr("name", "redPackTip" + index);
    });
    var html = '<div class="grade-item">' +
      '<input type="text" name="redPackMinScore'+item_count+'" class="red-packet-min-score" placeholder="最小值"> ' +
      '<div class="state-sign">' +
      '<span class="less-sign less-than-equal-to"></span>分数<span class="less-sign"></span> ' +
      '</div> ' +
      '<input type="text" name="redPackMaxScore'+item_count+'" class="red-packet-max-score" placeholder="最大值"> ' +
      '<input type="text" name="minMoney'+item_count+'" class="min-money" placeholder="最小金额"> ' +
      '<div class="state-sign"> ' +
      '<span class="less-sign less-than-equal-to"></span>金额<span class="less-sign"></span> ' +
      '</div> ' +
      '<input type="text" name="maxMoney'+item_count+'" class="max-money" placeholder="最大金额"> ' +
      '<a class="q-opra-reduce removeKeyRadioOrCheck" href="javascript:void(0)"><i class="icons8-trash-can"></i></a>' +
      '</div>';
    $(html).appendTo($(this).parents(".showRedPackage"));
  });

  // 积分新增一行
  $("body").on("click", "a.addPointRule", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var prevDom = $(this).prev();
    var on_state_count = $(this).parents(".onShow_state").find(".on_state_point").length;
    if (on_state_count > 4) {
      return;
    }
    $(this).parents(".onShow_state").find(".on_state_point").each(function (index, element) {
      $(this).children(".min_score").attr("name", "minGetScore" + index);
      $(this).children(".max_score").attr("name", "maxGetScore" + index);
      $(this).children(".select-box").attr("name", "changeType" + index);
      $(this).children(".point-score").attr("name", "changeScore" + index);
    });
    var html = '<div class="on_state_point on_stateAdd" style="margin-left:0">' +
      '<input type="text" name="minGetScore' + on_state_count + '" class="score min_score" placeholder="最小值"> ' +
      '<div class="state-sign">' +
      '<span class="less-sign less-than-equal-to"></span>分数' +
      '<span class="less-sign"></span></div> ' +
      '<input type="text" name="maxGetScore' + on_state_count + '" class="score max_score" placeholder="最大值"> ' +
      '<div class="form-group-select">' +
      '<select name="changeType' + on_state_count + '" class="select-box">' +
      '<option value="-1">减少</option>' +
      '<option value="1" selected>增加</option>' +
      '</select>' +
      '</div>'+
      '<input type="text" name="changeScore' + on_state_count + '" class="point-score" maxlength="3"> 积分' +
      '<a class="q-opra-reduce removePointRule" href="javascript:void(0)"><i class="icons8-trash-can"></i></a>' +
      '</div>';

    prevDom.after(html);
  });

  //删除一行
  $("body").on("click", "a.removePointRule", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().remove();
  });



  //判断试卷是否有学员正在使用
  if (hasUsing == "True") {
    $(".changePaper").attr("disabled", "disabled");
    $("input[name=examName]").attr("disabled", "disabled");
    $(".changePaper").parent().click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      alert("学员尚未交卷，无法更换试卷！");
    });
    $("#exam_name").attr("title_tip", "学员尚未交卷，无法更换试卷名称！")
    // $("#exam_name").click(function (e) {
    // 	e.stopPropagation();
    //  		    e.preventDefault();
    // 	alert("学员尚未交卷，无法更换试卷名称！");
    // });
  }

  //展开和收起部门／学员
  $(".collapse-label").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var label_wrap = $(this).parents(".label-wrap");

    if($(label_wrap).hasClass("open")){
      $(label_wrap).removeClass("open");
      $(this).find(".glyphicon-title").text("展开");
      $(this).find(".glyphicon").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
    }else {
      $(label_wrap).addClass("open");
      $(this).find(".glyphicon-title").text("收起");
      $(this).find(".glyphicon").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top")
    }
  });

  //部门／学员 / 标签关键字label删除
  $("body").on("click", ".label-wrap .glyphicon-remove", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var _this = $(this);
    //重新拼接input中的val
    if(_this.parents(".label-wrap").hasClass("usersName")){
      _this.parent().remove();
      var str = "";
      for(var i=0;i<$(".userNameLabel .label").length;i++){
        str += $(".userNameLabel .label:eq("+i+") .useridItem").text() + ",";
      }
      $(".hasSelectedUserIds").val(str);
      if($(".userNameLabel").html().replace(/\s*/g,"") == ''){
        $("#clearUsers").attr("disabled",true);
      }
    }else if(_this.parents(".label-wrap").hasClass("userLabelNames")){
      _this.parent().remove();
      var str = "";
      for(var i=0;i<$("#labelsName .label").length;i++){
        str += $("#labelsName .label:eq("+i+") .userLabelIdItem").text() + ",";
      }
      $("input[name=userLabelIds]").val(str);
    }else {
      _this.parent().remove();
    }
  });

  //切屏次数输入框提示信息
  $(".tabCount").blur(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var reg = /^[1-9]\d*|0$/;
    var num = $(this).val();
    if ($("input[name=setFullScreen]").is(":checked")) {
      if ($(this).val() == "") {
        alert('请填写"限制切换次数"！');
      } else if (!reg.test(num)) {
        alert("请输入大于等于0的整数");
      }
    }
  });

  //手机端,pc端防作弊倒计时提示信息
  $("input[name=restTime]").blur(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var reg = /^[1-9]\d*|0$/;
    var num = $(this).val();
    if ($("input[name=setTimeLimitChk]").val()==1) {
      if ($(this).val() == "") {
        // alert('请填写"无操作时长"！');
      } else if (!reg.test(num)) {
        alert("请输入大于等于0的整数");
        $("input[name=restTime]").val("");
        $("input[name=restTime]").focus();
      } else if (num < 3) {
        alert("时长至少3秒");
        $("input[name=restTime]").val("");
        $("input[name=restTime]").focus();
      } else if (num > 127) {
        alert("时长不能超过127秒！");
        $("input[name=restTime]").val("");
        $("input[name=restTime]").focus();
      }
    }
  });

  // 考前分钟开始身份认证
  $("input[name=setVerifyBeforeMin]").blur(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var reg = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    var num = $(this).val();
    if ($("input[name=verifyCount]").val()==1) {
      if ($(this).val() == "") {
      } else if (!reg.test(num)) {
        alert("请输入整数");
        $("input[name=setVerifyBeforeMin]").val("");
        $("input[name=setVerifyBeforeMin]").focus();
      } else if (num > 30) {
        alert("考前身份验证最多提前30分钟开始！");
        $("input[name=setVerifyBeforeMin]").val("");
        $("input[name=setVerifyBeforeMin]").focus();
      }
    }
  });


  //允许查看试卷
  $("#allow_p_a_days").blur(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var reg = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    var num = $(this).val();
    if($("input[name='is_paper_forever']:checked").val()==1){
      if ($(this).val() == "") {
      } else if (!reg.test(num)) {
        alert("请输入整数");
        $("#allow_p_a_days").val("");
        $("#allow_p_a_days").focus();
      } else if (num <=0) {
        alert("天数必须大于0！");
        $("#allow_p_a_days").val("");
        $("#allow_p_a_days").focus();
      }
    }
  });

  //提示防作弊次数
  $("input[name=blurCount]").blur(function(e){
    e.stopPropagation();
    e.preventDefault();
    var reg = /^[1-9]\d*|0$/;
    var number = $(this).val();
    if ($(".setFullScreenBtn").hasClass("switch-on")) {
      if ($(this).val() == "") {
      } else if (!reg.test(number)) {
        alert("请输入大于等于0的整数");
        $("input[name=blurCount]").val("");
        $("input[name=blurCount]").focus();
      }else if (number > 127) {
        alert("次数不能超过127次！");
        $("input[name=blurCount]").val("");
        $("input[name=blurCount]").focus();
      }
    }
  });
  //提示防作弊秒数
  $("input[name=switchScreenSecond]").blur(function(e){
    e.stopPropagation();
    e.preventDefault();
    var reg = /^[0-9]|10$/g;
    var number = $(this).val();
    if ($(".setFullScreenBtn").hasClass("switch-on")) {
      if ($(this).val() == "") {
      }else if (!reg.test(number)) {
        alert("请输入0-10之间的整数");
        $("input[name=switchScreenSecond]").val("");
        $("input[name=switchScreenSecond]").focus();
      }else if (number > 10) {
        alert("时间不能超过10秒！");
        $("input[name=switchScreenSecond]").val("");
        $("input[name=switchScreenSecond]").focus();
      }
    }
  });

});

var beatTitle = $("textarea[name=showBeatratioTitle]").val();
$("#beat_content").click(function(e) {
  e.stopPropagation();
  e.preventDefault();
  $('#beatModal').modal({
    backdrop: "static",
    keyboard: false
  });
});

//击败百分比开启关闭
$(".switch-Beatratio").on("click",function(e){
  e.stopPropagation();
  e.preventDefault();
  if($(this).hasClass("switch-on")){
    $("input[name=showBeatratioTitle]").val("");
  }else{
    $("input[name=showBeatratioTitle]").val(beatTitle);
  }
})

//点击显示默认内容
$(".btn-default-content").click(function(e){
  e.stopPropagation();
  e.preventDefault();
  $(".show-beat").val("已击败的挑战者");
  $("#beat_title").text("已击败的挑战者");
});

//当点击取消时恢复内容
$("#cancelBeat").click(function(){
  $(".show-beat").val(beatTitle);
});

// 效果展示
$("textarea[name=showBeatratioTitle]").keyup(function() {
  var beat_title = $(this).val();
  $("#beat_title").text(beat_title);
});

$("#saveBeat").click(function(e) {
  e.stopPropagation();
  e.preventDefault();
  var beatratio_title=$(".show-beat").val();
  if(beatratio_title.length>14){
    alert("不超过14个字符！");
    return false;
  }
  $("input[name=showBeatratioTitle]").val(beatratio_title);
  beatTitle=beatratio_title;
  $('#beatModal').modal('hide');
});

$('input[name="releaseWaySwitch"]').change(function(event, state) {
  if (!$(this).is(":checked")) {
    $("input[name=setReleaseTime]").val("");
    $("input[name=setReleaseWay]").val("3");
    $(".onShow_state").hide();
    $(".set_allows_paper_answerChk").hide();
    $(".set_remark").hide();
    $(".ranking-row").hide();
  } else {
    $("input[name=setReleaseTime]").val("");
    $("input[name=setReleaseWay]").val("1");
    $(".onShow_state").show();
    $(".set_allows_paper_answerChk").show();
    $(".set_allows_paper_answerChk").css("display","inline-block");
    $(".set_remark").show();
    //设置评语
    $(".set_remark input").change(function(e) {
      if($(this).is(":checked")) {
        $(".onShow_state").show();
      }else{
        $(".onShow_state").hide();
      }
    });
    if($(".set_remark input").is(":checked")) {
      $(".onShow_state").show();
    }else {
      $(".onShow_state").hide();
    }
    $(".ranking-row").show();
  }
});


//设置评语
$(".set_remark input").change(function(e) {
  if($(this).is(":checked")) {
    $(".onShow_state").show();
  }else {
    $(".onShow_state").hide();
  }
});

//设置微信红包
$(".setWechatRedPack input").change(function (e) {
  if ($(this).is(":checked")) {
    $(".showRedPackage").show();
  } else {
    $(".showRedPackage").hide();
  }
});

//click分享设置
$("#weChatLink").click(function(e){
  e.stopPropagation();
  e.preventDefault();
  showWeChat();
})
//显示分享设置对话框
function showWeChat(){
  var exam_info_id=$("input[name=examInfoId]").val();
  weChatModal.location.href = "/examadmin/admin/wechat_update/"+exam_info_id;
  $('#weChatModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭分享设置对话框
function hideWeChat(obj){
  $('#weChatModal').modal('hide');
}
function weChatSet(title,pic){
  wechatTitle=title;
  wechatPic=pic;
  $("input[name=weChatTitle]").val(title);
  $("input[name=weChatPic]").val(pic);
}

//显示选择分类对话框
function showSelType(obj){
  selTypeModal.location.href = "/admin/exam_add/exam_sel_style";
  $('#typeModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭选择分类对话框
function hideSelType(obj){
  $('#typeModal').modal('hide');
}
//接受选择分类数据
function selType(id,name){
  $("input[name=examStyle]").val(id);
  $("#selTypeLink span").text(name);
}
//显示选择试卷对话框
function selPaper(id,paper_name,paper_type,total_score,test_count,create_user_name,created_time){
  var data = [paper_name,paper_type,total_score,test_count,create_user_name,created_time];
  $(".paperList .exam_info").find("td").each(function(index,element){
    $(this).html(data[index]);
  });
  $("input[name=paperInfoId]").val(id);
  /***/
  $(".paper-name").text(paper_name);
  $(".paper-type").text(paper_type);
  $(".paper-total-score").text(total_score);
  $(".paper-create-user-name").text(create_user_name);
  $(".paper-test-count").text(test_count);
  $(".paper-created-time").text(created_time);
  // $(".changePaper").text("更换");
}
//显示选择试卷对话框
function showSelPaper(obj){
  selPaperModal.location.href = "/admin/exam_sel_paper";
  $('#paperModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭选择试卷对话框
function hideSelPaper(obj){
  $('#paperModal').modal('hide');
}
//显示选择组对话框
function showSelGroup(obj){
  selGroupModal.location.href = "/admin/exam_add/exam_sel_dep/";
  $('#groupModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭选择组对话框
function hideSelGroup(obj){
  $('#groupModal').modal('hide');
}
//接受选择组数据
function selGroup(id,depsArray){
  $("input[name=deptIds]").val(id);
  $("#depName").children().remove();
  $.each(depsArray,function(index,value){
    $("#depName").append('<span class="label label-default" style="display:inline-block"><span class="depidItem" style="display:none">'+value[0]+'</span><span class="depnameItem">'+value[1]+'</span></span>');
  });
}
//显示选择用户对话框
function showSelUser(obj){
  var commit_ids = join_user_id();
  selUserModal.location.href = "/admin/exam_add/selUser";
  $('#userModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭选择用户对话框
function hideSelUser(obj){
  $('#userModal').modal('hide');
  selUserModal.document.body.innerHTML = "";
}


//接受选择用户数据
function selMuchUser(namesArray){
  $.each(namesArray,function(index,value){
    if(namesArray[index]!=undefined){
      $("#usersName").append('<span class="label label-default" style="display:inline-block"><span class="useridItem" style="display:none">'+value[0]+'</span><span class="surnameItem">'+value[1]+'</span><span class="glyphicon glyphicon-remove"></span></span>');
    }
  });
  if($(".userNameLabel").html() != ''){
    $("#clearUsers").removeAttr("disabled");
  }
}

//显示选择学员标签对话框
function showSelUserlabel(obj) {
  selUserLabelModal.location.href = "/baseinfo/admin/tree/multi_user_label";
  $('#userLabelModal').modal();
}

//关闭选择学员标签对话框
function hideSelUserlabel(obj) {
  $('#userLabelModal').modal('hide');
  selUserLabelModal.document.body.innerHTML = "";
}

//接受选择学员标签的数据
function selUserLabel(id, labelsArray) {
  $("input[name=userLabelIds]").val(id);
  $("#labelsName").children().remove();
  $.each(labelsArray, function (index, value) {
    $("#labelsName").append('<span class="label label-default"><span class="userLabelIdItem hidden">' + value[0] + '</span><span class="userLabelNameItem">' + value[1] + '</span><span class="glyphicon glyphicon-remove"></span></span>');
  });
}

function showSelLogin(obj) {
  var exam_id = $("input[name=examInfoId]").val();
  selLoginModal.location.href = "/examadmin/admin/skip_login_config?examId="+exam_id;
  $('#loginModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//显示选择部门对话框
function showDeptType(e,obj){
  var x=(window.innerWidth-598)/2+e.clientX-130;
  var y=e.clientY-448+100+68;
  selDeptModal.location.href = "/baseinfo/admin/tree/user_sel_dep/00000";
  $("#selDeptModal").css({display:"inline-block",left:x+'px',top:y+"px"});
}
//关闭选择部门对话框
function hideSelDept(obj){
  $("#selDeptModal").hide();
}
//接受选择部门数据
function selDept(id,name){
  $(window.frames["selLoginModal"].document).find("input[name=depId]").val(id);
  $(window.frames["selLoginModal"].document).find("#selTypeLink span").text(name);
}
//关闭免登录信息对话框
function hideSelLogin(obj){
  $('#loginModal').modal('hide');
}

//选择试卷方法
function selPaperFn(id){
  $("input[name=paperInfoId]").val(id);
}
//表单数据拼装
function formDataFormat(){
  if($("input[name=setDisablePasteChk]").is(":checked")){
    $("input[name=setDisablePaste]").val(0);
  }else{
    $("input[name=setDisablePaste]").val(1);
  }
  // if($("input[name=setTimeLimitChk]").is(":checked")){
  // 	$("input[name=setTimeLimitChk]").val(0);
  // }else{
  // 	$("input[name=setTimeLimitChk]").val(1);
  // }
  // if ($("input[name=verifyCount]").is(":checked")) {
  //     $("input[name=verifyCount]").val(1);
  // } else {
  //     $('input[name=setVerifyBeforeMin]').val(0);
  //     $("input[name=verifyCount]").val(0);
  // }
  if($("input[name=setRandomOrderTestChk]").is(":checked")){
    $("input[name=setRandomOrderTest]").val(0);
  }else{
    $("input[name=setRandomOrderTest]").val(1);
  }
  if($("input[name=setAllowPaper]").is(":checked")){
    $("input[name=setAllowPaper]").val(0);
  }else{
    $("input[name=setAllowPaper]").val(1);
  }
  if($('.switch-exam').hasClass('switch-off')){ //关闭了显示成绩，允许查看试卷、查看解析默认开启
    $("input[name=setAllowPaper]").val(1);
    $("input[name='setAllowsPaperAnswer']").eq(0).prop('checked','checked'); //默认勾选显示解析
  }

  if ($('#switch-passSetting').hasClass('switch-off')) {
    $("input[name=setExamPwd]").val(0);
    $("input[name=examPwd]").val('');
  }
}
//验证表单
function checkForm(){

  function moveHtml(id) {
    var scroll_offset = $(id).offset().top + 500 + 'px';
    $(".cont-r").animate({
      scrollTop: scroll_offset
      //让body的scrollTop等于pos的top，就实现了滚动
    }, 300);
  }

  if($("input[name=examName]").val()==""){
    alert('请填写"考试名称"！');
    moveHtml($("input[name=examName]"));
    $("input[name=examName]").focus();
    $("input[name=examName]").select();
    return false;
  }else if($("input[name=examName]").val().length> 50){
    alert('考试名称不得大于50字！');
    moveHtml($("input[name=examName]"));
    $("input[name=examName]").focus();
    $("input[name=examName]").select();
    return false;
  }


  if($("input[name=examStyle]").val()==""){
    alert('请选择"考试分类"！');
    return false;
  }
  if ($(".setFullScreenBtn").hasClass("switch-on")) {
    if ($("input[name=blurCount]").val() == "") {
      alert('请填写"限制切换次数"！');
      return false;
    }
    if ($("input[name=switchScreenSecond]").val() == "") {
      alert('请填写"允许切屏时长"！');
      return false;
    }
  }
  if ($(".setCaptureBtn").hasClass("switch-on")) {
    if ($("input[name=setCaptureTime]").val() == "") {
      alert('请填写"随机抓拍时间"！');
      return false;
    }else {
      var deviceStatus = $('input[name=device]:checked').val();
      var val = $("input[name=setCaptureTime]").val();
      var reg = /^\+?[1-9][0-9]*$/;
      if(deviceStatus==1){
        if (!reg.test(val)||val<2||val>20) {
          alert('随机抓拍时间设置范围：2-20,请检查！');
          return false;
        }
      }else {
        if (!reg.test(val)||val<4||val>20) {
          alert('随机抓拍时间设置范围：4-20,请检查！');
          return false;
        }
      }
    }
  }
  if ($("input[name=verifyCount]").val()==1) {
    if ($("input[name=setVerifyBeforeMin]").val() == "") {
      alert('请填写"考前身份验证时间"！');
      return false;
    }

    // 每个学员认证次数
    var maxVerifyTimes = $("input[name=maxVerifyTimes]").val();

    if(!maxVerifyTimes || maxVerifyTimes == "" || maxVerifyTimes < 1 || maxVerifyTimes > 30){
      alert('考前身份认证次数输入范围：1~30,请检查！');
      return false;
    }
  }else {
    $("input[name=setVerifyBeforeMin]").val('0');
    $("input[name=maxVerifyTimes]").val('0');
  }

  if($(".setTimeLimitChkBtn").hasClass("switch-on")){
    if($("input[name=restTime]").val()==""){
      alert('请填写"无操作时长"！');
      return false;
    }
  }else {
    $("input[name=restTime]").val('0')
  }

  //验证不是全员参与的情况下，是否选择了学员和部门
  var isSelectAll = $('input[name=joinStatus]:checked').val();
  var isSetProcess = $('input[name=setProcess]').val();
  var isSkipLogin = $('input[name=skipLogin]:checked').val();

  if(isSetProcess == 0 && isSkipLogin== 0 && isSelectAll == 1){

    if(userLabelOpen == '1'){
      if($.trim($('#depName').html()) === '' && $.trim($('#usersName').html()) === '' && $.trim($('#labelsName').html()) === ''){

        alert(' 请选择参与部门/学员/标签！');
        return false;
      }
    }else {
      if($.trim($('#depName').html()) === '' && $.trim($('#usersName').html()) === ''){

        alert(' 请选择参与部门/学员！');
        return false;
      }
    }
  }

  if ($("input[name=passMark]").val() == "") {
    alert('请填写"及格分数"！');
    moveHtml($("input[name=passMark]"))
    $("input[name=passMark]").focus();
    $("input[name=passMark]").select();
    return false;
  } else if ( parseFloat( $("input[name=passMark]").val() ) >= parseFloat( $(".paper_total_score").text() ) ) {
    alert("请保证及格分数小于试卷总分！");
    moveHtml($("input[name=passMark]"))
    $("input[name=passMark]").focus();
    $("input[name=passMark]").select();
    return false;
  }
  var endTime=new Date($("#dateTo").val())
  var startTime=new Date($("#dateFrom").val())
  if($("input[name=examStartTime]").val()=="" || $("input[name=examEndTime]").val()=="" || endTime <= startTime){
    alert('请填写考试时间，并保证结束时间大于开始时间');
    return false;
  }

  //如果选择的是有限时长
  if ($("input[name=examTimeRestrict]:checked").val()==1 && $("input[name=examTime]").val() == "") {
    alert('请填写"答卷时长"！');
    moveHtml($("input[name=examTime]"))
    $("input[name=examTime]").focus();
    $("input[name=examTime]").select()
    return false;
  }

  if (examTimeRestrict != ""){
    if(parseFloat($("input[name=examTime]").val()) < 0|| parseFloat($("input[name=examTime]").val())==0 || $("input[name=examTime]").val().indexOf('.') != -1){
      alert('"答卷时长"请填写一个非0的正整数！');
      moveHtml($("input[name=examTime]"));
      $("input[name=examTime]").focus();
      $("input[name=examTime]").select();
      return false;
    }
  }

  if($("input[name=examTimes]").val()==""){
    alert('请填写"参考次数"！');
    return false;
  }
  if($("input[name=setBanAfterMin]").val()==""){
    alert('请填写"禁止学员参加考试时间"！');
    return false;
  }
  if($("input[name=setBanWthinMin]").val()==""){
    alert('请填写"禁止交卷时间"！');
    return false;
  }
  //如果开启考前校验密码
  if($('input[name=setExamPwd]').val() == "1" && $(".change-pwd-box .pwd-input-tips").hasClass("error")){
    alert('考前校验'+$(".change-pwd-box .pwd-input-tips").html());
    return false;
  }
  //如果开启考试迟到限时
  if($("input[name=lateCheck]").val() == "1" && !/^\d{1,}$/.test($("input[name=lateTime]").val())){
    alert('请填写正确的"学员可迟到时间"！');
    return false;
  }


  //允许查看试卷-校验
  if($("input[name='is_paper_forever']:checked").val()==1&&$('.switch_scan_paper').hasClass('switch-on')){//开启允许查看试卷且设置了天数
    var reg = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    var num =  $("#allow_p_a_days").val();
    if (num == "") {
      alert("请填写允许查看试卷的可查看天数!");
      return false;
    } else if (!reg.test(num)) {
      alert("允许查看试卷的可查看天数请输入整数");
      return false;
    } else if (num <=0) {
      alert("允许查看试卷的可查看天数必须大于0!");
      return false;
    }
  }


  //如果开启最短答题时长
  if($("input[name=setMinExamTime]").val() == "1"){
    if((!/^\d{1,}$/.test($("input[name=minExamTime]").val()))||($("input[name=minExamTime]").val()==0)) {//最短答题时长需要为整数
      alert('请填写正确的"最短答题时长"！');
      return false;
    }
    //若答卷时长不为'不限时长'，则最短答题时长需要比这个时间小
    if(($("input[name=examTimeRestrict]:checked").val()==1)&&(parseInt($("input[name=minExamTime]").val())>parseInt($("input[name=examTime]").val()))){
      alert('"最短答题时长"不能超过"答题时长"，请检查！');
      return false;
    }
  }
  var exam_price = $("input[name=examPrice]").val();
  if($("input[name=userPayConfirm]").is(":checked")) {
    var checkReg = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/;
    if( !$.isNumeric(exam_price) || exam_price < 1 || !checkReg.test(exam_price)) {
      alert("付费金额输入有误，不得小于1元，最多支持两位小数");
      moveHtml($("input[name=examPrice]"))
      $("input[name=examPrice]").focus();
      $("input[name=examPrice]").select();
      return false;
    }
  }

  // 闯关模式限制答错次数 errorTimes
  var answer_wrong = $("input[name=errorTimes]").val();
  if ($("input[name=passMode]").is(":checked")) {
    var regex = /^[0-9]*[0-9][0-9]*$/;
    if (!$.isNumeric(answer_wrong) || (!regex.test(answer_wrong))) {
      alert("请保证答错次数为整数");
      moveHtml($("input[name=errorTimes]"));
      $("input[name=errorTimes]").focus();
      $("input[name=errorTimes]").select();
      return false;
    }
  }

  if($("input[name=releaseWaySwitch]").val() != '3'){
    var check_score = true;
    var reg = /^[1-9]\d*|0$/;
    //判断是否开启'显示评语'
    if($("input[name=setRemark]").is(":checked")) {
      $(".on_state input").removeAttr("disabled");
      var minArr = [],
        maxArr = [];
      $(".on_state").each(function () {
        var min_score = $(this).children("input").eq(0).val();
        var max_score = $(this).children("input").eq(1).val();
        minArr.push(min_score==""?0:Number(min_score));
        maxArr.push(max_score==""?0:Number(max_score));
        var inputCheck = true;//判断当前input是否正确，如果输入错误，添加error-input类
        if (min_score != "" && max_score != "" ) {
          if(!reg.test(min_score) || parseFloat(min_score) > parseFloat(totalPoints) || !reg.test(max_score) || parseFloat(max_score) > parseFloat(totalPoints) || parseFloat(min_score) > parseFloat(max_score)){
            inputCheck = false;
            alert("请保证'显示评语'的分数区间输入正确");
          }
        }else {
          inputCheck = false;
          alert("分数区间不能为空");
        }
        if(!inputCheck) {
          $(this).children("input").addClass("error-input");
          check_score = false;
          return false;
        }
      });
      if(check_score && arrCross(minArr,maxArr)){
        alert("'显示评语'的分数区间不能有交叉");
        check_score = false;
      }
    }else {
      //如果没有开启评语，那么就把.on_state中的input禁用掉，避免提交后过不了后端校验
      $(".on_state input").attr("disabled",true);
    }
    if(check_score == false){
      return false;
    }
  }



  // 积分规则
  var check_score_point = true;
  var reg_point = /^[1-9]\d*|0$/;
  var reg_point_score = /^[1-9][0-9]{0,2}$/;
  //判断是否开启'显示评语'
  if ($('.switch-point').hasClass('switch-on')) {
    $(".on_state_point input").removeAttr("disabled");
    var minArr = [],
      maxArr = [];
    $(".on_state_point").each(function () {
      var min_score = $(this).children("input").eq(0).val();
      var max_score = $(this).children("input").eq(1).val();
      var point_score = $(this).find('.point-score');

      minArr.push(min_score==""?0:Number(min_score));
      maxArr.push(max_score==""?0:Number(max_score));
      var inputCheck = true;//判断当前input是否正确，如果输入错误，添加error-input类
      if (min_score != "" && max_score != "" && $(point_score).val() != "" ) {
        if(!reg_point.test(min_score) || parseFloat(min_score) > parseFloat(totalPoints) || !reg_point.test(max_score) || parseFloat(max_score) > parseFloat(totalPoints) || parseFloat(min_score) > parseFloat(max_score)){
          inputCheck = false;
          alert("请保证'积分规则'的分数区间输入正确");
        }else if (!reg_point_score.test($(point_score).val())){
          inputCheck = false;
          alert("请保证'积分规则'的积分输入正确 (范围：1-999的整数)");
        }
      }else {
        inputCheck = false;
        alert("分数区间、积分不能为空");
      }
      if(!inputCheck) {
        $('.on_state_point').find("input").addClass("error-input");
        check_score_point = false;
        return false;
      }
    });
    if(check_score_point && arrCross(minArr,maxArr)){
      alert("'积分规则'的分数区间不能有交叉");
      check_score_point = false;
    }
  }else {
    //如果没有开启评语，那么就把.on_state_point，避免提交后过不了后端校验
    $(".on_state_point input").attr("disabled",true);
  }
  if(check_score_point == false){
    return false;
  }



  //判断是否开启微信红包
  if ($("input[name=setWechatRedPack]").is(":checked")) {
    var check = true;
    var reg = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/; //价格金额允许保留小数点后两位;微信红包分数也保留小数点后两位
    var minArr = [],
      maxArr = [];
    $(".showRedPackage .grade-item input").removeAttr("disabled");
    $(".grade-item").each(function () {
      var min_score = $(this).children("input").eq(0).val();
      var max_score = $(this).children("input").eq(1).val();
      var min_money = $(this).children("input").eq(2).val();
      var max_money = $(this).children("input").eq(3).val();
      var inputCheck = true;//判断当前input是否正确，如果输入错误，添加error-input类
      minArr.push(min_score==""?0:Number(min_score));
      maxArr.push(max_score==""?0:Number(max_score));
      if (min_score != "" && max_score != "") {
        if (!reg.test(min_score) || !reg.test(max_score) || parseFloat(min_score) < 0 || parseFloat(max_score) < 0 || parseFloat(min_score) > parseFloat(totalPoints)  || parseFloat(max_score) > parseFloat(totalPoints) || parseFloat(min_score) > parseFloat(max_score)) {
          inputCheck = false;
          alert("红包分数段输入有误，最多支持两位小数");
        }
      }else {
        inputCheck = false;
        alert("'微信红包'分数不能为空");
      }
      if (inputCheck) {
        if(min_money != "" && max_money != ""){
          //微信红包金额 1——200
          if (!reg.test(min_money) || !reg.test(max_money) || parseFloat(min_money) < 1 || parseFloat(min_money) > 200 || parseFloat(max_money) < 1 || parseFloat(max_money) > 200 || parseFloat(min_money) > parseFloat(max_money)) {
            inputCheck = false;
            alert("红包金额输入有误，仅支持1～200元金额，最多支持两位小数。");
          }
        }else {
          inputCheck = false;
          alert("红包金额不能为空");
        }
      }
      if(!inputCheck) {
        $(this).children("input").addClass("error-input");
        check = false;
        return false;
      }
    });
    if(!check){
      return false;
    }else if(arrCross(minArr,maxArr)){
      alert("'微信红包'的分数区间不能有交叉");
      check_score = false;
    }
  }else {
    //如果没有开启微信红包，那么就把.grade-item中的input禁用掉，避免提交后过不了后端校验
    $(".showRedPackage .grade-item input").attr("disabled",true);
  }

  if($("#set_release_way2").is(":checked")){
    if($("input[name=set_release_time]").val()==""){
      alert('请填写"指定发布时间 "！');
      return false;
    }
  }
  if($("input[name=paperInfoId]").val()==""){
    alert('请选择试卷！');
    return false;
  }

  if($("#set_release_way1").is(":checked")){
    $("input[name=set_release_time]").val("");
  }
  return true;
}

//异步保存fn
function ipContent(){
  //写入ipRange
  var items = $("ul.list-group").find("li.list-group-item"); //取得items;
  var content;
  var temp = "";
  $(items).each(function (i, item) { //循环遍历数组items
    content = $(this).text()+"#";//获取当前文本值
    temp += content;
  });
  $("input[name='ipRange']").val(temp);
  /*if(temp == "" || temp == null || items == "" || items == null){
      $("span.ip-content").text("当前还未设置ip范围");
  }else{
      var newStr = temp.split("#")[0]+'等IP';
      var str = $("span.ip-content").text(newStr);
  }*/
}

$(".showRedPackage .grade-item input").focus(function(){
  $(this).parents(".grade-item").children("input").removeClass("error-input");
});
$(".onShow_state .on_state input").focus(function(){
  $(this).parents(".on_state").children("input").removeClass("error-input");
});
var has_obj_question;

function savePaperFn(url){
  ipContent();
  $(".hasUsingFormDom").removeAttr("disabled","");

  var examUsers=join_user_id();
  $("input[name=userIds]").val(examUsers.trim());
  var skipLogin = $("input[name = skipLogin]").val();//免登录时隐藏发送邮件
  //如果开启考前校验密码
  if($('input[name=setExamPwd]').val() == "1"){
    var pwdStr = $(".change-pwd-box input").val().replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    $("input[name=examPwd]").removeAttr("disabled").val(pwdStr);
  }else {
    $("input[name=examPwd]").attr("disabled");
  }

  //试题分数是否对学员可见
  if($(".switch-isVisible").hasClass("switch-on")) {
    $("input.scoreIsVisible").val(0);//可见为0
  }else{
    $("input.scoreIsVisible").val(1);//不可见为1
  }

  //批改评语
  if($(".switch-correct-comment").hasClass("switch-on")) {
    $("input[name=setCorrectComment]").val(1);
  }else{
    $("input[name=setCorrectComment]").val(0);
  }

  //显示答案和解析-设置表单值
  setAllowsPaperDays();
  //规范系统评语中外链地址格式
  $('.url_address').each(function(){
    var value = $(this).val();
    var number = value.indexOf('://');
    if(number >= 0) {
      $(this).val(value.substr(number+3));
    }
  });

  // 如果人员标签为空，则标签筛选规则为0
  if($.trim($('#labelsName').html()) === ''){
    $("input[name=labelSetType]").val(0);
  }

  if ($('input[name=skipLogin]:checked').val()==1){
    $("input[name = verifyCount]").val('0')
  }

  var dataForm = $('#subForm').serialize();

  // setCaptureTime setCaptureBtn
  if ($(".setCaptureBtn").hasClass("switch-on")){
    var timenum = $("input[name=setCaptureTime]").val();
    dataForm += '&setCapture='+Number(timenum);
  }else {
    dataForm += '&setCapture='+Number(0);
  }

  if ($(".setTimeLimitChkBtn").hasClass("switch-on")){
    dataForm += '&setTimeLimitChk=1';
  }

  if ($(".setFullScreenBtn").hasClass("switch-on")){
    dataForm += '&setFullScreen=on';
  }

  //是否开启自定义考试背景
  if($(".switch-examBg").hasClass("switch-on")) {
    dataForm += "&examBgIsDefault=1";
    dataForm += "&mExamBgIsDefault=1";
  }else {
    dataForm += "&examBgIsDefault=0";
    dataForm += "&mExamBgIsDefault=0";
  }
  if($(".switch-waterMark").hasClass("switch-on")){
    dataForm += "&isWatermark=1";
  }else {
    dataForm += "&isWatermark=0";
  }

  // 积分
  if ($('.switch-point').hasClass('switch-on')) {
    dataForm += "&pointStatus=1";
  }else {
    dataForm += "&pointStatus=0";
  }

  if ($("input[name='skipLogin']:checked").val() == '3'){
    if ($("input[name = phoneWhiteStatus]").val() != '1'){
      alert('请上传手机号白名单');
      $('#saveBtn').attr("disabled", false);
      return
    }
  }else {
    dataForm += "&phones=";
    dataForm += "&phoneExcelName=";
    dataForm += "&phoneExcelUrl=";
  }

  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: url,
    data: dataForm + "&account=" + user.account + "&companyId=" + user.companyId,
    success: function(msg){
      has_obj_question = msg.bizContent.hasObjectiveQuestion;
      if(msg.success== true ){
        // if( check_subsidiary(domain) ){
        //   post_exam_info(msg.id);
        // };
        //管理员体验地址
        var url = msg.bizContent.trialExamLink;
        var isSkipLogin = skipLoginVal;
        // var password = msg.bizContent.examPwd;
        $("#trialExamBtn").html('<span class="try-exam">考一下</span>');
        $("#loading").hide();
        var notification = msg.bizContent.msgContent.split(',');
        $('.notification .notificationContent').text(notification[0]);
        $('.notification .notificationUrl').text(notification[1]);
        if($("input[name='setProcess']").val()==1){
          $("#cannotLinkModal").modal("show");
        }else
        {
          var activity_type="考试";
          var title=$("input[name='examName']").val();
          var start_time=$("input[name='examStartTime']").val();
          var end_time=$("input[name='examEndTime']").val();
          var exam_time;
          if($("input[name='examTimeRestrict']:checked").val()==1){
            exam_time=$("input[name='examTime']").val()+'分钟';
          }else{
            exam_time='';
          }
          setLinkDownloadConfig(activity_type,title,start_time,end_time,exam_time);
          showSelOk(msg.bizContent.examId, msg.bizContent.examLink, msg.bizContent.examPwd, url, 'exam', isSkipLogin,"考试");
        }
      }else{
        alert(msg.desc);
      }
    }
  });
}

$("#cannotLinkModal .btn").click(function(){
  window.location.href="/examadmin/admin/exam_mgr_new";
})


//检查是否是慧科教育的子公司
function check_subsidiary(company_domain){
  domain_split = company_domain.split(".");
  if ( domain_split[1] == "gaoxiaobang" && domain_split[2] == "com" ) {
    return true;
  }
  else {
    return false;
  }
}

//往慧科教育推送考试信息
var num=0;
var post_exam_info=function (exam_info_id) {
  //考试状态
  if( $("select[name=status]").val() == "0" ){
    var exam_status = "1";
  }
  else {
    exam_status = "0";
  };
  //考试次数
  if( $("select[name=exam_times_restrict]").val() == "1" ){
    var take_exam_time = "0";
  }
  else
  {
    take_exam_time = $("input[name=exam_times]").val();
  };
  //是否发布成绩
  if($("input[name=release_way_switch]").is(":checked")){
    var release_type = "1";
  }
  else
  {
    release_type = "0";
  };

  company_id = domain.split(".")[0];

  var last_at_index=user_name.lastIndexOf("@");
  create_user_id=last_at_index != -1 ? user_name.substring(0, last_at_index) : user_name;

  if($("input[name=set_full_screen]").is(":checked")){
    var blur_count = "0";
  }
  else {
    blur_count = $("input[name=blur_count]").val();
  }
  var post_data = {
    "company_id": company_id,
    "exam_id": exam_info_id,
    "exam_name": $("input[name=exam_name]").val(),
    "classification": $("#selTypeLink span").text(),
    "release_way": release_type,
    "status": exam_status,
    "total_score": $(".paper_total_score").text(),
    "take_exam_time": take_exam_time,
    "exam_start_time": $("#dateFrom").val(),
    "exam_end_time": $("#dateTo").val(),
    "exam_time": $("input[name=exam_time]").val(),
    "create_user_id": create_user_id,
    "blur_count": blur_count,
    "has_obj_question": has_obj_question
  };
  var status;
  $.ajax( {
    type:"post",
    url:"http://restful.gaoxiaobang.com/exam/create/api?jwt="+jwt,
    dataType:"json",
    contentType: "application/json; charset=utf-8",
    data:JSON.stringify(post_data),
    success:function(msg){
      if(msg.status == 0){
        //alert("推送成功");
      }
      else{
        alert("推送失败，请联系管理员");
        num = num + 1;
        if(num<3){
          post_exam_info(exam_info_id);
        }
      }
    }
  })
}

//将指定学员的id拼装成字符串
function join_user_id(){
  var usernameLabels = $("#usersName span .useridItem");
  var examUsers='';
  for(var i=0;i<usernameLabels.length;i++){
    examUsers=examUsers+usernameLabels[i].textContent.trim()+",";
  }
  return examUsers;
}

//extend insertAtCursor
$.fn.extend({
  insertAtCursor : function(myValue) {
    var $t = $(this)[0];
    if (document.selection) {
      this.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      this.focus();
    } else if ($t.selectionStart || $t.selectionStart == '0') {
      var startPos = $t.selectionStart;
      var endPos = $t.selectionEnd;
      var scrollTop = $t.scrollTop;
      $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
      this.focus();
      $t.selectionStart = startPos + myValue.length;
      $t.selectionEnd = startPos + myValue.length;
      $t.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  }
});


//自定义考试页背景设置
$(".switch-examBg").on("click",function(e){
  e.stopPropagation();
  e.preventDefault();
  if($(this).hasClass('switch-disabled')){
    alert("您没有权限，请先开通该功能");
    return false;
  }
  if($(this).prop("class").indexOf("switch-on") == -1){
    $("#examBgLink").show();
  }else {
    $("#examBgLink").hide();
  }
});
//背景图片设置
$("#examBgLink").click(function (e) {
  e.stopPropagation();
  e.preventDefault();
  $("#examBgModal").modal("show");
});

//上传图片
$('.button-upload').click(function (e) {
  $(this).find('input[type=file]').click();
});
$('input[type=file]').click(function (e) {
  e.stopPropagation();
});

//自定义考试背景 PC
$("input[name=examFile]").change(function () {
  if ($(this).val() != '') {
    var dom = this;
    var type = 'examBg';
    var formData = new FormData();
    formData.append('examBgFile', this.files[0]);
    formData.append('classification', type);
    $.ajax({
      url: '/setting/admin/uploadExamBgFile',
      cache: false,
      type: 'post',
      dataType: 'json',
      data: formData,
      contentType: false,
      processData: false,
      success: function (msg) {
        if (msg.success == true) {
          exam_url = msg.bizContent;
          $("input[name=examBgFile]").val(exam_url);
          $("#examBgModal .exam-bg .show-exam-bg").css("background-image","url("+exam_url+")");
          $("#examBgModal .exam-bg .preview .wrap").css("background-image","url("+exam_url+")");
        } else
          alert (msg.desc);
      }
    });
  }
});

//自定义考试背景 移动端
$("input[name=mExamFile]").change(function () {
  if ($(this).val() != '') {
    var dom = this;
    var type = 'mExamBg';
    var formData = new FormData();
    formData.append('examBgFile', this.files[0]);
    formData.append('classification', type);
    $.ajax({
      url: '/setting/admin/uploadExamBgFile',
      cache: false,
      type: 'post',
      dataType: 'json',
      data: formData,
      contentType: false,
      processData: false,
      success: function (msg) {
        if (msg.success == true) {
          m_exam_url = msg.bizContent;
          $("input[name=mExamBgFile]").val(m_exam_url);
          $("#examBgModal .m-exam-bg .show-exam-bg").css("background-image","url("+m_exam_url+")");
          $("#examBgModal .m-exam-bg .preview .wrap").css("background-image","url("+m_exam_url+")");
        } else
          alert (msg.desc);
      }
    });
  }
});

//批量录入学员
$("#selUsersLink").click(function(){
  //显示模态框
  $("#inputUsersModal").modal("show");
});
$("#inputUsersModal textarea").bind("input propertychange", function() {
  var _this = $(this);
  var _val = _this.val().replace(/\r\n/ig," ").replace(/\r/ig," ").replace(/\n/ig," ");
  _val = _val.replace(/\s+/g," ");
  _this.val(_val);
});
//确定
$("#saveUsers").click(function(){
  var _input_str = $("#inputUsersModal textarea").val();
  if(_input_str == "") {
    return false;
  }else if(_input_str.charAt(_input_str.length-1) == " ") {//如果最后一个字符为空字符串
    _input_str = _input_str.substring(0,_input_str.length-1);
  }
  var _account_arr = _input_str.split(" ");//数组
  var _account_str = _account_arr.join("@"+domain+",");//账号后拼接@+公司id+","
  _account_str = _account_str + "@" + domain;//给最后一项拼接@+公司id
  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/examadmin/admin/batch_addition",
    data: {
      examinee: _account_str,
      departments: $(".hasSelectedDeptIds").val(),//input[name=deptIds]//已选部门
      existingIds: $(".hasSelectedUserIds").val()//input[name=userIds]//已选学员
    },
    success: function(msg){
      if(msg.success){
        $("#inputUsersModal").modal("hide");
        $("#inputUsersModal textarea").val("");

        showInputUsersResult(msg.bizContent);

        //拼接已经选择的学员id
        var _namesArray = [],
          _userIds_str = $(".hasSelectedUserIds").val(),
          _users = msg.bizContent.users;//返回的用户信息列表
        if(_users.length > 0){
          for (var i=0; i<_users.length; i++) {
            _namesArray.unshift([_users[i].id,_users[i].surname.toString()]);
            _userIds_str+=(_users[i].id+",");
          }
          $(".hasSelectedUserIds").val(_userIds_str);
          selMuchUser(_namesArray);
        }
      }
    }
  });
});

// 显示录入结果弹窗
function showInputUsersResult(data) {
  var listData = data.failList;
  var htmlStr = "";

  if(listData.length < 1){
    $("#inputUsersResult .detailList").hide();
  }else {
    $("#inputUsersResult .detailList").show();
    $("#inputUsersResult .detailList .oneLine:not('.detailItems')").remove();

    for(var i=0;i<listData.length;i++){
      var item = listData[i];

      htmlStr += ' <li class="oneLine">' +
        '                       <ul>' +
        '                            <li class="first lNumber">'+item.lNumber+'</li>' +
        '                            <li class="second uName">'+item.uName+'</li>' +
        '                            <li class="third rTip">'+item.rTip+'</li>' +
        '                        </ul>' +
        '                     </li>';
    }

    $("#inputUsersResult .detailList").append(htmlStr);
  }

  $("#inputUsersResult .success .info span").text(data.successCount);
  $("#inputUsersResult .warning .info span").text(data.existCount);
  $("#inputUsersResult .fail .info span").text(data.failureCount);

  $("#inputUsersResult").modal("show");
}

//清空可考学员
$("#clearUsers").click(function(){
  BootstrapDialog.show({
    title: "",
    message: "是否确定清空全部可考学员？",
    buttons: [{
      label: "否",
      action: function(dialogItself) {
        dialogItself.close();
      }
    },{
      label: "是",
      cssClass: 'btn-primary',
      action: function(dialogItself) {
        dialogItself.close();
        $(".userNameLabel").html("");//清空label
        $(".hasSelectedUserIds").val("");//清空input
        $("#clearUsers").attr("disabled", true);
      }
    }]
  });
});

//试题水印
$(".switch-waterMark").on("click",function(e){
  e.stopPropagation();
  e.preventDefault();
  if($(this).prop("class").indexOf("switch-on") == -1){
    $("#watermarkPreview").show();
  }else {
    $("#watermarkPreview").hide();
  }
});
//显示水印模态框
var watermarkImg = "";
$("#watermarkPreview").click(function(){
  var _this = $(this);
  if(watermarkImg != "") {
    $("#watermarkPreviewModal").modal('show');
  }else {
    $.ajax({
      type: "GET",
      cache: false,
      headers: {"cache-control": "no-cache"},
      dataType: "json",
      url: "/courses/course/get_watermark",
      success: function (msg) {
        if(msg.success){
          watermarkImg = msg.bizContent;
          $("#watermarkPreviewModal .modal-body").css({
            "background-image": "url("+msg.bizContent+")"
          });
          $("#watermarkPreviewModal").modal('show');
        }else {
          alert("水印预览失败，请重试");
        }
      }
    });
  }
});

