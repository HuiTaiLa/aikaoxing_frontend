var dateFrom = {
  elem: "#dateFrom",
  format: "YYYY-MM-DD hh:mm:ss",
  min: "2010-01-01 00:00:00",
  max: "2030-01-01 00:00:00",
  istime: true
  // choose: function(datas){
  //      dateTo.min = datas; //开始日选好后，重置结束日的最小日期
  //      dateTo.start = datas //将结束日的初始值设定为开始日
  // }
};
var dateTo = {
  elem: "#dateTo",
  format: "YYYY-MM-DD hh:mm:ss",
  min: "2010-01-01 00:00:00",
  max: "2030-01-01 00:00:00",
  istime: true
  // choose: function(datas) {
  //     dateFrom.max = datas;
  // }
};
laydate(dateFrom);
laydate(dateTo);

var is_wechat_skipLogin = false;//是否是微信免登录考试

//免登录考试 hide 和 show 切换的方法
function switchSkipLoginFn(val) {
  // 正常登录0 免登录1 微信免登录2
  switch (val) {
    case '0' :
      $(".department-box, .answerLimit, .examPay, #verifyCount").show();
      $(".examInformation").hide();
      $('#uploadForm').hide();
      break;
    case '1' :
      is_wechat_skipLogin = false;
      $(".department-box, .answerLimit, .examPay, .examPay .examAmount, #verifyCount, .answerLimit, #verifyCount").hide();//可考部门//可考学员//答题次数//考试付费//答题次数//考前身份认证
      $(".examInformation").show();
      $("#uploadForm").hide();
      $('.phone-white-list').hide();//手机号白名单上传
      $("input[name=userPayConfirm], #verifyCount input[name=verifyCount]").prop("checked",false);
      $(".examPay .examAmount input").val("");
      break;
    case '2' :
      is_wechat_skipLogin = true;
      $('.phone-white-list').hide();//手机号白名单上传
      $("#uploadForm").hide();
      $(".department-box").hide();//可考部门//可考学员
      $(".examInformation, .answerLimit, .examPay, #verifyCount").show();//答题次数//考试付费//考前身份认证
      $("input[name=userPayConfirm], #verifyCount input[name=verifyCount]").prop("checked",false);//初始化考试付费状态//初始化考前身份认证状态
      $(".examPay .examAmount input").val("");//初始化考试付费金额
      $("input[name=userPayConfirm]").prop("checked",false);//考试付费 false
      break;
    case '3' :
      is_wechat_skipLogin = false;
      $('.phone-white-list').show();
      $("#uploadForm").show();
      $(".department-box").hide();//可考部门//可考学员
      $(".examInformation, .answerLimit, .examPay, #verifyCount").show();//答题次数//考试付费//考前身份认证
      $("input[name=userPayConfirm], #verifyCount input[name=verifyCount]").prop("checked",false);//初始化考试付费状态//初始化考前身份认证状态
      $(".examPay .examAmount input").val("");//初始化考试付费金额
      $("input[name=userPayConfirm]").prop("checked",false);//考试付费 false
      break;
  }
}
//学员登录方式
$(".loginWay input[name=skipLogin]").change(function(){
  var _val = $("input[name=skipLogin]:checked").val();
  switchSkipLoginFn(_val);
});
//开关
$("body").on("click",".switch-all",function(e){
  e.stopPropagation();
  e.preventDefault();
  var switchStatus = $(this).prop("class");
  if (switchStatus.indexOf("switch-on") != -1){
    if(!canOpenRedPack && $(this).hasClass("switch-redpack")){
      alert("微信红包为付费功能，请先开通该功能");
      return false;
    }
    $(this).next().prop("checked",true);
    // if (switchStatus.indexOf("switch-hidden") != -1){
      $(this).parents(".form-group").next().removeClass("hidden");
      $(this).parents(".form-group").next().show();
      $(this).parents(".form-group").next().find("input").removeAttr("disabled");
    // }
  }else if(switchStatus.indexOf("switch-on") == -1){
    $(this).next().prop("checked",false);
    if (switchStatus.indexOf("switch-hidden") != -1){
      $(this).parents(".form-group").next().hide();
      $(this).parents(".form-group").next().find("input").attr("disabled",true);//隐藏元素的子元素（表单不提交）
    }else if (switchStatus.indexOf("switch-off") != -1){
      $(this).parents(".form-group").next().hide();
      $(this).parents(".form-group").next().find("input").attr("disabled",true);//隐藏元素的子元素（表单不提交）
    }
  }
});
//关注公众号开关
$("#switch-followApp").on("click", function (e) {
  e.stopPropagation();
  e.preventDefault();

  if(!$(this).hasClass("switch-disabled")){
    var switchStatus = $(this).prop("class"); //通过class判断是off还是on

    if(switchStatus.indexOf("switch-on") == -1){
      $(this).next().prop("checked",true);
      $(this).parents(".form-group").next(".group-follow-app").show();
    }else{
      $(this).next().prop("checked",false);
      $(this).parents(".form-group").next(".group-follow-app").hide();
    }
  }
});
//随机生成密码
function randomPwd(){
  var str = "",
    idx = 0,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // 随机产生
  for(var i=0; i<6; i++){
    idx = Math.round(Math.random() * (arr.length-1));
    str += arr[idx];
  }
  return str;
}
$(".change-pwd-box input").val(randomPwd()).addClass("active-input first-input");

