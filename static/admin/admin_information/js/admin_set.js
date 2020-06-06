$(document).ready( function() {
  $("#checkPhoneForm .old_phone_input").val(user.phone);
  //修改密码跳转链接
  $("#setPassLinkBtn").click(function(e) {
    $(".erro_warning").hide();
    // window.location.href = "/login/account/user/set_pass";
    $('#changePasswordModal').modal({
      backdrop:"static",
      keyboard:false
    });
  });

  //弹出修改手机号弹窗
  $("#setPhoneLinkBtn").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".erro_warning").hide();
    canVCodeSend=true; //允许获取验证码
    clearInterval(vCodeIntervalId); //清除计时器
    vcode_time_count=60;//计时秒数恢复
    $(".modal-check-phone .get_vcode").text("获取验证码");
    $(".modal-bind-phone .get_vcode").text("获取验证码");
    $("#checkPhoneForm").find("input[name='verifyCode']").val("");
    $("#bindNewPhoneForm").find("input").val("");
    $('#checkPhoneModal').modal({
      backdrop:"static",
      keyboard:false
    });
  });

  //弹出绑定新手机号弹窗
  $("#toBindPhone").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var phone=$(this).parents(".modal-body").find("input[name='phone']").val();
    var verifyCode=$(this).parents(".modal-body").find("input[name='verifyCode']").val();
    var reg=/^\d{11}$/g;
    if(reg.test(phone)) {
      $.ajax({
        type:'POST',
        dataType:'json',
        cache:false,
        url:'/api/update_info/check_verify_code',
        data:'account=' + user.account + '&companyId=' + user.companyId + '&phone='+phone+'&verifyCode='+verifyCode,
        success:function(meg){
          if(meg.success){
            $(".erro_warning").hide();
            canVCodeSend=true; //允许获取验证码
            clearInterval(vCodeIntervalId); //清除计时器
            vcode_time_count=60;//计时秒数恢复
            $('#checkPhoneModal').modal('hide');
            $('#bindNewPhoneModal').modal({
              backdrop:"static",
              keyboard:false
            });
          }else{
            $("#old_phone_error_tip").text(meg.desc);
            $("#old_phone_error_tip").show();
          }
        },
      })
    }else{
      $("#old_phone_error_tip").text('手机号应为11位数字');
      $("#old_phone_error_tip").show();
    }
  });

  //验证旧手机-获取验证码
  $(".modal-check-phone .get_vcode").click(function(e){
    e.preventDefault();
    e.stopPropagation();
    var phone=$(this).parents(".wrapper_content").find("input[name='phone']").val();
    var reg=/^\d{11}$/g;
    if(canVCodeSend&&reg.test(phone)) {
      $.ajax({
        type:'POST',
        dataType:'json',
        cache:false,
        url:'/api/update_info/send_verify_code',
        data:'account='+ user.account + '&companyId=' + user.companyId +  '&phone='+phone,
        success:function(meg){
          if(meg.success){
            $(".erro_warning").hide();
            vCodeIntervalId = setInterval("getVCode('.modal-check-phone .get_vcode')", 1000);
          }else{
            $("#old_phone_error_tip").text('发送验证码失败');
            $("#old_phone_error_tip").show();
          }
        },
      })
    }
  });


  //绑定新手机-获取验证码
  $(".modal-bind-phone .get_vcode").click(function(e){
    e.preventDefault();
    e.stopPropagation();
    var phone=$(this).parents(".wrapper_content").find("input[name='phone']").val();
    var reg=/^\d{11}$/g;
    var old_phone=$(".old_phone_input").val();
    if(canVCodeSend&&reg.test(phone)) {
      if(phone==old_phone){
        $("#new_phone_error_tip").text('新手机号不可与原手机号一致');
        $("#new_phone_error_tip").show();
      }else {
        $.ajax({
          type: 'POST',
          dataType: 'json',
          cache: false,
          url: '/api/update_info/check_new_phone',
          data: 'account='+ user.account + '&companyId=' + user.companyId + '&phone=' + phone,
          success: function (meg) {
            if (meg.success) {
              $.ajax({
                type: 'POST',
                dataType: 'json',
                cache: false,
                url: '/api/update_info/send_verify_code',
                data: 'account='+ user.account + '&companyId=' + user.companyId +'&phone=' + phone,
                success: function (meg) {
                  if (meg.success) {
                    $(".erro_warning").hide();
                    vCodeIntervalId = setInterval("getVCode('.modal-bind-phone .get_vcode')", 1000);
                  } else {
                    $("#new_phone_error_tip").text('发送验证码失败');
                    $("#new_phone_error_tip").show();
                  }
                },
              });
            }else {
              $("#new_phone_error_tip").text(meg.desc);
              $("#new_phone_error_tip").show();
              // if (meg.code == 33083) {
              //   $("#new_phone_error_tip").text('手机号重复，请联系客服！');
              //   $("#new_phone_error_tip").show();
              // }
              // if (meg.code == 33039) {
              //   $("#new_phone_error_tip").text('手机号输入有误');
              //   $("#new_phone_error_tip").show();
              // }
            }
          },
        })
      }
    }else{
      if(!reg.test(phone)){
        $("#new_phone_error_tip").text('手机号应为11位数字');
        $('#new_phone_error').show();
      }
    }
  });

  //校验新手机号
  var _newphone_this;
  $("#bindNewPhoneForm input[name='phone']").blur(function(e){
    e.preventDefault();
    e.stopPropagation();
    _newphone_this=this;
    setTimeout(function(){ //防止影响按钮点击事件，给失去焦点代码延迟
      var phone=$(_newphone_this).parents(".wrapper_content").find("input[name='phone']").val();
      var reg=/^\d{11}$/g;
      var old_phone=$(".old_phone_input").val();
      if(reg.test(phone)) {
        if(phone==old_phone){
          $("#new_phone_error_tip").text('新手机号不可与原手机号一致');
          $("#new_phone_error_tip").show();
        }else {
          $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            url: '/api/update_info/check_new_phone',
            data: 'account='+ user.account + '&companyId=' + user.companyId + '&phone=' + phone,
            success: function (meg) {
              if (meg.success) {

              } else {
                $("#new_phone_error_tip").text(meg.desc);
                $("#new_phone_error_tip").show();
                // if (meg.code == 33083) {
                //   $("#new_phone_error_tip").text('手机号重复，请联系客服！');
                //   $("#new_phone_error_tip").show();
                // }
                // if (meg.code == 33039) {
                //   $("#new_phone_error_tip").text('手机号输入有误');
                //   $("#new_phone_error_tip").show();
                // }
              }
            },
          })
        }
      }else{
        $("#new_phone_error_tip").text('手机号应为11位数字');
        $("#new_phone_error_tip").show();
      }
    },500);
  });

  //确认绑定新手机号
  $("#bindNewPhoneBtn").click(function(e){
    e.preventDefault();
    e.stopPropagation();
    var phone=$(this).parents(".modal-body").find("input[name='phone']").val();
    var verifyCode=$(this).parents(".modal-body").find("input[name='verifyCode']").val();
    var reg=/^\d{11}$/g;
    var old_phone=$(".old_phone_input").val();
    if(reg.test(phone)) {
      if(phone==old_phone){
        $("#new_phone_error_tip").text('新手机号不可与原手机号一致');
        $("#new_phone_error_tip").show();
      }else {
        $.ajax({
          type: 'POST',
          dataType: 'json',
          cache: false,
          url: '/api/update_info/check_new_phone',
          data: 'account='+ user.account + '&companyId=' + user.companyId + '&phone=' + phone,
          success: function (meg) {
            if (meg.success) {
              $.ajax({
                type: 'POST',
                dataType: 'json',
                cache: false,
                url: '/api/update_info/check_verify_code',
                data: 'account='+ user.account + '&companyId=' + user.companyId + '&phone=' + phone + '&verifyCode=' + verifyCode,
                success: function (meg) {
                  if (meg.success) {
                    $.ajax({
                      type: 'POST',
                      dataType: 'json',
                      cache: false,
                      url: '/api/update_info/update_phone',
                      data: 'account='+ user.account + '&companyId=' + user.companyId + '&phone=' + phone,
                      success: function (meg) {
                        if (meg.success) {
                          user["phone"] = phone;
                          window.localStorage.setItem("USER", JSON.stringify(user));
                          $('#bindNewPhoneModal').modal('hide');
                          updatePhoneDisplay(phone);
                          successTip('更新成功');
                        }else{
                          $("#new_phone_error_tip").text(meg.desc);
                          $("#new_phone_error_tip").show();
                        }
                      }
                    });
                  } else {
                    $("#new_phone_error_tip").text(meg.desc);
                    $("#new_phone_error_tip").show();
                  }
                },
              })
            } else {
              $("#new_phone_error_tip").text(meg.desc);
              $("#new_phone_error_tip").show();
              // if (meg.code == 33083) {
              //   $("#new_phone_error_tip").text('手机号重复，请联系客服！');
              //   $("#new_phone_error_tip").show();
              // }
              // if (meg.code == 33039) {
              //   $("#new_phone_error_tip").text('手机号输入有误');
              //   $("#new_phone_error_tip").show();
              // }
            }
          },
        })
      }
    }else{
      $("#new_phone_error_tip").text('手机号应为11位数字');
      $("#new_phone_error_tip").show();
    }
  });


  //绑定微信
  // $("#we_bind").click(function(e){
  //   $(".prompt_red").hide();
  //   $('#bindModal').modal({
  //     keyboard:false
  //   });
  // });



  //显示编辑信息
  $("#updateBtn").click(function(e) {
    $(".userInfoDom,#infoBtnDom,#verifyEmail").hide();
    $(".userUpdateDom,#updateBtnDom").show();
    $(".save_info_btn_container").show();
  });
  //取消编辑
  $("#cancelBtn_user").click(function(e) {
    $(".userInfoDom,#infoBtnDom,#verifyEmail").show();
    $(".userUpdateDom,#updateBtnDom").hide();
    document.getElementById("setUserForm").reset();
    var phoneNumber =  $("#setUserForm p").eq(1).find(".userInfoDom").text();
    $("#setUserForm p").eq(1).find(".userUpdateDom input").val(phoneNumber);//只读显示
    $("input[name=x-user]").val(user.userName);
    $(".save_info_btn_container").hide();
  });
  //取消保存密码
  $("#cancelBtn_pass").click(function(e) {
    document.getElementById("setPwdForm").reset();
  });
  //保存密码
  $("#savePasswordBtn").click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    //验证旧密码
    if(!oldPwdVal($("#oldPassword").val())){
      $("#wrong_old").show();
      return;
    }else{
      $("#wrong_old").hide();
    }
    //验证新密码
    if(newPwdVal($("#newPassword").val())=='same'){
      $("#wrong_new").text("新密码不能与原密码一致").show();
      return;
    }else if(!newPwdVal($("#newPassword").val())){
      $("#wrong_new").text("新密码不符合规则").show();
      return;
    }else{
      $("#wrong_new").hide();
    }
    //验证重复新密码
    if(!reNewPwdVal($("#reNewPassword").val())){
      $("#erro_diff").show();
      return;
    }else{
      $("#erro_diff").hide();
    }
    var oldPassword = $('#setPwdForm input[name=oldPassword]').val();
    var newPassword = $('#setPwdForm input[name=newPassword]').val();
    var reNewPassword = $('#setPwdForm input[name=reNewPassword]').val();
    var dataForm = "account=" + user.account + "&companyId=" + user.companyId + "&oldPassword=" + oldPassword +
      "&newPassword=" + newPassword +
      "&reNewPassword=" + reNewPassword;
    $.ajax({
      type: "POST",
      cache : false,
      headers: { "cache-control": "no-cache" },
      dataType: "json",
      url: "/api/account/set_pass",
      data: dataForm,
      success: function(msg){
        // user["password"] = newPassword;
        // window.localStorage.setItem("USER", JSON.stringify(user));
        window.localStorage.clear();
        alert(msg.desc);
        window.location.href=msg.bizContent.url;
        $('#changePasswordModal').modal('hide');
        document.getElementById("setPwdForm").reset();
      }
    });
  });
  // 上传头像
  $("input[name=picture]").change(function() {
    // $('#picForm').submit();
    $('#picForm').ajaxSubmit({
      url : '/api/upload/avatar',
      type : 'post',
      dataType : 'json',
      // headers:
      //   {
      //     "Authorization": token
      //   },
      success:function (msg){
        if(msg.success){
              $("#staffPic").attr("src",msg.bizContent.url);
              user['avatar'] = msg.bizContent.url;
              window.localStorage.setItem("USER",JSON.stringify(user));
            }else {
              alert(msg.desc);
            }
      },
    });
  });
  //
  // $("#picIframe").load(function() {
  //   $('#picForm')[0].reset();
  //   var msg=JSON.parse($(this).contents().find("body").text());
  //   if(msg.success){
  //     $("#staffPic").attr("src",msg.bizContent.url);
  //   }else {
  //     alert(msg.desc);
  //   }
  // });


  //保存用户信息
  $("#saveBtn").click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    //验证姓名
    var userName=$("input[name=x-user]").val();
    $("#setUserForm input[name=user]").val(userName);
    if($("form input[name=user]").val()==""){
      alert("请输入用户名");
      return;
    }
    //验证邮箱
    // if ($("input[name=mail]").val() != "") {
    //   //用户关联邮箱，特殊域名后缀检测不到（".tech"）——“.XX（….）”或".XX.X（...）"格式识别为邮箱
    //   var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,})*\.[a-zA-Z0-9]{2,6}$/;
    //   var has = reg.test($("input[name=mail]").val());
    //   if (!has) {
    //     alert("请填写正确的电子邮件地址！");
    //     return false;
    //   }
    // }
    var dataForm = $('#setUserForm').serialize();
    $.ajax({
      type: "POST",
      cache : false,
      headers: { "cache-control": "no-cache" },
      dataType: "json",
      url: "/api/account/update",
      data: dataForm + "&account=" + user.account + "&companyId=" + user.companyId,
      success: function(msg){
        // console.log(msg,msg.success)
        if(msg.success){
          // console(msg.desc);
          user['sex'] = $("input[name=sex]:checked").val();
          user['userName'] = userName;
          window.localStorage.setItem("USER",JSON.stringify(user));
          window.location.reload();
        }
        else{
          alert(msg.desc);
        }
        // window.location.reload();
      }
    });
  });
});

