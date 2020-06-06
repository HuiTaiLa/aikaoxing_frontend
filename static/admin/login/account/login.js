var timeClock;
var times = 60;
window.localStorage.clear()//清空缓存
var nextUrl = getQueryString("nextUrl");
//考生注册人数上限校验
$(".btn-examinee-reg").click(function (e) {
  e.stopPropagation();
  e.preventDefault();

  $.ajax({
    type: "POST",
    cache: false,
    headers: {
      "cache-control": "no-cache"
    },
    dataType: "text",
    url: "/login/account/checkout_staff_count",
    data: "companyId=" + $("input[name=companyId]").val(),
    success: function (msg) {
      if (JSON.parse(msg).result) {
        window.location.href = "/login/account/register/" + $("input[name=companyId]").val();
      } else {
        $("#userOverModal").modal();
      }
    }
  });
});
// companyId = window.location.href.split("#/")[1]
//用户登录
function userLogin(isTechSupportLogin) {
  if (loginType == 0) {
    if (checkWMPhone()) {
      var dataForm = $("#phoneAccount, #authCode").serialize();
      $("#loginBtn").addClass("disabled");
      $.ajax({
        type: "POST",
        cache: "false",
        headers: {
          "cache-control": "no-cache"
        },
        // dataType: "json",
        url: "/api/login/account/p_check",
        data: "phone=" + $("#phoneAccount").val() + "&verifycode=" + $("#authCode").val(),
        success: function (msg) {
          if (msg.success) {
            $("#techSupportModal").modal("hide");
            if (msg.bizContent.isBindWechat != '2' && msg.bizContent.isBind == 'false') {
              $("#loginBtn").removeClass("disabled");
              $(".logo,.login-form").hide();
              $(".loginWechet").show();
              //如果是必须绑定微信，则隐藏"先不绑定，直接登录"
              if (msg.bizContent.isBindWechat == 0) {
                $(".btn-goto-login").hide();
              }
              $("#loginWechet .btn-goto-bind").prop("href", msg.bizContent.redirectUrl);
              $("#loginWechet .btn-goto-login").prop("href", msg.bizContent.url);
            } else {
              window.localStorage.setItem("USER_TOKEN",JSON.stringify(msg.bizContent.token));//设置USER_TOKEN
              window.localStorage.setItem("EXPIRE_TIME",JSON.stringify(msg.bizContent.exipreTime));//设置EXPIRE_TIME
              window.localStorage.setItem("USER",JSON.stringify(msg.bizContent.user));//设置USER
              window.localStorage.setItem("PERMISSIONS",JSON.stringify(msg.bizContent.permissions));//设置PERMISSIONS
              window.localStorage.setItem("ROLES",JSON.stringify(msg.bizContent.roles));//设置ROLES
              var user = JSON.parse(window.localStorage.getItem("USER"));
              var token = JSON.parse(window.localStorage.getItem("USER_TOKEN"));
              var url =msg.bizContent.url;
              // if (user.roleName == 'staff') {//如果是员工角色
              //   return window.location.href = url;
              // }else{
                $.ajax({
                  // type: "POST",
                  cache: "false",
                  headers: {
                    "cache-control": "no-cache",
                    "Authentication":token
                  },
                  // dataType: "json",
                  url: "/api/menu/" + user.account + "/" + user.companyId,
                  success: function (msg) {
                    window.localStorage.setItem("USER_ROUTER",JSON.stringify(msg.block));
                    if (nextUrl != '') {
                      return window.location.href = nextUrl;
                    }
                    window.location.href = url;
                  }
                })
              }
            // }
          } else {
            if (msg.code == 33085) { //技术支持中
              $("#techSupportModal .model-head").text(msg.desc);
              $("#techSupportModal").modal("show");
              $("#loginBtn").removeClass("disabled");
            } else {
              $("#loginBtn").removeClass("disabled");
              $("#errormsg").text(msg.desc);
            }
          }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
          console.log(XMLHttpRequest, textStatus, errorThrown)
          $("#loginBtn").removeClass("disabled");
          // $("#errormsg").text(e.desc);
        }
      })
    }
  } else if (loginType == 1) {
    if (checkWM()) {
      var wm = document.form_wm;
      var remember = "";

      var filter1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var filter2 = /^([a-zA-Z0-9_\.\-])+\@([0-9])+$/;
      var filter3 = /^([a-zA-Z0-9_\.\-@])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var username = $.trim($('#username').val());
      $('#username').val(username);

      var dataForm, password;
      // var nextUrl = getQueryString("nextUrl");

      if (domain != "") {
        //独立入口
        // if (filter1.test(username) || filter2.test(username)) {
        //     $("#username_tran").val(username);
        // } else {
        if (username.lastIndexOf("@") == -1) { //不包含@，直接加'@公司id'
          $("#username_tran").val(username + '@' + domain);
        } else {
          if (username.substring(username.lastIndexOf("@") + 1, username.length) != domain) { //最后的@的后面内容不等于公司id，加上公司id
            $("#username_tran").val(username + '@' + domain);
          } else {
            $("#username_tran").val(username);
          }
        }

        // }

        dataForm = $("#loginForm [type!=password]").serialize();
        password = $("#loginForm [name=password]").val();

        dataForm += "&password=" + password;

        //默认为英文
        if (domain == '46561') {

          var cookieName = "language";
          var cookieValue = "en";
          var expiresTime = "86400";

          $.ajax({
            type: "POST",
            cache: "false",
            headers: {
              "cache-control": "no-cache"
            },
            async: false,
            url: "/login/account/set_cookie",
            data: "cookieName=" + cookieName + "&cookieValue=" + cookieValue + "&expiresTime=" + expiresTime,
            success: function (msg) {}
          })

        }
        $("#loginBtn").addClass("disabled");
        dataForm += "&remember=" + remember;
        if (isTechSupportLogin) { //技术支持中的登录
          dataForm += "&isLogin=" + "true";
        }
        $.ajax({
          type: "POST",
          cache: "false",
          headers: {
            "cache-control": "no-cache"
          },
          dataType: "json",
          url: "/api/login/account/login",
          data: dataForm,
          success: function (msg) {
            if (msg.success) {
              //判断是否开启微信绑定且账号是否已经绑定过微信
              if (msg.bizContent.isBindWechat != '2' && msg.bizContent.isBind == 'false') {
                $("#loginBtn").removeClass("disabled");
                $(".logo,.login-form").hide();
                $(".loginWechet").show();
                //如果是必须绑定微信，则隐藏"先不绑定，直接登录"
                if (msg.bizContent.isBindWechat == 0) {
                  $(".btn-goto-login").hide();
                }
                $("#loginWechet .btn-goto-bind").prop("href", msg.bizContent.redirectUrl);
                $("#loginWechet .btn-goto-login").prop("href", msg.bizContent.url);
              } else {
                window.location.href = msg.bizContent.url;
              }
              $("#techSupportModal").modal("hide");
            } else {
              if (msg.code == 33085) { //技术支持中
                $("#techSupportModal .model-head").text(msg.desc);
                $("#techSupportModal").modal("show");
                $("#loginBtn").removeClass("disabled");
              } else {
                $("#loginBtn").removeClass("disabled");
                $("#errormsg").text(msg.desc);
              }
            }
          }
        })
      } else {
        //公共入口

        if (filter2.test(username) || filter3.test(username) || (/^\d{11}$/.test(username))) {//输入了@
          $("#username_tran").val(username);

          dataForm = $("#loginForm [type!=password]").serialize();
          password = $("#loginForm [name=password]").val();

          dataForm += "&password=" + password ;

          $("#loginBtn").addClass("disabled");
          dataForm += "&remember=" + remember;
          if (isTechSupportLogin) { //技术支持中的登录
            dataForm += "&isLogin=" + "true";
          }
          $.ajax({
            type: "POST",
            cache: "false",
            headers: {
              "cache-control": "no-cache",
            },
            dataType: "json",
            url: "/api/login/account/login",
            data: dataForm,
            success: function (msg) {
              // console.log(msg)
              if (msg.success) {
                if (msg.bizContent.isBindWechat != '2' && msg.bizContent.isBind == 'false') {
                  $("#loginBtn").removeClass("disabled");
                  $(".logo,.login-form").hide();
                  $(".loginWechet").show();
                  //如果是必须绑定微信，则隐藏"先不绑定，直接登录"
                  if (msg.bizContent.isBindWechat == 0) {
                    $(".btn-goto-login").hide();
                  }
                  $("#loginWechet .btn-goto-bind").prop("href", msg.bizContent.redirectUrl);
                  $("#loginWechet .btn-goto-login").prop("href", msg.bizContent.url);
                } else {
                  window.localStorage.setItem("USER_TOKEN",JSON.stringify(msg.bizContent.token));//设置USER_TOKEN
                  window.localStorage.setItem("EXPIRE_TIME",JSON.stringify(msg.bizContent.exipreTime));//设置EXPIRE_TIME
                  window.localStorage.setItem("USER",JSON.stringify(msg.bizContent.user));//设置USER
                  window.localStorage.setItem("PERMISSIONS",JSON.stringify(msg.bizContent.permissions));//设置PERMISSIONS
                  window.localStorage.setItem("ROLES",JSON.stringify(msg.bizContent.roles));//设置ROLES
                  var user = JSON.parse(window.localStorage.getItem("USER"));
                  var token = JSON.parse(window.localStorage.getItem("USER_TOKEN"));
                  var url =msg.bizContent.url;
                  // if (user.roleName == 'staff') {//如果是员工角色
                  //   if (nextUrl != '') {
                  //     return window.location.href = nextUrl;
                  //   }
                  //   return window.location.href = url;
                  // }else {
                    $.ajax({
                      // type: "POST",
                      cache: "false",
                      headers: {
                        "cache-control": "no-cache",
                        "Authentication":token
                      },
                      // dataType: "json",
                      url: "/api/menu/" + user.account + "/" + user.companyId,
                      success: function (msg) {
                        // console.log(msg)
                        window.localStorage.setItem("USER_ROUTER",JSON.stringify(msg.block));
                        if (nextUrl != '') {
                          return window.location.href = nextUrl;
                        }
                        window.location.href = url;
                      }
                    })
                  // }
                }
                $("#techSupportModal").modal("hide");
              } else {
                if (msg.code == 33085) { //技术支持中
                  $("#techSupportModal .model-head").text(msg.desc);
                  $("#techSupportModal").modal("show");
                  $("#loginBtn").removeClass("disabled");
                } else {
                  $("#loginBtn").removeClass("disabled");
                  $("#errormsg").text(msg.desc);
                }
              }
            }
          })
        }
        else if(window.location.href.split('#/')[1]){
          $("#username_tran").val(username+'@'+ window.location.href.split('#/')[1]);

          dataForm = $("#loginForm [type!=password]").serialize();
          password = $("#loginForm [name=password]").val();

          dataForm += "&password=" + password ;

          $("#loginBtn").addClass("disabled");
          dataForm += "&remember=" + remember;
          if (isTechSupportLogin) { //技术支持中的登录
            dataForm += "&isLogin=" + "true";
          }
          $.ajax({
            type: "POST",
            cache: "false",
            headers: {
              "cache-control": "no-cache",
            },
            dataType: "json",
            url: "/api/login/account/login",
            data: dataForm,
            success: function (msg) {
              // console.log(msg)
              if (msg.success) {
                if (msg.bizContent.isBindWechat != '2' && msg.bizContent.isBind == 'false') {
                  $("#loginBtn").removeClass("disabled");
                  $(".logo,.login-form").hide();
                  $(".loginWechet").show();
                  //如果是必须绑定微信，则隐藏"先不绑定，直接登录"
                  if (msg.bizContent.isBindWechat == 0) {
                    $(".btn-goto-login").hide();
                  }
                  $("#loginWechet .btn-goto-bind").prop("href", msg.bizContent.redirectUrl);
                  $("#loginWechet .btn-goto-login").prop("href", msg.bizContent.url);
                } else {
                  window.localStorage.setItem("USER_TOKEN",JSON.stringify(msg.bizContent.token));//设置USER_TOKEN
                  window.localStorage.setItem("EXPIRE_TIME",JSON.stringify(msg.bizContent.exipreTime));//设置EXPIRE_TIME
                  window.localStorage.setItem("USER",JSON.stringify(msg.bizContent.user));//设置USER
                  window.localStorage.setItem("PERMISSIONS",JSON.stringify(msg.bizContent.permissions));//设置PERMISSIONS
                  window.localStorage.setItem("ROLES",JSON.stringify(msg.bizContent.roles));//设置ROLES
                  window.location.href = msg.bizContent.url;
                }
                $("#techSupportModal").modal("hide");
              } else {
                if (msg.code == 33085) { //技术支持中
                  $("#techSupportModal .model-head").text(msg.desc);
                  $("#techSupportModal").modal("show");
                  $("#loginBtn").removeClass("disabled");
                } else {
                  $("#loginBtn").removeClass("disabled");
                  $("#errormsg").text(msg.desc);
                }
              }
            }
          })
        }
        else {
          if (username == 'admin') {
            $("#errormsg").text('请补全账号后缀');
          } else {
            $("#errormsg").text('非管理员请从机构独立入口登录，独立入口请联系组织者获取');
          }
        }
      }
    }
  }
}

