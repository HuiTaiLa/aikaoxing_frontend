<template>
<el-dialog class="dialog-tree fixed" title="选择部门" :visible.sync="dialogs.depTree.showState" width="440px" :center="!0" @close="()=>{dialogs.depTree.showState = !1}">
  <base-tree :showDialog="dialogs.depTree.showState" :isFilter="!0" :tree-data="departmentTree" :multi-select="!1" @node-select="handleNodeSelect"></base-tree>
  <span class="dialog-footer" slot="footer">
    <el-button type="primary" plain @click="()=>{dialogs.depTree.showState = !1}">取消</el-button>
    <el-button type="primary" @click="selDepSureClickFn">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
  import BaseTree from './BaseTree'
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name:'UpdateDeptTree',
    components:{BaseTree},
    data: function () {
      return {selectedData: {}}
    },
    computed:{
      ...mapGetters({
        dialogs: "userList/dialogs",
        departmentTree: "userList/departmentTree"
      }),
    },
    methods:{
      ...mapMutations({
        updateDep: "userList/UPDATE_USER_INFO_FORM_DEP"
      }),
      ...mapActions({
        batchMoveDepAndUser: "userList/batchMoveDepAndUser"
      }),
      handleNodeSelect: function (e) {
        console.log(e)
        this.selectedData = e
      },
      handleTreeChoose: function () {
        this.updateDep({id: this.selectedData.id, name: this.selectedData.name}), this.dialogs.depTree.showState = !1
      },
      handelMoveDepAndUser: function () {
        this.batchMoveDepAndUser({
          targetDep: this.selectedData.id,
          $message: window.alert
        })
          , this.dialogs.depTree.showState = !1
      },
      selDepSureClickFn: function () {
        Object.keys(this.selectedData).length&&this[this.dialogs.depTree.sureMethod]()
      }
    },
    mounted: function () {
      this.selectedData = {}
    }
  }
</script>
