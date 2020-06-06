$(function () {
  // 解析latex公式
  renderFormula(".latex", false);

  var is_delete = false;//用于是否批量删除过的标记
  var reg = /\.doc$|\.docx$|\.xls$|\.xlsx$|\.ppt$|\.pptx$/g;
  //处理aliyun附件url问题，进行uri编码
  $(".question-content .answers .filled .file-row a").each(function (index, element) {
    var _this = $(this);
    var url = aliyunEncodeURI(_this.attr("href"));
    var nameUrl = _this.html();
    var namestr = nameUrl.substring(0,nameUrl.lastIndexOf("."));
    //学员答案预览模式新增 doc/docx/xls/xlsx/ppt/pptx
    if(url.match(reg)){
      url = "https://view.officeapps.live.com/op/view.aspx?src="+url;
      _this.attr("href", url).attr("target", "_blank");
    }else{
      _this.attr("href", url).attr("download", url).attr("target", "_blank");
    }
    //如果文件名称过长 //格式化后名称为：abc...321.doc
    if(namestr.length > 80){
      var newNameStr = "";
      newNameStr += namestr.substring(0,37);
      newNameStr += "...";
      newNameStr += namestr.substring(namestr.length-43,namestr.length);
      newNameStr += nameUrl.substring(nameUrl.lastIndexOf("."),nameUrl.length);
      _this.html(newNameStr);
    }
  });

  //考生端公式不显示标签
  var textarea = $('textarea');
  for (var i = 0; i < textarea.length; i++) {
    $(textarea[i]).val($(textarea[i]).val().replace(/<[^>]+>/g, ""))
  }

  //显示水印
  if(typeof isWatermark != 'undefined' && isWatermark == '1'){
    $.ajax({
      type: "GET",
      cache: false,
      headers: {"cache-control": "no-cache"},
      dataType: "json",
      url: "/course/get_watermark",
      success: function (msg) {
        if(msg.success){
          $(".questions-content").css({
            'background-image': 'url('+msg.bizContent+')'
          });
        }
      }
    });
  }

  //显示答题卡
  $("#numberCardBtn").click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    $("#numberCardModal").modal();
  });

  //点击答题卡跳转至对应题,使用了锚点跳转
  //位置调整90（因为有顶栏），并关闭答题卡
  $("#numberCardModal .modal-body .box").click(function (e) {
    //如果是错题本，编辑状态
    if($("#numberCardModal").hasClass("edit")){
      var _this = $(this);
      _this.hasClass("selected")?_this.removeClass("selected"):_this.addClass("selected");
      return false;
    }
    $("#numberCardModal").modal('hide');
    setTimeout(function () {
      var scrollTop = $("html").scrollTop();
      $("html").animate({scrollTop:scrollTop-90},200);
    },100);

  });


  //固定组合题
  $("body").on("click", ".operation-icon.icon-pushpin", function () {
    $(".stuckMenu.isStuck").removeClass("isStuck").removeClass("stuckMenu").attr("style","");
    $(this).removeClass("icon-pushpin").addClass("icon-pushpined")
      .attr("title","解锁题干").attr("data-original-title","解锁题干");
    $(this).find(".icon").removeClass("icon-p_exam_fix_de").addClass("icon-p_exam_fix_se");
    $(this).parents(".question-comb").stickUp();
  });

  //取消固定
  $("body").on("click", ".operation-icon.icon-pushpined", function () {
    $(".stuckMenu.isStuck").removeClass("isStuck").removeClass("stuckMenu").attr("style","");
    $(this).removeClass("icon-pushpined").addClass("icon-pushpin")
      .attr("title","固定题干").attr("data-original-title","固定题干");
    $(this).find(".icon").removeClass("icon-p_exam_fix_se").addClass("icon-p_exam_fix_de");
    $(".question-insert-list").css("margin-top",0);
  });

  //收藏试题
  $("body").on("click", ".operation-icon.icon-collect", function () {
    var _this = $(this);
    var _parent = $(_this).parents(".question-content");
    var question_id = $(_parent).attr("data-id");
    var dataJson = {
      questionId: question_id,
      examResultsId: exam_results_id,
      examInfoId: exam_info_id,
      method: 'add'
    };

    if($(_parent).hasClass("question-insert")){
      dataJson.parentId = $(_parent).attr("data-comb-id");
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/exam/exam_check/star_question/",
      data: dataJson,
      success: function(msg){
        if(msg.success){
          $(_this).removeClass("icon-collect").addClass("icon-collected")
            .attr("title","取消收藏").attr("data-original-title","取消收藏");
          $(_this).find(".icon").removeClass("icon-m_exam_collection").addClass("icon-m_exam_collection_se");
          $("#numberCardModal a .questions_"+question_id).parent(".box").addClass("collected");
          $("#numberCardModal a .questions_"+question_id).parent(".box").find(".question_collected").show();
        }else {
          alert("操作失败，请联系管理员！");
        }
      }
    });

  });

  //取消收藏
  $("body").on("click", ".operation-icon.icon-collected", function () {
    var _this = $(this);
    var _parent = $(_this).parents(".question-content");
    var question_id = $(_parent).attr("data-id");
    var dataJson = {
      questionId: question_id,
      examResultsId: exam_results_id,
      examInfoId: exam_info_id,
      method: 'delete'
    };

    if($(_parent).hasClass("question-insert")){
      dataJson.parentId = $(_parent).attr("data-comb-id");
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/exam/exam_check/star_question/",
      data: dataJson,
      success: function(msg){
        if(msg.success){
          //若exam_results_id==''，则为我的收藏
          if(exam_results_id==''){
            window.location.reload();
          }else {
            $(_this).removeClass("icon-collected").addClass("icon-collect")
              .attr("title","收藏本题").attr("data-original-title","收藏本题");
            $(_this).find(".icon").removeClass("icon-m_exam_collection_se").addClass("icon-m_exam_collection");
            $("#numberCardModal a .questions_"+question_id).parent(".box").removeClass("collected");
            $("#numberCardModal a .questions_"+question_id).parent(".box").find(".question_collected").hide();
          }
        }else {
          alert("操作失败，请联系管理员！");
        }
      }
    });

  });

  //移除错题
  $("body").on("click", ".operation-icon.icon-delete", function () {
    var _this = $(this);
    var _parent = $(_this).parents(".question-content");
    var question_id = $(_parent).attr("data-id");
    var question_type = $(_this).attr("data-type");
    var dataJson = {
      testId: question_id,
      examInfoId: exam_info_id,
      testType: question_type
    };

    if($(_parent).hasClass("question-insert")){
      dataJson.combId = $(_parent).attr("data-comb-id");
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/exam/remove_error",
      data: dataJson,
      success: function(msg){
        if(msg.success){
          window.location.reload();
        }else{
          alert("操作失败，请联系管理员！");
        }
      }
    });


  })


  //*******************************手动判分**********************************
  //更改正确错误状态
  $(".operation-check .icon").click(function (e) {
    e.preventDefault();
    var _this = $(this);

    if(!$(_this).hasClass("icon-checked")){
      $(_this).parent(".operation-check").find(".icon-checked").removeClass("icon-checked");
      $(_this).addClass("icon-checked");
    }
  });

  //自动算分
  $("body").on("input change", ".operation-check .question-score", function () {
    var _this = $(this);
    checkMaxScore(_this);
    var reg = /^\d+(\.\d+)?$/;

    var examScore = parseFloat($("#examScore").text());
    var initialScore = parseFloat($(_this).attr("data-score"));
    var nowScore = reg.test($(_this).val()) ? parseFloat($(_this).val()) : 0;

    examScore = examScore - initialScore + nowScore;
    $("#examScore").text(examScore);
    $(_this).attr("data-score", nowScore);
  });


  //检查分数是否超过题目最高分,如果输入的数字超过题目最高分，则直接将输入值置为最高分
  function checkMaxScore(_this){
    var current_score=$(_this).val();
    var q_score=$(_this).attr('data-qscore');
    if(parseFloat(current_score)!=NaN&&parseFloat(current_score)>parseFloat(q_score)){
      $(_this).val(q_score);
    }
  }

  //上一人下一人
  $("#prevOneBtn, #nextOneBtn").click(function () {
    // 跳转地址
    var jumpUrl = '/admin/exam/manmade_exam_check';
    var _this = $(this);
    var examInfoId = _this.attr("data-exam-info-id");
    var examResultsId = _this.attr("data-exam-results-id");
    var userName = _this.attr("data-user-name");
    var isLook = _this.attr('data-isLook');

    if(!$(_this).hasClass("disabled")){
      var jumpUrlStr = jumpUrl + '?examInfoId='+ examInfoId +
        '&examResultsId=' + examResultsId + '&userName=' + userName + '&isLook=' + isLook;
      if(window.location.href.indexOf("selectError") > -1){
        jumpUrlStr += "&selectError=1";
      }
      window.location.href = jumpUrlStr;
    }
  });


  //保存
  $("#saveCheckResultsBtn").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    if(checkResultsForm() && checkAllComments()){
      var questionInfoList=[];
      var dataJson = {};
      var correctComment=$('.correct_commit_content').val();//批改评语

      $(".operation-check .question-score").each(function (index, element) {
        var _this = $(this);
        var _parent = $(_this).parents(".question-content");
        var _checkDom = $(_this).parents(".operation-check").find(".icon-checked");
        var questionId = $(_parent).attr("data-id");
        var score = $(_this).val();
        var mix = $(_parent).hasClass("question-insert") ? 1 : 0;
        var combId = $(_parent).hasClass("question-insert") ? $(_parent).attr("data-comb-id") : '';
        var error = '';
        var comments = "";

        if(!$(_parent).attr("data-comb-id")) {
          comments = $($(_parent).find(".comments-box textarea")).val();
        }

        if(_checkDom.length>0){
          if($(_checkDom).hasClass("icon-right")){
            error = 'right';
          }else {
            error = 'error';
          }
        }

        questionInfoList[index]= {
          "id":questionId,
          "score": score,
          "isOk": error,
          "mix": mix,
          "combId": combId,
          "comments": comments
        }
      });
      //处理组合题的批改评语存储
      $(".operation-check .question-score").each(function (index, element) {
        var _this = $(this);
        var _parent = $(_this).parents(".question-content");
        if($(_parent).attr("data-comb-id")) {
          var comments = $($(_parent).parents(".questions-detail").find(".comments-box textarea")).val();
          $(questionInfoList).each(function (index, elemant) {
            if(questionInfoList[index].id == $(_parent).attr("data-comb-id")){
              questionInfoList[index].comments = comments;
            }
          })
        }
      })

      dataJson = {
        "examInfoId": exam_info_id,
        "examResultsId": exam_results_id,
        "userName": checkUserName,
        "questionInfoList": JSON.stringify(questionInfoList),
        "correctComment":correctComment,
        "account":user.account,
        "companyId":user.companyId
      };
      $.ajax({
        type: "POST",
        cache : false,
        headers: { "cache-control": "no-cache" },
        dataType: "json",
        url: "/api/exam/manmade_exam_ending",
        data: dataJson,
        success: function(msg){
          if(msg.success){
            //判断是否生成证书
            if(msg.bizContent&&msg.bizContent.isGrantCertificate){
              certificateType(msg.bizContent.pollType);
            }else{
              alert("保存成功");
              window.location.reload();
            }
          }else{
            alert(msg.desc);
          }
        }
      });

    }
  });

  //检查输入合法
  function checkResultsForm() {
    var reg = /^\d+(\.\d+)?$/;
    var status = true;

    $(".operation-check .question-score").each(function (index, element) {
      if(!reg.test($(this).val())){
        status = false;
        alert("分数需为非负数，否则作0分处理");
        return false;
      }
    });
    return status;
  }

  //判断出什么类型的证书
  function certificateType(pollType){
    var tipTitle = '';
    var btnTitle = '';

    switch (pollType){
      case 'add':
        tipTitle = '分数已保存，学员分数已符合证书发放规则，是否要发放证书？';
        btnTitle = '发放';
        break;
      case 'del':
        tipTitle = '分数已保存，学员分数不符合证书发放规则，是否要收回证书? ';
        btnTitle = '收回';
        break;
      case 'update':
        tipTitle = '分数已保存，需要更新学员证书，是否立即更新？';
        btnTitle = '更新';
        break;
      default:
        window.location.reload();
        return true;
    }

    $("#certificateModal .modal-body .modal-title").html(tipTitle);
    $("#certificateBtn").text(btnTitle).attr("data-type", pollType);
    $("#certificateModal").modal();
  }

  //证书点击发放／收回／更新时
  $("#certificateBtn").click(function(){
    var pollType = $(this).attr("data-type");

    $.ajax({
      type: "POST",
      cache : false,
      headers: { "cache-control": "no-cache" },
      dataType: "json",
      url: "/examadmin/exam/exam_grant_certificate",
      data: {
        "examInfoId":exam_info_id,
        "examResultsId":exam_results_id,
        "pollType": pollType
      },
      success: function(msg){
        $("#certificateModal").modal('hide');
      }
    });
  });


  //*******************************手动判分**********************************

  //答题卡批量删除
  //管理按钮
  $("#btnManage").click(function () {
    $("#numberCardModal").addClass("edit");
  });
  //删除
  $("#btnDel").click(function(){
    var data = [];
    var dataObj = {
      examInfoId: exam_info_id,
      testId: "",
      combId: ""
    };
    var questionsIdArr = [];
    if($(".box.selected").length == 0){
      alert("请至少选择一道试题");
      return false;
    }
    $(".box.selected").each(function(index, element){
      var _this = $(this);
      dataObj.testId = $(this).children("span").attr("questionsid");
      questionsIdArr.push($(this).children("span").attr("questionsid"));
      dataObj.combId = _this.parents(".insert-list").attr("questionsid")?_this.parents(".insert-list").attr("questionsid"):"";//组合题id
      data.push(JSON.stringify(dataObj));
    });
    data = "["+data.join(",")+"]";
    $.ajax({
      type: "POST",
      cache : false,
      headers: { "cache-control": "no-cache" },
      dataType: "json",
      url: "/exam/batch_remove_error",
      data: {jsonStr: data},
      success: function(msg){
        if(msg.success){
          is_delete = true;
          $(".box.selected").remove();
          window.location.reload();
          // $("#numberCardModal").removeClass("edit");
        }
      }
    });
  });
  //取消
  $("#btnCancel").click(function(){
    $("#numberCardModal").removeClass("edit");
    $(".box.selected").removeClass("selected");
  });
  //答题卡模态框隐藏时，如果is_detele==true，说明批量删除过试题，刷新页面
  $("#numberCardModal").on('hide.bs.modal', function () {
    if(is_delete == true){
      window.location.reload();
    }
  });
  //禁止复制粘贴
  document.oncontextmenu=new Function("event.returnValue=false");
  document.oncopy=new Function("event.returnValue=false");
  document.onpaste=new Function("event.returnValue=false");
  //批改评语允许复制粘贴
  var correct_commit_content=document.getElementsByClassName('correct_commit_content')[0];
  if(correct_commit_content!=undefined) {
    correct_commit_content.oncopy = new Function("event.stopPropagation();event.returnValue=true;"); //阻止事件冒泡
    correct_commit_content.onpaste = new Function("event.stopPropagation();event.returnValue=true;");
  }

  var comments_texts = document.getElementsByClassName('comments-text');
  for(var index in comments_texts) {
    comments_texts[index].oncopy = new Function("event.stopPropagation();event.returnValue=true;");
    comments_texts[index].onpaste = new Function("event.stopPropagation();event.returnValue=true;");
  }

});


