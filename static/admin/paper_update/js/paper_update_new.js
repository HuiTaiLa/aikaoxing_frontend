var updateQuestionId = "";
var paper_type = $("input[name=paperType]").val();
var perTimeRestrict = $("input[name=perTimeRestrict]").val();
var selTr = "";
var ajaxUrl = ""; //保存提交URL，根据不同模板判断
var selTypes = ""; //存储试题分类
var commit_ids = "";//存储已选试题id
var jumpId = '';
var testChecked=""; //该类型题目已经被选的数量
var typeObject = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": []
};
var typeObjectLabel = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": []
};
var sel_click = '';
var _checked_this; //储存被点击'添加试题'的大题的this

//替代ES6includes语法
function inArray(search,array){
  for(var i in array){
    if(array[i]==search){
      return true;
    }
  }
  return false;
}
//去掉数组中空值项
function trimSpace(array){
  for(var i = 0 ;i<array.length;i++)
  {
    if(array[i] == " " || array[i] == "" || array[i] == null || typeof(array[i]) == "undefined")
    {
      array.splice(i,1);
      i= i-1;

    }
  }
  return array;
}
$(document).ready( function() {

  // 解析latex公式
  renderFormula(".m-example.questions .latex", false);

  //切换答案数量
  $("body").on("change", "select[name=tab_num]", function(e) {
    var parentDom = $(this).parents(".group_simple");
    changeNum(parentDom,$(this).val());
  });
  //默认显示4个答案
  changeNum(4);
  /******2.0新增事件 ******/
    //保存大题默认名称
  var queName = "";
  //创建新的大题

  $("body").on("click", ".q_type_btn, .questionType_add",function(e) {
    paper_type = $("input[name=paperType]").val()
    $(this).parents(".btn-group").removeClass("open");
    var type = $(this).attr("num");
    var sortRandom = Math.random(); //随机数用于移动顺序
    $("#group_simple").find(".questionTypeText").text($(this).text());
    $("#group_simple").find("input[name=test_tittle]").attr("sort", sortRandom);
    $("#group_simple").find("input[name=test_peer_score]").attr("sort", sortRandom);
    $("#group_simple").find("input[name=test_peer_time]").attr("sort", sortRandom);
    $("#group_simple").find("input[name=totelNum]").attr("sort", sortRandom);

    if(type==1 || type==2){
      $("#group_simple").find(".options-disorder").removeClass("hidden");
    }else {
      $("#group_simple").find(".options-disorder").addClass("hidden");
    }
    //增加试题
    var html = '<div class="group_simple" questionType="'+type+'" sort="'+sortRandom+'">'+$("#group_simple").html()+'</div>';
    $("div.group_main").append(html);

    if (paper_type == 3) {
      $('.question-disorder').hide();
    } else {
      $('.question-disorder').show();
    }
    $(".options-disorder .tooltip-disorder").tooltip();
    var $group = $(".group_main .group_simple").last();
    //试卷大题默认名称，可修改
    switch(type)
    {
      case "1":
        queName = "单选题";
        break;
      case "2":
        queName = "多选题";
        break;
      case "3":
        queName = "判断题";
        break;
      case "4":
        queName = "填空题";
        break;
      case "5":
        queName = "问答题";
        break;
      case "6":
        queName = "组合题";
        break;
      case "7":
        queName = "录音题";
        break;
    }
    var inputBox = $("div[questionType=" + type + "]").find("input[name=test_tittle]");
    inputBox.val(queName);
    //左侧添加相应大题信息
    var htmlLeft = '<div onclick="leftItemClick(this)" data-catename="'+queName+'" class="item group_simple left_group_simple animate" sort="' + sortRandom + '">' +
      '<p><h3 class="test_tittle" sort="' + sortRandom + '">' + queName + '</h3></p>' +
      ((type == '6' && paper_type == "1") ? '<p class="left_p">共<span class="test_num" sort="' + sortRandom + '">0</span>题,<p class="left_p">共 <span class="all_fraction" sort="' + sortRandom + '">0</span> 分数</p>' : '<p class="left_p">共<span class="test_num" sort="' + sortRandom + '">0</span>题 ，共 <span class="all_fraction" sort="' + sortRandom + '">0</span> 分数</p>') +
      ((perTimeRestrict == "0") ? '' : '<p class="left_p" id="oneQTime">每题答题时长<input type="text" name="every_q_time" line-height: 15px" sort="' + sortRandom + '">秒</p>' )+
      '<p class="left_p">每题分数<input type="text" name="test_peer_score" line-height: 15px" sort="' + sortRandom + '">分</p>'+
      '<p class="test_icon_a new_icon"><a href="javascript:void(0)" class="m-content-trash icon-a_operate_delete" aria-hidden="true"  sort="' + sortRandom + '" data-toggle="tooltip" data-placement="top" data-original-title="删除"></a>' +
      '<a href="javascript:void(0)" class="m-content-up glyphicon icon-a_operate_move_up" aria-hidden="true"  sort="' + sortRandom + '" data-toggle="tooltip" data-placement="top" data-original-title="上移"></a>'+
      '<a href="javascript:void(0)" class="m-content-down glyphicon icon-a_operate_move_down" aria-hidden="true"  sort="' + sortRandom + '" data-toggle="tooltip" data-placement="top" data-original-title="下移"></a></p>'+
      '<div class="q_s_line"></div>'+
      '</div>';


    $(".info-board .total").before(htmlLeft);
    if(type=="6"&&paper_type=="1"){
      $($group).find(".inline-ite").hide();
    }
    showOptionScore(sortRandom,type);
    changeLeftInfoFn(inputBox,3,queName);
    if(paper_type==3){
      fixMChoicesQuestionStyle();
    }
    if(paper_type == 1) {
      //当添加完大题后显示出添加试题的弹窗
      var obj = $(".group_main .group_simple")[$(".group_main .group_simple").length-1];
      selTypes = $(obj).attr("questiontype");
      selQuestionFrame.location.href = "/admin/paper_add_new/select_type";

      var commit_divs = $("div[questiontype=" + selTypes + "]").find(".m-example");

      commit_ids = '';
      for (var i = 0; i < commit_divs.length; i++) {
        commit_ids = commit_ids + commit_divs[i].getAttribute("questionid") + ',';
      }

      $('#questionsModal').modal({
        backdrop:"static",
        keyboard:false
      });
      selTr = $(obj);
    } else if(paper_type=='2' || paper_type=='3') {
      var obj = $($(".group_main .group_simple")[$(".group_main .group_simple").length-1]).find(".selQuestionsTypeLink");

      var diff1 = $(obj).parents(".group_simple").find(".diff_div .diff1").text();
      var diff2 = $(obj).parents(".group_simple").find(".diff_div .diff2").text();
      var diff3 = $(obj).parents(".group_simple").find(".diff_div .diff3").text();
      if(diff1==''){
        diff1 = 0;
      }
      if(diff2==''){
        diff2 = 0;
      }
      if(diff3==''){
        diff3 = 0;
      }
      $('input[name=difficult1]').val(diff1);
      $('input[name=difficult2]').val(diff2);
      $('input[name=difficult3]').val(diff3);
      if (!$(obj).parents(".group_simple").hasClass('click_add')){
        difficultModalReset();
      }
      var getType = $(obj).parents(".group_simple").attr("questiontype");
      getSelQuestion(getType);
      showCheckedClassLabel(obj); //抽题/随机组卷勾选回显
      e.stopPropagation();
      e.preventDefault();
      selTypes = getType;
      selTr = $(obj).parents(".group_simple");
      if ($(selTr).hasClass('click_add')){
        getTableData($(obj).parents(".extract-box-tit").find("input[name=test_classify_id]").val(),$(obj).parents(".extract-box-tit").find("input[name=test_label_id]").val());
      }
      showQuestionsType(obj);
      $(obj).parents(".group_simple").addClass('click_add');
    }

  });
  //联动左右大题信息
  $("body").on("keyup", ".info-board input[name=test_peer_score]", function(e) {
    changeLeftInfoFn(this,1,queName);
  });

  $("body").on("keyup", ".group_main .group_simple input[name=test_peer_score]", function(e) {
    if($("input[name=per_score]").length>0){
      $(this).parents(".group_simple").find("input[name=per_score]").val($(this).val());
    }
    changeLeftInfoFn(this,2,queName);
  });

  $("body").on("keyup", ".group_main .group_simple input[name=test_tittle]", function(e) {
    changeLeftInfoFn(this,3,queName);
  });

  $("body").on("keyup", ".info-board input[name=every_q_time]", function (e) {
    changeLeftInfoFn(this, 4, queName);
  });
  // 若每小题分数与大题设置不同，则清空左侧和大题每题分数
  $("body").on("keyup", ".group_main .group_simple input[name=per_score]", function(e) {
    var $group = $(this).parents(".group_simple");
    var type = $($group).attr("questionType");
    if(type!=6){
      var per_obj=$($group).find("input[name=test_peer_score]");
      per_obj.val("");
      typeTotalScoreFn();
      changeLeftInfoFn(per_obj,2,queName);
    }else {
      // 组合题不对每题设置分数（本身相当于一道大题）
      var score = $(this).val();
      $(this).parents(".m-example").find(".member-score").val(score);
      typeTotalScoreFn();
      totalScoreFn();
    }
  });
  $("body").on("keyup", ".group_main .group_simple input.member-score", function (e) {
    $(this).val($.trim($(this).val()));
    var value = $(this).val();
    if (value == '' && isNaN(value) && value % 0.5 != 0){
      alert ('分数为数字且为0.5的倍数!');
    }
    var $example = $(this).parents(".m-example");
    $($example).find("input[name=per_score]").val("");
    var Rsort = $($example).parents('.group_simple').attr('sort');
    $('.left_group_simple').each(function (index,element) {
      if ($(this).attr('sort') == Rsort) {
        $(this).find("input[name=test_peer_score]").val("");
      }
    });
    typeTotalScoreFn();
    totalScoreFn();
  });

  //  如果单独设置每题答题时长   清空左侧答题时长
  $("body").on("keyup", ".group_main .group_simple input[name=per_time]", function (e) {
    var $group = $(this).parents(".group_simple");
    var type = $($group).attr("questionType");
    if (type != 6) {
      var per_obj = $($group).find("input[name=test_peer_time]");
      per_obj.val("");
      totalTimeFn();
      changeLeftInfoFn(per_obj, 5, queName);
    } else {
      // 组合题
      var score = $(this).val();
      $(this).parents(".m-example").find(".member_second").val(score);
      totalTimeFn();
    }
  });

  $("body").on("keyup", ".group_main .group_simple input.member_second", function (e) {
    $(this).val($.trim($(this).val()));
    var value = $(this).val();
    if (value == '' && isNaN(value) && value % 0.5 != 0) {
      alert('答题时长为数字且为0.5的倍数!');
    }
    var $example = $(this).parents(".m-example");
    $($example).find("input[name=per_time]").val("");
    var Rsort = $($example).parents('.group_simple').attr('sort');
    $('.left_group_simple').each(function (index,element) {
      if ($(this).attr('sort') == Rsort) {
        $(this).find("input[name=every_q_time]").val("");
      }
    });
    totalTimeFn();
  });

  //保存单个试题
  $("body").on("click", "button.saveQuestionBtn", function(e) {
    var parentDom = $(this).parents(".group_questionAdd");
    if(checkForm_question(parentDom)){
      if(serializeForm_question(parentDom)){
        asyncTestSub(parentDom);
      }
    }
  });

  //单选多选题添加多个
  $("body").on("click", "a.addKeyRadioOrCheck", function(e) {
    var parentDom = $(this).parents(".questionContent");
    var keyLength = parentDom.find(".q-item:visible").length;
    if(keyLength>=20){
      return;
    }
    parentDom.find("div.q-item").eq(keyLength).show();
    parentDom.parents(".questions-group").find("input[name=tab_num]").val(parentDom.find(".q-item:visible").length);
  });
  //单选多选题删除多个
  $("body").on("click", "a.removeKeyRadioOrCheck", function(e) {
    $(this).parents("div.questionContent").find("div.keyFillContentAdd:visible:last").hide();
    $(this).parents(".questions-group").find("input[name=tab_num]").val($(this).parents("div.questionContent").find(".q-item:visible").length);
  });

  //填空题添加多个
  $("body").on("click", "a.addKeyFill", function(e) {
    var parentDom = $(this).parents(".questionContent");
    var keyLength = parentDom.find("input[name=keyFill]").length;
    if(keyLength>=6){
      alert("最多只能有6个填空选项。");
      return;
    }
    var html = '<div class="q-item keyFillContent keyFillContentAdd"><span>答案</span><input name="keyFill" type="text" class="q-ipt q-ipt-t" /></div>';
    parentDom.find("div.q-opra").before(html);
  });
  //填空题删除多个
  $("body").on("click", "a.removeKeyFill", function(e) {
    $(this).parents("div.questionContent").find("div.keyFillContentAdd:last").remove();
  });
  //编辑添加的试题
  $("body").on("click", ".m-example-edit", function(e) {
    $('.tooltip.fade').remove();
    updateQuestionId = $(this).attr("questionId");
    window.open('/admin/question_update/#/' + updateQuestionId, "_blank");
  });
  //移除添加的试题
  $("body").on("click", ".m-example-remove", function(e) {
    $('.tooltip.fade').remove();
    totalTestNumFn($(this).parents(".group_simple").attr("sort"),2);
    if($(this).parents(".group_simple").find(".m-example").length==1){ //大题的小题全部删除后，显示空空如也  如果目前仅剩1个小题，移除后即0个，所以先判断为1，否则定位不到大题位置
      $(this).parents(".group_simple").find(".empty_q_tip").show();
    }
    $(this).parents(".m-example").remove();
    typeTotalScoreFn();
    totalScoreFn();
    totalTimeFn();

  });

  //左侧大题移除
  $("body").on("click", ".m-content-trash", function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.tooltip.fade').remove();
    var parentDom = $("div.left_group_simple");
    var contentDom = $(".group_main .group_simple");
    var sortId = $(this).attr("sort");
    var r = confirm("确认移除已添加的大题？");
    if(r==true){
      //左侧移除
      parentDom.each(function(index, element) {
        var objId = $(this).attr("sort");
        if(objId===sortId){
          $(this).remove();
          return;
        }
      });
      //右侧移除
      contentDom.each(function(index, element) {
        var objId = $(this).attr("sort");
        if(objId===sortId){
          $(this).remove();
          return;
        }
      });

    }
    //计算题目数量和总分
    typeTotalScoreFn();
    totalScoreFn();
    totalTimeFn();

    // 当删除完所有题型时，恢复添加试题按钮样式以及空题型提示
    var totalLength = $(".group_main .group_simple").length;
    // 新页面设计-会影响布局，所以注释这些代码
    // if (totalLength == 0){
    //     $("#manualInput .questions-board .com-drop ").removeClass("buttonLeft");
    //     $("#manualInput .questions-board .emptyTip").show();
    // }
  });

  //左侧大题下移
  $("body").on("click", ".m-content-down", function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.tooltip.fade').remove();
    var parentDom = $("div.left_group_simple");
    var contentDom = $(".group_main .group_simple");
    var sortId = $(this).attr("sort");
    if(parentDom.length>1){
      //左侧移动
      parentDom.each(function(index, element) {
        var objId = $(this).attr("sort");
        if((objId===sortId)&&(index!=parentDom.length-1)){
          $(parentDom[index+1]).after($(this).clone());
          $(this).remove();
          return;
        }
      });
      //右侧移动
      contentDom.each(function(index, element) {
        var objId = $(this).attr("sort");
        if((objId===sortId)&&(index!=parentDom.length-1)){
          $(contentDom[index+1]).after($(this).clone());
          $(this).remove();
          return;
        }
      });

    }
  });

  //左侧大题上移
  $("body").on("click", ".m-content-up", function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.tooltip.fade').remove();
    var parentDom = $("div.left_group_simple");
    var contentDom = $(".group_main .group_simple");
    var sortId = $(this).attr("sort");
    if(parentDom.length>1){
      //左侧移动
      parentDom.each(function(index, element) {
        var objId = $(this).attr("sort");
        if((objId===sortId)&&(index!=0)){
          $(parentDom[index-1]).before($(this).clone());
          $(this).remove();
          return;
        }
      });
      //右侧移动
      contentDom.each(function(index, element) {
        var objId = $(this).attr("sort");
        if((objId===sortId)&&(index!=0)){
          $(contentDom[index-1]).before($(this).clone());
          $(this).remove();
          return;
        }
      });

    }
  });


  //试题下移
  $("body").on("click", ".m-example-down", function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.tooltip.fade').remove();
    var parentDom = $(this).parents("div.manual-cont");
    var questionId = $(this).parents("div.m-example").attr("questionId");
    if(parentDom.find("div.m-example").length>1){
      parentDom.find("div.m-example").each(function(index, element) {
        var objId = $(this).attr("questionId");
        if((objId===questionId)&&(parentDom.find("div.m-example").length>(index+1))){
          $(parentDom.find("div.m-example")[index+1]).after($(this).clone());
          $(this).remove();
          return;
        }
      });
    }
  });
  //试题上移
  $("body").on("click", ".m-example-up", function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.tooltip.fade').remove();
    var parentDom = $(this).parents("div.manual-cont");
    var questionId = $(this).parents("div.m-example").attr("questionId");
    if(parentDom.find("div.m-example").length>1){
      parentDom.find("div.m-example").each(function(index, element) {
        var objId = $(this).attr("questionId");
        if((objId===questionId)&&(index!=0)){
          $(parentDom.find("div.m-example")[index-1]).before($(this).clone());
          $(this).remove();
          return;
        }
      });
    }
  });

  //保存试卷
  $("body").on("click", "button#savePaperBtn", function(e) {
    if(checkForm_paper()){
      if(serializeForm_paper()){
        asyncPaperSub();
      }
    }
  });

  //选择分类
  $("body").on("click", "#selTypeLink", function(e) {
    e.stopPropagation();
    e.preventDefault();
    showSelType(this);
  });

  // 选择标签
  $("body").on("click", "#selLabelLink", function(e) {
    showSelLabel(this);
  });

  //更改试卷分类
  $("#changeClassBtn").click(function (e) {
    showPaperSelType();
  });

  //试卷预览
  $("#previewBtn").click(function (e) {
    if(paper_type == 1) {
      actionPreviewWork();
    } else if(paper_type == 2 || paper_type == 3) {
      $("#preHintModal").modal()
    }
  });

  // 试卷预览处理事件
  function actionPreviewWork(){
    if (checkForm_paper()) {
      setTimeout(function(){
        if (serializeForm_paper()) {
          $("#asyncForm_paper").attr("action" , "/examadmin/admin/paper_preview/");
          window.open("" , "theWindow");
          $("#asyncForm_paper").submit();
        }
      },500);
    }
  }

  $('#preHintModalHide').click(function () {
    // 取消预览弹窗按钮
    $('#preHintModal').modal('hide');
  });

  $('#preHintModalConfirm').click(function () {
    // 确认预览弹窗按钮
    $('#preHintModal').modal('hide');
    actionPreviewWork();
  });

  //试卷下载
  $("#downloadBtn").click(function(e) {
    if(checkForm_paper()){
      setTimeout(function(){
        if (serializeForm_paper()) {
          $("#asyncForm_paper").attr("action" , "/examadmin/admin/paper_download/");
          $("#iframe-box").html('<iframe style="display: none;" name="asyncForm_paper" src="/examadmin/admin/paper_download/"></iframe>');
          $("#asyncForm_paper").submit();
        }
      },500);
    }
  });



  //选题组卷选择试题
  $("body").on("click", ".group_simple a.selQuestionLink", function(e) {
    e.stopPropagation();
    e.preventDefault();
    showSelQuestions(this);
  });
  //选题组卷管理试题
  $("body").on("click", ".group_simple a.modifyQuestionLink", function(e) {
    e.stopPropagation();
    e.preventDefault();
    showModifyQuestions(this);
  });
  //抽题、随机组卷选择试题分类
  $("body").on("click", ".group_simple .selQuestionsTypeLink", function(e) {
    var diff1 = $(this).parents(".group_simple").find(".diff_div .diff1").text();
    var diff2 = $(this).parents(".group_simple").find(".diff_div .diff2").text();
    var diff3 = $(this).parents(".group_simple").find(".diff_div .diff3").text();

    if(diff1==''){
      diff1 = 0;
    }
    if(diff2==''){
      diff2 = 0;
    }
    if(diff3==''){
      diff3 = 0;
    }
    $('input[name=difficult1]').val(diff1);
    $('input[name=difficult2]').val(diff2);
    $('input[name=difficult3]').val(diff3);
    var classifyId = $(this).parents(".extract-box-tit").find("input[name=test_classify_id]").val();
    var labelId = $(this).parents(".extract-box-tit").find("input[name=test_label_id]").val();
    if (classifyId != ''){
      $('#selTypeLink').text('已选择');
    }
    if (labelId != ''){
      $('#selLabelLink').text('已选择');
    }
    if (!$(this).parents(".group_simple").hasClass('click_add')){
      difficultModalReset();
    }
    var getType = $(this).parents(".group_simple").attr("questiontype");
    getSelQuestion(getType);
    showCheckedClassLabel(this); //抽题/随机组卷勾选回显
    e.stopPropagation();
    e.preventDefault();
    selTypes = getType;
    selTr = $(this).parents(".group_simple");
    if ($(selTr).hasClass('click_add')){
      getTableData($(this).parents(".extract-box-tit").find("input[name=test_classify_id]").val(),$(this).parents(".extract-box-tit").find("input[name=test_label_id]").val());
    }
    // 将用户选取的试题存入本地存储
    localStorage.setItem("selArry"+user_id, $(this).parents(".extract-box-tit").find("input[name=test_classify_id]").val());
    localStorage.setItem("selArryLabel"+user_id, $(this).parents(".extract-box-tit").find("input[name=test_label_id]").val());
    showQuestionsType(this);
    $(this).parents(".group_simple").addClass('click_add');
  });

  //抽题/随机组卷勾选回显
  function showCheckedClassLabel(_this){
    _checked_this=_this; //这个全局变量在点击选择弹窗的'确定'按钮时、在树里显示勾选时用到
    var class_ids=$(_this).parents('.extract-box-tit').find("input[name='test_classify_id']").val();
    var label_ids=$(_this).parents('.extract-box-tit').find("input[name='test_label_id']").val();
    $(_this).parents('.extract-box-tit').find(".checked_classify_ids").val(class_ids); //试题分类的勾选项与提交项一致（提交项是最终设置，勾选项只是查询条件）
    $(_this).parents('.extract-box-tit').find(".checked_label_ids").val(label_ids); //试题标签的勾选项与提交项一致（提交项是最终设置，勾选项只是查询条件）
    if(class_ids==""){ //如果为空，文案变回请选择
      $("#selTypeLink").text('请选择');
    }
    if(label_ids==""){ //如果为空，文案变回请选择
      $("#selLabelLink").text('请选择');
    }
  }

  $('#saveTextBtn').on('click',function () {
    var difficult = "";
    var totelNum = "";
    var simple = $('input[name=difficult1]').val();
    var middle = $('input[name=difficult2]').val();
    var hard = $('input[name=difficult3]').val();
    var difficult1_num = $('#difficultModal .difficult1_num').text();
    var difficult2_num = $('#difficultModal .difficult2_num').text();
    var difficult3_num = $('#difficultModal .difficult3_num').text();
    var checked_class_ids=$(_checked_this).parents('.extract-box-tit').find(".checked_classify_ids").val();//勾选的试题分类id
    $("input[name=classification]").val(checked_class_ids); //将勾选的id赋给提交参数
    selTr.find("input[name=test_classify_id]").val(checked_class_ids);
    var checked_label_ids=$(_checked_this).parents('.extract-box-tit').find(".checked_label_ids").val();//勾选的试题标签id
    $("input[name=label]").val(checked_label_ids);
    selTr.find("input[name=test_label_id]").val(checked_label_ids);
    if (simple == '' || middle == '' || hard == ''){
      alert("数量不能为空!");
      return;
    }
    if(simple=="0" && middle=="0" && hard=="0"){
      alert("数量不能全为0！");
      return;
    }
    if(parseInt(simple)>parseInt(difficult1_num)){
      alert("数量过大，请重新填写！");
      return;
    }
    if(parseInt(middle)>parseInt(difficult2_num)){
      alert("数量过大，请重新填写！");
      return;
    }
    if(parseInt(hard)>parseInt(difficult3_num)){
      alert("数量过大，请重新填写！");
      return;
    }
    if(checkQuestionRepet(simple,middle,hard)) {
      return;
    }
    difficult = simple + "," + middle + "," + hard;
    totelNum = parseInt(simple) + parseInt(middle) + parseInt(hard);
    saveDifficultFn(difficult,totelNum);
    hideDifficultModal();
  });
  //根据组卷类型显示不同默认模板及标题
  paperTypeShowTemp();
  //计算题目数量和总分
  typeTotalScoreFn();
  totalScoreFn();
  totalTimeFn();

  $(".group_simple").each(function() {
    if($(this).find(".extract-box-tit").length>1){
      $(this).find(".extract-box-tit")[1].remove();
    };
  });
  //每题分数限制为0.5的倍数
  $("body").on("blur","input[name='option_peer_score']",function(e) {
    e.stopPropagation();
    e.preventDefault();
    var score = $(this).val();
    if(score=='' || score % 0.5 != 0){
      alert('请填写分数并保证分数为0.5的倍数!');
    };
  });
  //漏选给分显示每个选项分数输入框
  $("body").on("change","input[name='less_choice_confirm']",function(e) {
    if(this.checked) {
      $(this).parent().children("span[name='option_peer_score_show']").css("display","inline");
    }
    else {
      $(this).parent().children("span[name='option_peer_score_show']").css("display","none");
    };
  });

  $('#paperList').click(function () {
    $('#savePaperModal').modal('hide');
    window.location.href = '/examadmin/admin/paper_mgr_new';
  });

  $('#createExam').click(function () {
    if (userRole == 'sub_admin' && KSXRIGHTS.allowExamMgr != 1){
      window.localStorage.setItem('okModalExamRef','index'); //创建考试成功 点击确定跳到首页
    }
    $('#savePaperModal').modal('hide');
    window.location.href = "/admin/exam_add?paper_info_id=" + jumpId;
  });

  $('#addQuestionsBtn').click(function (e) {
    sel_click = '';
    e.preventDefault();
    e.stopPropagation();
    changeDialog();
  });
  $('.add-quest').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideSelQuestions('fromTableAddBtn');
  });

  $('#addQuestionsModal .close-x').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (sel_click != '') {
      showSelQuesDialog('showQues');
    } else {
      showSelQuesDialog();
    }
  });

});
//试题验证表单选项
function checkForm_question(parentDom){
  var parentDom = $(parentDom);
  if(parentDom.parents(".group_simple").find("input[name=test_tittle]").val()==""){
    alert("请输入题型名称；（例如：选择题）！");
    return false;
  }
  var type = parentDom.parents(".group_simple").attr("questionType");
  var questionEditor = parentDom.find("input[name=question]").val();

  if(questionEditor==""){
    alert("请填写试题描述！");
    return false;
  }
  if(type==1||type==2){
    var key = parentDom.find(".radioOrCheck");
    var ifCheck = false;
    for(var i=0;i<key.length;i++){
      var checked = $(key[i]).is(":checked");
      $(key[i]).parent().find(".key").remove();
      if(checked===true){
        ifCheck = true;
        $(key[i]).parent().append('<input type="hidden" class="key" name="key'+(i+1)+'" value="1" />');
      }else{
        $(key[i]).parent().append('<input type="hidden" class="key" name="key'+(i+1)+'" value="0" />');
      }
    }
    if(ifCheck===false){
      alert("请选择正确答案！");
      return false;
    }
    return true;
  }
  if(type==4){
    if(parentDom.find("input[name=keyFill]").val()==""){
      alert("请填写试题答案！");
      return false;
    }
  }
  if(type==5||type==7){
    if(parentDom.find(".textareaDom").text()==""){
      alert("请填写试题答案！");
      return false;
    }
  }
  return true;
}
//提交试题数据合并
function serializeForm_question(parentDom){
  var parentDom = $(parentDom);
  var type = parentDom.parents(".group_simple").attr("questionType");

  $("#asyncForm_question div").html("&nbsp;");
  $("#asyncForm_question input[name=type]").val(type);
  $("#asyncForm_question input[name=tab_num]").val(parentDom.parents(".group_simple").find("input[name=tab_num]").val());
  $("#asyncForm_question textarea[name=question]").text(parentDom.find("input[name=question]").val());
  $("#asyncForm_question textarea[name=analysis]").text(parentDom.find("div[name=analysis]").html());
  //新添加题型标题
  $("#asyncForm_question input[name=test_tittle]").val(parentDom.parents(".group_simple").find("input[name=test_tittle]").val());
  $("#asyncForm_question input[name=test_peer_score]").val(parentDom.parents(".group_simple").find("input[name=test_peer_score]").val());

  var tab_num = parentDom.parents(".group_simple").find("input[name=tab_num]").val();
  if(type==1||type==2){
    var keyList = parentDom.find(".q-item");
    for(var i=0;i<keyList.length;i++){
      if(i<=(tab_num-1)){
        var answer = parentDom.find("input[name=answer"+(i+1)+"]").val();
        $(keyList[i]).find(".key").clone().appendTo("#asyncForm_question div");
        $("#asyncForm_question div").append('<textarea name="answer'+(i+1)+'"></textarea>');
        $("#asyncForm_question textarea[name=answer"+(i+1)+"]").text(answer);
      }
    }
    return true;
  }else if(type==3){
    if(parentDom.find("input[has=judgeYes]").is(":checked")){
      parentDom.find("input[name=key1]").val("1");
      parentDom.find("input[name=key2]").val("0");
      $("#asyncForm_question div").html('<input type="hidden" class="" name="key1" value="1" /><input type="hidden" class="" name="key2" value="0" /><input type="hidden" class="radioOrCheck" name="answer1" value="" /><input type="hidden" class="radioOrCheck" name="answer2" value="" />');
    }else{
      parentDom.find("input[name=key1]").val("0");
      parentDom.find("input[name=key2]").val("1");
      $("#asyncForm_question div").html('<input type="hidden" class="" name="key1" value="0" /><input type="hidden" class="" name="key2" value="1" /><input type="hidden" class="radioOrCheck" name="answer1" value="" /><input type="hidden" class="radioOrCheck" name="answer2" value="" />');
    }
    return true;
  }else if(type==4){
    var keyList = parentDom.find("input[name=keyFill]");
    var html = "";
    keyList.each(function(index, element) {
      html = '<input type="hidden" class="" name="key'+(index+1)+'" value="1" /><input type="hidden" class="radioOrCheck" name="answer'+(index+1)+'" value="'+$(this).val()+'" />';
      $("#asyncForm_question div").append(html);
    });
    return true;

  }else if(type==5||type==7){
    $("#asyncForm_question div").append('<textarea name="answer1"></textarea>');
    $("#asyncForm_question div").append('<input type="hidden" class="" name="key1" value="1" />');
    $("#asyncForm_question div textarea[name=answer1]").text(parentDom.find(".textareaDom").html());
    return true;
  }
}
//试卷验证表单选项
function checkForm_paper(){
  if($("input[name=paper_name]").val()==""){
    alert("请输入试卷名称");
    return false;
  }else if($("input[name=paper_name]").val().length > 50){
    alert("试卷名称不得大于50字！");
    return false;
  }

  var reg=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
  var test_tittle = true;
  $(".group_main input[name=test_tittle]").each(function(index, element) {
    if($(this).val()==""){
      test_tittle = false;
      return false;
    }
  });
  var test_peer_score = true;
  $(".group_main input[name=test_peer_score]").each(function(index, element) {
    if($(this).val()==""){
      test_peer_score = false;
      return false;
    }
  });
  var question_per_score=true;
  $(".group_main input[name=per_score]").each(function(index, element) {
    var type = $(this).parents(".group_simple").attr("questionType");
    $(this).css('border','solid 1px #D8D8D8');
    $(this).parent().find(".empty_red_tip").remove();
    if(type!=6 && !reg.test($(this).val())){
      question_per_score = false;
      $(this).css('border','solid 1px #FF4B50');
      $(this).parent().append('<span class="empty_red_tip">请设置每题分数</span>');
      return false;
    }
  });

  var comb_per_score = true;
  $(".group_main input.member-score").each(function(index, element) {
    if(!reg.test($(this).val())){
      comb_per_score = false;
      return false;
    }
  });
  //检查选项分数
  var option_peer_score = true;
  $(".group_main input[name=option_peer_score]").each(function(index, element) {
    if($(this).parent().is(':visible') && ($(this).val()=="" || $(this).val()%0.5 != 0)) {
      option_peer_score = false;
      return false;
    };
  });

  //检查每题时长 秒
  var every_q_time = true;
  $(".group_main input[name=every_q_time]").each(function (index, element) {
    $(this).css('border','solid 1px #D8D8D8');
    $(this).parent().find(".empty_red_tip").remove();
    if ($(this).val() == "" || parseInt($(this).val()) == 0) {
      every_q_time = false;
      $(this).css('border','solid 1px #FF4B50');
      $(this).parent().append('<span class="empty_red_tip">请设置答题时长</span>');
      return false;
    }
  });
  $(".info-board input[name=every_q_time]").each(function (index, element) {
    var _val = $(this).val();
    if (_val == "" || _val.indexOf(".") > -1 || (paper_type!="1"?(parseInt(_val)==0?true:false):false)) {
      every_q_time = false;
      return false;
    }
  });

  var question_per_time = true;
  $(".group_main input[name=per_time]").each(function (index, element) {
    var type = $(this).parents(".group_simple").attr("questionType");
    if ($(this).val().indexOf(".")>-1) {
      question_per_time = false;
      return false;
    }

  });
  //组合题时长检测
  var comb_per_time = true;
  var comb_per_time_vaild = true; //组合题时长是否有值
  $(".group_main input.member_second").each(function (index, element) {
    if($(element).val().match(/^[0-9].[1-9]/)){
      comb_per_time = false;
      return false;
    }
    if ($(this).val()=="") {
      comb_per_time_vaild = false;
      return false;
    }
  });
  // 检查每道大题下是否有小题
  var group_test_num = true;
  $(".info-board .left_group_simple").each(function(index,element) {
    if($($(this).find(".test_num")[0]).text()=='0'){
      group_test_num = false;
      return false;
    }
  });

  if(test_tittle===false){
    alert("请输入题型名称；（例如：选择题）！");
    return false;
  }
  if ( $("input[name=per_score]").length == 0 && $(".questions_deleted").length == 0) {
    if (test_peer_score === false) {
      alert("请填写每题分数");
      return false;
    }
  }
  if ($("input[name=per_time]").length == 0 && every_q_time === false) {
    alert("每题答题时长请输入整数！");
    return false;
  }
  if(question_per_score===false){
    alert("请检查每题分数！");
    return false;
  }
  if (question_per_time === false) {
    alert("每题答题时长请输入整数！");
    return false;
  }
  if(comb_per_score===false){
    alert("请检查组合题小题分数！");
    return false;
  }
  if (comb_per_time === false) {
    alert("请检查组合题小题答题时长,不能为小数！");
    return false;
  }
  if(option_peer_score===false){
    alert("请填写单个选项分数，并保证是0.5的倍数！");
    return false;
  }
  if(group_test_num===false){
    alert("每道大题中至少添加一道小题！");
    return false;
  }

  if (comb_per_time_vaild === false) {
    alert("请检查组合题小题答题时长,不能为空！");
    return false;
  }


  if($(".total_score").text()=='0'){
    alert("请至少添加一道试题！");
    return false;
  }
  if(paper_type=="1"&&$("input[name=classification]").val()==""){
    var has = "";
    $(".group_main").each(function(index, element) {
      if($(this).find("div.m-example").length==0){
        alert("请选择试题！");
        has = false;
        return false;
      }
    });
    if (has===false){return false;}
  }else if(paper_type!="1"){
    var has = "";
    $(".group_main").find("input[name=hard]").each(function(index, element) {
      if($(this).val()==""){
        alert("请输入抽取数量！");
        has = false;
        return false;
      }
    });
    if (has===false){return false;}
  }

  //检查是否有抽题数量大于题库数量
  if($("div .info-board").find(".hard_over_count").length != 0) {
    alert("有大题抽题数量大于题库数量,请重新选择抽题数量!");
    return false;
  }

  return true;
}
//提交试卷数据合并
function serializeForm_paper(){
  $("#asyncForm_paper div").html("&nbsp;");
  $("#asyncForm_paper input[name=paperName]").val($(".questions-board input[name=paper_name]").val());
  $("#asyncForm_paper input[name=paperSetNum]").val($(".group_main .group_simple").length);
  $("#asyncForm_paper input[name=totalScore]").val($(".info-board .total .total_score").text());
  $("#asyncForm_paper input[name=totalTime]").val($(".info-board .total .total_time").text());
  $(".group_main .group_simple").each(function(index, element) {
    var num = index+1;
    var html = "",test_ids = "",test_type = "",question_scores="",question_time = "" ,test_peer_score = "", test_peer_time = "",test_tittle = "",block_id = "";
    var comb_data1 = [];
    var comb_data2 = [];
    var question_disorder, options_disorder;
    block_id = $(this).attr("sort");
    test_type = $(this).attr("questionType");

    test_peer_score = $(this).find("input[name=test_peer_score]").val();
    test_tittle = $(this).find("input[name=test_tittle]").val();

    // 传每题时长 判断组卷方式
    if (perTimeRestrict == '1') {
      if (paper_type != "1") {
        test_peer_time = $(".info-board input[name=every_q_time]")[index].value
      } else {
        test_peer_time = $(this).find("input[name=every_q_time]").val();
      }
    }

    //手工录入，选题获取试题ids
    if(paper_type=="1"){
      $(this).find("div.m-example").each(function(index, element) {
        if(test_type!="6"){//非组合题
          test_ids += $(this).attr("questionId")+",";
          if ( !$(this).find("input[name=per_score]").val() ) {
            question_scores += 0 + ",";
          } else {
            question_scores += $(this).find("input[name=per_score]").val() + ",";
          }

          if ( !$(this).find("input[name=per_time]").val() ) {
            question_time += 0 + ",";
          } else {
            question_time += $(this).find("input[name=per_time]").val() + ",";
          }

        }else {//组合题
          var comb_id = $(this).attr("questionId");
          comb_data1[index]={};
          comb_data1[index][comb_id] = {};
          comb_data2[index] = {};
          comb_data2[index][comb_id] = {};
          var $index = index;
          $(this).find(".member-question").each(function(index, element) {
            var $member = $(this).parent("dt");
            var s_id = $(this).attr("s_id");
            var s_score = $($member).find(".member-score").val();
            var s_time = $($member).find(".member_second").val();
            comb_data1[$index][comb_id][s_id] = s_score;
            comb_data2[$index][comb_id][s_id] = s_time;
          });
        }
      });
    }else{ //抽题，随机获取试题
      html += '<input type="hidden" name="isAvg'+num+'" value="1"  />';//平均抽题是否勾选，默认不勾选
      var test_classify_id = $(this).find("input[name=test_classify_id]").val(); //试题分类字段
      html += '<input type="hidden" name="testClassifyId'+num+'" value="'+test_classify_id+'"  />';
      var test_label_id = $(this).find("input[name=test_label_id]").val(); //试题标签字段
      html += '<input type="hidden" name="testLabelId'+num+'" value="'+test_label_id+'"  />';
      var hard = $(this).find("input[name=hard]").val(); //难度试题分类字段
      html += '<input type="hidden" name="hard'+num+'" value="'+hard+'"  />';
    }
    //试题乱序
    if($($(this).find("input[name=question_disorder]")[0]).is(":checked")) {
      question_disorder = '1';
    }else {
      question_disorder = '0';
    }

    //选项乱序
    if($($(this).find("input[name=options_disorder]")[0]).is(":checked")) {
      options_disorder = '1';
    }else {
      options_disorder = '0';
    }


    //如果漏选得分checked，则取值1
    if($(this).find("input[name=less_choice_confirm]").is(":checked")) {
      less_choice_confirm_value = '1';
    }else {
      less_choice_confirm_value = '0';
    }

    option_peer_score=$(this).find("input[name=option_peer_score]").length==0 ? "" : $(this).find("input[name=option_peer_score]").val();

    if(test_type=="6"&&paper_type=="1"){
      html += '<input type="hidden" name="comb'+num+'" value="'+JSON.stringify(comb_data1).replace(/\"/g,"\'")+'" />';
      html += '<input type="hidden" name="comb_t'+num+'" value="'+JSON.stringify(comb_data2).replace(/\"/g,"\'")+'" />';

    }else {
      html += '<input type="hidden" name="testIds'+num+'" value="'+test_ids+'" />';
      if(question_scores==""){
        html += '<input name="testPeerScore'+num+'" value="'+test_peer_score+'"  />';
      }else {
        html += '<input type="hidden" name="questionScores'+num+'" value="'+question_scores+'" />'
      }
      if (perTimeRestrict == '1') {
        if (question_time == "") {
          html += '<input name="testPeerTime' + num + '" value="' + test_peer_time + '"  />';
        } else {
          html += '<input type="hidden" name="perQuestionTime' + num + '" value="' + question_time + '" />'
        }
      }
    }

    html += '<input type="hidden" name="testType'+num+'" value="'+test_type+'" />';
    html += '<input type="hidden" name="blockId'+num+'" value="'+block_id+'" />';
    html += '<input name="lessChoiceConfirm'+num+'" value="'+less_choice_confirm_value+'"  />';
    html += '<input name="optionPeerScore'+num+'" value="'+option_peer_score+'"  />';
    html += '<input type="hidden" name="testTittle'+num+'" value="'+test_tittle+'"  />';
    html += '<input type="hidden" name="testSeq'+num+'" value="'+num+'" />';
    html += '<input type="hidden" name="questionDisorder'+num+'" value="'+question_disorder+'" />';
    html += '<input type="hidden" name="optionsDisorder'+num+'" value="'+options_disorder+'" />';
    $("#asyncForm_paper div").append(html);
  });
  return true;
}
//异步提交表单保存试卷
function asyncPaperSub(obj){
  var dataForm = $('#asyncForm_paper').serialize();
  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: ajaxUrl,
    data: dataForm,
    success: function(msg){
      if(msg.success == true){
        jumpId = msg.bizContent;
        // 试卷库编辑或考试编辑 试卷库编辑显示弹窗
        if (sourceFrom == 'paperList'){
          // if (userRole == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
          //   $('#createExam').hide();
          // }
          //弹窗提示
          $('#savePaperModal').modal();

        } else if (sourceFrom == 'examAdd'){
          window.location.href = "/admin/exam_add?paper_info_id="+paperInfoId;
        } else {
          window.location.href = "/admin/exam_update/#/" + examInfoId;
        }//
      } else if(msg.code == 233){
        alert(msg.desc);
      } else{
        alert("保存失败！");
      }
    }
  });
}

