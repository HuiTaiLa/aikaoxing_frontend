var upload_file= '';
var qt_type="1";
var typeName = ['单选题','多选题','判断题','填空题','问答题'];
var nameReg = /^\n?\s*(([0-9]+\s*[.|、])|(((\()|（)[0-9]+((\))|）)))\s*(.*?)\s*(?:\n|$)/g;
var singleReg = /^\n?\s*(答案[:：])\s*(.*?)\s*(?:\n|$)/g;
var fillReg = /([\(|\（]\s*[\)|\）])/g;
var sourceFrom = '';//标记是否从弹窗点击
var timeClock = ""; //超时计时器

$('body').click(function(){
  $('.simulationOption').hide();
});
$("body").on("change", "#excelUpload", function() {
  $('#spinnerLoading').removeClass('hidden');

  var obj = document.getElementById('excelUpload');
  if(typeof obj.files[0] == "undefined"){
    return false;
  }
  if(obj.files[0].size > 1024*1024){//1M
    $('#spinnerLoading').addClass('hidden');
    $('.error-text-tip').css('display','block');
  }else {
    $('.error-text-tip').hide();
    // $("#uploadForm").submit();
    $('#uploadForm').ajaxSubmit({
      url : '/api/question/upload_excel',
      type : 'post',
      dataType : 'json',
      // headers:
      //   {
      //     "Authorization": token
      //   },
      success:function (msg){
        if(msg.success){

          showExcelRes(msg);
        }else {
          alert(msg.desc);
        }
      },
    });
    timeClock = window.setTimeout(function(){
      alert('上传中，试题较多请耐心等候！（若单次上传试题过多，建议拆分多次进行上传）');
    },16*1000)
    obj.outerHTML=obj.outerHTML;
  }
});

// $("#excelFrame").on("load",function(){
//   var msg = $(this).contents().find("body").text();
//   if(msg!=''){
//     msg=JSON.parse(msg);
//     showExcelRes(msg);
//   }
// });

$('.excelBtn').click(function () {
  $('#excel_import').show();
  $('#error-div').hide();
});

$('.excelAgainBtn').click(function () {
  $('#excel_import').show();
  $('#success-div').hide();
});

$('#createExam').click(function () {
  // window.open(getAdminUrlPrefix + '/examadmin/admin/paper_add_new');
});

$('#questionsList').click(function () {
  // window.open(getStaticUrlPrefix + '/admin/testQuestions/#/list');
});

$('#helpBtn').click(function (e) {
  e.stopPropagation();
  e.preventDefault();
  window.open('https://www.kancloud.cn/zhoujun123/examstar-stbq/1071627');
});

//导入excel结果反馈
function showExcelRes(msg) {
  var result = '';
  var questionEnterCount_var = 0;
  if(!msg.bizContent.errorList.length){
    clearTimeout(timeClock);//上传成功时清除超时定时器;
    // if (USER_ROLE == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
    //   $('#createExam').hide();
    // }
    $('#excel_import').hide();
    $('#success-div').show();
    $('#spinnerLoading').addClass('hidden');
    for (var key in msg.bizContent.successList) {
      switch (key)
      {
        case "table1":
          type = "单选题";
          break;
        case "table2":
          type = "多选题";
          break;
        case "table3":
          type = "判断题";
          break;
        case "table4":
          type = "填空题";
          break;
        case "table5":
          type = "问答题";
          break;

      }
      result += '<li class="' + key + '" style="display: inline-block;width: 90px;margin-bottom: 10px;">' + type + ":&nbsp;" + msg.bizContent.successList[key] + "&nbsp;道;" + '</li>';
      questionEnterCount_var = questionEnterCount_var + msg.bizContent.successList[key];

      $('#success-div ol').html(result);
    }
  }else{
    clearTimeout(timeClock);//上传失败时清除超时定时器;
    $('#spinnerLoading').hide();
    $('#excel_import').hide();
    $('#error-div').show();
    var arr = msg.bizContent.errorList
    for(var i = 0,len = arr.length;i<len;i++){
      var sheetName = ""
      var ele = arr[i]
      var row = Number(ele.rowIndex) + 1
      switch (ele.sheetIndex){
        case 0:
          sheetName = "单选题"
              break
        case 1:
          sheetName = "多选题"
              break
        case 2:
          sheetName = "判断题"
              break
        case 3:
          sheetName = "填空题"
              break
        case 4:
          sheetName = "简答题"
              break
      }
      // console.log(sheetName,row,ele.errorFields[0])

      var temp =  ele.errorFields[0].column?ele.errorFields[0].column+"列： "+ ele.errorFields[0].errorMessage:ele.errorFields[0].errorMessage
      // console.log(temp)
      result += '<li style="margin-bottom: 10px;">'+ sheetName + " 第" + row + "行 " + temp + '</li>';
    }
    // console.log(result)
    $('#error-div ol').html(result);
  }

  //gio
  // ksxProbe.gioTrack('enterQuestionSuccess', 1, {
  //   'questionEnterMethod_var': 'Excel录入',
  //   'questionEnterCount_var': questionEnterCount_var
  // });
}
