var sourceFrom = '';//标记是否从弹窗点击
var qt_type="1";

$(function () {
  $('div#text-input').froalaEditor({
    key: 'AODOd2HLEBFZOTGHW==',
    charCounterCount: false,
    language: 'zh_cn',
    spellcheck: false,
    toolbarInline: false,
    placeholderText: '请将当前所选题型的所有试题复制到这里',
//                pastePlain: true,//是否为纯文本粘贴
    pasteAllowLocalImages: true,
    imageDefaultWidth: 'auto',//图片默认宽度
    imageDefaultAlign: 'left',
    wordAllowedStyleProps: [],//允许从word粘贴的标签的样式
    htmlAllowedTags: ["p","img","br","sub","sup","div"],//允许出现的标签
//                imageMaxSize: 2 * 1024 * 1024,
    imageAllowedTypes: ["jpeg", "jpg", "png"],
    imageUploadParam: "multipartFile",
    imageUploadParams: {code:1},
    imageUploadURL: '/baseinfo/upload/image'//上传到本地服务器
  })
    .on('froalaEditor.contentChanged', function (e, editor) {
      var newArr = [];
      var indexArr = [];
      var questionArr = [];
      var nameReg = /^\n?\s*(([0-9]+\s*[.|、])|(((\()|（)[0-9]+((\))|）)))\s*(.*?)\s*(?:\n|$)/g;

      var contentText = editor.html.get().replace(/<p>/g,"\n\n").replace(/<\/p>/g,"\n\n").replace(/<br>/g,"\n\n").replace(/auto;">/g,'auto;">\n\n').split('\n');

      $('div#preview').html(markdown.toHTML(editor.html.get().replace(/<p>/g,"\n\n").replace(/<\/p>/g,"\n\n").replace(/<br>/g,"\n\n").replace(/auto;">/g,'auto;">\n\n')));

      //去除空格
      contentText.forEach(function (value) {
        if(value){

          value = value.replace(/&nbsp;/g,' ');
          value = '&nbsp;&nbsp;&nbsp;'+value;
          value = value.replace(/&nbsp;/g,"\n");

          newArr.push(value)
        }
      });
      //寻找相应的下标
      newArr.forEach(function(value,index){

        if(value.match(nameReg)){
          indexArr.push(index)
        }

      });
      //截取完整小题
      indexArr.forEach(function(value,index){

        questionArr.push(newArr.slice(indexArr[index],indexArr[index+1]))

      });

      $('.batch-preview-box .toolbar .title').text(questionArr.length>0?'检查区(共'+questionArr.length+'题)：':'检查区：');

      // 标记答案
      markAnswer(qt_type);
      changeSize();
      checkError();
    })
    .on('froalaEditor.image.error', function (e, editor, error, response) {
      // Image too text-large.
      if (error.code == 5) {
        alert("图片过大，无法上传");
      }

      // Invalid image type.s
      else if (error.code == 6) {
        alert("不支持该图片类型，请上传jpeg, jpg, png, gif, svg+xml格式的图片");
      }

      // Response contains the original server response to the request if available.
//                else if(!response.bizContent.success){
//                    alert(response.bizContent.desc);
//                }
    })
    .on ('froalaEditor.image.uploaded', function (e, editor, response){
      //如果上传失败
      if(response.desc){
        alert(response.desc);
      }
    });
});
// 标记答案
function markAnswer(type) {
  var list = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'];
  if(type=="1"||type=="2"){
    $(".question").each(function (index, element) {
      var answer = $(this).find(".qt_answer").addClass("hidden").text().replace(/^答案[:：]/,"").toUpperCase();
      for (var i = 0; i < list.length; i++) {
        if(answer.search(list[i])!=-1){
          $(this).find(".key_"+list[i]+" .checkOrRadio").prop("checked",true);
        }
      }
    });
  }
}

$("body").on("click","#preview .checkOrRadio[type=checkbox]",function(e){ //阻止检查区多选题选项的勾选 因为检查区的勾选影响不到输入区，会造成误导
  e.preventDefault();
})

//当题号过长时改变字号
function changeSize() {
  $(".question .qt_title .title").each(function(index, element) {
    var $numWords = $(this).text().length;
    if($numWords==4){
      $(this).css({"font-size":"20px"});
    }else if ($numWords==5) {
      $(this).css({"font-size":"16px"});
    }else if ($numWords>5) {
      $(this).css({"font-size":"14px"});
    }
  });
}
//关键字提示信息的出现与隐藏
$('.keyWordBadge').hover(function(){
  $(this).css({"background":"#A9B3BF"});
  $('#keyWordContent').css({"display":"block"});
},function(){
  $(this).css({"background":"#ddd"});
  $('#keyWordContent').css({"display":"none"});
});
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
  var idx = $(this).index();
  $(this).parents('.simulationSelect').next().children().prop("selected",false);
  e.stopPropagation();
  var sel = $(this).text();
  $(this).parents(".simulationSelect").children("span").text(sel);
  $(this).parent().hide();
  $(this).parents('.simulationSelect').next().children().eq(idx).prop('selected','selected').change()
});


//答案乱序

// excle导入模态框
$(".excel_import").on("click",function(){
  $('#excleImportModal').modal({
    backdrop:"static",
    keyboard:false
  });
});
$(".disorder-help").mouseover(function(){
  $(".disorder-prompt").show();
}).mouseout(function(){
  $(".disorder-prompt").hide();
})

$(".answer-help").mouseover(function(){
  $(".answer-prompt").show();
}).mouseout(function(){
  $(".answer-prompt").hide();
})