//考前校验密码开关
$("body").on("click","#switch-passSetting",function(e) {
  e.stopPropagation();
  e.preventDefault();
  var switchStatus = $(this).prop("class"); //通过class判断是off还是on
  var pwdStr;//用户修改的密码
  if (switchStatus.indexOf("switch-off") == -1){
    $(".change-pwd-box").removeClass("hidden");
    $(".change-pwd-box input").on({
      "input": function() {
        //去掉所有空格
        pwdStr = $(this).val().replace(/\s/g, "");
        $(this).val(pwdStr);
        //不能输入中文
        if (/[^\x00-\xff]/i.test(pwdStr)){
          $(".change-pwd-box .pwd-input-tips").addClass("error").html("密码不能包含中文字符");
          $(".change-pwd-box input").addClass("error-input");
        }else if (pwdStr.length < 6) {
          $(".change-pwd-box .pwd-input-tips").addClass("error").html("密码最少6位");
          $(".change-pwd-box input").addClass("error-input");
        }else if (pwdStr.length > 8) {
          $(".change-pwd-box .pwd-input-tips").addClass("error").html("密码最多8位");
          $(".change-pwd-box input").addClass("error-input");
        }else {
          $(".change-pwd-box .pwd-input-tips").removeClass("error").html("密码可以设置为6-8位的非中文字符组合");
          $(".change-pwd-box input").removeClass("error-input");
        }
      },
      "focus": function() {
        $(".change-pwd-box input").addClass("active-input");
      },
      "blur": function() {
        $(".change-pwd-box input").removeClass("active-input");
      }
    });
    //如果用户第一次输入
    if($(".change-pwd-box input").hasClass("first-input")){
      $(".change-pwd-box input").focus().removeClass("first-input");
    }
    $('input[name=setExamPwd]').val(1); //开启后状态标注为1*/
    //如果开启密码则在发布考试的时候显示考试密码，如果不开启不显示
    // $(".form-style").removeClass('hidden');
  }else{
    $(".change-pwd-box").addClass("hidden");
    $('input[name=setExamPwd]').val(0);//关闭后状态标注为0
    // $(".form-style").addClass('hidden');
  }
});

