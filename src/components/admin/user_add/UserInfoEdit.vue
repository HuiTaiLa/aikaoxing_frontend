<template>
<el-dialog class="dialog-dep-user-info fixed" title="编辑学员" :visible.sync="dialogs.userInfoEdit" :close-on-click-modal="!1" width="440px" :center="!0" id="dialogEditUser" @open="handleOpen" @close="()=>{dialogs.userInfoEdit = !1}">
  <el-form ref="form" :model="userInfo" label-width="80px" size="mini">
    <el-form-item class="validate" label="* 账号" :data-validate-content="userInfo.userName" :data-validate-required="!0">
      <el-input :disabled="!0" @blur="onValidate" v-model="userInfo.userName" ></el-input>
    </el-form-item>
    <el-form-item class="validate" label="* 姓名" :data-validate-content="userInfo.surname" :data-validate-required="!0">
      <el-input placeholder="请输入姓名" maxlength="60" @blur="onValidate" v-model="userInfo.surname"></el-input>
    </el-form-item>
    <el-form-item label="用户状态">
      <el-radio-group :disabled="user.userId == userInfo.id" v-model="userInfo.status">
        <el-radio label="0">正常</el-radio>
        <el-radio label="1">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="修改密码">
      <el-switch v-model="passwordModify"></el-switch>
    </el-form-item>
    <el-form-item v-if="passwordModify" class="validate" label="* 密码" :data-validate-content="userInfo.passwordTmp" :data-validate-required="!0" data-validate-rule="userPassword">
      <el-input type="password" placeholder="密码大于等于6位小于等于20位" @blur="onValidate" v-model="userInfo.passwordTmp"></el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item v-if="passwordModify" class="validate" label="* 确认" :data-validate-content="userInfo.password" :data-validate-required="!0" data-validate-rule="userPassword">
      <el-input type="password" placeholder="再次输入密码" @blur="onValidatePassword" v-model="userInfo.password"></el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item label="部门" >
      <div class="el-form-choose" @click="handleTreeOpen">{{userInfo.departmentName}}</div>
    </el-form-item>
    <el-form-item label="性别" >
      <el-radio-group v-model="userInfo.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="validate" label="手机" :data-validate-content="userInfo.phone" data-validate-rule="phone">
      <el-input :disabled="'admin' == user.roleName && user.userId == userInfo.id" placeholder="请输入手机号" maxlength="60" @blur="onValidatePhone" v-model="userInfo.phone"></el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.identityCard">
      <el-input maxlength="60" :placeholder="'请输入' + userInfoKeyName.identityCard" v-model="userInfo.identityCard"></el-input>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.position">
      <el-input maxlength="60" :placeholder="'请输入' + userInfoKeyName.position" v-model="userInfo.position"></el-input>
    </el-form-item>
    <el-form-item class="validate" label="邮箱" :data-validate-content="userInfo.email" data-validate-rule="email">
      <el-input placeholder="请输入邮箱" maxlength="60" @blur="onValidate" v-model="userInfo.email"></el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.notice">
      <el-input maxlength="60" :placeholder="'请输入' + userInfoKeyName.notice" v-model="userInfo.notice"></el-input>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.identityImg" class="edit-identity-img">
      <el-upload class="upload" action="/api/dept/secret_upload" name="upfile" :data="{'account':user.account,'companyId':user.companyId}" :headers="{'Authentication':token}" :before-upload="beforeAvatarUpload" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1" :on-exceed="onExceed" list-type="picture" :file-list="fileList" :data-validate-required="!0">
        <el-button size="small" type="primary" :id="'upload' + elId">点击上传</el-button>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <mt-popup popup-transition="popup-fade" v-model="popupVisible">
        <img slot width="100%" :src="dialogImageUrl" alt="">
      </mt-popup>
    </el-form-item>
    <el-collapse>
      <el-collapse-item title="自定义字段">
        <el-form-item :label="userInfoKeyName.field1">
          <el-input maxlength="60" v-model="userInfo.field1"></el-input>
        </el-form-item>
        <el-form-item :label="userInfoKeyName.field2">
          <el-input maxlength="60" v-model="userInfo.field2"></el-input>
        </el-form-item>
        <el-form-item :label="userInfoKeyName.field3">
          <el-input maxlength="60" v-model="userInfo.field3"></el-input>
        </el-form-item>
        <el-form-item :label="userInfoKeyName.field4">
          <el-input maxlength="60" v-model="userInfo.field4"></el-input>
        </el-form-item>
        <el-form-item :label="userInfoKeyName.field5">
          <el-input maxlength="60" v-model="userInfo.field5"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
  <span class="dialog-footer" slot="footer">
    <el-button type="primary" plain="" @click="endUserInfo">取消</el-button>
    <el-button type="primary" @click="saveUserInfo">确定</el-button>
  </span>
