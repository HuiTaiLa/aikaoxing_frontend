
  var exam_info_id = getQueryString('examInfoId');
  var domain = "180731";
  var user_name = user.account;
  var jwt = "{{ jwt_info }}";
  var skip_exam = "";
  var usersArray = [];
  var storageLock = true;
  var exam_times_restrict = "";
  if (exam_times_restrict=='1') {
  storageLock = false;
}
  var lock = storageLock;
  if(document.location.href.match(/examInfoId/)){
  $("#grid-data").bootgrid({
    ajax: true,
    ajaxSettings: {
      method:"POST",
      cache: false
    },
    post: function (){
      var sortOrder = $("#grid-data").bootgrid("getSortDictionary");
      var sort_key,sort_order;
      // var exam_info_id = exam_info_id;
      var user_name = $("input[name=name_search]").val();
      var dep_id = $("input[name=dep_search]").val();
      var is_grade = $("input[name=grade_search]").val();
      var score_left = $("input[name=min_score_search]").val();
      var score_right = $("input[name=max_score_search]").val();
      var is_pass = $("input[name=pass_search]").val();
      var start_time = $("input[name=start_time_search]").val();
      var end_time = $("input[name=end_time_search]").val();
      var verify_status = $("input[name=verify_status_search]").val();
      var is_commit = $("input[name=is_commit_search]").val();
      var force_commit = $("input[name=force_commit_search]").val();

      $.each(sortOrder, function (name, value) {
        sort_key = name;
        sort_order = value;
      });
      return {
        "sortKey": sort_key,
        "sortOrder": sort_order,
        "examInfoId": exam_info_id,
        "userName": user_name,
        "depIds": dep_id,
        "isGrade": is_grade,
        "scoreLeft": score_left,
        "scoreRight": score_right,
        "isPass": is_pass,
        "startTime": start_time,
        "endTime": end_time,
        "examVerifyStatus": verify_status,
        "isCommit": is_commit,
        "forceCommit": force_commit,
        "account": user.account,
        "companyId":user.companyId
      };
    },
    url: "/api/exam/result/mgr_grid/",
    selection: true,
    multiSelect: true,
    // rowSelect: true,
    navigation: 2,
    formatters: {
      "userName": function(column, row){
        return row.userName+"<input class='user_id_hidden' type='hidden' value='"+row.userId+"'>";
      },
      "link": function(column, row)
      {
        var grade_class='markExam';
        var title_tip='判分';
        var reset_time_html = "";
        var exam_verify_html = "";
        var is_look_disabled = "";

        if(row.grade){//是否判分
          grade_class='markExam markedExam';
          title_tip='已判分';
        }
        //examVerifyStatus  1：已通过 2:认证失败
        // 3:无认证信息（指考试未设置身份认证）
        // 4：通过,与用户姓名不一致（通过认证，但是身份证上姓名与填写的不相符合）

        if(USER_ROLE=="sub_admin" && '1'=='0'){
          is_look_disabled = " disabled";
        }
        if(row.examVerifyStatus==1||row.examVerifyStatus==2||row.examVerifyStatus==4){
          exam_verify_html = "<a href='#' data-growing-title='viewVerifyInfo' class='icon-a_operate_identity_information viewVerifyInfo"+is_look_disabled+"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='身份认证信息' examResultId='"+row.id+"'></a>";
        }

        if(row.examVerifyStatus==2){
          return "<a href='#' data-growing-title='removeExamGrade' class='icons8-trash-can removeExamGrade' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' examResultId='"+row.id+"'></a>"+ exam_verify_html;
        }

        if(row.commitTime=="答题中"){
          reset_time_html = "<a href='#' data-growing-title='resetTime' class='icons8-alarm-clock resetTime' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='交卷时间设置' examResultId='"+row.id+
            "' userName='"+row.userName+"' surname='"+row.surname+"' userId='"+row.userId+"' startTime='"+row.startTime+"' endTime='"+row.endTime+"'></a>";
        }else if((row.examVerifyStatus==1||row.examVerifyStatus==4)&&row.commitTime=="未开始答题"){
          return "<a href='#' data-growing-title='removeExamGrade' class='icons8-trash-can removeExamGrade' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' examResultId='"+row.id+"'></a>"+ exam_verify_html;
        }

        var linkStr = "";
        linkStr += "<a href='#' data-growing-title='markPaper' class='icon-a_operate_mark "+ grade_class +"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='"+ title_tip +"' examResultId='"+row.id+"' user_name='"+row.userName+"'></a>";
        // if (row.status=='1' || !lock){
        //   linkStr += "<a href='#' data-growing-title='addexit' class='icon-a_operate_retake addexit disabled' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='补考' examResultId='"+row.id+"' status='"+row.status+"'></a>";
        // }else {
        //   linkStr += "<a href='#' data-growing-title='addexit' class='icon-a_operate_retake addexit' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='补考' examResultId='"+row.id+"' status='"+row.status+"'></a>";
        // }
        if(USER_ROLE=="sub_admin" && 1=='0'){
          linkStr += "<a href='#' data-growing-title='removeExamGrade' class='icon-a_operate_delete removeExamGrade' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' examResultId='"+row.id+"'></a>"+ reset_time_html+ exam_verify_html;
        }else {
          linkStr +=
            // "<a href='#' data-growing-title='download' class='icon-a_operate_download download' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='下载' examResultId='"+row.id+"'></a>"+
            "<a href='#' data-growing-title='removeExamGrade' class='icon-a_operate_delete removeExamGrade' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' examResultId='"+row.id+"'></a>"+ reset_time_html+ exam_verify_html;

        }
        return linkStr;

      },
      "verify": function (column, row) {

        var examVerifyStatus;

        if(USER_ROLE=="sub_admin" && 1=='0'){
          examVerifyStatus = "-";
        }else{
          switch (row.examVerifyStatus){
            case 0:
              examVerifyStatus = '-';
              break
            case 1:
              examVerifyStatus = '已通过';
              break;
            case 2:
              examVerifyStatus = '认证失败';
              break;
            case 3:
              examVerifyStatus = '无认证信息';
              break;
            case 4:
              examVerifyStatus = '通过,与用户姓名不一致';
              break;
          }
        }
        return examVerifyStatus
      },
      'isMakeup': function(column, row){
        return row.isMakeup == 0 ? '否' : '是';
      },
      'isForce': function (column, row) {
        var forceStr = "否";
        // isForce--是否强制交卷，强制交卷方式 //0--否 1--是 2--切屏防作弊 3--x秒不动自动交卷 4--闯关失败 5--答题时间或者考试时间已到
        switch (row.isForce) {
          case '0':
            forceStr = "否";
            break;
          case '1':
            forceStr = "是";
            break;
          case '2':
            forceStr = row.switchScreen?"是（切屏" + row.switchScreen + "次）" : "是（切屏）";
            break;
          case '3':
            forceStr = row.noOpsAutoCommit?"是（" + row.noOpsAutoCommit + "秒无操作）" : "是（无操作）";
            break;
          case '4':
            forceStr = "是（闯关失败）";
            break;
          case '5':
            forceStr = "是（时间已到）";
            break;
          case '6' :
            forceStr = "是（管理员）";
            break;
          default:
            forceStr = "否";
            break;
        }
        return forceStr;
      }
    }
  }).on("loaded.rs.jquery.bootgrid", function (e){
    // initial tooltip
    $('#grid-data [data-toggle="tooltip"]').tooltip();
    $("#grid-data").colResizable({
      fixed:false,
      liveDrag:true,
      draggingClass:"dragging"
    });
    //单条删除
    $("#grid-data").bootgrid().find(".removeExamGrade").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = $(this).attr("examResultId") + ",";
      var endTime = $(this).attr("endTime");

      if ($(this).parent().prev().text() == '答题中' && new Date() < new Date(endTime)) {
        alert ('学员正在答题中');
      } else if ($(this).parent().prev().text() == '未开始答题' && new Date() < new Date(endTime)){
        alert ('学员还未开始答题');
      } else{
        delDate(id);
      }
    });
    // 单条补考
    $("#grid-data").bootgrid().find(".addexit").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var examResultId = $(this).attr("examResultId") + "," ;
      addExit(examResultId);
    });

    //查看身份认证信息
    $("#grid-data").bootgrid().find(".viewVerifyInfo").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = $(this).attr("examResultId");

      $.ajax({
        type: "get",
        cache: false,
        headers: { "cache-control": "no-cache" },
        dataType: "json",
        url: "/examadmin/admin/get/exam_verify_info",
        data: "examResultsId=" + id,
        success: function (msg) {
          // status 0--没认证（或认证中，就是初始状态）；1--成功；2--失败
          // manualVerifyStatus 0--未提交人工审核；1--已提交；2--审核通过；3--审核失败
          if(msg.success){
            $("#verifyInfoModal .item-value-name").text(msg.bizContent.userCardName);
            $("#verifyInfoModal .item-value-idcard").text(msg.bizContent.userCardCode);
            $("#verifyInfoModal .img-userCardPhoto").attr('src',msg.bizContent.userCardPhoto);
            $("#verifyInfoModal .img-manualUploadPhoto").attr('src',msg.bizContent.manualUploadPhoto);
            $("#verifyInfoModal .examInfoId").val(msg.bizContent.examInfoId);
            $("#verifyInfoModal .examResultsId").val(id);
            $("#verifyInfoModal .manualVerifyStatus").val(msg.bizContent.manualVerifyStatus);

            $(".modal-verify-status .btn-check-verify-fail").removeClass("active");
            $(".modal-verify-status .btn-check-verify-succ").removeClass("active");
            $(".modal-verify-status .basic-information-hint").show();
            $(".modal-verify-status .btn-check-verify-succ").show();
            $(".modal-verify-status .btn-check-verify-fail").show();

            // 人脸识别成功 或 人工审核成功
            if(msg.bizContent.status == 1 || msg.bizContent.manualVerifyStatus == 2) {
              $(".modal-verify-status .basic-information-hint").hide();
              $(".modal-verify-status .btn-check-verify-fail").hide();
              $(".modal-verify-status .btn-check-verify-succ").addClass("active");
            }
            $("#verifyInfoModal").modal();
          }else {
            alert('出错了，请稍后再试!')
          }
        }
      })
    });

    // 单个试卷下载
    $("#grid-data").bootgrid().find(".download").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var result_id = $(this).attr("examResultId");
      if ($(this).parent().prev().text() == '答题中' || $(this).parent().prev().text() == '系统交卷中' ) {
        alert('试卷未提交');
      }else {
        window.open("/examadmin/exam/result/export_pdf/?resultId="+result_id,"_blank");
      }
    });

    //单个考试设置时间
    $("#grid-data").bootgrid().find(".resetTime").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var exam_info_id = $(this).attr("examInfoId");
      var user_id = $(this).attr("userId");
      var user_name = $(this).attr("userName");
      var surname = $(this).attr("surname");
      var start_time = $(this).attr("startTime");
      var end_time = $(this).attr("endTime");
      var exam_result_id = $(this).attr("examResultId");

      $.ajax({
        type: 'POST',
        cache: false,
        headers: { "cache-control": "no-cache" },
        async: false,
        dataType: "json",
        url: '/admin/exam/getExamEndTime',
        data: "examResultId="+exam_result_id+"&userId="+user_id,
        success: function (msg) {
          if(msg.success){
            end_time = msg.bizContent.modifiedExamEndTime;
          }
        }
      });

      $("#resetTimeModal .user-name").text(user_name);
      $("#resetTimeModal .surname").text(surname);
      $("#resetTimeModal .start-time").text(start_time);
      $("#resetTimeModal input[name=delayTime]").val(end_time);
      $("#resetTimeModal input[name=examResultId]").val(exam_result_id);
      $("#resetTimeModal .confirm-time").text(end_time.replace(/^(\d{4})-(\d{2})-(\d{2})([\s\S]+)$/, "$1年$2月$3日$4"));

      $("#resetTimeModal").modal({
        backdrop: "static",
        keyboard: false
      });
    });

    //单个批改  判分
    $("#grid-data").bootgrid().find(".markExam").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = $(this).attr("examResultId");
      var user_name = $(this).attr("user_name");
      if ($(this).parent().prev().text() == '答题中')
        alert ('学员正在答题中');
      else {
        var tempwindow = window.open();
        tempwindow.location = "/admin/exam/manmade_exam_check?examInfoId=" + exam_info_id + "&examResultsId=" + id + "&userName=" + user_name + "&isLook=" + 1;
      }
    });
  }).on("selected.rs.jquery.bootgrid", function (e,rows){
    $('#addexitBtn').removeClass('disable').removeAttr("disabled");
    lock = storageLock;
    $("#grid-data tbody input.select-box").each(function (index, element) {
      if ($(this).is(":checked")) {
        if ($(this).parents("tr").find(".addexit").attr("status") == "1") {
          lock = false;
        }
      }
    });
    var selectList = $("#grid-data").bootgrid("getSelectedRows");
    if(selectList.length == 0){
      lock = false;
    }
    if(lock) {
      $('#addexitBtn').removeClass('disable').removeAttr("disabled");
    }else {
      $('#addexitBtn').addClass('disable').prop('disabled', true);
    }
    for (var i = 0; i < rows.length; i++) {
      usersArray.unshift(rows[i].userId);
    }
  }).on("deselected.rs.jquery.bootgrid", function (e,rows){
    lock = storageLock;
    $("#grid-data tbody input.select-box").each(function (index, element) {
      if ($(this).is(":checked")) {
        if ($(this).parents("tr").find(".addexit").attr("status") == "1"){
          lock = false;
        }
      }
    });
    var selectList = $("#grid-data").bootgrid("getSelectedRows");
    if(selectList.length == 0){
      lock = false;
    }
    if(lock) {
      $('#addexitBtn').removeClass('disable').removeAttr("disabled");
    }else {
      $('#addexitBtn').addClass('disable').prop('disabled', true);
    }
    for (var j = 0; j < rows.length; j++) {
      usersArray.remove(rows[j].userId);
    }
  });
}
  Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
  if (this[i] == val) return i;
}
  return -1;
};

  Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
  this.splice(index, 1);
}
};

  $(document).ready(function() {
  //关闭选择订单对话框
  function hidepayorders(obj) {
    $('#gradeModal').modal('hide');
  }

  if(USER_ROLE=="admin"){
  // 考试信息是否对子管理员可见

  $('span.switch-hidden.switch-wechatSkipLogin-copy').click(function () {
  var isLook = $(this).attr('isLook');

  $.ajax({
  url:'/examadmin/admin/subadmin_islook',
  type:'get',
  data: "isLook="+isLook,
  dataType:'json',
  success:function(msg){
  if(msg.success == true){

  if(isLook=='1'){
  $('span.switch-hidden.switch-wechatSkipLogin-copy').removeClass('switch-off').addClass('switch-on').attr('isLook',0)
}else {
  $('span.switch-hidden.switch-wechatSkipLogin-copy').removeClass('switch-on').addClass('switch-off').attr('isLook',1)
}
}
}
})
})
}
});

  //导出附件链接弹窗
  $('#exportFile').click(function(){
  $("#exportFileModal").modal('show');
});
  //导出附件链接
  $('#startExportLinks').click(function(){
  $.ajax({
    type:'GET',
    url:'/examadmin/admin/attachment/download/',
    cache:false,
    headers:{ "cache-control": "no-cache" },
    dataType:'json',
    data:'examInfoId='+exam_info_id,
    success:function(mesg){
      if(mesg.success){
        $("#exportFileModal").modal('hide');
        $("#exportingFileModal .title").text("导出中...");
        $("#exportingFileModal .content").text("").append("<p>正在导出学员答案</p><p>成功后即可进入'消息中心'下载</p>");
        $("#exportingFileModal").modal('show');
      }else{
        if(mesg.code=='61522'){
          $("#exportFileModal").modal('hide');
          $("#exportingFileModal .title").text("");
          $("#exportingFileModal .content").text("正在导出本场考试的附件链接");
          $("#exportingFileModal").modal('show');
        }
        if(mesg.code=='61523'){
          $("#exportFileModal").modal('hide');
          $("#exportingFileModal .title").text("导出失败");
          $("#exportingFileModal .content").text("");
          $("#exportingFileModal").modal('show');
        }
      }
    },
  })
});