//考试迟到限时
$("body").on("click",".switch-late-time",function(e){
  e.stopPropagation();
  e.preventDefault();
  var switchStatus = $(this).prop("class"); //通过class判断是off还是on
  var _this = $(this);
  if(switchStatus.indexOf("switch-off") == -1){
    $(".late-time-box").show();
    $("input.lateCheck").val(1); //开启后状态标注为1
  }else{
    $(".late-time-box").hide();
    $("input.lateCheck").val(0);
  }
});
//最短答题时长
$("body").on("click",".switch-min-time",function(e){
  e.stopPropagation();
  e.preventDefault();
  var switchStatus = $(this).prop("class"); //通过class判断是off还是on
  var _this = $(this);
  if(switchStatus.indexOf("switch-off") == -1){
    $(".min-time-box").show();
    $("input.setMinExamTime").val(1); //开启后状态标注为1
    $("input[name=practiceMode]").parents('.form-group').hide();//练习模式勾选隐藏
    $("input[name=passMode]").parents('.form-group').hide();//闯关模式勾选隐藏
    $("input[name=practiceMode]").removeProp('checked');//练习模式取消
    $("input[name=passMode]").removeProp('checked');//闯关模式取消
  }else{
    $(".min-time-box").hide();
    $("input.setMinExamTime").val(0);
    $("input[name=practiceMode]").parents('.form-group').show();
    $("input[name=passMode]").parents('.form-group').show();
    $("input[name=passMode]").parents(".radio").next().css("display", "none");//答错机会填框先隐藏
  }
});
//考前校验ip开关
$("#switch-ipSetting").on("click",function(e){
  e.stopPropagation();
  e.preventDefault();
  var switchStatus = $(this).prop("class"); //通过class判断是off还是on
  if(switchStatus.indexOf("switch-off") != -1){
    $(this).next().val(1); //开启后状态标注为1*/
    //如果开启密码则在发布考试的时候显示考试密码，如果不开启不显示
    $(".ip-group").show();

  }else{
    $(this).next().val(0);//关闭后状态标注为0
    $(".ip-group").hide();
  }
});

//答题次数限制
$("input[name='examTimesRestrict']").on("click",function(){
  if($(this).val()==1){
    $("input[name='examTimes']").hide();
  }else{
    $("input[name='examTimes']").show();
  }
});

//防作弊设置
$("body").on("input propertychange",".preventCheat input[type=text]",function() {
  var all_empty=true; //判断是否该项的所有输入框都为空
  $(this).parents(".form-inline").find("input[type='text']").each(function(){
    if($(this).val()!=""){
      all_empty=false;
    }
  });
  if($(this).val()!=""){
    $(this).parents(".form-inline").find("input[type='checkbox']").prop("checked",true);
  }
  if(all_empty){
    $(this).parents(".form-inline").find("input[type='checkbox']").prop("checked",false);
  }

});
//切屏勾选后秒数默认为5

$(".preventCheat input[name='setFullScreen']").change(function() {
  if($(this).is(":checked")){
    $(".preventCheat .switchScreenSecond").val(5);
  }else{
    $(".preventCheat .switchScreenSecond").val("");
  }
});

// 击败百分比设置
$("body").on("click",".switch-Beatratio",function(){
  if($(this).prop("class").indexOf("switch-on") != -1){
    $(".beatratio-content").show();
  }else{
    $(".beatratio-content").hide();
  }
});
// 考试禁用启用
$("body").on("click",".exam-status-btn",function(){
  var examStatus = $(this).text();
  if(examStatus=='禁用考试'){
    $(this).text("开启考试");
    $(this).next().val(1);
    $(this).prev().text("已禁止");
    $(this).removeClass("btn-warning");
    $(this).addClass("btn-default");
  }else{
    $(this).text("禁用考试");
    $(this).next().val(0);
    $(this).prev().text("已启用");
    $(this).removeClass("btn-default");
    $(this).addClass("btn-warning");
  }
});


function changeReleaseWayVal(){
  $("input[name=releaseWay]").change(function (e) {
    var releaseWayVal = $("input[name='releaseWay']:checked").val();
    $("#releaseWaySwitch").val(releaseWayVal);
  })
}
$(function(){
  changeReleaseWayVal();
})
//关闭考后成绩显示时，隐藏其他选项
$(".switch-exam").on("click", function(e){
// $("body").on("click",".switch-exam",function(e){
  e.stopPropagation();
  e.preventDefault();
  var releaseWaySwitch = $("#releaseWaySwitch");
  if($(this).prop("class").indexOf("switch-on") != -1){
    $('.set_up_score').css('display','block');
    $(".setScanPaper").show();
    var releaseWayVal = $("input[name='releaseWay']:checked").val();
    $(releaseWaySwitch).val(releaseWayVal);
    $(".switch-exam-check").removeClass('switch-on').addClass('switch-off');
  }else{
    $('.set_up_score').css('display','none');
    $('.switch_scan_paper').removeClass('switch-on').addClass('switch-off');
    $(".setScanPaper").hide();
    $('.set_up_paper').css('display','none');
    $('.set_allow_answer').css('display','none');
    $(releaseWaySwitch).val(3);
    $('.setCorrectComment').hide();
    $('.switch-correct-comment').removeClass('switch-on').addClass('switch-off');
    console.log(111)
    $('.switch_scan_paper').css({
      'border-color' : '#dfdfdf',
      'box-shadow' : 'rgb(223, 223, 223) 0px 0px 0px 0px inset',
      'background-color' : 'rgb(255, 255, 255)'
    });
  }
});