//只看错题
var currentFilter='s2'; //表示开启仅看对（错）题时，对、错的类名标识，会在相关函数中用于查询和计算  值：s4,s2
var currentFilterOpposite='s4'; //表示与currentFilter相反的类名标识，如：currentFilter为's4'时，该变量为's2'
$(".filterOnly .current_filter").click(function(e){
  e.stopPropagation();
  e.preventDefault();
  $(".filterOnly .filter_opts").show();
})
$(".filter_opt").click(function(e){
  e.stopPropagation();
  e.preventDefault();
  var filter_flag=$(this).attr("filter");
  var text=$(this).find("span").text();
  $(".filter_opt").removeClass("active");
  $(this).addClass("active");
  $(".filterOnly .filter_text").text(text);
  if(filter_flag=='error'){
    currentFilter='s4';
    currentFilterOpposite='s2';
    showFilterOnly();
  }
  else if(filter_flag=='right'){
    currentFilter='s2';
    currentFilterOpposite='s4';
    showFilterOnly();
  }
  else{
    showFilterOnlyOff();
  }
  $(".filterOnly .filter_opts").hide();
})
function showFilterOnly(){//只显示错题
  $('.question-content').each(function() {
    var q_id=$(this).attr('id');
    if($(".iconBox[questionsid="+q_id+"]").parents(".box").hasClass(currentFilter)) {
      if($(this).attr("data-comb-id")!=undefined){ //组合题
        var comb_id=$(this).attr("data-comb-id");
        var comb_total=$(".box-list .insert-list[questionsid='"+comb_id+"']").find(".iconBox").length;
        var comb_filtered=$(".box-list .insert-list[questionsid='"+comb_id+"']").find("."+currentFilter).length;
        $(this).show();
        if(comb_total==comb_filtered) {
          $(this).parents('.questions-detail').show();
        }
      }else{
        $(this).show();
      }
    }
    else if($(".iconBox[questionsid="+q_id+"]").parents(".box").hasClass(currentFilterOpposite)){
      if($(this).attr("data-comb-id")!=undefined){ //组合题
        var comb_id=$(this).attr("data-comb-id");
        var comb_total=$(".box-list .insert-list[questionsid='"+comb_id+"']").find(".iconBox").length;
        var comb_filtered=$(".box-list .insert-list[questionsid='"+comb_id+"']").find("."+currentFilterOpposite).length;
        $(this).hide();
        if(comb_total==comb_filtered) {
          $(this).parents('.questions-detail').hide();
        }
      }else{
        $(this).hide();
      }
    }
  })
  $('#numberCardModal .box-list').find('.box').each(function(){//答题卡中不符合筛选的题的链接失效,符合的有效
    if($(this).hasClass(currentFilterOpposite)){
      $(this).find('a').attr('href','javascript:void(0);');
    }else{
      var href='#'+$(this).find('a').attr('questionsid');
      $(this).find('a').attr('href',href);
    }
  })
}
function showFilterOnlyOff(){//关闭只显示错题
  $('.question-content').show();
  $('.question-insert-list').show();
  $('.questions-detail').show();
  $('#numberCardModal .box-list').find('.box').each(function(){ //答题卡中所有题的链接有效
    var href='#'+$(this).find('a').attr('questionsid');
    $(this).find('a').attr('href',href);
  })
}

