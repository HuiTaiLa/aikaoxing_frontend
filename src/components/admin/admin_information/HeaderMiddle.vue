<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix">
      <div class="body-toolbar-left pull-left toolbar-left-operation">
        <button type="button" class="btn btn-default" id="updateBtn">
          <i class="icon icon-a_personal_edit"></i>
          编辑信息
        </button>
        <button type="button" class="btn btn-default" id="setPassLinkBtn">
          <i class="icon icon-a_landing_password"></i>
          修改密码
        </button>
        <button type="button" class="btn btn-default" id="setPhoneLinkBtn">
          <i class="icon icon-a_landing_mobile_phone"></i>
          修改手机号
        </button>
      </div>
      <div class="body-toolbar-right pull-right toolbar-right-operation guide save_info_btn_container">
        <a href="#" class="btn btn-warning guide-btn" id="saveBtn" style="text-decoration: none">保存</a>
        <a href="#" class="btn btn-warning guide-btn" id="cancelBtn_user" style="text-decoration: none">取消</a>
      </div>
      <div class="ksx-success" id="saveSuccess">
        <span class="text"><i class="icon-a_success set_success"></i><label></label></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'HeaderMiddle',

  }
</script>
