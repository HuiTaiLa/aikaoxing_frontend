<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="c-block">
          <div class="cont clearfix">
            <div class="cont-left">
              <img id="staffPic" :src="user.avatar == 'default.png'? '/static/avatar/default.png':user.avatar" style="width:200px;height:200px;">
              <form method="post" id="picForm" enctype="multipart/form-data" target="pic_iframe">
                <p class="userUpdateDom">
                  <span class="c">
                      <span class="btn btn-s-gray upload" title_tip="尺寸：150*200；大小：不超过100KB；格式：png/jpg/jpeg/bmp">
                        <input id="uploadFiles" type="file" name="picture" accept=".png,.jpg,.jpeg,.bmp">
                          上传
                      </span>
                    <input type="hidden" name="account" :value="user.account">
                    <input type="hidden" name="companyId" :value="user.companyId">
                  </span>
                </p>
                <iframe name="pic_iframe" id="picIframe" class="hidden"></iframe>
              </form>
              <p class="username">
                <span class="c userInfoDom">{{user.userName}}</span>
                <span class="c userUpdateDom"><input name="x-user" class="x-user" type="text" :value="user.userName"></span>
              </p>
            </div>
            <form name="form" method="post" id="setUserForm" action="">
              <input type="hidden" name="user" :value="user.userName">
              <input name="t" type="hidden">
              <p>
                <span class="t">账号：</span>
                <span class="c" style="font-family: PingFangSC-Regular;font-size: 16px;color: #27274A;">{{user.account}}@{{user.companyId}}</span>
              </p>
              <p>
                <span class="t">手机：</span>
                <span class="c userInfoDom">{{user.phone}}</span>
                <span class="c userUpdateDom">
                  <input name="tel" type="text" readonly="" class="input_default" :value="user.phone">
                </span>
              </p>
              <!--<p>-->
                <!--<span class="t">微信：</span>-->
                <!--<span id="we_bind" class="c wechat-icon btn_action_default">-->
                  <!--绑定微信-->
                  <!--<span class="prompt_red"></span>-->
              <!--</span>-->
              <!--</p>-->
              <!--<p>-->
                <!--<span class="t">邮箱：</span>-->
                <!--<span class="c userInfoDom">1905986299@qq.com</span>-->
                <!--<button type="button" class="btn_action_default" id="verifyEmail">邮箱验证</button>-->
                <!--<span class="c userUpdateDom"><input name="mail" class="input_default" type="text" value="1905986299@qq.com"></span>-->
              <!--</p>-->
              <p>
                <span class="t">性别：</span>
                <span class="c userInfoDom">
                  {{user.sex==0?'男':'女'}}
                </span>
                <span class="c userUpdateDom">
                  男
                  <input name="sex" class="radio" type="radio" value="0" checked="">
                  &nbsp;&nbsp;女
                  <input name="sex" class="radio" type="radio" value="1">
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading'
  import {mapState} from 'vuex'

export default {
  name:'Body',
  components:{
    Loading,
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
}
</script>