// 解析latex公式
function renderFormula(selector, flag){ //flag预留，以备用于区分不同处理
  $(selector).each(function (index, element) {
    if(!$(element).hasClass("rendered")){
      var text = $(element).text();

      katex.render(text, element, {
        throwOnError: false
      });

      $(element).addClass("rendered");
    }
  });
}

//*******************************************答题卡优化********************************************

//新答题卡-收起
$("#answercardFoldBtn").click(function(){
  $("#answercardOpenBtn").show();
  $(this).hide();
  $("#numberCardModal .card-content").hide();
  $("#numberCardModal .modal-footer").hide();
  $("#numberCardModal .title_border").css({
    width: '18px',
    height: '4px',
    top: '-6px',
    margin: '0',
  });
  $("#numberCardModal .title").css("padding-top","4px");
  $("#numberCardModal .title_content").css("margin-left","unset").css("width","12px");
  $("#numberCardModal").css("width","66px");
});
//新答题卡-展开
$("#answercardOpenBtn").click(function(){
  $("#answercardFoldBtn").show();
  $(this).hide();
  $("#numberCardModal .card-content").show();
  $("#numberCardModal .modal-footer").show();
  $("#numberCardModal .title_border").css({
    width: '4px',
    height: '18px',
    top: '0px',
    margin: 'auto',
  });
  $("#numberCardModal .title").css("padding-top","0px");
  $("#numberCardModal .title_content").css("margin-left","10px").css("width","unset");
  $("#numberCardModal").css("width","240px");
});

