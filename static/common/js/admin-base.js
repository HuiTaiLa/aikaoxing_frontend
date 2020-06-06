function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
}
//loading和提示
$(function () {
  user = JSON.parse(window.localStorage.getItem("USER"))

  // ajaxstart with loading shown
    $( document ).ajaxStart(function() {
        $("#spinnerLoading").removeClass("hidden");
    });
    // ajaxstop with loading hidden
    $( document ).ajaxStop(function() {
        $("#spinnerLoading").addClass("hidden");
    });
  $.ajaxSetup({
    contentType:"application/x-www-form-urlencoded;charset=utf-8",
    headers:{
      Authentication:JSON.parse(window.localStorage.getItem("USER_TOKEN"))
    },
    statusCode: {
      404: function() {
        window.location.href="/admin/error/404";
      },
      504: function() {
        window.location.href="/admin/error/default";
      },
      500: function() {
        window.location.href="/admin/error/default";
      },
      429:function () {
        alert("您操作过于频繁！");
      },
      401:function () {
        window.location.href="/admin/error/401";
      },
      400:function () {
        window.location.href="/admin/error/400";
      },
      403:function () {
        window.location.href="/admin/error/403";
      },
    }
  });
  $('body').on('click', "#logoutBtn", function (e) {
    e.stopPropagation();
    e.preventDefault();

    $.ajax({
      type: "POST",
      cache : false,
      dataType: "json",
      url: "/api/admin/logout",
      data:{
        account:user.account,
        companyId:user.companyId
      },
      success: function(msg){
        var jump_url = msg.bizContent.url;
        window.location.href = jump_url;
      }
    });

  })



});
// set cookie
function setCookie(c_name,value){
  document.cookie=c_name+ "=" +escape(value);
}

