<template>
  <div v-loading="tableAttributes.loading" class="detail-list el-table-area">
    <el-table ref="ksxTable" :class="[isSearching ? 'is-searching' : '']" style="width: 100%;height: 100%" :data="tableConfig.tableInfo" tooltip-effect="dark" :border="!1" @select="handleSelect" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="33">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="250" :show-overflow-tooltip="!0">
        <template slot-scope="t">
          <div v-if="1 == t.row.type" :class="['el-row-folder', (0 == t.$index || isSearching) ? '' : 'el-sub-row']" @click="handleRowClick(t.row)">
            <img class="icon" src="https://cdnoss.kaoshixing.com/ksxing_static/vue/images/icon/folder.svg">
            <span style="margin-left: 7px">{{t.row.name + " " + (-1 == t.row.count ? "":"(" + t.row.count + ")") + " "}}</span>
          </div>
          <div v-else class="el-row-user el-sub-row" >
            <i v-if="'女' == t.row.sex" class="el-icon icon-female icon-a_woman"></i>
            <i v-else class="el-icon icon-male icon-a_man"></i>
            <span style="margin-left: 7px">{{t.row.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="isSearching" prop="departmentName" label="部门" width="180" :show-overflow-tooltip="!0">
      </el-table-column>
      <el-table-column prop="userName" label="账号" width="180" :show-overflow-tooltip="!0" >
      </el-table-column>
      <el-table-column v-if="columns.phone" prop="phone" label="手机" width="120" :show-overflow-tooltip="!0" >
      </el-table-column>
      <!--<el-table-column v-if="baseRights.canExercise"></el-table-column>-->
      <!--<el-table-column v-if="1 == advancedSetRights.pointOpen&&1 == companyRights.allowPointRank"></el-table-column>-->
      <el-table-column prop="" label="" width="50" :show-overflow-toolti="!0"></el-table-column>
      <el-table-column v-if="columns.identityCard" prop="identityCard" :label="userInfoKeyName.identityCard" :show-overflow-tooltip="!0" width="180"></el-table-column>
      <el-table-column v-if="columns.identityImg" prop="identityImg" :label="userInfoKeyName.identityImg" :show-overflow-tooltip="!0" width="100"  >
        <template slot-scope="t">
          <div v-if="t.row.identityImg" @click="handleShowIdentityImg(t.row)">
            <span style="color: #1a8dff;text-decoration: underline;cursor: pointer">
              查看
            </span>
          </div>
          <div v-else>
            <span>-</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="columns.email" prop="email" label="邮箱" width="180" :show-overflow-tooltip="!0"></el-table-column>
      <!--<el-table-column v-if="columns.isBindWechat" prop="isBindWechatDesc" label="是否绑定微信" width="120" :show-overflow-tooltip="!0"></el-table-column>-->
      <!--<el-table-column v-if="!(0 != platformType && 3 != platformType || !baseRights.canExercise)"></el-table-column>-->
      <!--<el-table-column v-if="1 == platformType && baseRights.canExercise"></el-table-column>-->
      <!--<el-table-column v-if="2 == platformType && baseRights.canExercise"></el-table-column>-->
      <el-table-column v-if="columns.notice" width="180"  prop="notice" :label="userInfoKeyName.notice" :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column v-if="columns.photo" width="180"  prop="photo" :label="userInfoKeyName.photo" :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column v-if="columns.field1" width="180"  prop="field1" :label="userInfoKeyName.field1"  :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column v-if="columns.field2" width="180"  prop="field2" :label="userInfoKeyName.field2"  :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column v-if="columns.field3" width="180"  prop="field3" :label="userInfoKeyName.field3"  :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column v-if="columns.field4" width="180"  prop="field4" :label="userInfoKeyName.field4"  :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column v-if="columns.field5" width="180"  prop="field5" :label="userInfoKeyName.field5"  :show-overflow-tooltip="!0"></el-table-column>
      <el-table-column prop="createTime" width="180"  label="创建时间"  :show-overflow-tooltip="!0" sortable="custom"></el-table-column>
      <!--<el-table-column v-if="1 == advancedSetRights.userLabelOpen"></el-table-column>-->
      <el-table-column label="操作" width="166" fixed="right">
        <template slot-scope="t">
          <el-button v-if="('online' == projectType)&&!(1 != companyRights.allowUserAdd || 0 != t.$index || 1 != t.row.type || isSearching)" type="primary" size="mini" @click="handleUserAdd(t.$index, t.row)">
            添加学员
          </el-button>
          <el-tooltip v-if="1 != t.row.type" class="item" effect="dark" content="编辑" placement="top">
            <i class="el-icon icon-a_operate_edit" @click="handleUserEdit(t.$index, t.row)"></i>
          </el-tooltip>
          <el-tooltip v-if="1 != t.row.type" class="item" effect="dark" content="删除" placement="top">
            <i class="el-icon icon-a_operate_delete" @click="handleUserDelete(t.$index, t.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <template slot="append">
        <div v-if="tableAttributes.canLoadMore" class="table-load" @click="handleCurrentChange">
          {{"\n        点击加载更多\n      "}}
        </div>
      </template>
    </el-table>
    <!--<user-info-add :current-dep="currentDep"></user-info-add>-->
    <user-info-edit></user-info-edit>
    <user-info-add :current-dep="currentDep"></user-info-add>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  import UserInfoEdit from './UserInfoEdit'
  import UserInfoAdd from './UserInfoAdd'
  export default {
    name:"detail",
    data: function () {
      return {
        identityImgUrl: "",
        currentDep: {
          name: "",
          id: ""
        },
        thisRowData: "",
        companyRights:{
          allowUserAdd:!0,
        },
      }
    },
    components: {
      UserInfoEdit,
      UserInfoAdd
    },
    computed:{
      ...mapState({

      }),
      ...mapGetters({
        departmentTree: "userList/departmentTree",
        searchInfo: "userList/searchInfo",
        isSearching: "userList/isSearching",
        tableConfig: "userList/tableConfig",
        tableInfo: "userList/tableInfo",
        columns: "userList/columns",
        tableAttributes: "userList/tableAttributes",
        dialogs: "userList/dialogs",
        userInfoKeyName: "userList/userInfoKeyName",
        currentDepId: "userList/currentDepId",
        moduleRights: "userList/moduleRights",
        platformType: "userList/platformType"
      }),
      projectType: function () {
        return "online"
      }
    },
    methods:{
      ...mapMutations({
        updateCurrentDepId: "userList/UPDATE_CURRENT_DEP_ID",
        resetCurrentPage: "userList/RESET_CURRENT_PAGE",
        updateTableSelection: "userList/UPDATE_TABLE_SELECTION",
        updateTableSort: "userList/UPDATE_TABLE_SORT",
        updateUserDep: "userList/UPDATE_USER_INFO_FORM_DEP",
      }),
      ...mapActions({
        getDepUnderUserAndSubdep: "userList/getDepUnderUserAndSubdep",
        getSelfName: "userList/getSelfName",
        getUser: "userList/getUser",
        delUser: "userList/delUser",
        search: "userList/search",
        seniorSearch: "userList/seniorSearch",
        tableReload: "userList/tableReload",
        editUserPermission: "userList/editUserPermission",
        getUserLabelTree: "userList/getUserLabelTree",
        batchUpdateUserLabel: "userList/batchUpdateUserLabel",
        getExerciseRight: "userList/getExerciseRight",
        getPlatformType:"userList/getPlatformType"
      }),
      updateUserLabel: function (e) {
        this.batchUpdateUserLabel({
          targetLabel: e,
          $message: this.$message
        }), this.dialogs.userLabelTree.showState = !1
      },
      handleUserAdd: function (e, t) {
        // console.log(e,t)
        this.dialogs.userInfoAdd = !0, this.currentDep.id = t.id, this.currentDep.name = t.name,
          this.updateUserDep({
            name: this.currentDep.name,
            id: this.currentDep.id
          })
      },
      handleUserDelete: function (e, t) {
        var a = this;
        "admin" == t.role ? this.$message({
          type: "warning",
          message: "该用户为管理员，无法删除！"
        }) : "sub_admin" == t.role ? this.$message({
          type: "warning",
          message: "该用户被设置为子管理员，无法删除！"
        }) : this.$confirm("此操作将永久删除该学员, 是否继续?", "删除学员", {
          customClass: "operation-warning",
          confirmButtonClass: "confirm",
          cancelButtonClass: "cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: !0
        }).then(function () {
          a.delUser({userIds: t.id, $message: a.$message})
        }).catch(function () {
        })
      },
      handleUserEdit: function (e, t) {
        this.getUser({id: t.id, open: this.openModal})
      },
      openModal: function () {
        this.dialogs.userInfoEdit = !0
      },
      handleCurrentChange: function () {
        this.searchInfo.current = this.searchInfo.current + 1, this.searchInfo.simpleSearch ? this.search({isLoadMore: !0}) : this.searchInfo.advancedSearch ? this.seniorSearch({isLoadMore: !0}) : this.getDepUnderUserAndSubdep({isLoadMore: !0})
      },
      handleSelectionChange: function (e) {
        this.updateTableSelection({selection: e}), this.dingtalkEnv && this.dingtalkUpdateTableSelection({
          selection: e,
          isSearching: this.searchInfo.isSearching
        })
      },
      handleSelect: function (e, t) {
       t.onlyRead?(this.$message({
         type: "warning",
         message: "您不具有选择该部门的权限！"
       }) ,this.$refs.ksxTable.toggleRowSelection(t,false)):this.isSearching || (t.id == this.currentDepId ? this.tableAttributes.headerSelectionStatus ? (this.$refs.ksxTable.clearSelection(), this.tableAttributes.headerSelectionStatus = !1) : (this.$refs.ksxTable.toggleRowSelection(t, !1), this.$refs.ksxTable.toggleAllSelection(), this.tableAttributes.headerSelectionStatus = !0) : e.length != this.tableConfig.tableInfo.length && (this.tableAttributes.headerSelectionStatus = !1, this.$refs.ksxTable.toggleRowSelection(this.tableConfig.tableInfo[0], !1)))
      },
      handleSortChange: function (e) {
        this.updateTableSort({prop: e.prop, order: e.order}), this.tableReload({reloadTree: !1})
      },
      handleRowClick: function (e) {
        e.onlyRead?this.$message({
          type: "warning",
          message: "您不具有操作该部门的权限！"
        }):(this.resetCurrentPage(), this.updateCurrentDepId(e.id), this.getDepUnderUserAndSubdep({isLoadMore: !1}))
      },
      handleShowIdentityImg: function (e) {
        var t = e.identityImg,
          a = t;
        this.$message({
          message:'<strong><img id="showImgLoaded" src= "' + a + '" style="width:400px;" > </strong>',
          dangerouslyUseHTMLString: !0,
          showClose: !0,
          duration:0,
          iconClass:'showIdentityImg',
          center:true,
          customClass: "showIdentityImg"
        })
      },
      editPermission: function (e, t) {
        var a = void 0;
        a = 0 == e ? 0 != t.permission && 2 != t.permission ? 1 : 0 : 1 != t.permission && 2 != t.permission ? 1 : 0, this.editUserPermission({
          platform: e,
          permission: a,
          $message: this.$message,
          type: 1,
          userId: t.id
        })
      },
      handleShowIntegralDialog: function (e) {
        this.getUserInfo({userId: e.id}), this.thisRowData = {
          surname: e.name,
          userName: e.userName,
          score: e.userPoint,
          userId: e.id
        }, this.getUserDetailPage({userId: e.id})
      },
      openIntegralModal: function () {
        this.dialogs.userIntegral = !0
      },
      handleDingtalkAuthorize: function (e, t) {
        if (1 == t.type) this.dingtalkInfo.dtDepAuthStatus = 1 == t.dtAuth ? 0 : 1, this.dingtalkInfo.dtDepId = t.id, this.dingtalkInfo.authDepDialog = !0; else if (2 == t.type) if ("admin" != t.role) {
          var a = 1 == t.dtAuth ? 0 : 1;
          this.setDingtalkAuth({status: a, userId: t.id, _this: this})
        } else this.$message({type: "error", message: "管理员不可更改权限"})
      }
    },
    mounted: function () {
      // this.getSelfName(), this.getExerciseRight(), this.getCompanyBaseRights(), this.getPlatformType()
    }
  }
</script>