function checkEmpty(e) {
  if (e.attr('name') == 'phoneAccount') {
    checkPhone();
  } else if(e.attr('name') == 'authCode'){
    checkAuthcode();
  }
}
function checkAuthcode(){
  var textValue = $("#authCode").val();
  var reg = /^[0-9]+$/;
  if(textValue == "") {
    $("#errormsg").text("验证码不能为空");
    return false;
  }
  if(!reg.test(textValue)) {
    $("#errormsg").text("验证码只能为数字");
    return false;
  }
  return true;
}
//检查手机号格式是否正确
function checkPhone() {
  var $phone = $("#phoneAccount");
  var phoneNumber = $phone.val();
  var length = phoneNumber.length;
  var reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;

  if (length == 0 && phoneNumber == "") {
    //$tip.text("请输入手机号");
    $(".phone-account.item .icon-a_success").hide();
    $("#errormsg").text("请输入手机号");
    return false;
  } else if (!reg.test(phoneNumber)) {
    //$tip.text("请输入正确手机号");
    $(".phone-account.item .icon-a_success").hide();
    $("#errormsg").text("请输入正确手机号");
    return false;
  } else {
    $("#errormsg").text("");
    $(".phone-account.item .icon-a_success").show();
    $(".item.auth-code .code-box .code-hint").addClass("right");
    return true;
  }
}

