<template>
<el-dialog class="dialog-dep-user-info fixed" title="添加学员" :visible.sync="dialogs.userInfoAdd" width="440px" :center="!0" id="dialogAddUser">
  <el-form ref="form" :model="userInfo" :rules="rules" label-width="80px" size="mini">
    <el-form-item :class="['validate',userInfo.isReduplicated ? 'is-v-error' : '']" prop="userName" label="账号" :data-validate-content="userInfo.userName" :data-validate-required="!0" data-validate-rule="userName">
      <el-input placeholder="只能包含字母、数字、连字符、下划线、和." maxlength="60" @blur="onValidateUserName" @focus="handleUserNameFocus" v-model="userInfo.userName">
      </el-input>
      <div v-if="userInfo.isReduplicated" class="v-error" >账号已存在</div>
      <div class="error"></div>
    </el-form-item>
    <el-form-item class="validate" label="姓名" prop="surname"  :data-validate-content="userInfo.surname" :data-validate-required="!0">
      <el-input placeholder="请输入姓名" maxlength="60" @blur="onValidate" v-model="userInfo.surname">
      </el-input>
    </el-form-item>
    <el-form-item class="validate" label="密码" prop="passwordTmp"  :data-validate-content="userInfo.passwordTmp" :data-validate-required="!0" data-validate-rule="userPassword">
      <el-input type="password" placeholder="密码大于等于6位小于等于20位" @blur="onValidate" v-model="userInfo.passwordTmp">
      </el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item class="validate" label="确认"   :data-validate-content="userInfo.password" :data-validate-required="!0" data-validate-rule="userPassword">
      <el-input type="password" placeholder="再次输入密码" @blur="onValidatePassword" v-model="userInfo.password">
      </el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item label="部门"  prop="departmentId">
      <div class="el-form-choose" @click="handleTreeOpen">{{userInfo.departmentName ? userInfo.departmentName : "请选择"}}</div>
    </el-form-item>
    <el-form-item label="性别"  prop="sex">
      <el-radio-group v-model="userInfo.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="validate" label="手机" :data-validate-content="userInfo.phone" data-validate-rule="phone">
      <el-input placeholder="请输入手机号" @blur="onValidate" v-model="userInfo.phone" maxlength="60">
      </el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.identityCard">
      <el-input :placeholder="'请输入' + userInfoKeyName.identityCard" v-model="userInfo.identityCard" maxlength="60">
      </el-input>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.position">
      <el-input :placeholder="'请输入' + userInfoKeyName.position" v-model="userInfo.position" maxlength="60">
      </el-input>
    </el-form-item>
    <el-form-item class="validate" label="邮箱" :data-validate-content="userInfo.email" data-validate-rule="email">
      <el-input placeholder="请输入邮箱" @blur="onValidate" v-model="userInfo.email" maxlength="60">
      </el-input>
      <div class="error"></div>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.notice">
      <el-input :placeholder="'请输入' + userInfoKeyName.notice" v-model="userInfo.notice" maxlength="60">
      </el-input>
    </el-form-item>
    <el-form-item :label="userInfoKeyName.identityImg" class="add-identity-img">
      <el-upload class="upload" action="/api/dept/secret_upload" name="upfile" :data="{'account':user.account,'companyId':user.companyId}" :headers="{'Authentication':token}" :before-upload="beforeAvatarUpload" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1" :on-exceed="onExceed" list-type="picture" :data-validate-required="!0">
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
  import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
  export default {
    name:'UserInfoAdd',
    data: function () {
      return {
        popupVisible: !1,
        elId: Math.random(),
        dialogImageUrl: "",
        dialogImageId: "",
        dialogImageName: "",
        rules:{
          userName:[{required:true,message:"请输入账号",trigger:'blur'}],
          surname:[{required:true,message:"请输入姓名",trigger:'blur'}],
          passwordTmp:[{required:true,message:"请输入密码",trigger:'blur'}],
          // passConfirm:[{required:true,message:"请确认密码",trigger:'blur'}],
          departmentId:[{required:true,message:"请选择部门",trigger:'blur'}],
          sex:[{required:true,message:"请选择性别",trigger:'blur'}],
        }
      }
    },
    props: ["currentDep"],
    computed:{
      ...mapState({
        user: state => state.account.user,
        token: state => state.account.token
      }),
      ...mapGetters({
        userInfo: "userList/userInfo",
        dialogs: "userList/dialogs",
        userInfoKeyName: "userList/userInfoKeyName",
      }),
      userLabelIdsArr: function () {
        return this.userInfo.userLabelIds && "" != this.userInfo.userLabelIds ? this.userInfo.userLabelIds.split(",") : []
      },
      fileList: function () {
        if ("" != this.userInfo.identityImg) return [{
          name: this.userInfo.identityImgName,
          url: this.userInfo.identityImg
        }];
        return []
      }
    },
    methods:{
      ...mapMutations({
        resetUserForm: "userList/RESET_USER_INFO_FORM",
        updateUserDep: "userList/UPDATE_USER_INFO_FORM_DEP",
        encryptPassword: "userList/ENCRYPT_PASSWORD",
        uploadImg: "userList/QUESTION_IMG_UPLOAD",
        deleteImg: "userList/QUESTION_IMG_DELETE"
      }),
      ...mapActions({
        addUser: "userList/addUser",
        checkUnameExist: "userList/checkUnameExist",
        getUserLabelTree: "userList/getUserLabelTree",
        // checkPhoneExist: "userList/checkPhoneExist"
      }),
      onExceed: function (e) {
        this.$message.error("只能上传一张照片！")
      }, beforeAvatarUpload: function (e) {
        var t = "image/jpeg" === e.type, a = "image/png" === e.type, s = e.size / 1024 < 500;
        return t || a || this.$message.error("上传图片只能是 JPG/PNG 格式!"), s || this.$message.error("上传图片大小不能超过 500kb!"), (t || a) && s
      }, handleSuccess: function (e, t) {
        var a = e;
        a.success && (this.dialogImageId = a.bizContent.url, this.dialogImageName = t.name)
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
        })
        if ("" == this.userInfo.departmentId)
          return this.$message({type: "warning", message: "请选择部门！"})
        0 == document.getElementById("dialogAddUser").getElementsByClassName("is-error").length && (this.encryptPassword({
          key: "passwordTmp",
          value: this.userInfo.passwordTmp
        }), this.encryptPassword({
          key: "password",
          value: this.userInfo.password
        }), this.addUser({$message: window.alert}))
      }, endUserInfo: function () {
        this.dialogs.userInfoAdd = !1, this.dialogImageUrl = "", this.handleRemove(), document.getElementsByClassName("el-upload-list el-upload-list--picture")[0].innerHTML = ""
      }, onValidatePassword: function (e) {
        for (var t = document.getElementsByClassName("validate"), a = "", s = 0; s < t.length; s++) {
          var n = t[s];
          if (n.contains(e.target)) {
            a = n;
            break
          }
        }
        this.userInfo.passwordTmp == this.userInfo.password ? (a.classList.remove("is-error"), a.getElementsByClassName("error")[0].innerHTML = "", this.onValidate(e)) : (a.classList.add("is-error"), a.getElementsByClassName("error")[0].innerHTML = "两次输入不一致")
      }, onValidateUserName: function (e) {
        this.checkUnameExist()
      }, handleUserNameFocus: function () {
        this.userInfo.isReduplicated = !1
      }, onValidate: function (e) {
        // return KSX.validateOne(e)
      }, onValidateAll: function () {
        // return KSX.validateAll(document.getElementById("dialogAddUser"))
      }, handleOpen: function () {
        this.resetUserForm(), this.updateUserDep({
          name: this.currentDep.name,
          id: this.currentDep.id
        })
      }, openUserLabelTree: function () {
        this.getUserLabelTree()
      }, updateUserLabel: function (e) {
        this.userInfo.userLabelIds = e.id, this.userInfo.userLabelNames = e.name
      }
    },
    // mounted(){
    //   console.log(666)
    //   this.updateUserDep({
    //     name: this.currentDep.name,
    //     id: this.currentDep.id
    //   })
    // },
  }
</script>