//提交单个试题表单
function asyncTestSub(parentDom){
  var dataForm = $('#asyncForm_question').serialize();
  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/examadmin/admin/add_single_test",
    data: dataForm + "&t="+Math.random(),
    success: function(msg){
      if(msg.success == true){
        createQuestionsViewFn(msg,parentDom,'manual');
        clearFormFn(parentDom);
      }else{
        alert(msg.desc);
      }
    }
  });
}
//显示单项分数
function showOptionScore(sortRandom , questionType){
  $("div.group_main .group_simple").each(function(index, element) {
    var sortDom = $(this).attr("sort");
    var questionContentHtml = "";
    if(sortDom == sortRandom){
      //$(this).find("input[name=test_tittle]").attr("sort", sortRandom);
      //$(this).find("input[name=test_peer_score]").attr("sort", sortRandom);
      //多选题显示单项分数选项
      if(questionType=="2"){
        $(this).find("#selection_score").css("display","inline-block");
        $(this).find("#selection_score span[name=vacant]").remove();
      };
      //填空题显示每空分数选项
      if(questionType=="4"){
        $(this).find("#selection_score").css("display","inline-block");
        $(this).find("#selection_score span[name=selection]").remove();
        $(this).find("#selection_score span[name=vacant]").remove();
        $(this).find("#selection_score input[name=less_choice_confirm]").remove();
        $(this).find("#selection_score").attr("title","全对满分，有错误则按正确个数给分");
      };
    };
  });
};