//获取验证码
$(".item.auth-code .code-box .code-hint").click(function (e) {
  if ($(this).hasClass('right')) {
    $(this).removeClass("right");
    $.ajax({
      type: "POST",
      cache: false,
      headers: {
        "cache-control": "no-cache"
      },
      dataType: "text",
      url: "/api/login/account/s_check",
      data: "phone=" + $("#phoneAccount").val(),
      success: function (jsondata) {
        // console.log(jsondata)
        jsondata = JSON.parse(jsondata);
        if (jsondata.success) {
          authCodeSucc();
          $("#errormsg").text("");
        } else {
          $("#errormsg").text(jsondata.desc);
          $(".item.auth-code .code-box .code-hint").addClass("right");
        }
      }
    });
  } else {
    return;
  }
});
//验证码获取成功后倒计时
function authCodeSucc() {
  $(".item.auth-code .code-box .code-hint").removeClass("right").addClass("ing");
  timeClock = window.setInterval(function(){
    times--;
    if (times == 0) {
      clearInterval(timeClock);
      $(".item.auth-code .code-box .code-hint").removeClass("ing").addClass("right");
      $(".item.auth-code .code-box .code-hint").text('获取验证码');
      times = 60;
      return;
    }
    $(".item.auth-code .code-box .code-hint").text(times + 's后获取');
  }, 1000);
}