//当开启评语时，隐藏结束语
$("body").on("click",".setRemark .switch-all",function(e){
  e.stopPropagation();
  e.preventDefault();
  if($(this).hasClass("switch-off")){
    $(".releaseNotice").hide();
    $(".setReleaseNotice").hide();
  }else{
    $(".releaseNotice").show();
    $(".setReleaseNotice").show();
  }
});

//允许查看试卷
$(".switch_scan_paper").on("click", function(e){
// $("body").on("click",".switch_scan_paper",function(e){
  e.stopPropagation();
  e.preventDefault();
  if($(this).prop("class").indexOf("switch-on") != -1){
    $('.set_allow_answer').css('display','inline-block');
    // $(".switch_scan_paper").removeClass('switch-on').addClass('switch-off');
    $('.set_up_paper').css('display','block');
    $("input[name='setAllowsPaperAnswer']").eq(0).prop('checked','checked'); //默认勾选显示解析
    $("input[name='is_paper_forever']").eq(0).prop('checked','checked'); //默认勾选永久查看
    $("#allowsPaperDays").val(""); //查看天数（表单提交值）清空
    $('#allow_p_a_days').val(""); //查看天数（填写框）清空
    $('.setCorrectComment').show();
    $('.switch-correct-comment').removeClass('switch-on').addClass('switch-off');
  }else{
    $('.set_allow_answer').css('display','none');
    $('.set_up_paper').css('display','none');
    // $('.switch_scan_paper').addClass('switch-on');

    $('.setCorrectComment').hide();
    $('.switch-correct-comment').removeClass('switch-on').addClass('switch-off');
  }
});

function setAllowsPaperDays(){//设置表单值，如果选择设置天数，则值为填写的天数 否则为永久查看
  var allowsPaperDays = $("#allowsPaperDays");
  if($("input[name='is_paper_forever']:checked").val()==1&&$('.switch_scan_paper').hasClass('switch-on')){//开启了允许查看试卷且设置了天数
    var days=$('#allow_p_a_days').val();
    allowsPaperDays.val(days);
  }else{
    allowsPaperDays.val(0);
  }
}

//IP设置点击添加按钮时，新增IP添加行
$("#addBtn").on('click',function(e){
  validate();
  //清空ip地址输入框
  $("input[name=ipStart]").val("");
  $("input[name=ipEnd]").val("");
});

//删除ip地址
function itemRemove(item){
  $(item).parents("ul").empty();
}

//对IP地址进行校验
function validate() {
  /* var reg = new RegExp("^\d+$");*/
  var reg = new RegExp("^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])(\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])){3}$");
  var start = $("input[name='ipStart']").val();
  var end = $("input[name='ipEnd']").val();

  if(start == "" || start == null) {
    alert("ip段开头不能为空");
  }else if(!reg.test(start)) {
    alert("请输入规范的IP段开头地址");
  }else if(end != "" && end != null && !reg.test(end)){
    alert("请输入规范的IP段结尾地址");
  }else{
    var start = $("input[name='ipStart']").val();
    var end = $("input[name='ipEnd']").val();
    if(end == "" || end == null){
      end = $("input[name='ipEnd']").val();
      var node = $("<ul class='list-group'>" + "<li class='list-group-item'>" + start + end + "<i class='delete icon icon-a_circlr_close' onclick='itemRemove(this);'></i>" + "</li>" + "</ul>");
      $(".add-content:last").append(node);
      //为生成的dom结构添加方法
    }else{
      end = "~"+$("input[name='ipEnd']").val();
      var node = $("<ul class='list-group'>" + "<li class='list-group-item'>" + start + end + "<i class='delete icon icon-a_circlr_close' onclick='itemRemove(this);'></i>" + "</li>" + "</ul>");
      $(".add-content:last").append(node);
      itemRemove(node);
    }
  }

}