/******2.0新增方法 ******/
//根据组卷类型显示不同默认模板及标题
function paperTypeShowTemp(){
  if(paper_type=="1"){
    $("div.questionContet_simple , div.group_questionAdd").remove();
    $("div.group_title").append($("#paperTpye1").html());
  }else if(paper_type=="2"){
    $("div.diff_div").show();
    $("div.questionContet_simple , div.group_questionShow , div.group_questionAdd").remove();
    $("div.group_title").append($("#paperTpye2").html());
  }else if(paper_type=="3"){
    $("div.diff_div").show();
    $("div.questionContet_simple , div.group_questionShow , div.group_questionAdd").remove();
    $("div.group_title").append($("#paperTpye2").html());
  }
  ajaxUrl = "/api/paper/update_post";
}

//根据试题类型创建新增试题DOM
function createGroupSimple(sortRandom , questionType){

  $("div.group_main .group_simple").each(function(index, element) {
    var sortDom = $(this).attr("sort");
    var questionContentHtml = "";
    if(sortDom == sortRandom){

      $(this).find("input[name=test_tittle]").attr("sort", sortRandom);
      $(this).find("input[name=test_peer_score]").attr("sort", sortRandom);
      $(this).find("input[name=test_peer_time]").attr("sort", sortRandom);


      if(questionType=="1"){
        questionContentHtml = $(".questionContet_simple .questionContent_radio").html();
      }else if(questionType=="2"){
        questionContentHtml = $(".questionContet_simple .questionContent_checkbox").html();
      }else if(questionType=="3"){
        questionContentHtml = $(".questionContet_simple .questionContent_judge").html();
      }else if(questionType=="4"){
        questionContentHtml = $(".questionContet_simple .questionContent_fill").html();
      }else if(questionType=="5"){
        questionContentHtml = $(".questionContet_simple .questionContent_cloze").html();
      }
      $(this).find(".questionContent").html(questionContentHtml);

      if(questionType=="1"||questionType=="2"){
        $(this).find(".hasSelType").css("display","inline-block");
        //默认显示4个答案
        changeNum(this,4);
      }
      //多选题显示单项分数选项
      if(questionType=="2"){
        $(this).find("#selection_score").css("display","inline-block");
        $(this).find("#selection_score span[name=vacant]").remove();
      }
    }
  });
}

