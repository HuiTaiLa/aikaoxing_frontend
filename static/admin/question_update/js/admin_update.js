var comb_data={};
var initial_type;
var questionId = window.location.href.split("#/")[1];
(function ($) {
  $(document).ready(function() {
    if ($.isFunction($.bootstrapIE6)) $.bootstrapIE6($(document));
  });
})(jQuery);
// var questionId = window.location.href.split("#/")[1];
//关键字提示信息的出现与隐藏
$('.keyWordBadge').hover(function(){
  $(this).css({"background":"#A9B3BF"});
  $('#keyWordContent').css({"display":"block"});
},function(){
  $(this).css({"background":"#ddd"});
  $('#keyWordContent').css({"display":"none"});
});

//填空题及乱序提示
$(".answer-help").hover(function(){
  $(".answer-prompt").show();
},function(){
  $(".answer-prompt").hide();
})

$(".disorder-help").hover(function(){
  $(".disorder-prompt").show();
},function(){
  $(".disorder-prompt").hide();
})
// 试题类型以及难度选择
$(".body-content .cont-r .tab-content .batch-type .simulationSelect").click(function(e){
  e.stopPropagation();
  $(this).children(".simulationOption").show();
  $(this).siblings(".simulationSelect").children(".simulationOption").hide();
});
$('body').click(function(){
  $('.simulationOption').hide();
});
$(".body-content .cont-r .tab-content .batch-type .simulationOption div").click(function(e){
  e.stopPropagation();
  var sel = $(this).text();
  $(this).parent().siblings("span").text(sel);
  $(this).parent().hide();
  $(this).parents(".simulationSelect").next().children().each(function(){
    if($(this).text() == sel){
      $(this).attr('selected','true');
      $(this).change();
    }else {
      $(this).removeAttr('selected');
    }
  })
});

$("#paperList").click(function(){
  window.close();
});

