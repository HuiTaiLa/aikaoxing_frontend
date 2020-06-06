<template>
  <el-dialog class="dialog-tree fixed" title="选择部门" :visible.sync="dialogs.multiDepTree" width="440px" :center="!0">
    <dep-tree :tree-data="departmentTree" :multi-select="!0" @node-select="handleNodeSelect">
    </dep-tree>
    <span class="dialog-footer" slot="footer">
        <el-button type="primary" plain @click.stop="dialogs.multiDepTree = !1">取消</el-button>
        <el-button type="primary"  @click.stop="handleTreeChoose">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import depTree from './BaseTree'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:'DialogMultiTree',
    data: function () {
      return {selectedData: []}
    },
    components: {depTree},
    props: ["fromList"],
    computed:{
      ...mapGetters({
        dialogs: "userList/dialogs",
        departmentTree: "userList/departmentTree"
      }),
    },
    methods:{
      ...mapMutations({
        updateSearchDep: "userList/UPDATE_SEARCH_DEP",
      }),
      handleNodeSelect: function (e) {
        this.selectedData = e
      },
      handleTreeChoose: function () {
        var e = this;
        "pointRank" == this.fromList ? this.updateSearchDepPoint({department: this.selectedData}) : (this.updateSearchDep({department: this.selectedData}), setTimeout(function () {
          e.dialogs.advancedSearch = !0
        }, 30)), this.dialogs.multiDepTree = !1
      }
    },
    mounted: function () {
      this.selectedData = []
    }
  }
</script>