//解析url中的参数
function getQueryString(name) {
  var reg = new RegExp('(^|&?)' + name + '=(.*|$)', 'i');
  var r = window.location.href.match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
}

//检查用户的表单信息(账号密码登录时)
function checkWM() {
  if ($.trim($("#username").val()) == "") {
    alert("账号不能为空！\r\r请重新填写！");
    $("#username").focus();
    return false;
  }
  if ($("#userTypePwd").val() == "") {
    alert("用户密码不能为空！\r\r请重新填写！");
    $("#userTypePwd").focus();
    return false;
  }
  return true;
}
//检查用户的表单信息(手机验证码登录时)
function checkWMPhone() {
  if (!checkPhone()) {
    $("#phoneAccount").focus();
    return false;
  }
  if (!checkAuthcode()) {
    $("#authCode").focus();
    return false;
  }
  $("#errormsg").text("");
  return true;
}

//账号密码登录
$(".login-type-btn.account-type").click(function (e) {
  $(".username.item").show();
  $(".password.item").show();
  $(".phone-account.item").hide();
  $(".auth-code.item").hide();
  $(".login-type-btn.account-type").hide();
  $(".login-type-btn.phone-type").show();
  $("#errormsg").text("");
  loginType = 1;
});
//手机号登录
$(".login-type-btn.phone-type").click(function (e) {
  $(".username.item").hide();
  $(".password.item").hide();
  $(".phone-account.item").show();
  $(".auth-code.item").show();
  $(".login-type-btn.account-type").show();
  $(".login-type-btn.phone-type").hide();
  $("#errormsg").text("");
  loginType = 0;
});

