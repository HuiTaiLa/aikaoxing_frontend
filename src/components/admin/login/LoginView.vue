<template>
  <div class="login-wrap">
    <div class="bg-pic">
      <img class="img-bg" src="https://s2.kaoshixing.com/static/account/images/login_reg/login-bg-small.jpg">
    </div>
    <div class="login-content-wrap">
      <div class="login-content">
        <form action="/login/account/login" name="form_wm" class="login-form" id="loginForm">
          <img src="/static/images/logo.jpg" alt="logo" class="logo">
          <div class="main-error-tips" id="errormsg"></div>

          <input type="hidden" name="userName" id="username_tran">
          <div class="username item" style="display: none">
            <label for="username">账号</label>
            <input type="text" name="userNameInput" id="username" class="userNameInput">
          </div>
          <div class="password item" style="display: none">
            <label for="userTypePwd">密码</label>
            <input type="password" name="password" id="userTypePwd" class="passwordInput">
          </div>
          <div class="phone-account item">
            <label for="phoneAccount">手机号</label>
            <input type="text" name="phoneAccount" id="phoneAccount" class="phoneInput">
            <i class="icon icon-a_success" style="display: none"></i>
          </div>
          <div class="auth-code item">
            <label for="authCode">验证码</label>
            <input type="text" name="authCode" id="authCode" class="codeInput">
            <div class="code-box">
              <span class="line">|</span>
              <span class="code-hint">获取验证码</span>
            </div>
          </div>
          <div class="remember">
            <!--<label for="saveUsername" class="hidden"><input type="checkbox" id="saveUsername" name="autoLogin">7天自动登录</label>-->
            <a href="/admin/find_pwd" class="forget-password" style="text-decoration: none">忘记密码</a>
          </div>
          <a href="javascript:void(0);" class="btn btn-login btn-primary" id="loginBtn">登录</a>
          <!-- 12057是李鑫客户国卫信安教育科技（北京）有限公司，不想要微信登录 -->
          <div class="login-type">

            <!--<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx3dbf3a23e8456f1a&amp;redirect_uri=https://www.kaoshixing.com/login/account/wechat_login_independent&amp;response_type=code&amp;scope=snsapi_login&amp;state=STATE#wechat_redirect" class="login-type-btn wechat"><em class="icon icon-a_landing_wechat_1"></em>微信快速登录</a>-->

            <a href="javascript:void(0);" class="login-type-btn account-type" style="text-decoration: none"><em class="icon icon-a_accouns"></em>账号密码登录</a>
            <a href="javascript:void(0);" style="display: none;text-decoration: none;" class="login-type-btn phone-type"><em class="icon icon-a_phone"></em>手机验证登录</a>
          </div>


          <!--<a href="/login/account/regist" class="btn-regist">注册一个企业账号</a>-->

          <!--<div class="login-content-footer">-->

          <!--<div class="mobile-register">-->
          <!--<a href="/login/account/regist" class="btn btn-default mobile-btn-regist">注册一个企业账号</a>-->
          <!--</div>-->

          <!--<div class="login-on-phone">-->
          <!--<div class="qr-code-wrap"><div class="qr-codes"><canvas width="100" height="100"></canvas></div></div>-->
          <!--<em class="icon icon-a_landing_mobile_phone"></em><a href="javascript:void(0);" class="show-qr-code">在手机上使用</a>-->
          <!--</div>-->

          <!--<div id="switchLang" class="switchLang">-->
          <!--<em class="icon icon-a_landing_english"></em>-->
          <!--<span class="ch">English</span>-->
          <!--</div>-->
          <!--</div>-->
        </form>
        <!--<div id="loginWechet" class="reg-form loginWechet weChatBind" style="display: none;">-->
        <!--<div class="reg-tips finish-tips">登录成功！</div>-->
        <!--<em class="icon icon-a_circle_check"></em>-->
        <!--<div class="finish-text">绑定微信，即可扫码一键登录</div>-->
        <!--<a href="javascript:void(0);" class="btn btn-goto-bind all-right btn-primary">立即绑定微信</a>-->
        <!--<a href="javascript:void(0);" class="btn btn-goto-login">先不绑定，直接登录</a>-->
        <!--</div>-->
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name:'LoginView',
  }
</script>