//发布考试，复制链接和密码
//clipboard.js插件
var clipboard2 = new Clipboard('#exam_password',{
  text:function(){
    return "alex";
  }
});
var clipboardPass = new Clipboard('#copyPasswordLink');
clipboardPass.on('success', function(e) {
  // alert("复制成功!");
});

clipboardPass.on('error', function(e) {
  alert("复制失败,请重试");
});

//ip地址范围模态框，点击确定时，遍历item
$("#btnOk").on('click',function() {
  var items = $("ul.list-group").find("li.list-group-item"); //取得items;
  var content;
  var temp = "";
  $(items).each(function (i, item) { //循环遍历数组items
    content = $(this).text()+"#";//获取当前文本值
    temp += content;
    //console.log(item);//打印的是li
  });
  $("input[name='ipRange']").val(temp);
  if(temp == "" || temp == null){
    $("span.ip-content").text("当前还未设置ip范围");
  }else{
    //console.log("运行了");
    var newStr = temp.split("#")[0]+'等IP';
    var str = $("span.ip-content").text(newStr);
  }
});

$("#btn-first").on("click",function(){
  $("#guide-first").hide();
  $("#guide-second").show();
});
$("#btn-second").on("click",function(){
  $("#guide-second").hide();
  $("#guide-third").show();
});
$("#btn-third").on("click",function(){
  $("#guide-third").hide();
  $("#guide-fourth").show();
});
$("#btn-fourth").on("click",function(){
  $.ajax({
    type:'GET',
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/index/account/update_first_visit?firstUrl=examadmin/admin/exam_add",
    success:function (msg) {
    }
  });
  $("#guide-fourth").hide();
});
// 复制考试链接
var clipboard = new Clipboard('.btn-copy');

clipboard.on('success', function(e) {
  alert("复制成功!");
});

clipboard.on('error', function(e) {
  alert("复制失败,请重试");
});
//考前身份认证popover
$('#tryBtn').popover({
  container: '#tryBtn',
  html: true,
  title: '',
  trigger: 'hover',
  placement: 'right',
  delay: { "show": 0, "hide": 200 },
  content: function(){
    var html = '<p class="question">什么是"考前身份认证"？</p>'+
      '<p>学员提供身份证号及姓名，系统将会采集学员照片，并通过公安局数据库进行身份比对，比对身份信息与学员本人一致后，即可进入考试。每次比对需要收取一定的费用。</p>'+
      '<a href="/setting/account/admin_pay_center">去充值 &gt;</a>';
    return html;
  }
});

// 添加 switch 样式 用有样式的class是很麻烦的，因为会影响它的默认click事件添加的class的样式
function blueSwitch(dom) {
  dom.css({
    'border-color' : 'rgb(77,143,225)',
    'box-shadow' : 'rgb(77,143,225) 0px 0px 0px 16px inset',
    'background-color' : 'rgb(77,143,225)'
  });
}
function defaultSwitch(dom) {
  dom.css({
    'border-color' : '#dfdfdf',
    'box-shadow' : 'rgb(223, 223, 223) 0px 0px 0px 0px inset',
    'background-color' : 'rgb(255, 255, 255)'
  });
}
// 关联自定义任务
$('.isProcess').click(function(){
  if ($('.isProcess').hasClass('switch-off')){

    $('.department-box').hide();
    //
    $('input[name=setProcess]').val('1');
    $('.process_hidden').attr("hidden",'true');
    $(".examInformation").hide();
    $(".answerLimit").show();
    $("#verifyCount").show();
    $(".examPay").show();
    // 免登录考试关闭
    var loginWay = $('.loginWay');
    for (var i = 0; i < loginWay.length; i++) {
      var span = loginWay[i].querySelector('span');
      if ($(span).hasClass('switch-on')){
        $(span).removeClass('switch-on').addClass('switch-off')
      }
    }
  } else{
    if($('input[name=skipLogin]:checked').val() == 0){
      $('.department-box').show()
    }
    $('input[name=setProcess]').val('0');
    $('.process_hidden').removeAttr('hidden');
    $(".answerLimit").show();
    $("#verifyCount").show();
    if($('input[name=skipLogin]:checked').val()!=0){
      $(".examInformation").show();
    }
    $(".examPay").show();
  }
});
$('input[name=joinStatus]').click(function (e) {
  var val = Number($(this).val());//获取选择的value
  if(val===1){
    $('.department-show').show()
  }else{
    $('.department-show').hide()

  }
})

