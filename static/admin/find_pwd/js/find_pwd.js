$(function () {
  var old_account='';
  var account='';
  var old_phone = '';
  var old_captcha = '';
  //验证手机号格式
  var tel_check = false;
  //验证账号是否存在
  var account_exist = false;
  //验证账号与手机号码是否匹配
  var account_match_tel = false;
  //验证图形码
  var captcha_check = false;
  window.localStorage.clear()//清空缓存

  $.ajax({
    url: "/api/login/account/gen_captcha",
    success:function (res) {
      if(res.success){
        key = res.bizContent.key;
        // console.log(res.bizContent.img)
        $("#captchaImg").attr("src", res.bizContent.img);
      }
      else{
        $("#captchaImg").attr("src", "/static/images/加载失败.png");
        // alert("获取图形验证码失败！");
      }
    }

  })

  //校验账号
  var checkAccount = function () {
    var reg1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var reg2 = /^([a-zA-Z0-9_\.\-])+\@([0-9])+$/;
    var reg3 = /^1(3|4|5|7|8|9)\d{9}$/;
    var _this = $(this);
    var value = $(_this).val();
    if(value) {
      $('.hintAccount').addClass('cus-show');
    } else {
      $('.hintAccount').removeClass('cus-show');
    }
    if(domain==''){
      //公共入口
      if(reg1.test(value)||reg2.test(value)||reg3.test(value)){
        old_account = account;
        account = value;
      }else {
        old_account = account;
        account = '';
        $("#errorInfo").removeClass("hidden").text("账号格式错误");
      }
    }else {
      //独立入口
      if(reg1.test(value)||reg2.test(value)){
        account = value;
      }else {
        account = value + '@' + domain;
      }
    }
    // console.log("new account",account,"old account,",old_account);
    if(account && account !=old_account ) {
      $.ajax({
        type: "GET",
        cache: false,
        headers: {"cache-control": "no-cache"},
        dataType: "json",
        url: "/api/login/account/check_account_exist?account=" + account,
        success: function (msg) {
          if (msg.success) {
            account_exist = true;
            $("#errorInfo").addClass("hidden");
            if (tel_check) {
              $.ajax({
                data: {"account": account, "phone": $(".item-phone input").val()},
                url: "/api/login/account/check_account_phone_match",
                success: function (msg) {
                  if (!msg.success) {
                    account_match_tel = false;
                    $("#errorInfo").removeClass("hidden").text("手机与账号不匹配");
                  } else {
                    account_match_tel = true;

                    if (captcha_check) {
                      $("#findPwdBtn").removeClass("disabled");
                    }
                    $("#errorInfo").addClass("hidden");
                  }
                }
              });
            }
          } else {
            account_exist = false;
            $("#errorInfo").removeClass("hidden").text(msg.desc);
          }
        }
      });
    }
  }

  //账号输入框blur时校验账号
  $(".item-account input").blur(checkAccount);

  //校验手机号与账号是否匹配
  var checkTel = function () {
    if(!account){
      alert("请先填写用户账号");
      $(this).val("");
      tel_check=false
      return
    }
    tel_check = false;
    var reg = /\d{11}/;
    var _this = $(this);
    var value = $(_this).val();

    if(value) {
      $('.hintPhone').addClass('cus-show');
    } else {
      $('.hintPhone').removeClass('cus-show');
    }

    //$("#errorInfo").addClass("hidden");
    $("#findPwdBtn").addClass("disabled");

    if (!reg.test(value)) {
      tel_check = false;
      $("#errorInfo").removeClass("hidden").text("手机号应为11位数字");
      $("#findPwdBtn").addClass("disabled");
    } else {
      tel_check = true;
      if(old_phone != value&&account){
        old_phone = value;
        $.ajax({
          data: {"account": account, "phone": value},
          url: "/api/login/account/check_account_phone_match",
          success: function (msg) {
            if (!msg.success) {
              account_match_tel = false;
              $("#errorInfo").removeClass("hidden").text("手机与账号不匹配");
            }else {
              account_match_tel = true;
              if (captcha_check) {
                $("#findPwdBtn").removeClass("disabled");
              }
              $("#errorInfo").addClass("hidden");
            }
          }
        });
      }
      else{
        alert("请先填写用户账号");
        $(_this).val("");
        tel_check=false
      }
    }
  }
  $(".item-phone input").blur(checkTel);

  // 获取图形验证码
  $("#captchaImg").click(function (e) {
    $.ajax({
      url: "/api/login/account/gen_captcha",
      success:function (res) {
        if(res.success){
          key = res.bizContent.key;
          // console.log(res.bizContent.img)
          $("#captchaImg").attr("src", res.bizContent.img);
        }
        else{
          $("#captchaImg").attr("src", "/static/images/加载失败.png");
          // alert("获取图形验证码失败！");
        }
      }

    })
  });

  //校验图形验证码
  var checkCaptcha =function () {
    if(!account_match_tel){
      alert("请先填写账号和手机号！")
      $(this).val("");
      captcha_check=false
      return
    }
    var verify = $(this).val();

    if(verify) {
      $('.hintCap').addClass('cus-show');
    } else {
      $('.hintCap').removeClass('cus-show');
    }

    captcha_check = false;

    // $("#errorInfo").addClass("hidden");
    $("#findPwdBtn").addClass("disabled");

    if (verify.length != 4) {
      captcha_check = false;
      $("#errorInfo").removeClass("hidden").text("请输入4位验证码");
      $("#findPwdBtn").addClass("disabled");
    }else {
      if(old_captcha!=verify &&account_match_tel){
        old_captcha = verify;
        $.ajax({
          url: '/api/login/account/check_captcha',
          data: { userCaptchaText: verify,key:key},
          dataType: "json",
          success: function (msg) {
            if(msg.success){
              captcha_check = true;
              // if(tel_check){
                $("#findPwdBtn").removeClass("disabled");
              // }
              $("#errorInfo").addClass("hidden");
            }else {
              captcha_check = false;
              $("#findPwdBtn").addClass("disabled");
              $("#errorInfo").removeClass("hidden").text(msg.desc);
              $("#captchaImg").attr('src', msg.bizContent.img);
              key = msg.bizContent.key;
            }
          }
        })
      }
      else{
        alert("请先填写账号和手机号！")
        $(this).val("");
        captcha_check=false
      }
    }
  }


  $('.item-captcha input').blur(checkCaptcha);

  //***********************手机一堆验证**********************

  //获取新密码
  $("#findPwdBtn").click(function () {
    if(!account_exist){
      $("#errorInfo").removeClass("hidden").text("账号不存在");
      return;
    }
    if(!tel_check){
      $("#errorInfo").removeClass("hidden").text("手机号应为11位数字");
      return;
    }
    if(!account_match_tel){
      $("#errorInfo").removeClass("hidden").text("手机与账号不匹配");
      return;
    }
    if(!captcha_check){
      $("#errorInfo").removeClass("hidden").text("验证码输入错误");
      return;
    }
    if(!$(this).hasClass("disaled")){
      if(checkForm()){
        pwdTime();
        $.ajax({
          url: "/api/login/account/sms_new_pwd",
          data: { phone: $(".item-phone input").val(), account: account},
          dataType: "json",
          success: function (msg) {
            if (msg.success) {
              alert(msg.desc);
              window.location.href = msg.bizContent.url;
            // }else if(msg.status=="fail"){
            //   alert("发送失败，请重试！");
            // } else if (msg.status == "alert") {
            //   alert(msg.msg);
            } else{
              alert("发送失败，请联系系统管理员！");
            }
          }
        });
      }
    }
  });

  function checkForm() {
    var status = true;
    //已有报错
    if(!$("#errorInfo").hasClass("hidden")){
      status = false;
      return status;
    }
    //是否填写必填项
    $("#errorInfo").addClass("hidden");
    $(".items .item").each(function (index, element) {
      var value = $(this).find("input").val();

      if(value==''){
        status = false;
        $("#errorInfo").removeClass("hidden").text("请填写正确内容");
        return false;
      }
    });

    return status;
  }

  var time_rem = 60;
  function pwdTime() {
    if (time_rem > 0) {
      $('#findPwdBtn').text(time_rem+'s').addClass("disabled");
      time_rem --;
      setTimeout(pwdTime, 1000);
    } else {
      $('#findPwdBtn').text('获取密码').removeClass("disabled");
      time_rem = 60;
    }
  }

  // 返回跳转
  $('a.m_logout').click(function (e) {
    document.referrer === '' ?window.location.href = '/login/account/login' : window.history.go(-1);
  })

});
