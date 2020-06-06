
var companyId = ""; //公司id
$.ajaxSetup({
  contentType:"application/x-www-form-urlencoded;charset=utf-8",
  complete:function(XMLHttpRequest,textStatus){
    // console.log(XMLHttpRequest,textStatus)
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

$(function () {
  //页面加载loading
  $("#spinnerLoading").addClass("hidden");

  // ajaxstart with loading shown
  $( document ).ajaxStart(function() {
    $("#spinnerLoading").removeClass("hidden");
  });
  // ajaxstop with loading hidden
  $( document ).ajaxStop(function() {
    $("#spinnerLoading").addClass("hidden");
  });


  //读取用户自定义LOGO
  if($("#companyLogo").length>0){
    var _this = $("#companyLogo");

    $.ajax({
      type: "GET",
      cache : false,
      dataType: "json",
      url: "/setting/admin/modify_get_logo",
      success: function(msg){
        if(msg.success){
          var logo_url = msg.bizContent.logoUrl;
          var img = '<img class="icon-logo logo-ksx" src="'+logo_url+'" />';
          $(_this).append(img);
        }
      }
    });
  }

  // 退出登录(清空cookie,session&&sessionId)
  $("#logoutBtn").click(function (e) {
    e.preventDefault();

    $("#logoutModal").modal();
  });

  //确认退出登录
  $("#confirmLogoutBtn").click(function () {
    $.ajax({
      type: "POST",
      cache : false,
      dataType: "json",
      url: "/login/account/logout",
      xhrFields:{
        withCredentials: true
      },
      crossDomain: true,
      success: function(msg){
        var jump_url = msg.bizContent.url;
        window.location.href = jump_url;

      }
    });
  });

  //第三方需求，隐藏logo和退出，返回
  $(function () {
    //获取cookie
    var thirdParty = getCookie('thirdParty');

    if(thirdParty=='true'){
      $("#logoutBtn, .back-icon").addClass("hidden");
    }
  });
});

// set cookie
function setCookie(cookieName, cookieValue, expiresTime){
  $("#spinnerLoading").addClass("hide");

  $.ajax( {
    type:"post",
    url:"/login/account/set_cookie",
    dataType:"json",
    data: "cookieName=" + cookieName + "&cookieValue=" + cookieValue + "&expiresTime=" + expiresTime,
    success:function(msg){
      $("#spinnerLoading").removeClass("hide");
      return msg;
    },
    error:function (msg) {
      $("#spinnerLoading").removeClass("hide");
    }
  });

}


// get cookie
function getCookie(c_name){
  if(document.cookie.length>0){
    c_start=document.cookie.indexOf(c_name + "=")
    if(c_start!=-1){
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1){
        c_end=document.cookie.length
      }
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

function is_mobile(){//是否移动端设备判断
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  var bIsWx=sUserAgent.match(/MicroMessenger/i)=="micromessenger";
  return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWx;
}