//免登录-指定部门
function showTargetDeptType(e,obj){ //弹出选择指定部门弹窗
  var x=(window.innerWidth-598)/2+e.clientX-130;
  var y=e.clientY-448-64+100+68; //64:部门下拉的高 --184
  selTargetDepModal.location.href = "/baseinfo/admin/tree/exam_sel_target_dep/";
  $("#selTargetDepModal").css({display:"inline-block",left:x+'px',top:y+"px"});
}
//接受指定部门数据
function selTargetDep(id){
  $(window.frames["selLoginModal"].document).find("input[name=select_deps]").val(id);
  $("input[name=select_deps]").val(id);
}
//关闭指定部门对话框
function hideSelTargetDep(e,obj) {
  $("#selTargetDepModal").hide();
}
//免登录信息弹窗关闭时关闭其中的部门选择弹窗
$('#loginModal').on('hide.bs.modal', function () {
  $("#selDeptModal").hide();
  $("#selTargetDepModal").hide();
})


$("body").on("change", ".phoneUpload", function() {
  $('#spinnerLoading').removeClass('hidden');
  var obj = document.getElementsByClassName('phoneUpload')[0];
  if(typeof obj.files[0] == "undefined"){
    return false;
  }
  if(obj.files[0].size > 1024*1024){
    $('#spinnerLoading').addClass('hidden');
    $('.error-text-tip').css('display','block');
  }else {
    $('.error-text-tip').hide();

    $("#uploadForm").submit();
    timeClock = window.setTimeout(function(){
      alert('上传中，请耐心等候！');
    },16*1000)
    obj.outerHTML=obj.outerHTML;
  }
});

$("#phoneFrame").on("load",function(){
  var msg = $(this).contents().find("body").text();
  if(msg!=''){
    msg=JSON.parse(msg);
    showExcelRes(msg);
  }
});

//导入excel结果反馈
function showExcelRes(msg) {
  var result = '';
  var questionEnterCount_var = 0;
  if (msg.success == true) {
    clearTimeout(timeClock);//上传成功时清除超时定时器;
    $('#spinnerLoading').addClass('hidden');
    console.log(msg);

    $('#success-div .success-title a').html(msg.bizContent.phoneExcelName);
    //successPhones phoneExcelName  phoneExcelUrl  phoneWhiteStatus
    $('#success-div .accessory').addClass('imgshow');
    $("input[name = phoneWhiteStatus]").val('1')
    $("input[name = phones]").val(msg.bizContent.successPhones);
    $("input[name = phoneExcelName]").val(msg.bizContent.phoneExcelName);
    $("input[name = phoneExcelUrl]").val(msg.bizContent.phoneExcelUrl);
    $(".success-title a").attr("href",msg.bizContent.phoneExcelUrl);
    $('#success-div').show();
  } else {
    clearTimeout(timeClock);//上传失败时清除超时定时器;
    $('#spinnerLoading').hide();

    $('#uploadErrorModal').modal({
      backdrop: "static",
      keyboard: false
    });
    $("input[name = phoneWhiteStatus]").val('0')
    $("input[name = phoneWhiteStatus]").val('0')
    $("input[name = phones]").val('')
    $("input[name = phoneExcelName]").val('')
    $("input[name = phoneExcelUrl]").val('')
    $('.accessory').removeClass('imgshow');
    $('.success-title a').html('');
    $(".success-title a").attr("href","#");

    msg.bizContent.failList.forEach(function(ele,value){
      result += '<li style="margin-bottom: 10px;">'+ ele + '</li>';
    });
    $('#error-div ol').html(result);
  }
}