//有照片的时候
$(function(){
  if($("#pictureList .picture-li").length!=0) {
    $("#numberCardModal").css("height", "calc(100% - 395px)").css("top", "auto").css("bottom", "0px"); //答题卡的高度和位置调整
  }
})
//评语框显现
$(".action-comments").click(function(){
  if($(this).hasClass("active")) {
    $(this).removeClass("active");
    $($(this).siblings(".comments-box")).slideToggle()
  } else {
    $(this).addClass("active");
    $($(this).siblings(".comments-box")).slideToggle()
  }
})

$("textarea").on({
  "blur": function () {
    if($(this).val().length>300) {
      $(this).addClass('error');
    } else {
      $(this).removeClass('error');
    }
    checkAllComments();
  }
})
var commentHintClock;
//检查所有的评价字数是否超限
function checkAllComments() {
  var error = true;
  $("textarea").each(function(index,ele){
    if($(this).hasClass('error')) {
      error = false
    }
  })
  if(!error) {
    clearTimeout(commentHintClock);
    $(".comments-error-box").stop().animate({"opacity":"1","top":"15px"},300);
    commentHintClock = setTimeout(function(){
      $(".comments-error-box").stop().animate({"opacity":"0","top":"-40px"},300);
    }, 2000);
  }
  return error;
}

// 点击图片浮层查看
var $question = $(".questions-content").find(".question-content");

if($question.eq(i).viewer){
  for(var i=0;i<$question.length;i++){
    $question.eq(i).viewer();
  }
}