// get cookie
function getCookie(c_name){
  if(document.cookie.length>0){
    var c_start=document.cookie.indexOf(c_name + "=")
    if(c_start!=-1){
      c_start=c_start + c_name.length+1;
      var c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1){
        c_end=document.cookie.length
      }
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

//保存 search 条件
function setSearchCookie(cName, obj){
  var expiresTime = new Date();
  expiresTime.setTime(expiresTime.getTime() + (24 * 60 * 60 * 1000));
  var cookieStr = "";
  for(var itemName in obj){//用javascript的for/in循环遍历对象的属性
    if(obj[itemName] != ""){
      cookieStr += itemName + "=" + obj[itemName] + "&&";
    }
  }
  cookieStr = cName + "=" + escape(cookieStr) + ";" + "expires=" + expiresTime.toUTCString();
  document.cookie = cookieStr;
}

//删除 cookie
function delCookie(cName) {
  document.cookie=cName+"='';"
}

//获取 search 条件
function getSearchCookie(cName, itemName){
  if(document.cookie.length>0){
    var itemValue = "";
    var cStart=document.cookie.indexOf(cName + "=");
    if(cStart!=-1){
      cStart=cStart + cName.length+1;
      var c_end=document.cookie.indexOf(";",cStart);
      if (c_end==-1){
        c_end=document.cookie.length
      }
      itemValue = unescape(document.cookie.substring(cStart,c_end));
      var itemStart = itemValue.indexOf(itemName + "=");
      if(itemStart > -1){
        var itemEnd = itemValue.indexOf("&&",itemStart);
        itemValue = itemValue.substring(itemStart+itemName.length+1, itemEnd);
        return itemValue;
      }else {
        return "";
      }
    }
  }
  return "";
}

// 显示发布成功对话框
function showSelOk(id, url, password,trialExamLink,type,isSkipLogin,typeText) {
  $('#sendForm').removeClass('hidden');
  $(".guide-pwd").addClass('hidden');

  $("#exam_url").text(url);
  //isSkipLogin : 0是普通登录；1是免登录；2是微信免登录
  if(isSkipLogin != 0){
    $('#sendForm').addClass('hidden');
  }
  if(password){
    $("#exam_password").html(password);
    $(".guide-pwd").removeClass('hidden');
  }
  if(type == 'exam'){
    var sendUrl = '/examadmin/admin/exam_notice/' + id;
  }else {
    var sendUrl = '/course/course_notice/' + id;
  }
  var jumpUrl ='';
  createQrcode(url);

  setTimeout(function(){
    createLinkDownLoad();
  },200);

  $("#confirmOkBtn").attr("data-type", type).attr("data-id", id);
  $("#trialExamBtn").prop("disabled", false).attr("data-url", trialExamLink)
    .attr("data-id", id).attr("data-type", type);

  $("#okModal .link_title").text(typeText+"链接");
  $("#okModal .link_tip_title").text(typeText+"地址");
  $("#okModal .sendForm .tip_title").text("发送"+typeText+"通知");

  $('#okModal').modal();
}

//okmodal点击确定
$("#confirmOkBtn").click(function () {
  var type = $(this).attr("data-type");
  var id = $(this).attr("data-id");
  var jumpUrl = '', sendUrl = '';
  var ref=document.referrer;//上一页面url
  var url=document.URL;//当前页url
  var linkToOther=true;//是否要跳转到其他页面
  var isOpenUrl=false; //是否是直接复制链接而非跳转过来
  if(url.indexOf('/admin/home')!=-1||url.indexOf('/course/course_mgr')!=-1||url.indexOf('/admin/exam_list')!=-1){ //如果当前是首页、考试列表页、课程列表页，直接跳到本页面
    linkToOther=false;
  }
  if(ref==""&&url.indexOf('/admin/home')==-1&&url.indexOf('/course/course_mgr')==-1&&url.indexOf('/admin/exam_list')==-1){ //上一页面为空，且不是首页、考试列表页、课程列表页
    isOpenUrl=true;
  }
  //弹窗跳转逻辑优化  1.优先在哪点的回到哪 2.最差也是都回到列表页面
  if(type=='exam'){
    if(sessionStorage.getItem('ksxSaveData')){
      sessionStorage.setItem('ksxSaveData',0)
    }
    if(url.indexOf('/admin/exam_add')!=-1){ //创建考试的情况
      var okModalRef=window.localStorage.getItem('okModalExamRef');
      if(okModalRef=='index'){
        jumpUrl = getStaticUrlPrefix + '/admin/home/';
      }else{
        jumpUrl = '/admin/exam_list/';
      }
    }else {
      if(isOpenUrl) { //如果是复制链接进来的，让其跳转到列表页
        jumpUrl = '/admin/exam_list/';
      }else{
        if (linkToOther) {
          if (ref.indexOf('index') != -1) {
            jumpUrl = getStaticUrlPrefix + '/admin/home/';
          } else {
            jumpUrl = '/admin/exam_list/';
          }
        }else{
          jumpUrl = url;
        }
      }
    }
    sendUrl = '/examadmin/admin/exam_notice/' + id;
  }else if(type == 'course'){
    if(isOpenUrl){ //如果是复制链接进来的，让其跳转到列表页
      // jumpUrl = '/course/course_mgr';
      jumpUrl = getStaticUrlPrefix + '/admin/course';
    }else {
      if (linkToOther) {
        if (ref.indexOf('index') != -1) {
          jumpUrl = getStaticUrlPrefix + '/admin/index/#/index';
        }else {
          jumpUrl = getStaticUrlPrefix + '/admin/course';
        }
      }else {
        jumpUrl = url;
      }
    }
    sendUrl = '/course/course_notice/' + id;
  }
  sendNotice(sendUrl,jumpUrl);
});

//okmodal点击考一下
$("#trialExamBtn").click(function () {
  var type = $(this).attr("data-type");
  var id = $(this).attr("data-id");
  var jumpUrl = $(this).attr("data-url"), sendUrl = '';

  if(type=='exam'){
    if(sessionStorage.getItem('ksxSaveData')){
      sessionStorage.setItem('ksxSaveData',0)
    }
    sendUrl = '/examadmin/admin/exam_notice/' + id;
  }else if(type == 'course'){
    sendUrl = '/course/course_notice/' + id;
  }
  sendNotice(sendUrl,jumpUrl);
});

//生成二维码
function createQrcode(examUrl) {
  //二维码生成
  $("#invite-link-qrcode").html("");
  $("#invite-link-qrcode").qrcode({
    width: 150,
    height: 150,
    text: examUrl,
    background: "#FFF"
  });
  $(".linkImgDownLoad .qr_code .code_img").html(""); //新的二维码链接图片下载，生成二维码
  $(".linkImgDownLoad .qr_code .code_img").qrcode({
    size: 150,
    text: examUrl,
    background: "#FFF"
  });
  //clear canvas before download again
  $("#small").html("");
  $("#medium").html("");
  $("#large").html("");

  $("#small").qrcode({
    width: 560,
    height: 560,
    text: examUrl,
    background: "#FFF"
  });
  var download0 = $("#small canvas")[0];
  $("a[download-size=0]").click(function() {
    if (download0.msToBlob) {//IE9+浏览器下载二维码
      var blob = download0.msToBlob();
      window.navigator.msSaveBlob(blob, $("input[name=examName]").val() + "_二维码小.png");
    }else{ //其他浏览器下载二维码
      this.href = download0.toDataURL();
      this.download = $("input[name=examName]").val() + "_二维码小.png";
    }
  });

  $("#medium").qrcode({
    width: 1050,
    height: 1050,
    text: examUrl,
    background: "#FFF"
  });
  var download1 = $("#medium canvas")[0];
  $("a[download-size=1]").click(function() {
    if (download1.msToBlob) {//IE9+浏览器
      var blob = download1.msToBlob();
      window.navigator.msSaveBlob(blob, $("input[name=examName]").val() + "_二维码中.png");
    }else{
      this.href = download1.toDataURL();
      this.download = $("input[name=examName]").val() + "_二维码中.png";
    }
  });

  $("#large").qrcode({
    width: 3500,
    height: 3500,
    text: examUrl,
    background: "#FFF"
  });
  var download2 = $("#large canvas")[0];
  $("a[download-size=2]").click(function() {
    if (download2.msToBlob) {//IE9+浏览器
      var blob = download2.msToBlob();
      window.navigator.msSaveBlob(blob, $("input[name=examName]").val() + "_二维码大.png");
    }else {
      this.href = download2.toDataURL();
      this.download = $("input[name=examName]").val() + "_二维码大.png";
    }
  });
}

//发送通知
function sendNotice(url,jumpUrl) {
  // var dataForm = $('#sendForm').serialize();
  var sendWay ='';
  var isSendNotice = $("#sendForm input:checked").length;
  if(isSendNotice == 0){
    window.location.href = jumpUrl;
  }else {
    $('#sendForm input:checked').each(function(index,ele) {
      sendWay += $(ele).prop('id')+',';
    });
    sendWay = sendWay.substring(0,sendWay.length-1);
    $.ajax({
      type: "POST",
      cache: false,
      headers: { "cache-control": "no-cache" },
      dataType: "json",
      url: url,
      data: 'sendWay=' + sendWay,
      success: function (msg) {
        if (msg.success == true) {
          $(".sendAnimation").addClass("sendTips");
          // 动画完成后的动作
          var compAnimation = $(".sendAnimation").get(0);
          compAnimation.addEventListener("animationend", animationEndFunction(jumpUrl));
        } else {
          alert(msg.desc);
        }
      }
    });
  }
}

// 提示动画完成后
function animationEndFunction(jumpUrl) {
  $('#okModal .modal-content').hide();
  $("#animationLoading").removeClass("hidden");
  setTimeout(function(){
    window.location.href = jumpUrl;
  },1000);
}

//设置下载链接图片的参数
function setLinkDownloadConfig(type,title,start_time,end_time,exam_time){
  if(type=="考试"&&exam_time!=""){
    $(".linkImgDownLoad .time .exam_time").show();
    $(".linkImgDownLoad .time .exam_time span").text(exam_time);
  }else{
    $(".linkImgDownLoad .time .exam_time").hide();
  }
  $(".linkImgDownLoad .time .start_time span").text(start_time);
  $(".linkImgDownLoad .time .end_time span").text(end_time);
  $(".linkImgDownLoad .activity_type").text(type);
  $(".linkImgDownLoad .title_content").text(title);
  $(".linkImgDownLoadBtn").attr("href","");//先清空图片数据
}

function createLinkDownLoad(){

  var shareContent = $('.linkImgDownLoad')[1]; //用来截图的div是第二个class=linkImgDownLoad的元素
  var width = shareContent.offsetWidth;
  var height = shareContent.offsetHeight;
  var canvas = document.createElement("canvas");
  var scale = 1;
  // 放大画布
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.getContext("2d").scale(scale, scale);

  //html2canvas相关参数
  var opts = {
    scale: scale,
    canvas: canvas,
    logging: false,
    width: width,
    height: height,
    useCORS: true
  };
  html2canvas(shareContent, opts).then(function (canvas) {

    var context = canvas.getContext('2d');
    if(context) {
      context.scale(2,2);
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
    }
    $(".linkImgDownLoadBtn").attr("href",canvas.toDataURL());
  });
}