//切换答案数量fn
function changeNum(dom,num){
  $(dom).find(".q-item").each(function(index, element) {
    if(index+1<=num){
      $(this).show();
      return;
    }
    $(this).hide();
  });
}
//新增试题后创建显示试题内容fn
function createQuestionsViewFn(obj,parentDom,q_type,create_type){
  var html = "";
  var num = Number(obj.tab_num);
  var per_score;
  var per_time;
  if(create_type=='update'){
    per_score=$(".m-example[questionId="+obj.id+"]").parents(".group_simple").find("input[name=test_peer_score]").val();
    per_time=$(".m-example[questionId="+obj.id+"]").parents(".group_simple").find("input[name=test_peer_time]").val();
  }else {
    per_score=$(parentDom).parents(".group_simple").find("input[name=test_peer_score]").val();
    per_time=$(parentDom).parents(".group_simple").find("input[name=test_peer_time]").val();
  }
  if(obj.type=="1"||obj.type=="2"){
    //内容填充
    try {
      if (obj.answer1 != undefined) {
        if (obj.key.indexOf("A")== -1 ){
          html += '<dd class="a"><em class="icon">A</em>' + obj.answer1 + '</dd>';
        }else{
          html += '<dd class="a correctAnswer"><em class="icon">A</em>' + obj.answer1 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {

      if (obj.answer2 != undefined) {
        if (obj.key.indexOf("B")== -1 ){
          html += '<dd class="b"><em class="icon">B</em>' + obj.answer2 + '</dd>';
        }else{
          html += '<dd class="b correctAnswer"><em class="icon">B</em>' + obj.answer2 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer3 != undefined) {
        if (obj.key.indexOf("C")== -1 ){
          html += '<dd class="c"><em class="icon">C</em>' + obj.answer3 + '</dd>';
        }else{
          html += '<dd class="c correctAnswer"><em class="icon">C</em>' + obj.answer3 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer4 != undefined) {
        if (obj.key.indexOf("D")== -1 ){
          html += '<dd class="d"><em class="icon">D</em>' + obj.answer4 + '</dd>';
        }else{
          html += '<dd class="d correctAnswer"><em class="icon">D</em>' + obj.answer4 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer5 != undefined) {
        if (obj.key.indexOf("E")== -1 ){
          html += '<dd class="e"><em class="icon">E</em>' + obj.answer5 + '</dd>';
        }else{
          html += '<dd class="e correctAnswer"><em class="icon">E</em>' + obj.answer5 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer6 != undefined) {
        if (obj.key.indexOf("F")== -1 ){
          html += '<dd class="f"><em class="icon">F</em>' + obj.answer6 + '</dd>';
        }else{
          html += '<dd class="f correctAnswer"><em class="icon">F</em>' + obj.answer6 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer7 != undefined) {
        if (obj.key.indexOf("G")== -1 ){
          html += '<dd class="g"><em class="icon">G</em>' + obj.answer7 + '</dd>';
        }else{
          html += '<dd class="g correctAnswer"><em class="icon">G</em>' + obj.answer7 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer8 != undefined) {
        if (obj.key.indexOf("H")== -1 ){
          html += '<dd class="h"><em class="icon">H</em>' + obj.answer8 + '</dd>';
        }else{
          html += '<dd class="h correctAnswer"><em class="icon">H</em>' + obj.answer8 + '</dd>';
        }
        //html += '<dd class="h"><em></em>' + obj.answer8 + '</dd>';
      }
    } catch (e) {
    }
    try {
      if (obj.answer9 != undefined) {
        if (obj.key.indexOf("I")== -1 ){
          html += '<dd class="i"><em class="icon">I</em>' + obj.answer9 + '</dd>';
        }else{
          html += '<dd class="i correctAnswer"><em class="icon">I</em>' + obj.answer9 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer10 != undefined) {
        if (obj.key.indexOf("J")== -1 ){
          html += '<dd class="j"><em class="icon">J</em>' + obj.answer10 + '</dd>';
        }else{
          html += '<dd class="j correctAnswer"><em class="icon">J</em>' + obj.answer10 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer11 != undefined) {
        if (obj.key.indexOf("K")== -1 ){
          html += '<dd class="k"><em class="icon">K</em>' + obj.answer11 + '</dd>';
        }else{
          html += '<dd class="k correctAnswer"><em class="icon">K</em>' + obj.answer11 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer12 != undefined) {
        if (obj.key.indexOf("L")== -1 ){
          html += '<dd class="l"><em class="icon">L</em>' + obj.answer12 + '</dd>';
        }else{
          html += '<dd class="l correctAnswer"><em class="icon">L</em>' + obj.answer12 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer13 != undefined) {
        if (obj.key.indexOf("M")== -1 ){
          html += '<dd class="m"><em class="icon">M</em>' + obj.answer13 + '</dd>';
        }else{
          html += '<dd class="m correctAnswer"><em class="icon">M</em>' + obj.answer13 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer14 != undefined) {
        if (obj.key.indexOf("N")== -1 ){
          html += '<dd class="n"><em class="icon">N</em>' + obj.answer14 + '</dd>';
        }else{
          html += '<dd class="n correctAnswer"><em class="icon">N</em>' + obj.answer14 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer15 != undefined) {
        if (obj.key.indexOf("O")== -1 ){
          html += '<dd class="o"><em class="icon">O</em>' + obj.answer15 + '</dd>';
        }else{
          html += '<dd class="o correctAnswer"><em class="icon">O</em>' + obj.answer15 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer16 != undefined) {
        if (obj.key.indexOf("P")== -1 ){
          html += '<dd class="p"><em class="icon">P</em>' + obj.answer16 + '</dd>';
        }else{
          html += '<dd class="p correctAnswer"><em class="icon">P</em>' + obj.answer16 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer17 != undefined) {
        if (obj.key.indexOf("Q")== -1 ){
          html += '<dd class="q"><em class="icon">Q</em>' + obj.answer17 + '</dd>';
        }else{
          html += '<dd class="q correctAnswer"><em class="icon">Q</em>' + obj.answer17 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer18 != undefined) {
        if (obj.key.indexOf("R")== -1 ){
          html += '<dd class="r"><em class="icon">R</em>' + obj.answer18 + '</dd>';
        }else{
          html += '<dd class="r correctAnswer"><em class="icon">R</em>' + obj.answer18 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer19 != undefined) {
        if (obj.key.indexOf("S")== -1 ){
          html += '<dd class="s"><em class="icon">S</em>' + obj.answer19 + '</dd>';
        }else{
          html += '<dd class="s correctAnswer"><em class="icon">S</em>' + obj.answer19 + '</dd>';
        }
      }
    } catch (e) {
    }
    try {
      if (obj.answer20 != undefined) {
        if (obj.key.indexOf("T")== -1 ){
          html += '<dd class="t"><em class="icon">T</em>' + obj.answer20 + '</dd>';
        }else{
          html += '<dd class="t correctAnswer"><em class="icon">T</em>' + obj.answer20 + '</dd>';
        }
      }
    } catch (e) {
    }
  } else if (obj.type == 3) {
    if (obj.key.indexOf("正确") === -1) {
      html += '<dd class="rt"><em class="icon"><span class="icon-a_check"></span></em>正确</dd><dd class="wg correctAnswer"><em class="icon"><span class="icon-a_close"></span></em>错误</dd>';
    } else {
      html += '<dd class="rt correctAnswer"><em class="icon"><span class="icon-a_check"></span></em>正确</dd><dd class="wg"><em class="icon"><span class="icon-a_close"></span></em>错误</dd>';
    }
  }else if(obj.type == 5){
    if(obj.normalWords!=undefined){
      var temp = obj.normalWords.split("|");
      html += '<p>普通关键词：'+temp.join("或")+'</p>';
    }
    if(obj.keyWords!=undefined){
      var temp = obj.keyWords.split("|");
      html += '<p>核心关键词：'+temp.join("或")+'</p>';
    }
  }
  //若解析为None则显示为无
  if (obj.analysis == "None" || obj.analysis == "") {
    obj.analysis = "无";
  } else {
    obj.analysis = obj.analysis;
  }
  //若答案为None则显示为无
  if (obj.key == "None" || obj.key == "") {
    obj.key = "无";
  } else {
    obj.key = obj.key;
  }
  if(obj.type!=6){
    var allHtml = '<div class="m-example questions" questionId="' + obj.id + '"><dl>' +
      '<dt>' + obj.question + '</dt>' + html + '</dl>' +
      '<p class="answer">答案：' + ((obj.key == '' || obj.key == 'None') ? '无' : obj.type == 4 ? obj.key.replace(/[&]+/g, "或").replace(/[\|]+/g, "，") : obj.key) + '</p>' +
      '<p class="analysis">解析：' + obj.analysis + '</p>' +
      ((perTimeRestrict == '0') ? '' : '<span class="m-example-time">时长<input name="per_time" value="' + per_time + '">秒</span>') +
      '<span class="m-example-score">分数<input name="per_score" value="' + per_score + '">分</span>' +
      '<a href="javascript:void(0)" class="m-example-edit" questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="编辑"><i class="icon-a_operate_edit" data-toggle="tooltip" data-placement="top" data-original-title="编辑"></i></a>' +
      '<a href="javascript:void(0)" class="m-example-remove"  questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="删除"><i class="icon-a_operate_delete" data-toggle="tooltip" data-placement="top" data-original-title="删除"></i></a>' +
      '<a href="javascript:void(0)" class="m-example-up" aria-hidden="true" title="上移" questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="上移"><i class="glyphicon icon-a_operate_move_up" data-toggle="tooltip" data-placement="top" data-original-title="上移"></i></a>' +
      '<a href="javascript:void(0)" class="m-example-down" aria-hidden="true" title="下移" questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="下移"><i class="glyphicon icon-a_operate_move_down" data-toggle="tooltip" data-placement="top" data-original-title="下移"></i></a>' +
      '</div>';
  }else {
    var allHtml = '<div class="m-example questions com-questions" questionId="'+obj.id+'"><dl>'+
      '<dt>'+obj.question+'</dt><div class="com_q_gray">';
    for (var i = 0; i < obj.insert_data.length; i++){
      allHtml += '<dt style="overflow: hidden">' +
        '<div class="col-md-9 member-question" s_id="'+ obj.insert_data[i].s_id +'">'+(i+1)+' . '+obj.insert_data[i].question+'</div>' +
        ((perTimeRestrict == "0") ? '' : '<div class="col-md-3 col-md-offset-1 time-center">时长<input type="text" name="member_second_' + (i + 1) + '" class="member_second">秒</div>' )+
        '<div class="col-md-3 col-md-offset-1 text-center">分数<input type="text" name="member_score_'+(i+1)+'" class="member-score">分</div>' +
        '</dt>';
    }
    allHtml += '</div><span class="m-example-score comb-m-example-score" hidden>分数<input name="per_score" value="' + per_score + '">分</span>' +
      '<span class="m-example-time comb-m-example-time" hidden>时长<input name="per_time" value="' + per_time + '">秒</span>'+
      '<a href="javascript:void(0)" class="m-example-edit" questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="编辑"><i class="icon-a_operate_edit"></i></a>' +
      '<a href="javascript:void(0)" class="m-example-remove"  questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="删除"><i class="icon-a_operate_delete"></i></a>' +
      '<a href="javascript:void(0)" class="m-example-up" aria-hidden="true" title="上移" questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="上移"><i class="glyphicon icon-a_operate_move_up"></i></a>' +
      '<a href="javascript:void(0)" class="m-example-down" aria-hidden="true" title="下移" questionId="' + obj.id + '" data-toggle="tooltip" data-placement="top" data-original-title="下移"><i class="glyphicon icon-a_operate_move_down"></i></a>' +
      '</div>';
  }
  //判断是新增还是编辑 parentDom为"update"，则是编辑
  if(create_type!="update"){
    $(parentDom).parents(".group_simple").find(".manual-cont").append(allHtml);
    totalTestNumFn($(parentDom).parents(".group_simple").attr("sort"),1);
    typeTotalScoreFn();
    totalScoreFn();
    totalTimeFn();
  }else{
    $("div.m-example").each(function(index, element) {
      var id = $(this).attr("questionId");
      if(id==obj.id){
        $(this).before(allHtml);
        $(this).remove();
        hideUpdateQuestion();
      }
    });
  }

  // 解析latex公式
  renderFormula(".m-example.questions .latex", false);

  groupNumFn();
}
$(".m-example-edit").on("click",function(){
  console.log("click");
});

//保存试题后清空表单数据
function clearFormFn(parentDom){
  var parentDom = $(parentDom);
  parentDom.find(".q-ipt-t , .q-ipt-i").val("");
  parentDom.find("div.textareaDom").html("");
}
//联动左右大题信息 type：1左侧分数，2右侧分数，3右侧标题，4左侧答题时长，5右侧时长
function changeLeftInfoFn(obj,type,queName){
  var sortNum = $(obj).attr("sort");
  if(type==1){
    $(".group_main input[name=test_peer_score]").each(function (index, element) {
      if ($(this).attr("sort") == sortNum) {
        $(this).val(Number($(obj).val()).toFixed(2));
        $(this).parents(".group_simple").find("input[name=per_score]").val(Number($(obj).val()).toFixed(2));
        $(this).parents('.group_simple').find('.m-example').each(function (index,element) {
          var num = $(this).find('.member-question').length;
          $(this).find("input.member-score").val(Number($(obj).val() / num ).toFixed(2));
        });
      }
    });
    totalScoreFn();
  }else if(type==2){
    $(".info-board input[name=test_peer_score]").each(function(index, element) {
      if($(this).attr("sort")==sortNum){
        $(this).val($(obj).val());
      }
    });
    totalScoreFn();
  }else if(type==3){
    $(".info-board h3.test_tittle").each(function(index, element) {
      if($(this).attr("sort")==sortNum){
        if($(obj).val()==queName){
          $(this).text(queName);
        }else{
          $(this).text($(obj).val());
        }
      }
    });
  }else if (type == 4) {
    $(".group_main input[name=test_peer_time]").each(function (index, element) {
      if ($(this).attr("sort") == sortNum) {
        $(this).val($(obj).val());
        $(this).parents(".group_simple").find("input[name=per_time]").val($(obj).val());
        $(this).parents('.group_simple').find('.m-example').each(function (index,element) {
          var num = $(this).find('.member-question').length;
          $(this).find("input.member_second").val(Number($(obj).val() / num));
        });
      }
    });
    totalTimeFn();
  } else if (type == 5) {
    $(".info-board input[name=every_q_time]").each(function (index, element) {
      if ($(this).attr("sort") == sortNum) {
        $(this).val($(obj).val());
      }
    });
    totalTimeFn();
  }
}
//计算试题数量
function totalTestNumFn(sortNum,addOrDel ,selNum){
  $(".info-board .test_num").each(function(index, element) {
    if($(this).attr("sort") == sortNum){
      var num = Number($(this).text());
      if(addOrDel==1){ //增加
        $(this).text(num+1);
      }else if(addOrDel==2){ //移除
        $(this).text(num-1);
      }else  if(addOrDel==3){ //选题，抽题，随机模式
        $(this).text(selNum);
      }
    }
  });
}

// 计算组合题中含小题数
function groupNumFn(){
  $('.group_simple').each(function (index,element) {
    var small_test_num = 0;
    var type = $(this).attr("questiontype");
    if (type == "6"){
      $(this).find('.m-example').each(function (index,element) {
        var num = $(this).find('.member-question').length;
        small_test_num += num;
        var parentSort = $(this).parents('.group_simple').attr('sort');
        $('.left_group_simple').each(function (index,element) {
          if ($(this).attr('sort') == parentSort){
            $(this).find('.small_test_num').text(small_test_num);
          }
        })
      })
    }
  });
}
groupNumFn();

$("#selQuestionFrame").on("load", function(event){//判断 iframe是否加载完成
  $("#selQuestionFrame").contents().find("#saveBtn").on('click',function () {
    groupNumFn();
  })
});

// 每个题型总分   随机抽题
function typeTotalScoreFn(){
  $('.group_main .group_simple').each(function (index,element) {
    var all_fraction = 0;
    var rightsort = $(this).attr('sort');
    var type = $(this).attr("questiontype");
    var scoreval = $(this).find('.member-score');
    var perscpre = $(this).find('input[name=per_score]');

    if(type == 6){
      scoreval.each(function (index,element) {
        all_fraction += Number($(this).val());
        $('.left_group_simple input[name=test_peer_score]').each(function (index,element) {
          if ($(this).attr("sort") == rightsort) {
            $(this).parents('.left_group_simple').find('.all_fraction').text(all_fraction.toFixed(2));
          }
        });
      })
    }else {
      perscpre.each(function (index,element) {
        all_fraction += Number($(this).val());
        $('.left_group_simple input[name=test_peer_score]').each(function (index,element) {
          if ($(this).attr("sort") == rightsort) {
            $(this).parents('.left_group_simple').find('.all_fraction').text(all_fraction.toFixed(2));
          }
        });
      })
    }

    if (paper_type != 1){
      $('.left_group_simple input[name=test_peer_score]').each(function (index,element) {
        if ($(this).attr("sort") == rightsort) {
          var num = $(this).parents(".left_group_simple").find('.test_num').text();
          all_fraction = num * $(this).val();
          $(this).parents('.left_group_simple').find('.all_fraction').text(all_fraction.toFixed(2));
        }
      });
    }
  });

}
typeTotalScoreFn();

//  选题组卷-计算组合题总分
$("body").on("keyup",".left_group_simple input[name=test_peer_score]",function () {
  var all_fraction = 0;
  var score_type = $(this).val();
  var testNum = $(this).parents().siblings().children(".test_num").text();
  var parentSort = $(this).parents('.group_simple').attr('sort');
  if ($(this).attr("sort") == parentSort) {
    all_fraction = score_type * testNum;
    $(this).parents().siblings().children(".all_fraction").text(all_fraction.toFixed(2));
  }
});

// 选题组卷-分数显示函数封装,除组合外
function showScore(thatJq,thisSort,type){
  var inputs = thatJq.parents('.group_simple').find('input[name=per_score]');
  var inputsCombine = thatJq.parents('.group_simple').find('input.member-score');
  var tmpScore = 0;
  if(type!='组合题'){
    inputs.each(function (index) {
      tmpScore+=($(this).val()==''?0:$(this).val()-0)
    });
  }else{
    inputsCombine.each(function (index) {
      tmpScore+=($(this).val()==''?0:$(this).val()-0)
    })
  }

  $('.left_group_simple').each(function (index) {
    if($(this).attr('sort') == thisSort){
      $(this).find('.all_fraction').text(tmpScore.toFixed(2))
    }
  });
}
$("body").on("keyup",".m-example input",function () {
  var score_type = $(this).parents('.group_simple').find('.questionTypeText').text();
  var thisSort = $(this).parents('.group_simple').attr('sort');
  var that = $(this);
  showScore(that,thisSort,score_type);
});

// 计算试卷总分
function totalScoreFn(){
  var totalScore = 0;
  var totalTestNum = 0;
  if($("input[name=per_score]").length>0){
    $(".questions-board .group_simple").each(function (index,element) {
      var type = $(this).attr("questionType");
      if(type=="6"){
        $(this).find(".member-score").each(function(index, element) {
          totalScore+=Number($(this).val());
        });
      }else {
        $(this).find("input[name=per_score]").each(function(index,element) {
          totalScore+=Number($(this).val());
        });
      }
    });
    $(".info-board .group_simple").each(function(index, element) {
      totalTestNum += Number($(this).find(".test_num").text());
    });
  }else {
    $(".info-board .group_simple").each(function(index, element) {
      totalScore += Number($(this).find(".test_num").text()) * Number($(this).find("input[name=test_peer_score]").val());
      totalTestNum += Number($(this).find(".test_num").text());
    });
  }
  $(".info-board .total .total_score").text(filtrationScore(totalScore.toFixed(2)));
  $(".info-board .total .test_total").text(totalTestNum);
}

// 总分保留两位有效小数（过滤小数点后*0或者00值）
function filtrationScore(score){
  if(score) {
    var numbers = String(score).split('.');
    if(numbers[1]==0) {
      return numbers[0];
    } else {
      if(numbers[1].split('')[1] == 0) {
        return numbers[0] + '.' + numbers[1].split('')[0];
      } else {
        return score;
      }
    }
  }
}
// 计算当前总时长
function totalTimeFn() {
  var totalTime = 0;
  var totalTestNum = 0;
  if ($("input[name=per_time]").length > 0 || paper_type == '1') {
    $(".questions-board .group_simple").each(function (index, element) {
      var type = $(this).attr("questionType");
      if (type == "6") {
        $(this).find(".member_second").each(function (index, element) {
          totalTime += Number($(this).val());
        });
      } else {
        $(this).find("input[name=per_time]").each(function (index, element) {
          totalTime += Number($(this).val());
        });
      }
    });
    $(".info-board .group_simple").each(function (index, element) {
      totalTestNum += Number($(this).find(".test_num").text());
    });
  } else {
    $(".info-board .group_simple").each(function (index, element) {
      totalTime += Number($(this).find(".test_num").text()) * Number($(this).find("input[name=every_q_time]").val());
      totalTestNum += Number($(this).find(".test_num").text());
    });
  }
  $(".info-board .total .total_time").text(Math.ceil(totalTime));
  $(".info-board .total .test_total").text(totalTestNum);
}

// 获取同一类型题目下所有所选试题
function getSelQuestion(type) {
  typeObject[type] = [];
  typeObjectLabel[type] = [];
  $("div[questiontype=" + type + "] input[name=test_classify_id]").each(function (index, el) {
    var toArry = el.value.split(",");
    var concatArry = typeObject[type].concat(toArry);
    var repeatArry = Array.from(new Set(concatArry));  // 数组去重
    var cleanArry = repeatArry.filter(function (n) {
      return n;
    }); // 将数组去除空
    typeObject[type] = cleanArry;
  });

  $("div[questiontype=" + type + "] input[name=test_label_id]").each(function (index, el) {
    var toArry = el.value.split(",");
    var concatArry = typeObjectLabel[type].concat(toArry);
    var repeatArry = Array.from(new Set(concatArry));  // 数组去重
    var cleanArry = repeatArry.filter(function (n) {
      return n;
    }); // 将数组去除空
    typeObjectLabel[type] = cleanArry;
  });

  // 将用户选取的试题存入本地存储
  localStorage.setItem("selArry"+user_id, typeObject[type].toString());
  localStorage.setItem("selArryLabel"+user_id, typeObjectLabel[type].toString());
}

//显示编辑试图对话框
function showUpdateQuestion(){
  updateQuestionModal.location.href = "/admin/questions_update_manual";
  $('#updateModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭编辑试图对话框
function hideUpdateQuestion(){
  $('#updateModal').modal('hide');
  // updateQuestionModal.location.href = "/blank_about";
  updateQuestionId=="";
}


//显示选择试题分类对话框选择多个
function showQuestionsType(obj){
  $('#difficultModal').modal({
    backdrop: "static",
    keyboard: false
  });
}
//关闭选择试题分类对话框
function hideQuestionsSelType(obj){
  $('#questionsTypeModal').modal('hide');
}
function hideDifficultModal(obj){
  $('#difficultModal').modal('hide');
  selTr = "";
}

//显示选择分类对话框
function showPaperSelType(type){
  selTypeModal.location.href = "/admin/paper_style";
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
function selType(obj, name){
  $("#asyncForm_paper input[name=paperStyle]").val(obj);
  $("#changeClassBtn span").text(name);
}

//显示选择分类对话框
function showSelType(obj){
  $("input[name=classification]").val('');
  selQuestionsTypeModal.location.href = "/admin/paper_add_new/tests_multi_class";
  $("#questionsTypeModal").modal({
    backdrop: "static",
    keyboard: false
  });
}

//关闭选择试题分类对话框
function hideQuestionsSelType(obj) {
  $('#questionsTypeModal').modal('hide');
}
//接受选择试题分类数据多个
function selQuestionsType(id, name) {
  selTr.find(".checked_classify_ids").val(id);
  selTr.find(".checked_classify_ids_name").val(name);
  var labelIds = selTr.find(".checked_label_ids").val();
  $("#selTypeLink").text('已选择');
  getTableData(id,labelIds);
}

function getTableData(classIds,labelIds) {
  // 多id以，分割，但id没有，
  var sub_class_char = classIds.substring(classIds.length - 1, classIds.length);
  if (sub_class_char == ",") {
    classIds = classIds.slice(0,classIds.length-1);
  }
  var data = {
    type: selTypes,
    classification: classIds,
    label: labelIds,
    account: user.account,
    companyId: user.companyId
  };
  $.ajax({
    type: "Post",
    cache: false,
    headers: {"cache-control": "no-cache"},
    dataType: "json",
    url: "/api/question/show_test_count",
    data: data,
    async: false,
    success: function (msg) {
      var jsonData = msg.bizContent;//difficultCount困难    middleCount普通    simpleCount简单
      $('#difficultModal .difficult1_num').text(jsonData.simpleCount);
      $('#difficultModal .difficult2_num').text(jsonData.middleCount);
      $('#difficultModal .difficult3_num').text(jsonData.difficultCount);
    }
  });
}

//显示选择标签对话框
function showSelLabel(obj){
  $("input[name=label]").val('');
  selLabelModal.location.href = "/baseinfo/admin/tree/tests_multi_label";
  $("#labelModal").modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭选择标签对话框
function hideSelLabel(obj){
  $('#labelModal').modal('hide');
}
// 接受选择标签数据
function selLabel(data) {
  var ids = '';
  var names = '';
  for (var i = 0; i < data.length; i++) {
    ids += data[i].id + ',';
    names += data[i].name + ';';
  }
  ids = ids.slice(0,ids.length - 1);
  selTr.find(".checked_label_ids").val(ids);
  selTr.find(".checked_label_ids_name").val(names);
  var classIds = selTr.find(".checked_classify_ids").val();
  $("#selLabelLink").text('已选择');
  getTableData(classIds,ids);
}

function difficultModalReset() {
  $("#selLabelLink").text('请选择');
  $("#selTypeLink").text('请选择');
  $("input[name=label]").val('');
  $("input[name=classification]").val('');
  $('input[name=difficult1]').val('0');
  $('input[name=difficult2]').val('0');
  $('input[name=difficult3]').val('0');
  $('#difficultModal .difficult1_num').text('0');
  $('#difficultModal .difficult2_num').text('0');
  $('#difficultModal .difficult3_num').text('0');
}


//显示选择难度对话框
function showDifficult(obj,selTypes){
  //obj -- 直接选择试题难度时，传入this
  //selTypes -- 用以标记是否在试题分类后（选择试题分类后，清空已抽取的数量；直接选择试题难度，不清空）
  selTr = obj ? $(obj).parents('.group_simple') : selTr;
  var type = $(selTr).find("input[name=test_classify_id]").val();
  if (type == '' || type == undefined) {
    showQuestionsType(obj);
    return;
  }
  var questionsType = $(selTr).attr("questiontype");
  var urlStr = "/examadmin/admin/test/showcount?type="+questionsType+"&classification="+type;
  if(selTypes){
    urlStr += "&clear=true";
  }
  difficultFrame.location.href = urlStr;
  $('#difficultModal').modal({
    backdrop:"static",
    keyboard:false
  });
}
//关闭难度对话框
function hideDifficultModal(obj){
  $('#difficultModal').modal('hide');
  selTr = "";
}
function hideDifficult(obj){
  selTr.find(".selDifficultLink_text").text("");
  selTr.find("input[name=hard]").val("");
  $('#difficultModal').modal('hide');
  selTr = "";
}
//保存难度fn
function saveDifficultFn(difficult,totelNum){
  var tr = selTr;
  //选择抽题数量之后,删除左侧边栏的警告信息
  var sort_num = tr.attr("sort");
  var left_test_div = $(".left_group_simple");
  left_test_div.find(".hard_over_count").remove();

  $(tr).find(".empty_q_tip").hide(); //隐藏空空如也
  $(tr).find("input[name=hard]").val(difficult); //隐含难度字段
  $(tr).find("input[name=totelNum]").val(totelNum); //显示总题数

  var list = difficult.split(",");
  // var text = "简单：" +list[0] + "；普通：" +list[1] + "；困难：" +list[2];
  // $(tr).find(".selDifficultLink_text").text(text);
  $(tr).find(".select_paper_info").hide();
  $(tr).find(".diff1").text(list[0]);
  $(tr).find(".diff2").text(list[1]);
  $(tr).find(".diff3").text(list[2]);
  $(tr).find(".selDifficultLink_text").show();

  //插入分类，标签数据
  var label_dep_name = "<span class='extract-info class-name'>分类："+$(tr).find(".checked_classify_ids_name").val()+"</span>";
  if(labelOpen == 'true') {
    label_dep_name = label_dep_name + "<span class='extract-info label-name'>标签："+$(tr).find(".checked_label_ids_name").val()+"</span>";
  }
  $(tr).find(".diff_div").find(".class-name").remove();
  $(tr).find(".diff_div").find(".label-name").remove();
  $(tr).find(".diff_div").append(label_dep_name);
  //计算总分
  totalTestNumFn($(tr).attr("sort"),3,totelNum);
  typeTotalScoreFn();
  totalScoreFn();
  totalTimeFn();
}
//保存难度后检查是否存在交集（避免存在抽题规则相同的）
function checkQuestionRepet(simple,middle,hard) {

  if($(selTr).siblings().length==0) return false;
  var similar = false;
  var currentType = $(selTr).attr('questiontype')?$(selTr).attr('questiontype'):'';
  var currentClass = $(selTr).find(".checked_classify_ids").val()?$(selTr).find(".checked_classify_ids").val().split(','):[];
  currentClass = trimSpace(currentClass);
  var currentHard0 = simple>0?1:0;
  var currentHard1 = middle>0?1:0;
  var currentHard2 = hard>0?1:0;
  //console.log('==curr==',currentClass,currentHard0,currentHard1,currentHard2)
  if(labelOpen == 'false' && currentClass.length>0) { //当试题标签未开启时
    $(selTr).siblings().each(function(index,e){
      var eType = $(e).attr('questiontype')?$(e).attr('questiontype'):'';
      var eHard = $(e).find("input[name=hard]").val()?$(e).find("input[name=hard]").val().split(','):[];
      var eClass = $(e).find(".checked_classify_ids").val()?$(e).find(".checked_classify_ids").val().split(','):[];
      eClass = trimSpace(eClass);
      var eHard0 = eHard[0]>0?1:0;
      var eHard1 = eHard[1]>0?1:0;
      var eHard2 = eHard[2]>0?1:0;
      //console.log('==e==',eType,eClass,eHard0,eHard1,eHard2)
      if(eType == currentType&&eClass.length>0) {
        var classSimilar = false;
        var intersectionArray = eClass.filter(function(v){ return currentClass.indexOf(v) > -1 });
        if(intersectionArray.length>0) {
          classSimilar = true;
        }
        //console.log('???',classSimilar,currentHard0 == eHard0 && currentHard0>0 && eHard0>0,currentHard1 == eHard1 && currentHard1>0 && eHard1>0,currentHard2 == eHard2 && currentHard2>0 && eHard2>0)
        //在分类交集存在的情况下检测抽取的试题难度数量的是否存在相同
        if(classSimilar && ((currentHard0 == eHard0 && currentHard0>0 && eHard0>0) || (currentHard1 == eHard1 && currentHard1>0 && eHard1>0) || (currentHard2 == eHard2 && currentHard2>0 && eHard2>0))) {
          similar = true;
        }
      }

    })
  }
  if(similar) {
    alert('您设置的规则可能抽出相同题目，请检查当前弹框中的试题分类和难度！');
    return true;
  }
  return false;

}
//编辑难度时填充数字fn
function updateFillDifficultFn(){
  var tr = selTr;
  var list = $(tr).find("input[name=hard]").val();
  if(list==""){
    list = [0,0,0]
    return list;
  }
  list = list.split(",");
  return list;
}

//选题组卷，显示选择试题对话框
function showSelQuestions(obj){
  sel_click = obj;
  selTypes = $(obj).parents(".group_simple").attr("questiontype");
  //计算该类型题目已被选数量，传给后端计算剩下未被选的数量
  testChecked=0;
  $(".group_simple[questiontype="+selTypes+"]").each(function(){
    testChecked+=$(this).find(".m-example.questions").length;
  });

  commit_ids = '';

  //不显示已选择的试题
  var questionType = $(obj).parents(".group_simple").attr("questiontype");
  var commit_divs = $("div[questiontype=" + questionType + "]").find(".m-example");

  for(var i = 0;i<commit_divs.length;i++) {
    commit_ids = commit_ids+commit_divs[i].getAttribute("questionid")+',';
  }

  selQuestionFrame.location.href = "/admin/paper_add_new/select_type";

  $('#questionsModal').modal({
    backdrop:"static",
    keyboard:false
  });
  selTr = $(obj).parents(".group_simple");
}
//选题组卷，关闭选择试题对话框
function hideSelQuestions(obj){
  $('#questionsModal').modal('hide');
  //selTr = "";
  $('#questionsModal').on('hidden.bs.modal', function (e) {
    $( '#questionsModal' ).off().on( 'hidden', 'hidden.bs.modal');
    if (obj === 'fromTableAddBtn' && obj != undefined) {
      changeDialog()
    }
  })
}
function changeDialog(){
  publicQuestion.location.href = "/admin/question_add_new/batch_import";
  $('#addQuestionsModal').modal({
    backdrop: "static",
    keyboard: false
  });
}
function showSelQuesDialog(obj) {
  $('#addQuestionsModal').modal('hide');
  if (obj == 'showQues'){
    $('#addQuestionsModal').on('hidden.bs.modal', function (e) {
      $( '#addQuestionsModal' ).off().on( 'hidden', 'hidden.bs.modal');
      showSelQuestions(sel_click);
    })
  }
}

//选题组卷，选择试题fn
function selQuestion(ids,num,type){
  var tr = selTr; //当前大题区域div
  $('.paper-spiner-loading').show();
  $('#spinnerLoading').addClass('specialHidden');
  $.ajax({
    type: "Post",
    cache: false,
    headers: {"cache-control": "no-cache"},
    dataType: "json",
    url: "/api/question/load_datas",
    data: "ids=" + ids +"&account=" +user.account +"&companyId=" + user.companyId,
    async: false,
    success: function (msg) {
      var jsonData = msg.bizContent;
      if(jsonData && jsonData.length>0) {
        $(tr).find('.empty_q_tip').hide(); //隐藏空空如也
        $.each(jsonData,function(index,value){
          createQuestionsViewFn(value, $(tr).find(".group_title"), 'select');
        })
      }
      $('.paper-spiner-loading').hide();
      $('#spinnerLoading').removeClass('specialHidden');
    }
  });
}

/*新设计页面控制*/
$('body').on('mouseenter','.default_create_q_model',function(e){
  e.preventDefault();
  e.stopPropagation();
  $(this).css('display','none');
  $('.type_create_q_model').css('display','inline-block');
});

$('body').on('mouseleave','.type_create_q_model',function(e){
  e.preventDefault();
  e.stopPropagation();
  $(this).css('display','none');
  $('.default_create_q_model').css('display','inline-block');
});
$('body').on('mouseenter','.test_icon_a.new_icon a',function(){ //新增的左侧删除等按钮浮动提示
  $(this).tooltip('show');
});
$('body').on('mouseenter','.questions a',function(){ //新增的删除等按钮浮动提示
  $(this).tooltip('show');
});

function fixMChoicesQuestionStyle(){ //调整随机组卷多选'漏选给分'样式，因为随机组卷没有试题乱序
  $(".group_main .group_simple[questiontype=2]").find("#selection_score").css('right','130px');
}

// 至顶部、至底部
$("body").on('click', '#btnGoTop', function() {
  // $(".viewFrameWork-body").scrollTop(0);
  $(".viewFrameWork-body").animate({scrollTop: 0}, 200, 'linear');
});

$("body").on('click', '#btnGoBottom', function() {
  var t = $(".viewFrameWork-body").prop("scrollHeight");

  $(".viewFrameWork-body").animate({scrollTop: t}, 200, 'linear');
});