//验证密码
//密码强度验证mag
function pwdVal(pwd){
  var hasAlpha = 0;
  var hasNum = 0;

  if(/^.{6,20}$/.test( pwd ) ) {
    hasNum++;
  }

  return (hasNum>=1);
}
//密码不能包含账号及域名验证mag
function pwdNoUserOrDomain(pwd){
  /*var pwdVal = pwd;
  var i = top.Global.Config.user.usr.search(/@/);
  var userName = top.Global.Config.user.usr.substring(0,i);
  var domain = top.Global.Config.user.usr.substring(i+1);
  var j = domain.search(/\./);
  domain = domain.substring(0,j);
  domain = domain.toLowerCase();
  if((pwdVal.indexOf(domain) == -1) && (pwdVal.indexOf(userName) == -1)){
      return true;
  }*/
  //return false;

  return true;
}
//旧密码验证方法
function oldPwdVal(val){
  if(val == ''){
    return false;
  } else {
    return true;
  }
}
//新密码验证方法
function newPwdVal(val){
  var newPwd = val;
  if(newPwd == ''){
    return false;
  } else if(newPwd == $("#oldPassword").val()){
    return 'same';
  } else if(ClientWrongLongPassword(newPwd)) {
    return false;
  } else if(!pwdVal(newPwd)) {
    return false;
  }
  // else if(!pwdNoUserOrDomain(newPwd)) {
  //     return false;
  // }
  return true;
}
//重复新密码验证方法
function reNewPwdVal(val){
  var newPwd = val;
  if(newPwd == ''){
    return false;
  }
  if(newPwd != $("#newPassword").val()){
    return false;
  }
  return true;
}
//密码低于5位或高于20位，提示错误
function ClientWrongLongPassword(pwd){
  return !(IsLongEnough(pwd, "6")) || IsLongOver(pwd, "20");
}
function IsLongEnough(strWord, nAtLeastThisLong){
  if ((strWord == null) || isNaN(nAtLeastThisLong))
  {
    return false;
  }
  else if (strWord.length < nAtLeastThisLong)
  {
    return false;
  }
  return true;
}
function IsLongOver(strWord, nAtLeastThisLong){
  if ((strWord == null) || isNaN(nAtLeastThisLong))
  {
    return false;
  }
  else if (strWord.length <= nAtLeastThisLong)
  {
    return false;
  }
  return true;
}

