
  var user_id = getQueryString('userId');
  if(document.location.href.match(/userId/)){
  $("#grid-data").bootgrid({
    ajax: true,
    ajaxSettings: {
      method: "POST",
      cache: false
    },
    post: function () {
      var sortOrder = $("#grid-data").bootgrid("getSortDictionary");
      var sortKey, sortOrderValue;
      // var user_id = '';
      $.each(sortOrder, function (name, value) {
        sortKey = name;
        sortOrderValue = value;
      });
      return {
        "sortKey": sortKey,
        "sortOrder": sortOrderValue,
        "userId": user_id,
        "account":user.account,
        "companyId":user.companyId,
      };
    },
    url: "/api/exam/result/user_result_grid/",
    selection: true,
    multiSelect: true,
    padding: 1,
    navigation: 2,
    formatters: {
      "link": function (column, row) {
        var grade_class = 'markPerson';
        var title_tip = '判分';
        var exam_verify_html = "";
        var exam_times_restrict = row.examTimesRestrict;

        if (row.grade) {
          grade_class = 'markPerson markedPerson';
          title_tip = '已判分';
        }

        //examVerifyStatus 1：已通过 2:认证失败
        // 3:无认证信息（指考试未设置身份认证）
        // 4：通过,与用户姓名不一致（通过认证，但是身份证上姓名与填写的不相符合）

        if(row.examVerifyStatus==1||row.examVerifyStatus==2||row.examVerifyStatus==4){
          exam_verify_html = "<a href='#' data-growing-title='viewVerifyInfo' class='icon-a_operate_identity_information viewVerifyInfo' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='身份认证信息' examResultId='"+row.id+"'></a>";
        }

        if(row.examVerifyStatus==2){
          return "<a href='#' data-growing-title='removePersonResult' class='icons8-trash-can removePersonResult' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' personResultId='"+row.id+"'></a>"+ exam_verify_html;
        }

        if((row.examVerifyStatus==1||row.examVerifyStatus==4)&&row.commitTime=="未开始答题"){
          return "<a href='#' data-growing-title='removePersonResult' class='icons8-trash-can removePersonResult' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' personResultId='"+row.id+"'></a>"+ exam_verify_html;
        }
        if (exam_times_restrict=='1' || row.status=='1') {
          return "<a href='#' data-growing-title='markPaper' class='icon-a_operate_mark "+ grade_class +"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='"+ title_tip +"' personResultId='"+row.id+"' user_name='"+row.userName+"' exam_info_id='" + row.examInfoId + "'></a>"+
            // "<a href='#' data-growing-title='addexit' class='icon-a_operate_retake addexit btn btn-large disabled' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='补考' examResultId='"+row.id+"'></a>"+
            // "<a href='#' data-growing-title='download' class='icon-a_operate_download download' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='下载' personResultId='"+row.id+"'></a>"+
            "<a href='#' data-growing-title='removePersonResult' class='icon-a_operate_delete removePersonResult' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' personResultId='" + row.id + "'></a>" + exam_verify_html;
        }
        return "<a href='#' data-growing-title='markPaper' class='icon-a_operate_mark "+ grade_class +"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='"+ title_tip +"' personResultId='"+row.id+"' user_name='"+row.userName+"' exam_info_id='" + row.examInfoId + "'></a>"+
          // "<a href='#' data-growing-title='addexit' class='icon-a_operate_retake addexit' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='补考' examResultId='"+row.id+"'></a>"+
          // "<a href='#' data-growing-title='download' class='icon-a_operate_download download' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='下载' personResultId='"+row.id+"'></a>"+
          "<a href='#' data-growing-title='removePersonResult' class='icon-a_operate_delete removePersonResult' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除' endTime='" + row.endTime + "' personResultId='" + row.id + "'></a>" + exam_verify_html;
      },
      "verify": function (column, row) {
        var examVerifyStatus;
        switch (row.examVerifyStatus){
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
        return examVerifyStatus;
      },
      'isMakeup': function(column, row){
        return row.isMakeup == 0 ? '否' : '是'
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
    //单条判分
    $("#grid-data").bootgrid().find(".markPerson").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = $(this).attr("personResultId");
      var user_name = $(this).attr("user_name");
      var exam_info_id = $(this).attr("exam_info_id");

      if ($(this).parent().prev().text() == '答题中') {
        alert ('学员正在答题中');
      }else {
        var tempwindow = window.open();
        tempwindow.location = "/admin/exam/manmade_exam_check?examInfoId=" + exam_info_id + "&examResultsId=" + id + "&userName=" + user_name;
      }
    });

    // 单条补考
    $("#grid-data").bootgrid().find(".addexit").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var examResultId = $(this).attr("examResultId") + "," ;
      addExit(examResultId);
    });

    //单个学员答卷下载
    $("#grid-data").bootgrid().find(".download").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var export_id = $(this).attr("personResultId");
      window.open("/examadmin/exam/result/export_pdf/?resultId="+export_id,"_blank");
    });
    //单个删除
    $("#grid-data").bootgrid().find(".removePersonResult").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = $(this).attr("personResultId") + ",";
      var endTime = $(this).attr("endTime");
      if ($(this).parent().prev().text() == '答题中' && new Date() < new Date(endTime)) {
        alert ('学员正在答题中');
      } else if ($(this).parent().prev().text() == '未开始答题' && new Date() < new Date(endTime)){
        alert ('学员还未开始答题');
      } else{
        delDate(id);
      }
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


  });
}