$(document).ready( function() {
  //  读取试题数据
  loadData();

  // 初始化编辑器
  $.each($('.questions_add').toArray().reverse(),function() {
    initialEditor($(this));
  });

  // 保持只有一个编辑器
  $('body').on('click','.wangEditor-container',function () {
    $('.wangEditor-container').removeClass('active');
    $(this).addClass('active');
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


  //切换试题分类
  $(".batch-type select[name=type]").change(function(e) {
    $('.wangEditor-container').removeClass('active');
    $("#asyncForm input[name=type]").val($(this).val());
    changeType($(this).val(),initial_type);
  });

  //<!---------问答题关键字start------------>
  // 添加关键词
  $("#normalWord, #keyWord").click(function() {
    var characterCheck = /[`~!@#$%^&*()_\-+=<>?:"{},.\/;'\\[\]·~！@￥%……&*（）——\-+={}《》？：“”【】、；‘’，。、]/im;//匹配特殊字符  //特殊字符会影响关键词判分准确性，因此先禁止
    var inputVal = $(this).parents(".keyWordPanel").find("input[name=key_word]").val();
    //因为前端后台约定以"#"来作为关键词的拼接符和分割符，因此暂且限制关键词中不能输入"#"
    if(characterCheck.test(inputVal)){
      alert("关键词不允许使用特殊字符");
      return false;
    }
    var keyWord = $.trim(inputVal);
    // escape keyWord
    keyWord = escapeKeyHTML(keyWord);
    var keyType = $(this).hasClass("btn-normal-word") ? 'normal-word' : 'key-word';
    var keyLength = $("#keyBlock").find(".whole-word").length;
    var index = (keyLength==0) ? 0 : (parseInt($("#keyBlock").find(".whole-word").last().attr("index"))+1);
    var key_html = "";
    if(keyWord==""){
      alert("请输入关键词！");
      return false;
    }else {
      if(keyWord.search(/[\||｜]/)==-1){//单个关键词
        key_html = '<span class="word single-word">' + keyWord + '</span><em class="remove-word icons8-delete"></em>';
      }else {//组合型关键词
        var keyWords = keyWord.split(/[\||｜]/);
        for (var i = 0; i < keyWords.length; i++) {
          key_html += '<span class="word multi-word">' + keyWords[i] + '</span>' +
            ((i==keyWords.length-1) ? '<em class="remove-word icons8-delete"></em>' : '<em class="relate-word">或</em>');
        }
      }
      $("#keyBlock").append('<div class="whole-word ' + keyType + '" id="word' + index + '" index="' + index + '">' + key_html + '</div>');
      $(this).parents(".keyWordPanel").find("input[name=key_word]").val("");
      // 初始化每个关键词的提示框
      initialPopover($("#word"+index),index);
      if(keyLength==0){
        $("#keyBlock").slideToggle(200);
      }
    }

  });

  // 切换关键词类型
  $("body").on("click", ".switch-word" , function(e) {
    e.stopPropagation();
    e.preventDefault();
    var index = $(this).attr("index");
    var $word = $("#word"+index);
    if($(this).hasClass("switch-key-word")){//normal->key
      $($word).removeClass("normal-word").addClass("key-word");
    }else if ($(this).hasClass("switch-normal-word")) {//key-normal
      $($word).removeClass("key-word").addClass("normal-word");
    }
  });

  // 删除关键词
  $("body").on("click", ".remove-word", function(e) {
    e.stopPropagation();
    e.preventDefault();
    var $o = $(this);
    var $p = $($o).parents(".key_block");
    $($o).parents(".whole-word").remove();
    var keyLength = $("#keyBlock").find(".whole-word").length;
    if(keyLength==0){
      $("#keyBlock").slideToggle(200);
    }
  });

  //<!---------问答题关键字end------------>

  //<!--------- 组合题start------------>
  //组合题插入小题
  $("body").on("click", "#addInsert", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if($(".insert-content").is(":visible")){
      alert("请先保存小题！");
      return false;
    }
    if($(".questionPanel .single").length==19){
      $(".insert-question").addClass("hidden");
    }
    var insert_type = $(this).parents(".insert-question").find("input[name=insert_type]:checked").val();
    comb_data.insert_data[0]={type:insert_type};
    var sort_num=$(".questionPanel .single").length;
    $("#insertOk, #insertRemove").attr("sort",sort_num);
    resetPage();
    initialPanel(insert_type);
    changeType(insert_type);
    $(".insert-content").show();
  });


  // 组合题添加时取消添加或取消编辑小题
  $("body").on("click", "#insertRemove", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".insert-content").hide();
    resetPage();
    if($(".questionPanel .single").length==19){
      $(".insert-question").removeClass("hidden");
    }
  });


  // 组合题保存小题
  $("body").on("click", "#insertOk", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var sort=$(this).attr("sort");
    if(checkInsert()){
      saveInsert(sort);
    }
  });

  // 组合题列表中编辑小题
  $("body").on("click",".questionList .input-div", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var insert_obj= $(this).parents(".input-group");
    var insert_id = $(this).parents(".input-group").attr("insert_id");
    $("#keyBlock").html("");
    $("#keyBlock").hide();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/baseinfo/admin/edit_mix_question/?dataType=getSingle",
      data: "sId="+insert_id,
      success:function(msg){
        if(msg.success == true){
          updateInsert(insert_obj,JSON.parse(msg.bizContent));
          var disorder=JSON.parse(msg.bizContent).disorder;
          if(disorder==1){
            if($(".answerDisorder").hasClass("switch-off")){
              $(".answerDisorder").click();
            }
          }else{
            if($(".answerDisorder").hasClass("switch-on")){
              $(".answerDisorder").click();
            }
          }

          var normal_words=JSON.parse(msg.bizContent).normal_words;
          var key_words=JSON.parse(msg.bizContent).key_words;

          var normal_html="";
          var key_html="";
          if(normal_words){
            for (var i = 0; i < normal_words.length; i++) {
              var keyLength = $("#keyBlock").find(".whole-word").length;
              var index = (keyLength==0) ? 0 : (parseInt($("#keyBlock").find(".whole-word").last().attr("index"))+1);
              if(typeof(normal_words[i])=="string"){//single-word
                normal_html += '<span class="word single-word">' + escapeKeyHTML(normal_words[i]) + '</span><em class="remove-word icons8-delete"></em>';
              }else {//multi-word
                for (var j = 0; j < normal_words[i].length; j++) {
                  normal_html += '<span class="word multi-word">' + escapeKeyHTML(normal_words[i][j]) + '</span>' +
                    ((j==normal_words[i].length-1) ? '<em class="remove-word icons8-delete"></em>' : '<em class="relate-word">或</em>');
                }
              }
              $("#keyBlock").append('<div class="whole-word normal-word" id="word' + index + '" index="' + index + '">' + normal_html + '</div>');
              // 初始化每个关键词的提示框
              initialPopover($("#word"+index),index);
              $("#keyBlock").show();
              normal_html = "";
            }
          };
          // key_words
          if(key_words){
            for (var i = 0; i < key_words.length; i++) {
              var keyLength = $("#keyBlock").find(".whole-word").length;
              var index = (keyLength==0) ? 0 : (parseInt($("#keyBlock").find(".whole-word").last().attr("index"))+1);
              if(typeof(key_words[i])=="string"){//single-word
                key_html += '<span class="word single-word">' + escapeKeyHTML(key_words[i]) + '</span><em class="remove-word icons8-delete"></em>';
              }else {//multi-word
                for (var k = 0; k < key_words[i].length; k++) {
                  key_html += '<span class="word multi-word">' + escapeKeyHTML(key_words[i][k]) + '</span>' +
                    ((k==key_words[i].length-1) ? '<em class="remove-word icons8-delete"></em>' : '<em class="relate-word">或</em>');

                }
              }
              $("#keyBlock").append('<div class="whole-word key-word" id="word' + index + '" index="' + index + '">' + key_html + '</div>');
              // 初始化每个关键词的提示框
              initialPopover($("#word"+index),index);
              $("#keyBlock").show();
              key_html = "";
            }
          };

        }
      }
    });
  });

  // 组合题列表中删除小题
  $("body").on("click",".questionList .icons8-delete",function(e) {
    e.preventDefault();
    e.stopPropagation();
    var insert_obj= $(this).parents(".single");
    deleteInsert(insert_obj);
    $(".insert-question").removeClass("hidden");
  });

  // 组合题列表中上移小题
  $("body").on("click",".questionList .icon-a_arrow_up",function(e) {
    e.preventDefault();
    e.stopPropagation();
    var insert_obj= $(this).parents(".single");
    chevronUpInsert(insert_obj);
  });

  // 组合题列表中下移小题
  $("body").on("click",".questionList .icon-a_arrow_down",function(e) {
    e.preventDefault();
    e.stopPropagation();
    var insert_obj= $(this).parents(".single");
    chevronDownInsert(insert_obj);
  });
  //<!--------- 组合题end------------>


  var obj = $(".keyRadio.keyPanel");
  var keyLength = $(obj).find(".keyList").length;
  if (keyLength == 20) {
    $(obj).find(".addKeyBtn").addClass("hidden");
  }

  //增加答案选项
  $("body").on("click", ".keyRadio .addKey", function() {
    var obj = $(this).parents(".keyPanel");
    var keyLength = $(obj).find(".keyList").length;
    var insert_type = $(obj).find(".keyLeft input").attr("type");
    var html =  '<div class="keyList keyListAdd">'+
      '    <div class="keyLeft">'+
      '        <input type="' + insert_type + '" class="radioOrCheck" name="keyChk" />'+
      '    </div>'+
      '    <div class="keyRight keyRight'+(keyLength+1)+'">'+
      '        <div id="key'+(keyLength+1)+'Editor" class="questions_add"></div>'+
      '        <input name="answer'+(keyLength+1)+'" type="hidden" />'+
      '    </div>'+
      '    <a href="javascript:void(0);" class="removeKey icons8-delete"></a>'+
      '</div>';
    $(obj).find(".addKeyBtn").before(html);
    initialEditor("key"+(keyLength+1)+"Editor");
    $('.wangEditor-container').removeClass('active');
    $(".keyRight"+(keyLength+1)+" .wangEditor-container").addClass('active');
    if (keyLength==19) {
      $(obj).find(".addKeyBtn").addClass("hidden");
      return false;
    }
  });



  // 删除答案选项
  $("body").on("click",".keyRadio .removeKey",function() {

    $(".keyRadio .addKeyBtn").removeClass("hidden");
    $(this).parents(".keyList").remove();
    $(".keyRadio .keyList").each(function(index, element) {
      var obj = $(this).find(".keyRight");
      $(obj).attr("class","keyRight keyRight"+(index+1));
      $(obj).find(".questions_add").attr("id","key"+(index+1)+"Editor");
      $(obj).find("input").attr("name","answer"+(index+1));
    });
  });

  //填空题添加多个
  $("body").on("click",".keyFill .addKeyFill",function(e) {
    var keyLength = $("input[name=keyFill]").length;
    if (keyLength==19) {
      $(".keyFill .addKeyFillBtn").addClass("hidden");
    }
    var html='<div class="keyFillContent keyFillContentAdd">'+
      '	  <div class="input-group">'+
      '		  <span class="input-group-addon">'+(keyLength+1)+'</span>'+
      '		  <input name="keyFill"  class="form-control">'+
      '	  </div>'+
      '	  <a href="javascript:void(0);" class="removeKeyFill icons8-delete"></a>'+
      '</div>';
    $("div.addKeyFillBtn").before(html);
    $("input.form-control").attr("data-role","tagsinput");
    $("input.form-control").tagsinput();
  });

  //填空题删除多个
  $("body").on("click", ".removeKeyFill", function(e) {
    $(".keyFill .addKeyFillBtn").removeClass("hidden");
    $(this).parents("div.keyFillContent").remove();
    $(".keyFill .input-group-addon").each(function(index,element) {
      $(this).text(index+1);
    });
  });

  //保存
  $("#saveAllBtn").click(function(e) {
    var type=$("#subForm select[name=type]").val();
    if(type==6){
      var classification = $("#subForm input[name=classification]").val();
      if(classification=="0"){
        alert("请选择试题分类！");
        return false;
      }
      saveComb();
    }else {
      if(checkForm()){
        if(serializeForm()){
          asyncSub();
        }
      }
    }
  });

  $('#createExam').click(function () {
    window.location.href =  '/admin/paper_add_new';
  });

});

// 初始化编辑器
function initialEditor(o) {
  var editor = new wangEditor(o);
  editor.config.printLog = false;
  editor.config.uploadHeaders = {
    'Authentication' : JSON.parse(window.localStorage.getItem("USER_TOKEN"))
  };
  editor.config.uploadImgUrl = '/api/question/upload_img/?account='+user.account+'&companyId='+user.companyId;
  editor.config.uploadImgFileName = 'upfile';
  editor.config.uploadVideoUrl = '/baseinfo/admin/upload/?userRole=admin&action=uploadvideo';
  editor.config.uploadVideoFileName = 'upfile';
  editor.config.uploadFileUrl = '/baseinfo/admin/upload/?userRole=admin&action=uploadfile';
  editor.config.uploadFileFileName = 'upfile';
  editor.config.menus = [
    'bold',
    'underline',
    'italic',
    'strikethrough',
    '|',
    'fontfamily',
    'fontsize',
    'head',
    'unorderlist',
    'orderlist',
    'alignleft',
    'aligncenter',
    'alignright',
    '|',
    'table',
    'img',
    'fileUpload',
    'mediaUpload',
    '|',
    'fullscreen'
  ];
  editor.create();

  var $input = $(editor.$editorContainer).next();
  //在生成编辑器时再设置内容，避免自动创建内容最后默认添加<p><br/></p>问题
  var realTxt = checkHtml($input.val())?$input.val():'<p>'+$input.val()+'</p>';
  editor.$txt.html(videoConvert(realTxt));
  editor.$txt.blur();

  editor.$txt.blur(function () {
    var $temp = $('<div></div>');
    $temp.html($(this).html());
    $.each($temp.find('.video-temp-img'), function() {
      var src = $(this).attr('temp_src');
      var alt = $(this).attr('alt');
      $(this).after('<video controls alt="'+alt+'"><source src="'+src+'"></video>');
      $(this).remove();
    });
    $.each($temp.find('.audio-temp-img'), function() {
      var src = $(this).attr('temp_src');
      var alt = $(this).attr('alt');
      $(this).after('<audio controls alt="'+alt+'"><source src="'+src+'"></audio>');
      $(this).remove();
    });
    $input.val($temp.html());
    console.log("hhhh");
    if($input.attr("name") == "answer1"){
      console.log($temp.text())
      $input.next().val($temp.text());
    }
    if($input.attr("name") == "question"){
      console.log($temp.text())
      $input.next().val($temp.text());
    }
    if($input.attr("name") == "analysis"){
      console.log($temp.text())
      $input.next().val($temp.text());
    }
  });
}
// 检测字符串中有没有包含html标签
function checkHtml(htmlStr) {
  //var reg = /<[^>]+>/g;
  var reg  = /<\/p>/g;
  return reg.test(htmlStr);
}
// 初始化面板
function initialPanel(type) {
  var html = "";
  if(type==1||type==2){
    var input_type = (type==1) ? "radio" : "checkbox";
    for (var i = 0; i < 4; i++) {
      html = '<div class="keyList">'+
        '    <div class="keyLeft">'+
        '        <input type="' + input_type + '" class="radioOrCheck" name="keyChk" />'+
        '    </div>'+
        '    <div class="keyRight keyRight'+(i+1)+'">'+
        '        <div id="key'+(i+1)+'Editor" class="questions_add"></div>'+
        '        <input name="answer'+(i+1)+'" type="hidden" />'+
        '    </div>'+ ((i<2) ? '' :'<a href="javascript:void(0);" class="removeKey icons8-delete"></a>')+
        '</div>';
      $(".addKeyBtn").before(html);
      initialEditor("key"+(i+1)+"Editor");
    }
  }else if (type==4) {
    html = '<div class="keyFillContent">'+
      '	  <div class="input-group">'+
      '		  <span class="input-group-addon">1</span>'+
      '		  <input type="text" name="keyFill" class="form-control">'+
      '	  </div>'+
      '</div>';
    $(".addKeyFillBtn").before(html);
    $("input.form-control").attr("data-role","tagsinput");
    $("input.form-control").tagsinput();
  }
}


// 初始化每个关键词的提示框
function initialPopover(o, index) {
  $('#word'+index).popover({
    'container' : '#word'+index,
    'placement' : 'top',
    'trigger' : 'hover',
    'content' : function() {
      var type = $(o).hasClass("key-word") ? "key-word" : "normal-word";
      var normal_btn = '<button class="btn btn-gray switch-word switch-normal-word" style="color:#1A8CFE;" index="' + index +'">切换为普通关键词</button>';
      var key_btn = '<button class="btn btn-l-orange switch-word switch-key-word" style="color:#1A8CFE;" index="' + index +'">切换为核心关键词</button>';
      return (type == 'key-word' ? normal_btn : key_btn);
    },
    'html' : true,
    'template' : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
  });
}

// escape keyWord
function escapeKeyHTML( text ) {
  return text.replace( /&/g, "&amp;" )
    .replace( /</g, "&lt;" )
    .replace( />/g, "&gt;" )
    .replace( /"/g, "&quot;" )
    .replace( /'/g, "&#39;" )
}



//异步读取试题数据
function loadData(){
  $.ajax({
    type: "GET",
    cache : false,
    async: false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/api/question/load_data",
    data: "id="+questionId+"&account="+user.account+"&companyId="+user.companyId,
    success: function(msg){
      comb_data = msg.bizContent;
      importDataToDom(msg.bizContent);
      comb_data.insert_data=[];
    }
  });
}

//试题赋值方法
function importDataToDom(jsonData){
  var tab_num = jsonData.tab_num; //答案数量
  var type = jsonData.type; //试题类型
  initial_type = jsonData.type;//保存初始试题类型
  var status = jsonData.status; //试题状态
  var difficult = jsonData.difficult; //试题难度
  var disorder=jsonData.disorder;//答案乱序
  var classification = jsonData.classification; //试题分类
  var classificationName = jsonData.questionClassificationName; //试题分类名称
  var label = jsonData.label;//试题标签id
  var labelName = jsonData.labelName;//试题标签name
  var question = jsonData.question; //试题描述
  var analysis = jsonData.analysis; //试题解析
  var id = jsonData.id; //试题id
  var encrypt = jsonData.encrypt; //是否加密
  var html = "";
  //试题id
  $("#asyncForm input[name=id]").val(id);
  //试题分类
  $("#subForm input[name=classification]").val(classification);
  //试题分类名称
  if ($("#subForm input[name=classification]").val()==''){
    $("#selTypeLink").text('请选择');
  } else {
    $("#selTypeLink").text('已选择');
  }
  // 标签id
  $("#subForm input[name=label]").val(label);
  // 标签name
  if ($("#subForm input[name=label]").val()==''){
    $("#selLabelLink").text('请选择');
  } else {
    $("#selLabelLink").text('已选择');
  }
  //试题类型
  $("#subForm select[name=type]").val(type);
  var testType = ($(".simulationOption.testType").children())[parseFloat(type)-1].textContent;
  $(".simulationSelect.testType span").text(testType);
  //试题难度
  $("#subForm select[name=difficult]").val(difficult=="简单"?'simple':difficult=="普通"?'middle':difficult=="困难"?'hard':'');
  questionDifficult(difficult);
  function questionDifficult(difficult){
    // var difficultType = "";
    // if(difficult == 'simple'){
    //   difficultType = "简单";
    // }else if(difficult == 'middle'){
    //   difficultType = "普通";
    // }else if(difficult == 'hard'){
    //   difficultType = "困难";
    // }
    $(".simulationSelect.difficult span").text(difficult);
  }
  //答案乱序
  if(disorder==1){
    if($(".answerDisorder").hasClass("switch-off")){
      $(".answerDisorder").click();
    }
  }else{
    if($(".answerDisorder").hasClass("switch-on")){
      $(".answerDisorder").click();
    }
  }


  if(type==6){
    //大题题干
    $("input[name=comb_question]").val(question);
  }else {
    //试题描述
    $("input[name=question]").val(question);
    //试题解析
    if (analysis == "None") {
      analysis = "无";
    } else {
      analysis = analysis;
    }
    $("input[name=analysis]").val(analysis);
  }
  //试题内容
  if(type==1 || type==2){
    var input_type = (type==1) ? "radio" : "checkbox";
    var check_status = "";
    for (var i = 0; i < tab_num; i++) {
      var dex="answer"+(i+1);
      check_status = jsonData["key"+(i+1)]==1 ? "checked" : "";
      html += '<div class="keyList">'+
        '    <div class="keyLeft">'+
        '        <input type="' + input_type + '" class="radioOrCheck" name="keyChk" ' + check_status + ' />'+
        '    </div>'+
        '    <div class="keyRight keyRight'+(i+1)+'">'+
        '        <div id="key'+(i+1)+'Editor" class="questions_add"></div>'+
        "        <input name='answer"+(i+1)+"' type='hidden' value='" + jsonData[dex].replace(/'/g,"&apos;") + "' />"+
        '    </div>'+ ((i<2) ? '' :'<a href="javascript:void(0);" class="removeKey icons8-delete"></a>')+
        '</div>';
      // input内考虑双引号嵌套问题，value用单引号括；
      // 选项中单引号后的内容不显示（如"使用'其他车辆行驶证"，只显示"使用"），因此需要在赋值前转义
    }
    $(".addKeyBtn").removeClass("hidden").before(html);
    if(tab_num == 20) $(".addKeyBtn").addClass("hidden");
  }else if(type==3){
    if(jsonData.key1=="1"){
      $("#judgeYes").prop("checked",true);
    }else{
      $("#judgeNo").prop("checked",true);
    }
  }else if(type==4){
    for (var i = 0; i < 20; i++) {
      var dex="answer"+(i+1);
      var reg=/&&/g;
      if(jsonData[dex]){
        if(i==19) $(".addKeyFillBtn").addClass("hidden");
        html = '<div class="keyFillContent keyFillContentAdd">'+
          '	  <div class="input-group">'+
          '		  <span class="input-group-addon">'+(i+1)+'</span>'+
          '		  <input type="text" name="keyFill"  class="form-control">'+
          '	  </div>' + (i==0 ? '' : '<a href="javascript:void(0);" class="removeKeyFill icons8-delete"></a>')+
          '</div>';
        $(".addKeyFillBtn").before(html);
        $("input.form-control").attr("value",jsonData[dex].replace(reg,",").replace(/&amp;&amp;/g,","));
        $("input.form-control").attr("data-role","tagsinput");
        $("input.form-control").tagsinput();
        html="";
      }else {
        break;
      }
    }
  }else if(type==5||type==7){
    $("#clozeEditor").html(videoConvert(jsonData.key));//////////
    $(".keyCloze input[name=answer1]").val(jsonData.key);///////////
    // 问答题关键词
    if(type==5){
      var normals = jsonData.normalWords.split("|");
      var keys = jsonData.keyWords.split("|");
      var normalLists = [];
      var keyLists = [];
      for (let i = 0; i < normals.length; i++) {
        normalLists.push(normals[i].indexOf(",") == -1? normals[i] : normals[i].split(","));
      }
      for (let i = 0; i < keys.length; i++) {
        keyLists.push(keys[i].indexOf(",") == -1? keys[i] : keys[i].split(","));
      }
      var normal_words = normalLists;
      var key_words = keyLists;
      var normal_html = "";
      var key_html = "";
      // normal_words
      if(normal_words){
        for (var i = 0; i < normal_words.length; i++) {
          var keyLength = $("#keyBlock").find(".whole-word").length;
          var index = (keyLength==0) ? 0 : (parseInt($("#keyBlock").find(".whole-word").last().attr("index"))+1);
          if(typeof(normal_words[i])=="string"){//single-word
            //"&"在保存时做了转义，因此显示时需要解析
            normal_html += '<span class="word single-word">' + normal_words[i] + '</span><em class="remove-word icons8-delete"></em>';
          }else {//multi-word
            for (var j = 0; j < normal_words[i].length; j++) {
              normal_html += '<span class="word multi-word">' + normal_words[i][j] + '</span>' +
                ((j==normal_words[i].length-1) ? '<em class="remove-word icons8-delete"></em>' : '<em class="relate-word">或</em>');
            }
          }
          $("#keyBlock").append('<div class="whole-word normal-word" id="word' + index + '" index="' + index + '">' + normal_html + '</div>');
          // 初始化每个关键词的提示框
          initialPopover($("#word"+index),index);
          $("#keyBlock").show();
          normal_html = "";
        }
      };
      // key_words
      if(key_words){
        for (var i = 0; i < key_words.length; i++) {
          var keyLength = $("#keyBlock").find(".whole-word").length;
          var index = (keyLength==0) ? 0 : (parseInt($("#keyBlock").find(".whole-word").last().attr("index"))+1);
          if(typeof(key_words[i])=="string"){//single-word
            key_html += '<span class="word single-word">' + key_words[i] + '</span><em class="remove-word icons8-delete"></em>';
          }else {//multi-word
            for (var k = 0; k < key_words[i].length; k++) {
              key_html += '<span class="word multi-word">' + key_words[i][k] + '</span>' +
                ((k==key_words[i].length-1) ? '<em class="remove-word icons8-delete"></em>' : '<em class="relate-word">或</em>');

            }
          }
          $("#keyBlock").append('<div class="whole-word key-word" id="word' + index + '" index="' + index + '">' + key_html + '</div>');
          // 初始化每个关键词的提示框
          initialPopover($("#word"+index),index);

          $("#keyBlock").show();
          key_html = "";
        }
      };
    }
  }else if (type==6) {
    var this_data=jsonData.insert_data;
    var insert_html='';
    for (var i = 0; i < this_data.length; i++) {
      var type_label = "";
      var insert_type = this_data[i].type;
      switch (insert_type) {
        case "1": type_label = "单选题";break;
        case "2": type_label = "多选题";break;
        case "3": type_label = "判断题";break;
        case "4": type_label = "填空题";break;
        case "5": type_label = "问答题";break;
      }
      insert_html += '<div class="single">'+
        '<div class="input-group input-group' + i + '" sort="' + i + '" insert_id="'+ this_data[i].sId +'">'+
        '  <span class="input-group-addon">' + (i+1) + '</span>'+
        '  <div  class="input-div"><span class="type">' + type_label + '</span>'+ this_data[i].question +'</div>' +
        '</div>'+
        '<div class="operation-icon">'+
        '  <em class="icons8-delete"></em>'+
        '  <em class="icon icon-a_arrow_up"></em>'+
        '  <em class="icon icon-a_arrow_down"></em>'+
        '</div>'+
        '</div>';
    }
    $(".questionPanel .questionList").append(insert_html);
  }

  //根据试题类型显示不同试题格式
  changeType(type);

  return;
}

// 音视频转换
function videoConvert(json_data) {
  var $temp = $('<div></div>');
  $temp.html(json_data);
  $($temp.find('video')).each(function() {
    var src;
    if ($(this).find('source').length==0)
      src = $(this).attr('src');
    else src = $(this).find('source').eq(0).attr('src');
    var alt = $(this).attr('alt');
    $(this).after('<img class="video-temp-img" temp_src="'+src+'" alt="'+(alt?alt:'')+'">');
    $(this).remove();
  });
  $($temp.find('audio')).each(function() {
    var src;
    if ($(this).find('source').length==0)
      src = $(this).attr('src');
    else src = $(this).find('source').eq(0).attr('src');
    var alt = $(this).attr('alt');
    $(this).after('<img class="audio-temp-img" temp_src="'+src+'" alt="'+(alt?alt:'')+'">');
    $(this).remove();
  });
  return $temp.html();
}

//切换试题分类fn
function changeType(type, i_type){
  $(".keyPanel").hide();
  // 其他类型转单／多选  其他类型转填空 需要初始化
  if((i_type==3||i_type==4||i_type==5)&&(type==1||type==2)){
    $(".keyRadio .keyList").remove();
    initialPanel(type);
  }else if ((i_type==1||i_type==2||i_type==3||i_type==5)&&(type==4)) {
    $(".keyFill .keyFillContent").remove();
    initialPanel(type);
  }

  if(type==1){ //单选
    $(".keyRadio").show();
    $(".keyRadio input[type=checkbox]").attr("type","radio");
    return;
  }
  if(type==2){ //多选
    $(".keyRadio").show();
    $(".keyRadio input[type=radio]").attr("type","checkbox");
    return;
  }
  if(type==3){ //判断
    $(".keyJudge").show();
    return;
  }
  if(type==4){ //填空
    $(".keyFill").show();
    return;
  }
  if(type==5||type==7){ //问答
    $(".keyCloze").show();
    if(type==5){
      $(".keyCloze .keyWordPanel").show();
      $(".bootstrap-tagsinput").hide();
      $(".answer-question").show();

    }else if (type==7) {
      $(".keyCloze .keyWordPanel").hide();
    }
    return;
  }
  if(type==6){
    $(".body-content .cont-r .tab-content .batch-type .simulationSelect.testType").click(function(e){
      e.stopPropagation();
      $(this).next().hide();
    });
    $(".simulationSelect.testType").addClass("disabled");
    $("select[name=type]").prop("disabled","disabled");
    $(".question-content").hide();
    if($(".questionPanel .input-group").length==0){
      $(".questionPanel").hide();
    }else {
      $(".questionPanel").show();
    }
    $(".questionPanel").show();
    $(".insert-question").show();
    $(".question-content").addClass("insert-content");
    $(".combPanel").show();
  }
}


//显示选择分类对话框
function showSelType(obj){
  selTypeModal.location.href = "/admin/question_class";
  $('#classDialog').show();
  // $('#typeModal').modal({
  //   backdrop:"static",
  //   keyboard:false
  // });
}

//关闭选择分类对话框
function hideSelType(obj){
  // $('#typeModal').modal('hide');
  $('#classDialog').hide();
}

//接受选择分类数据
function selType(id,name){
  $("input[name=classification]").val(id);
  $("#selTypeLink").text('已选择');
}

//显示选择标签对话框
function showSelLabel(obj){
  localStorage.setItem("selArryLabel"+user_id, $("input[name=label]").val());

  selLabelModal.location.href = "/baseinfo/admin/tree/tests_multi_label?relatedParent=1";

  $('#labelDialog').show();
}
//关闭选择标签对话框
function hideSelLabel(obj){
  $('#labelDialog').hide();
}
// 接受选择标签数据
function selLabel(data) {
  var ids = '';
  for (var i = 0; i < data.length; i++) {
    ids += data[i].id + ',';
  }
  ids = ids.slice(0,ids.length - 1);
  $("input[name=label]").val(ids);
  $("#selLabelLink").text('已选择');
  localStorage.setItem("selArryLabel"+user_id, $("input[name=label]").val());
}

//验证表单选项
function checkForm(){
  var classification = $("#subForm input[name=classification]").val();
  var type = $("select[name=type]").val();
  if(classification==""){
    alert("请选择试题分类！");
    return;
  }
  if(type==0){
    alert("请选择试题类型！");
    return false;
  }
  if(filterContentIsEmpty($("input[name=question]").val())){
    alert("请填写试题描述！");
    return false;
  }
  if(type==1||type==2){
    var key = $(".keyRadio .radioOrCheck");
    var ifCheck = false;
    for(var i=0;i<key.length;i++){
      var checked = $(key[i]).is(":checked");
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
    var key = $("input[name=keyFill]");
    var ifCheck = false;
    if(key.length==0){
      alert("请填写试题答案！");
    }
    for(var i=0;i<key.length;i++){
      var checked = $(key[i]).val();
      if(filterContentIsEmpty(checked)){
        ifCheck = false;
      }else{
        ifCheck = true;
      }
    }
    if(ifCheck===false){
      alert("请填写试题答案！");
      return false;
    }
    return true;
  }
  if(type==5||type==7){
    if(filterContentIsEmpty($(".keyCloze input[name=answer1]").val())){
      alert("请填写试题答案！");
      return false;
    }
  }
  return true;
}

//提交试题数据合并
function serializeForm(){
  $("#asyncForm div").html("");
  $("#asyncForm input[name=classification]").val($("#subForm input[name=classification]").val());
  $("#asyncForm input[name=label]").val($("#subForm input[name=label]").val());
  $("#asyncForm input[name=type]").val($("#subForm select[name=type]").val());
  $("#asyncForm input[name=tab_num]").val($(".keyRadio").find(".keyList").length);
  $("#asyncForm input[name=status]").val("enable");
  $("#asyncForm input[name=difficult]").val($("#subForm select[name=difficult]").val());
  $("#asyncForm input[name=encrypt]").val("0");
  // $("#asyncForm").append('<textarea name="rawQuestion"></textarea>');
  // $("#asyncForm").append('<textarea name="rawAnalysis"></textarea>');
  $("#asyncForm textarea[name=rawQuestion]").text($(".descPanel input[name=rawQuestion]").val());
  $("#asyncForm textarea[name=rawAnalysis]").text($(".analysisPanel input[name=rawAnalysis]").val());
  if($(".answerDisorder").hasClass("switch-on")){
    $("#asyncForm input[name=disorder]").val(1);
  }else{
    $("#asyncForm input[name=disorder]").val(0);
  }
  // 关键词整合
  var normal_words = '';
  var normal_length = $("#keyBlock").find(".normal-word").length;
  $("#keyBlock").find(".normal-word").each(function(index, element) {
    var $w = $(this).find(".word");
    if($($w).hasClass("single-word")){
      normal_words += escapeKeyHTML($($w).text()) + (index == normal_length-1 ? '' : '#');
    }else if ($($w).hasClass("multi-word")) {
      var $w_length = $w.length;
      $($w).each(function(index, element) {
        normal_words += escapeKeyHTML($(this).text()) + (index == $w_length-1 ? '' : '||');
      });
      normal_words += (index == normal_length-1 ? '' : '#');
    }
  });
  var key_words = '';
  var key_length = $("#keyBlock").find(".key-word").length;
  $("#keyBlock").find(".key-word").each(function(index, element) {
    var $w = $(this).find(".word");
    if($($w).hasClass("single-word")){
      key_words += escapeKeyHTML($($w).text()) + (index == key_length-1 ? '' : '#');
    }else if ($($w).hasClass("multi-word")) {
      var $w_length = $w.length;
      $($w).each(function(index, element) {
        key_words += escapeKeyHTML($(this).text()) + (index == $w_length-1 ? '' : '||');
      });
      key_words += (index == key_length-1 ? '' : '#');
    }
  });
  $("#asyncForm input[name=normalWords]").val(normal_words);
  $("#asyncForm input[name=keyWords]").val(key_words);


  $("#asyncForm textarea[name=question]").text($("input[name=question]").val());
  $("#asyncForm textarea[name=analysis]").text($("input[name=analysis]").val());
  var type = $("#asyncForm input[name=type]").val();
  if(type==1||type==2){
    var keyList = $(".keyRadio .keyList");
    for(var i=0;i<keyList.length;i++){
      var answer='';
      //此处注意，不能用keyList，否则下面input有两个，取不到值
      answer=$(keyList[i]).find(".keyRight").children("input[name=answer"+(i+1)+"]").val();
      $(keyList[i]).find(".key").clone().appendTo("#asyncForm div");
      $("#asyncForm div").append('<textarea name="answer'+(i+1)+'"></textarea>');
      $("#asyncForm textarea[name=answer"+(i+1)+"]").text(answer);
    }
    return true;
  }else if(type==3){
    if($("#judgeYes").is(":checked")){
      $("#keyYes").val("1");
      $("#keyNo").val("0");
      $("#asyncForm div").html('<input type="hidden" class="" name="key1" value="1" /><input type="hidden" class="" name="key2" value="0" /><input type="hidden" class="radioOrCheck" name="answer1" value="" /><input type="hidden" class="radioOrCheck" name="answer2" value="" />');
    }else{
      $("#keyYes").val("0");
      $("#keyNo").val("1");
      $("#asyncForm div").html('<input type="hidden" class="" name="key1" value="0" /><input type="hidden" class="" name="key2" value="1" /><input type="hidden" class="radioOrCheck" name="answer1" value="" /><input type="hidden" class="radioOrCheck" name="answer2" value="" />');
    }
    return true;
  }else if(type==4){
    var keyList = $("input[name=keyFill]");
    var reg=/,/g;
    var html = "";
    $("input[name=keyFill]").each(function(index, element) {
      //去除首尾空格
      var ans_arr=$(this).val().split(',');
      var noblank_reg=/(^\s*)|(\s*$)/g;
      ans_arr.forEach(function(item,index,arr){
        arr[index]=arr[index].replace(noblank_reg,"");
      })
      $(this).val(ans_arr.join(','));
      html = '<input type="hidden" class="" name="key'+(index+1)+'" value="1" /><input type="hidden" class="radioOrCheck" name="answer'+(index+1)+'" value="'+$(this).val().replace(reg,"&&")+'" />';
      $("#asyncForm div").append(html);
    });
    return true;
  }else if(type==5||type==7){
    // $("#asyncForm div").append('<textarea name="answer1"></textarea>');
    // $("#asyncForm div").append('<textarea name="rawAnswer"></textarea>');
    $("#asyncForm div").append('<input type="hidden" class="" name="key1" value="1" />');
    $("#asyncForm textarea[name=answer1]").text($(".keyCloze input[name=answer1]").val());
    $("#asyncForm textarea[name=rawAnswer]").text($(".keyCloze input[name=rawAnswer]").val());
    return true;
  }
}

//异步提交表单
function asyncSub(){
  // var dataForm = $('#asyncForm').serialize();
  var dataForm =$('#asyncForm').serializeArray();
  var data = {}
  $(dataForm ).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  for(i in data){
    if(data[i]==""||!data[i]){
      delete data[i]
    }
  }
  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/api/question/hand_update",
    data: {
      dataForm:JSON.stringify(data),
      account:user.account,
      companyId:user.companyId
    },
    traditional:true,
    success: function(msg){
      if(msg.success == true){
        // if (USER_ROLE == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
        //   $('#createExam').hide();
        // }
        $('#saveQuestionModal').modal();
      }else{
        alert(msg.desc);
      }
    }
  });
}



// <!-------组合题start--------->
// 组合题小题存储
function saveInsert(sort) {
  var type = comb_data.insert_data[0].type;
  comb_data.insert_data[0].question=$(".descPanel input[name=question]").val();
  comb_data.insert_data[0].analysis=$(".analysisPanel input[name=analysis]").val();
  comb_data.insert_data[0].tab_num = "4";
  if($(".answerDisorder").hasClass("switch-on")){
    comb_data.insert_data[0].disorder=1;
  }else{
    comb_data.insert_data[0].disorder=0;
  }
  if(type==1||type==2){
    comb_data.insert_data[0].tab_num = $(".keyRadio").find(".keyList").length;
    for(var i=1;i<=20;i++) {
      delete comb_data.insert_data[0]["key" + i];
      delete comb_data.insert_data[0]["answer" + i];
    }
    $(".keyRadio .keyList").each(function (index, element) {
      if($(this).find(".radioOrCheck:checked").length==0){
        comb_data.insert_data[0]['key'+(index+1)]='0';
      }else {
        comb_data.insert_data[0]['key'+(index+1)]='1';
      }
      comb_data.insert_data[0]['answer'+(index+1)]=$(this).find("input[name=answer"+(index+1)+"]").val();
    })
  }else if(type==3){
    if($("#judgeYes").is(":checked")){
      comb_data.insert_data[0].key1='1';
      comb_data.insert_data[0].key2='0';
    }else {
      comb_data.insert_data[0].key1='0';
      comb_data.insert_data[0].key2='1';
    }
    comb_data.insert_data[0].answer1='';
    comb_data.insert_data[0].answer2='';
  }else if(type==4){
    $(".keyFill input[name=keyFill]").each(function(index, element) {
      var reg=/,/g;
      //去除首尾空格
      var ans_arr=$(this).val().split(',');
      var noblank_reg=/(^\s*)|(\s*$)/g;
      ans_arr.forEach(function(item,index,arr){
        arr[index]=arr[index].replace(noblank_reg,"");
      })
      $(this).val(ans_arr.join(','));
      comb_data.insert_data[0]['key'+(index+1)]='1';
      comb_data.insert_data[0]['answer'+(index+1)]=$(this).val().replace(reg,"&&");
    });
    var key_len=$(".keyFill input[name=keyFill]").length;
    for (var i = (key_len+1); i < 7; i++) {
      if(comb_data.insert_data[0]['key'+i]!=undefined){
        delete comb_data.insert_data[0]['key'+i];
        delete comb_data.insert_data[0]['answer'+i];
      }
    }
  }else if (type==5||type==7) {
    comb_data.insert_data[0].key1='1';
    comb_data.insert_data[0].answer1=$(".keyCloze input[name=answer1]").val();

    // 关键词整合
    var normal_words = '';
    var normal_length = $("#keyBlock").find(".normal-word").length;
    $("#keyBlock").find(".normal-word").each(function(index, element) {
      var $w = $(this).find(".word");
      if($($w).hasClass("single-word")){//单个关键词 分隔符：＃
        normal_words += escapeKeyHTML($($w).text()) + (index == normal_length-1 ? '' : '#');
      }else if ($($w).hasClass("multi-word")) {//组合型关键词  分隔符：&
        var $w_length = $w.length;
        $($w).each(function(index, element) {
          normal_words += escapeKeyHTML($(this).text()) + (index == $w_length-1 ? '' : '||');
        });
        normal_words += (index == normal_length-1 ? '' : '#');
      }
    });

    comb_data.insert_data[0].normal_words=normal_words;

    var key_words = '';
    var key_length = $("#keyBlock").find(".key-word").length;
    $("#keyBlock").find(".key-word").each(function(index, element) {
      var $w = $(this).find(".word");
      if($($w).hasClass("single-word")){//单个关键词  分隔符：＃
        key_words += escapeKeyHTML($($w).text()) + (index == key_length-1 ? '' : '#');
      }else if ($($w).hasClass("multi-word")) {//组合型关键词  分隔符：&
        var $w_length = $w.length;
        $($w).each(function(index, element) {
          key_words += escapeKeyHTML($(this).text()) + (index == $w_length-1 ? '' : '||');
        });
        key_words += (index == key_length-1 ? '' : '#');
      }
    });

    comb_data.insert_data[0].key_words=key_words;

    $("#asyncForm input[name=normalWords]").val(normal_words);
    $("#asyncForm input[name=keyWords]").val(key_words);
  }
  var dataForm = JSON.stringify(comb_data.insert_data[0]);
  $.ajax({
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    url: "/api/question/handUpdate",
    data: {
      dataForm:dataForm,
      account:user.account,
      companyId:user.companyId
    },
    traditional:true,
    success:function(msg) {
      if(msg.success == true){
        // addInsert(sort,msg.bizContent[0].sId,msg.bizContent[0].sTitle,type);
        comb_data.insert_data=[];
      }
    }
  });
}

// 重置面板（针对组合题小题）
function resetPage() {
  $('.wangEditor-container').removeClass('active');
  $(".descPanel .questions_add, .analysisPanel .questions_add, .keyCloze .questions_add").html("");
  $(".keyRadio .keyList, div.keyFillContentAdd, .keyFill .keyFillContent").remove();
  $("#judgeYes").prop("checked",true);
  $(".keyRadio .addKeyBtn, .keyFill .addKeyFillBtn").removeClass("hidden");
  $("input[name=keyFill]").val("");
  $(".descPanel, .keyPanel, .analysisPanel").find("input").val("");
}

// 检查组合题小题
function checkInsert(sort){
  var type=comb_data.insert_data[0].type;
  if(type==1||type==2){
    var key_len=$(".keyRadio .radioOrCheck:checked").length;
    if(key_len==0){
      alert("请选择正确答案！");
      return false;
    }
  }
  if(type==4){
    var key=$(".cont-r").find("input[name=keyFill]");
    var ifFill= true;
    for(var i=0;i<key.length;i++){
      if(filterContentIsEmpty($(key[i]).val())){
        alert("请填写试题答案！");
        ifFill=false;
        break;
      }
    }
    if(ifFill==false){
      return false;
    }
  }
  if(type==5||type==7){
    if(filterContentIsEmpty($(".keyCloze input[name=answer1]").val())){
      alert("请填写试题答案！");
      return false;
    }
  }
  return true;
}

// 添加／更新小题
function addInsert(insert_num,s_id,s_title,type){
  var has_insert_num=parseInt(insert_num);
  if(has_insert_num==0){
    $(".questionPanel").show();
  }
  var type_label = "";
  switch (type) {
    case "1": type_label = "单选题";break;
    case "2": type_label = "多选题";break;
    case "3": type_label = "判断题";break;
    case "4": type_label = "填空题";break;
    case "5": type_label = "问答题";break;
  }
  var insert_html = '<div class="input-group input-group'+has_insert_num+'" sort="' + has_insert_num + '" insert_id="'+ s_id +'">'+
    '  <span class="input-group-addon">' + (has_insert_num+1) + '</span>'+
    '  <div  class="input-div"><span class="type">' + type_label + '</span>'+ s_title +'</div>' +
    '</div>'+
    '<div class="operation-icon">'+
    '  <em class="icons8-delete"></em>'+
    '  <em class="icon icon-a_arrow_up"></em>'+
    '  <em class="icon icon-a_arrow_down"></em>'+
    '</div>';
  if($(".questionPanel .single").length==has_insert_num){
    $(".questionPanel .questionList").append('<div class="single">'+insert_html+'</div>');
  }else if($(".questionPanel .single").length>has_insert_num){
    $(".questionPanel .input-group[sort="+has_insert_num+"]").replaceWith(insert_html);
  }
  $(".insert-content").hide();
  //  所有内容重置
  resetPage();
}

// 组合题列表中编辑小题
function updateInsert(obj,this_data) {
  resetPage();
  comb_data.insert_data[0] = this_data;
  var type = this_data.type;
  var has_insert_num=$(obj).attr("sort");
  var html = "";
  $(".insert-content").show();
  $("#insertOk, #insertRemove").attr("sort",has_insert_num);
  var realTxt = checkHtml(this_data.question)?this_data.question:'<p>'+this_data.question+'</p>';
  $(".descPanel .questions_add").html(realTxt);
  $(".descPanel input[name=question]").val(realTxt);

  $(".analysisPanel .questions_add").html(this_data.analysis);
  $(".analysisPanel input[name=analysis]").val(this_data.analysis);
  if(type==1||type==2){
    var tab_num=this_data.tab_num;
    var input_type = (type==1) ? "radio" : "checkbox";
    var check_status = "";
    for (var i = 0; i < tab_num; i++) {
      var dex="answer"+(i+1);
      check_status = this_data["key"+(i+1)]==1 ? "checked" : "";

      html = '<div class="keyList">'+
        '    <div class="keyLeft">'+
        '        <input type="' + input_type + '" class="radioOrCheck" name="keyChk" ' + check_status + ' />'+
        '    </div>'+
        '    <div class="keyRight keyRight'+(i+1)+'">'+
        '        <div id="key'+(i+1)+'Editor" class="questions_add"></div>'+
        "        <input name='answer"+(i+1)+"' type='hidden' value=\"" + this_data[dex] + "\" />"+
        '    </div>'+ ((i<2) ? '' :'<a href="javascript:void(0);" class="removeKey icons8-delete"></a>')+
        '</div>';
      $(".addKeyBtn").before(html);
      initialEditor("key"+(i+1)+"Editor");
    }
    if(tab_num == 20) $(".addKeyBtn").addClass("hidden");
  }else if (type==3) {
    if(this_data.key1==1){
      $("#judgeYes").prop("checked",true);
    }else {
      $("#judgeNo").prop("checked",true);
    }
  }else if (type==4) {
    for (var i = 0; i < 6; i++) {
      var dex="answer"+(i+1);
      var reg=/&&/g;
      if(this_data[dex]){
        if(i==5) $(".addKeyFillBtn").addClass("hidden");
        html = '<div class="keyFillContent keyFillContentAdd">'+
          '	  <div class="input-group">'+
          '		  <span class="input-group-addon">'+(i+1)+'</span>'+
          '		  <input type="text" name="keyFill"  class="form-control">'+
          '	  </div>' + (i==0 ? '' : '<a href="javascript:void(0);" class="removeKeyFill icons8-delete"></a>')+
          '</div>';
        $(".addKeyFillBtn").before(html);
        $("input.form-control").attr("value",this_data[dex].replace(reg,","));
        $("input.form-control").attr("data-role","tagsinput");
        $("input.form-control").tagsinput();
        html="";
      }else {
        break;
      }
    }
    $(".addKeyFillBtn").before(html);
  }else if (type==5) {
    $(".keyCloze .questions_add").html(this_data.answer1);
    $(".keyCloze input[name=answer1]").val(this_data.answer1);
  }else if (type==7) {
    $(".keyCloze .questions_add").html(this_data.answer1);
    $(".keyCloze input[name=answer1]").val(this_data.answer1);
  }
  changeType(type);
}

// 组合题列表中删除小题
function deleteInsert(obj) {
  var has_insert_num=$(obj).attr("sort");
  $(".questionPanel").find(".input-group").each(function(index, element) {
    var sort=$(this).attr("sort");
    if(sort>has_insert_num){
      $(this).attr("sort",sort-1);
      $(this).find(".input-group-addon").text("第"+sort+"题");
      $(this).removeClass("input-group"+sort);
      $(this).addClass("input-group"+(sort-1));
    }
  });
  $(obj).remove();
}

// 组合题列表中上移小题
function chevronUpInsert(obj){
  var prev_html = $(obj).prev().find(".input-div").html();
  var prev_id = $(obj).prev().find(".input-group").attr("insert_id");
  var this_html = $(obj).find(".input-div").html();
  var this_id = $(obj).find(".input-group").attr("insert_id");
  $(obj).find(".input-div").html(prev_html);
  $(obj).find(".input-group").attr("insert_id",prev_id);
  $(obj).prev().find(".input-div").html(this_html);
  $(obj).prev().find(".input-group").attr("insert_id",this_id);
}

// 组合题列表中下移小题
function chevronDownInsert(obj) {
  var next_html = $(obj).next().find(".input-div").html();
  var next_id = $(obj).next().find(".input-group").attr("insert_id");
  var this_html = $(obj).find(".input-div").html();
  var this_id = $(obj).find(".input-group").attr("insert_id");
  $(obj).find(".input-div").html(next_html);
  $(obj).find(".input-group").attr("insert_id",next_id);
  $(obj).next().find(".input-div").html(this_html);
  $(obj).next().find(".input-group").attr("insert_id",this_id);
}

// 组合题信息拼合
function saveComb(){
  comb_data.question= $(".combPanel input[name=comb_question]").val();
  comb_data.question = comb_data.question.replace(/\&nbsp;/g, " ");

  if(filterContentIsEmpty(comb_data.question)){
    alert("请填写大题题干！");
    return false;
  }
  if($(".questionPanel .single").length==0){
    alert("请至少插入一道小题！");
    return false;
  }
  if($(".insert-content").is(":visible")){
    alert("请先保存小题！");
    return false;
  }
  comb_data.difficult=$("#subForm select[name=difficult]").val();
  comb_data.classification=$("#subForm input[name=classification]").val();
  comb_data.label=$("#subForm input[name=label]").val();
  comb_data.insert_data = [];//初始化
  $(".questionPanel").find(".single").each(function(index, element) {
    var insert_id=$(this).find(".input-group").attr("insert_id");
    comb_data.insert_data[index]=insert_id;
  });
  var dataForm = JSON.stringify(comb_data);
  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    contentType: "application/json",
    url: "/baseinfo/admin/edit_mix_question/?dataType=whole&type=update",
    data: dataForm,
    success: function(msg){
      if(msg.success == true){
        alert("保存成功！");
        // window.close();
      }
    }
  });
}

// <!-------组合题end--------->


//过滤编辑器内容，确保确实有内容，而非无效标签
function filterContentIsEmpty(str) {
  var regImg = /<img(.*?)>/gi;
  var regTable = /<table(.*?)table>/gi;
  var regFrame = /<iframe(.*?)iframe>/gi;
  var filterStr;

  if(str==''){
    return true;
  }else if(regImg.test(str)||regTable.test(str)||regFrame.test(str)){
    return false;
  }

  filterStr = str.replace(/<\/?[^>]*>/g, '').replace(/[ |&nbsp;|\n]/g, '');
  return filterStr=='';
}