</el-dialog>
</template>

<script>
  import {mapGetters,mapActions,mapMutations,mapState} from 'vuex'
  export default {
    name:'UserInfoEdit',
    data: function () {
      return {
        passwordModify: !1,
        popupVisible: !1,
        elId: Math.random(),
        dialogImageUrl: "",
        dialogImageId: "",
        dialogImageName: "",
        showUserLabelCard: !1
      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user,
        token: state => state.account.token
      }),
      ...mapGetters({
        // api: "api",
        // advancedSetRights: "advancedSetRights",
        userInfo: "userList/userInfo",
        dialogs: "userList/dialogs",
        userInfoKeyName: "userList/userInfoKeyName"
      }),
      userLabelIdsArr: function () {
        return this.userInfo.userLabelIds && "" != this.userInfo.userLabelIds ? this.userInfo.userLabelIds.split(",") : []
      },
      fileList: function () {
        if (this.userInfo.identityImg) return [{
          name: this.userInfo.identityImgName,
          url: this.userInfo.identityImg
        }];
        return []
      }
    },
    components: {},
    methods:{
      ...mapActions({
        editUser: "userList/editUser",
        getUserLabelTree: "userList/getUserLabelTree",
        // checkPhoneExist: "userList/checkPhoneExist"
      }),
      ...mapMutations({
        resetUserForm: "userList/RESET_USER_INFO_FORM",
        encryptPassword: "userList/ENCRYPT_PASSWORD",
        uploadImg: "userList/QUESTION_IMG_UPLOAD",
        deleteImg: "userList/QUESTION_IMG_DELETE"
      }),
      beforeAvatarUpload: function (e) {
        var t = "image/jpeg" === e.type, a = "image/png" === e.type, s = e.size / 1024 < 500;
        return t || a || this.$message.error("上传图片只能是 JPG/PNG 格式!"), s || this.$message.error("上传图片大小不能超过 500kb!"), (t || a) && s
      }, handleSuccess: function (e, t, a) {
        var s = e;
        s.success && (this.dialogImageId = s.bizContent.url, this.dialogImageName = t.name)
      }, onExceed: function (e) {
        this.$message.error("只能上传一张照片！")
      }, handlePreview: function (e) {
        this.dialogImageUrl = e.url, this.popupVisible = !0
      }, handleRemove: function (e, t) {
        this.deleteImg({dialogImageId: this.dialogImageId, dialogImageName: this.dialogImageName})
      }, handleTreeOpen: function () {
        this.dialogs.depTree.showState = !0, this.dialogs.depTree.sureMethod = "handleTreeChoose"
      }, saveUserInfo: function () {
        this.uploadImg({
          imageId: this.dialogImageId,
          fileName: this.dialogImageName
        }), 0 == document.getElementById("dialogEditUser").getElementsByClassName("is-error").length && (this.encryptPassword({
          key: "passwordTmp",
          value: this.userInfo.passwordTmp
        }), this.encryptPassword({
          key: "password",
          value: this.userInfo.password
        }), this.editUser({isEditPass: this.passwordModify ? "1" : "0", $message: window.alert}))
      }, endUserInfo: function () {
        this.dialogs.userInfoEdit = !1, this.dialogImageUrl = "", this.handleRemove()
      }, onValidatePassword: function (e) {
        for (var t = document.getElementsByClassName("validate"), a = "", s = 0; s < t.length; s++) {
          var n = t[s];
          if (n.contains(e.target)) {
            a = n;
            break
          }
        }
        this.userInfo.passwordTmp == this.userInfo.password ? (a.classList.remove("is-error"), a.getElementsByClassName("error")[0].innerHTML = "", this.onValidate(e)) : (a.classList.add("is-error"), a.getElementsByClassName("error")[0].innerHTML = "两次输入不一致")
      },
      onValidatePhone:function(){
        // if(this.userInfo.phone){
        //   var reg = /^1\d{10}$/
        //    reg.test(this.userInfo.phone)?
        // }
      },
      onValidate: function (e) {
        // console.log(e)
        // return KSX.validateOne(e)
      }, onValidateAll: function () {
        // return KSX.validateAll(document.getElementById("dialogEditUser"))
      }, handleOpen: function () {
        this.passwordModify = !1
      }, openUserLabelTree: function () {
        this.getUserLabelTree()
      }, updateUserLabel: function (e) {
        this.userInfo.userLabelIds = e.id, this.userInfo.userLabelNames = e.name
      }
    },
  }
</script>