//input效果
$(".item input").on({
  "focus": function (e) {
    e.stopPropagation();
    e.preventDefault();

    var _this = $(this);
    var _item = _this.parent(".item");
    var _label = _item.children("label");
    _item.stop().animate({
      "paddingLeft": 0
    }, 200);
    _label.css("color", "#B4B6BD").stop().animate({
      "bottom": "25px",
      "fontSize": "12px"
    }, 200);
    _item.addClass("focus");
    //checkEmpty();
  },
  "blur": function () {
    var _this = $(this);
    var _item = _this.parent(".item");
    var _label = _item.children("label");
    if ($.trim(_this.val()) == '') {
      _item.stop().animate({
        "paddingLeft": "50px"
      }, 200);
      _label.css("color", "#3A3E51").stop().animate({
        "bottom": "2px",
        "fontSize": "14px"

      }, 200);
    } else {
      $("#loginBtn").addClass('right');
    }
    _item.removeClass("focus");
    checkEmpty(_this);
  },
  "change": function () {
    //checkEmpty();
  },
  "input": function () {
    //checkEmpty();
    if ($(this).attr('name') == 'phoneAccount') {
      checkPhone();
    }
  }
});
//登录
$("#loginBtn").click(function (e) {
  userLogin(false);
});
//回车登录
$('.login-wrap').keypress(function (event) {
  if (event.keyCode == '13') {
    userLogin(false);
    event.preventDefault();

  }
});
//技术支持过程中登录
$("#loginWhileTechSup").click(function (e) {
  userLogin(true);
});

//中英文切换
// 设置为英文
$("#switchLang").click(function (e) {
  e.stopPropagation();
  e.preventDefault();

  var cookieName = "language";
  var cookieValue = "en";
  var expiresTime = "86400";

  $.ajax({
    type: "POST",
    cache: "false",
    headers: {
      "cache-control": "no-cache"
    },
    url: "/login/account/set_cookie",
    data: "cookieName=" + cookieName + "&cookieValue=" + cookieValue + "&expiresTime=" + expiresTime,
    success: function (msg) {
      if (msg == 'true') {
        window.location.href = window.location.href + "?" + Math.random();
      }
    }
  });
});

if (domain != "") {
  var text = "@" + domain;
  $(".domainText_user").text(text);
  $(".domainText_admin").text(text);
  $(".username.item").show();
  $(".password.item").show();
  $(".phone-account.item").hide();
  $(".auth-code.item").hide();
  $(".login-type-btn.account-type").hide();
  $(".login-type-btn.wechat").addClass('domain');
  $(".login-type-btn.phone-type").hide();
  loginType = 1;
}
if (jumpSource == 'app') {
  $(".login-type-btn.account-type").addClass('app');
  $(".login-type-btn.phone-type").addClass('app');
}

function checkBroswerWebKit(){
  var u = navigator.userAgent, app = navigator.appVersion;
  return u.indexOf('AppleWebKit') > -1;
}

if(!checkBroswerWebKit()) {
  $(".browserHint").slideToggle();
}
