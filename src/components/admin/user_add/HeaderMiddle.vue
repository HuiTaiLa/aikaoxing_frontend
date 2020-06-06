<template>
  <div class="header-middle">
    <div  id="userList1" class="body-toolbar clearfix">
      <div  class="toolbar-left fl fit_config_container">
        <!--<el-dropdown trigger="click">-->
          <!--<el-button type="primary" size="small" plain class="fit_config_btn">-->
            <!--<i class="icon-a_btn_import"></i>-->
            <!--导入-->
          <!--</el-button>-->
          <!--<el-dropdown-menu slot="dropdown" class="fit_config_div">-->
            <!--<el-dropdown-item @click.native="handleShowImportDep">导入部门</el-dropdown-item>-->
            <!--<el-dropdown-item @click.native="handleShowImportUser">导入学员</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--<el-button type="primary" size="small" plain class="fit_config_btn" @click="handleExport">&lt;!&ndash;&ndash;&gt;<i-->
          <!--class="icon-a_btn_derivation"></i><span>导出</span></el-button>-->
        <el-dropdown  trigger="click">
          <el-button type="primary" size="small" plain class="fit_config_btn">
            <i class="icon-a_btn_update"></i>
            批量更新
          </el-button>
          <el-dropdown-menu slot="dropdown" class="fit_config_div">
            <el-dropdown-item @click.native="handleMove">调整部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" size="small" plain
                   class="fit_config_btn" @click="handleDelete"><!----><i
          class="icon-a_btn_delete"></i><span>删除</span>
        </el-button>
        <el-dropdown  class="fit_config_div" trigger="click" @command="setColumns" :hide-on-click="!1">
          <el-button  type="primary" size="small" plain><!----><i
            class="icon-a_btn_custom_column"></i>自定义列
          </el-button>
          <el-dropdown-menu  class="ksx-dropdown check" slot="dropdown">
            <el-dropdown-item command="phone">
              <i v-if="columns.phone" class="el-icon-check icon-check"></i>
              {{"\n          手机\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="identityCard">
              <i v-if="columns.identityCard" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.identityCard + "\n        "}}
            </el-dropdown-item>
            <!--<el-dropdown-item command="position">&lt;!&ndash;&ndash;&gt;-->
              <!--<i v-if="columns.position" class="el-icon-check icon-check"></i>-->
              <!--{{"\n          " + userInfoKeyName.position + "\n        "}}-->
            <!--</el-dropdown-item>-->
            <el-dropdown-item command="email">
              <i v-if="columns.email" class="el-icon-check icon-check"></i>
              {{"\n          邮箱\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="notice"><!---->
              <i v-if="columns.notice" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.notice + "\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="field1"><!---->
              <i v-if="columns.field1" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.field1 + "\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="field2"><!---->
              <i v-if="columns.field2" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.field2 + "\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="field3"><!---->
              <i v-if="columns.field3" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.field3 + "\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="field4"><!---->
              <i v-if="columns.field4" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.field4 + "\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="field5"><!---->
              <i v-if="columns.field5" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.field5 + "\n        "}}
            </el-dropdown-item>
            <el-dropdown-item command="identityImg"><!---->
              <i v-if="columns.identityImg" class="el-icon-check icon-check"></i>
              {{"\n          " + userInfoKeyName.identityImg + "\n        "}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  class="fit_config_div">
          <el-button  type="primary" size="small" plain><!---->
            <i class="icon-a_btn_more"></i>更多
          </el-button>
          <el-dropdown-menu  class="fit_config_div" slot="dropdown">
            <el-dropdown-item @click.native="handleUpdatePassword">
              修改密码
            </el-dropdown-item> <!---->
            <!--<el-dropdown-item>-->
              <!--邮箱验证-->
            <!--</el-dropdown-item> &lt;!&ndash;&ndash;&gt;-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div  class="toolbar-right fr">
        <div  class="ksx-search-group">
          <el-input ref="simpleSearch" :class="['ksx-simple-search','animate',searchInfo.simpleSearch ? 'is-search' : '']" placeholder="请输入姓名、账号或部门" :clearable="!0" @blur="handleBlurSimpleSearch" @keyup.enter.native="handleEnterSimpleSearch(t)" v-model="searchInfo.searchKey">
            <template slot="prefix"><i  class="el-icon-search"></i><!---->
            </template><!---->
            <template slot="append">
              <span @click="handleClickSimpleSearch">搜索</span>
            </template>
          </el-input>
          <el-popover placement="bottom" width="423" trigger="click" popper-class="ksx-advanced-search" @show="handleShowAdvancedSearch" v-model="dialogs.advancedSearch">
            <el-form ref="form" label-position="left" label-width="70px" size="mini">
              <div class="form-body-wrapper">
                <div  class="form-body">
                  <el-form-item label="姓名">
                    <div class="el-input-tag">
                      <el-tag v-for="(value,key) in nameTags" :key="key" closable="" size="mini" :disable-transitions="!1" @close="handleNameClose(key)">
                        {{"\n                    " + value + "\n                  "}}
                      </el-tag>
                      <el-input v-if="nameInputVisible" ref="saveNameTagInput" class="input-new-tag" size="mini" @blur="handleNameInputConfirm" @keyup.enter.native="handleNameInputConfirm(t)" v-model="nameInputValue"></el-input>
                      <el-button v-else  size="small"
                                 class="button-new-tag" @click="showNameInput"><span>+ 添加</span>
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="账号">
                    <div class="el-input-tag">
                      <el-tag v-for="(value,key) in userNameTags" :key="key" closable="" size="mini" :disable-transitions="!1" @close="handleUserNameClose(key)">
                        {{"\n                    " + value + "\n                  "}}
                      </el-tag>
                      <el-input v-if="userNameInputVisible" ref="saveUserNameTagInput" class="input-new-tag" size="mini" @blur="handleUserNameInputConfirm" @keyup.enter.native="handleUserNameInputConfirm(t)" v-model="userNameInputValue"></el-input>
                      <el-button v-else  size="small"
                                 class="button-new-tag" @click="showUserNameInput"><span>+ 添加</span>
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <div class="el-input-tag">
                      <el-tag v-for="(value,key) in phoneTags" :key="key" closable="" size="mini" :disable-transitions="!1" @close="handlePhoneNameClose(key)">
                        {{"\n                    " + value + "\n                  "}}
                      </el-tag>
                      <el-input v-if="phoneInputVisible" ref="savePhoneTagInput" class="input-new-tag" size="mini" @blur="handlePhoneInputConfirm" @keyup.enter.native="handlePhoneInputConfirm(t)" v-model="phoneInputValue"></el-input>
                      <el-button v-else  size="small"
                                 class="button-new-tag" @click="showPhoneInput"><span>+ 添加</span>
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="searchInfo.advancedSearchKey.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-radio-group v-model="searchInfo.advancedSearchKey.status">
                      <el-radio label="0">正常</el-radio>
                      <el-radio label="1">禁用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="部门">
                    <div class="el-form-choose tc" @click="handleTreeOpen">{{"\n                  " + ("" == searchInfo.advancedSearchKey.departmentNames ? "选择部门" : searchInfo.advancedSearchKey.departmentNames) + "\n                "}}
                    </div>
                  </el-form-item>
                  <el-form-item label="部门关键字">
                    <el-input v-model="searchInfo.advancedSearchKey.departmentKey"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="searchInfo.advancedSearchKey.email"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.position">
                    <el-input v-model="searchInfo.advancedSearchKey.position"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.identityCard">
                    <el-input v-model="searchInfo.advancedSearchKey.identityCard"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.notice">
                    <el-input v-model="searchInfo.advancedSearchKey.notice"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.field1">
                    <el-input v-model="searchInfo.advancedSearchKey.field1"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.field2">
                    <el-input v-model="searchInfo.advancedSearchKey.field2"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.field3">
                    <el-input v-model="searchInfo.advancedSearchKey.field3"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.field4">
                    <el-input v-model="searchInfo.advancedSearchKey.field4"></el-input>
                  </el-form-item>
                  <el-form-item :label="userInfoKeyName.field5">
                    <el-input v-model="searchInfo.advancedSearchKey.field5"></el-input>
                  </el-form-item>
                </div>
              </div>
              <el-form-item class="tc fixed-bottom"><!---->
                <el-button  type="primary" class="el-btn-search" @click="handleAdvancedSearch"><!---->
                  搜索
                </el-button>
              </el-form-item>
            </el-form>
            <el-button  type="text" size="medium"
                        class="el-button el-btn-advance"
                        slot="reference">
              高级搜索<i  class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapMutations,mapState,mapGetters} from 'vuex'
  export default {
    name:'HeaderMiddle',
    data: function () {
      return {
        nameInputVisible: !1,
        nameInputValue: "",
        userNameInputVisible: !1,
        userNameInputValue: "",
        phoneInputVisible: !1,
        phoneInputValue: "",
        userLabelNames: ""
      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user,
        token: state => state.account.token,
        userList: state => state.setting.userList,
      }),
      ...mapGetters({
        columns: "userList/columns",
        searchInfo: "userList/searchInfo",
        isSearching: "userList/isSearching",
        nameTags: "userList/nameTags",
        userNameTags: "userList/userNameTags",
        phoneTags: "userList/phoneTags",
        getSelection: "userList/getSelection",
        getSelectedIds: "userList/getSelectedIds",
        dialogs: "userList/dialogs",
        userInfoKeyName: "userList/userInfoKeyName",
        tableAttributes: "userList/tableAttributes"
      }),
    },
    watch: {
      nameTags: function (e, t) {
        this.updateSearchTags({key: "name", value: e})
      }, userNameTags: function (e, t) {
        this.updateSearchTags({key: "userName", value: e})
      }, phoneTags: function (e, t) {
        this.updateSearchTags({key: "phone", value: e})
      }
    },
    methods:{
      ...mapMutations({
        resetCurrentPage: "userList/RESET_CURRENT_PAGE",
        updateTableColumns: "userList/UPDATE_TABLE_COLUMNS",
        updateSearchStatus: "userList/UPDATE_SEARCH_STATUS",
        resetSearchKey: "userList/RESET_SEARCH_KEY",
        resetAdvancedSearchKey: "userList/RESET_ADVANCED_SEARCH_KEY",
        updateSearchTags: "userList/UPDATE_SEARCH_TAGS",
        setUserList:"setting/setUserList"
      }),
      ...mapActions({
        exportUserByDepNode: "userList/exportUserByDepNode",
        exportUserBySearch: "userList/exportUserBySearch",
        exportUserBySeniorSearch: "userList/exportUserBySeniorSearch",
        exportUserBySelect: "userList/exportUserBySelect",
        batchDelUser: "userList/batchDelUser",
        verifyEmails: "userList/verifyEmails",
        updatePassword: "userList/updatePassword",
        search: "userList/search",
        seniorSearch: "userList/seniorSearch",
        editUserPermission: "userList/editUserPermission",
        getUserLabelTree: "userList/getUserLabelTree",
      }),
      handleClickSimpleSearch: function () {
        this.searchInfo.simpleSearch ? (this.resetCurrentPage(), this.search({isLoadMore: !1})) : (this.updateSearchStatus({
          simpleSearch: !0,
          advancedSearch: !1
        }), this.$refs.simpleSearch.focus(), this.resetAdvancedSearchKey())
      }, handleEnterSimpleSearch: function () {
        if ("" == this.searchInfo.searchKey) return this.$message({type: "warning", message: "请输入搜索内容！"}), !1;
        this.resetCurrentPage(), this.search({isLoadMore: !1})
      }, handleBlurSimpleSearch: function () {
        "" == this.searchInfo.searchKey && this.updateSearchStatus({simpleSearch: !1, advancedSearch: "keep"})
      }, handleShowAdvancedSearch: function () {
        this.updateSearchStatus({simpleSearch: !1, advancedSearch: !0}), this.resetSearchKey()
      }, handleAdvancedSearch: function () {
        this.resetCurrentPage(), this.seniorSearch({isLoadMore: !1})
      }, handleNameClose: function (e) {
        this.nameTags.splice(this.nameTags.indexOf(e), 1)
      }, showNameInput: function () {
        var e = this;
        this.nameInputVisible = !0, this.$nextTick(function (t) {
          e.$refs.saveNameTagInput.$refs.input.focus()
        })
      }, handleNameInputConfirm: function () {
        var e = this.nameInputValue;
        e && this.nameTags.push(e), this.nameInputVisible = !1, this.nameInputValue = ""
      }, handleUserNameClose: function (e) {
        this.userNameTags.splice(this.userNameTags.indexOf(e), 1)
      }, showUserNameInput: function () {
        var e = this;
        this.userNameInputVisible = !0, this.$nextTick(function (t) {
          e.$refs.saveUserNameTagInput.$refs.input.focus()
        })
      }, handleUserNameInputConfirm: function () {
        var e = this.userNameInputValue;
        e && this.userNameTags.push(e), this.userNameInputVisible = !1, this.userNameInputValue = ""
      }, handlePhoneClose: function (e) {
        this.phoneTags.splice(this.phoneTags.indexOf(e), 1)
      }, showPhoneInput: function () {
        var e = this;
        this.phoneInputVisible = !0, this.$nextTick(function (t) {
          e.$refs.savePhoneTagInput.$refs.input.focus()
        })
      }, handlePhoneInputConfirm: function () {
        var e = this.phoneInputValue;
        e && this.phoneTags.push(e), this.phoneInputVisible = !1, this.phoneInputValue = ""
      }, handleTreeOpen: function () {
        this.dialogs.multiDepTree = !0
      }, handleShowImportDep: function () {
        this.dialogs.importDep = !0
      }, handleShowImportUser: function () {
        this.dialogs.importUser.showState = !0
      }, handleExport: function () {
        var e = this;
        0 != this.getSelection.length ? this.$confirm("请确认是否导出当前选中的部门和学员的学员信息？", "导出学员信息", {
          customClass: "operation-warning",
          confirmButtonClass: "success",
          cancelButtonClass: "cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: !0
        }).then(function () {
          e.exportUserBySelect({$message: e.$message})
        }).catch(function () {
        }) : this.searchInfo.isSearching ? this.$confirm("请确认是否导出搜索结果的部门和学员？", "导出学员信息", {
          customClass: "operation-warning",
          confirmButtonClass: "success",
          cancelButtonClass: "cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: !0
        }).then(function () {
          e.searchInfo.simpleSearch ? e.exportUserBySearch({$message: e.$message}) : e.searchInfo.advancedSearch && e.exportUserBySeniorSearch({$message: e.$message})
        }).catch(function () {
        }) : this.$confirm("请确认是否导出全部学员的信息？", "导出学员信息", {
          customClass: "operation-warning",
          confirmButtonClass: "success",
          cancelButtonClass: "cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: !0
        }).then(function () {
          e.exportUserByDepNode({$message: e.$message})
        }).catch(function () {
        })
      }, handleMove: function () {
        var flag =true;
        0 == this.getSelection.length ? this.$message({
          type: "warning",
          message: "当前没有选中学员！"
        }) : (this.getSelection.forEach(item=>{
          if(item.type==1)
          {
            flag =false;
            this.$message({
              type: "warning",
              message: "只能选择学员！"
            })
            return
          }
          }),flag && ((this.dialogs.depTree.showState = !0), this.dialogs.depTree.sureMethod = "handelMoveDepAndUser"))
      }, handleDelete: function () {
        var e = this;
        0 == this.getSelection.length ? this.$message({
          type: "warning",
          message: "当前没有选中的部门或学员！"
        }) : this.$prompt("此操作将永久删除所选部门或学员, 是否继续?", "确认删除选中的部门或学员?", {
          customClass: "operation-warning",
          confirmButtonClass: "confirm",
          cancelButtonClass: "cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^DEL$/,
          inputPlaceholder: "输入DEL确认删除",
          inputErrorMessage: "输入DEL确认删除",
          type: "warning",
          center: !0
        }).then(function () {
          e.batchDelUser({$message: e.$message})
        }).catch(function () {
        })
      },
      getColumns: function () {
        // var e = localStorage.getItem("userList");
        var e = this.userList
        e && this.updateTableColumns({columns: e})
      },
      setColumns: function (e) {
        this.updateTableColumns({col: e}),this.setUserList(this.columns)
      },
      handleUpdatePassword: function () {
        var e = this;
        0 == this.getSelection.length ? this.$message({
          type: "warning",
          message: "当前没有选中的部门或学员！"
        }) : this.$prompt("是否将所选部门学员密码改为", "修改密码", {
          customClass: "operation-warning exit-password",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          confirmButtonClass: "success",
          cancelButtonClass: "cancel",
          inputPattern: /^.+$/,
          inputErrorMessage: "请输入密码",
          inputType: "password",
          type: "warning",
          center: !0
        }).then(function (t) {
          var a = t.value;
          e.updatePassword({password: a, $message: window.alert})
        }).catch(function () {
        })
      },
      handleVerifyEmails: function () {
        var e = this;
        0 == this.getSelection.length ? this.$message({
          type: "warning",
          message: "当前没有选中的部门或学员！"
        }) : this.$confirm("此操作将验证选中部门和学员的邮箱, 是否继续?", "邮箱验证", {
          customClass: "operation-warning",
          confirmButtonClass: "success",
          cancelButtonClass: "cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: !0
        }).then(function () {
          e.verifyEmails({$message: e.$message})
        }).catch(function () {
        })
      },
      moreHandle: function (e) {
        this[e]()
      }, editPermission: function (e) {
        var t = this;
        if (0 != this.getSelection.length) {
          var a = "", s = "";
          0 == e ? (a = "考试星权限批量管理能够批量开通/关闭学员的考试星系统权限，考试星权限将会直接影响用户是否能够被用于创建考试星考试、课程、自定义任务，请谨慎操作。", s = "考试星权限批量管理") : 1 == e && (a = "会否权限批量管理能够批量开通/关闭学员的会否系统权限，会否系统权限将会直接影响用户是否能够被用于创建会否练习，请谨慎操作。", s = "会否权限批量管理"), this.$confirm(a, s, {
            confirmButtonClass: "success",
            cancelButtonClass: "cancel",
            confirmButtonText: "全部开通",
            cancelButtonText: "全部关闭",
            center: !0
          }).then(function () {
            t.editUserPermission({platform: e, permission: 1, $message: t.$message, type: 0})
          }).catch(function () {
            t.editUserPermission({platform: e, permission: 0, $message: t.$message, type: 0})
          })
        } else this.$message({type: "warning", message: "当前没有选中的部门或学员！"})
      }, handleUserLabel: function () {
        0 == this.getSelection.length ? this.$message({
          type: "warning",
          message: "当前没有选中的部门或学员！"
        }) : this.dialogs.userLabelTree.showState = !0
      }, openUserLabelTree: function () {
        this.getUserLabelTree()
      }, setUserLabel: function (e) {
        this.searchInfo.advancedSearchKey.userLabelIds = e.id, this.userLabelNames = e.name
      }, showDingtalkSyncDialog: function () {
        this.dingtalkInfo.syncDialog = !0
      }, handleDingtalkAuthMsg: function () {
        if (0 == this.getSelection.length) this.$message({type: "warning", message: "当前没有选中的部门或人员！"}); else {
          this.dingtalkInfo.isDepChecked = !1;
          var e = !0, t = !1, a = void 0;
          try {
            for (var s, n = et()(this.tableAttributes.selection); !(e = (s = n.next()).done); e = !0) {
              if (1 == s.value.type) {
                this.dingtalkInfo.isDepChecked = !0;
                break
              }
            }
          } catch (e) {
            t = !0, a = e
          } finally {
            try {
              !e && n.return && n.return()
            } finally {
              if (t) throw a
            }
          }
          this.dingtalkInfo.authMsgDialog = !0
        }
      }
    },
    mounted: function () {
      this.getColumns()
    }
  }
</script>