//验证码计时函数　
var vCodeIntervalId; //计时器id
var vcode_time_count=60; //计时秒数
var canVCodeSend=true;
function getVCode(query){
  vcode_time_count--;
  $(query).text(vcode_time_count.toString()+'s');
  canVCodeSend=false;
  if(vcode_time_count==0){
    $(query).text('获取验证码');
    clearInterval(vCodeIntervalId); //清除计时器
    vcode_time_count=60;//计时秒数恢复
    canVCodeSend=true; //允许再次获取 //点击下一步成功后，需要再次设置为true
  }
}
//成功提示
function successTip(text){
  $("#saveSuccess .text label").text(text);
  $("#saveSuccess").show();
  $("#saveSuccess").fadeOut(3000);
}

//更新手机号成功后，页面的手机文字更新
function updatePhoneDisplay(new_phone){
  // var account_arr=$("#setUserForm p").eq(0).find(".c").text().split("@");
  // var new_account=new_phone+'@'+account_arr[1];
  // $("#setUserForm p").eq(0).find(".c").text(new_account);
  $("#setUserForm p").eq(1).find(".userInfoDom").text(new_phone);
  $("#setUserForm p").eq(1).find(".userUpdateDom input").val(new_phone);
  $("#checkPhoneForm .old_phone_input").val(new_phone);
}
