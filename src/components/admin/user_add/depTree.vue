<template>
  <div id="departmentTree" class="department-tree">
    <div class="title">
      部门名称
    </div>
    <div class="tree-wrapper ksx-tree ksx-tree-node" v-loading="treeLoading">
      <el-tree :data="departmentTree" node-key="id" ref="tree" :default-expanded-keys="defaultExpandedKeys" :auto-expand-parent="!0" :draggable="!0" :allow-drop="allowDrop" :allow-drag="allowDrag" @node-drop="handleDrop">
                    <span slot-scope="{ node, data }" :class="['el-tree-node__label',currentDepId == data.id?'selected':'',nodeEdit.isEdit && nodeEdit.id == data.id ?'isEdit':'']" :data-id="data.id">
                    <span class="el-tree-node-icon">
                      <i  class="icon icon-a_square_plus_outline icon-expand"></i>
                      <i class="icon icon-a_square_remove_outline icon-collapse"></i>
                      <img class="icon icon-leaf" src="https://cdnoss.kaoshixing.com/ksxing_static/vue/images/icon/department_symbol.svg">
                    </span>
                      <span v-if="nodeEdit.isEdit && nodeEdit.id == data.id" class="el-node-edit">
                        <el-input class="edit-input" size="mini" placeholder="请输入内容" @blur="handleNodeEditComplete(data,node)" v-model="nodeEdit.name">
                        </el-input>
                        <span class="edit-operation">
                          <span class="operation" @click.stop="handleNodeEditComplete(data,node)">
                            确定
                          </span>
                          <span class="operation" @click.stop="handleNodeEditCancel(data,node)">
                            取消
                          </span>
                        </span>
                      </span>
                      <span v-else class="el-tree-node-label" @click.stop="handleNodeClick(data)">
                        {{"\n          " +　data.name + " " + (-1 == data.count ? "" :"(" + data.count + ")") + "\n        "}}
                      </span>
                      <!--在下面这里需加只读权限限制-->
                      <span class="el-tree-node-operation">
                        <el-tooltip effect="dark" content="添加部门" placement="top">
                          <i v-if="!data.onlyRead" class="icon icon-a_circle_plus_outline" @click.stop="handleNodeAdd(data,node)"></i>
                        </el-tooltip>
                        <i v-if="!data.onlyRead" class="icon icon-a_operate_edit" @click.stop="handleNodeEdit(data,node)"></i>
                        <i v-if="!data.onlyRead && data.id != departmentTree[0].id" class="icon icon-a_operate_delete" @click.stop="handleNodeDelete(data,node)"></i>
                      </span>
                  </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapGetters,mapActions} from'vuex'
  export default {
    name:"depTree",
    data: function () {
      return {
        nodeEdit: {
          isEdit: !1,
          name: "",
          id: ""
        },
        dropNode: ""
      }
    },
    computed: {
      ...mapGetters({
        departmentTree: "userList/departmentTree",
        defaultExpandedKeys: "userList/defaultExpandedKeys",
        treeLoading: "userList/treeLoading",
        currentDepId: "userList/currentDepId"
    }),
  },
    methods: {
      ...mapMutations({
        updateCurrentDepId: "userList/UPDATE_CURRENT_DEP_ID",
        resetCurrentPage: "userList/RESET_CURRENT_PAGE"
    }),
      ...mapActions({
        getDepartmentsJson: "userList/getDepartmentsJson",
        isNodeEdit: "userList/isNodeEdit",
        addDep: "userList/addDep",
        updateDep: "userList/updateDep",
        deleteDep: "userList/deleteDep",
        getDepUnderUserAndSubdep: "userList/getDepUnderUserAndSubdep",
        moveDep: "userList/moveDep",
        userMove: "userList/userMove"
      }),
      handleNodeAdd: function (e, t) {
        this.addDep({name: "新部门", data: e})
      }, handleNodeEdit: function (e, t) {
        this.nodeEdit.isEdit = !0, this.nodeEdit.name = e.name, this.nodeEdit.id = e.id
      }, handleNodeEditComplete: function (e, t, a) {
        if (this.nodeEdit.isEdit) {
          if ("" == this.nodeEdit.name) return void this.$message({type: "error", message: "部门名称不能为空!"});
          this.updateDep({name: this.nodeEdit.name, data: e}), this.nodeEdit.isEdit = !1
        }
      }, handleNodeEditCancel: function (e, t) {
        this.nodeEdit.isEdit = !1, this.nodeEdit.name = "", this.nodeEdit.id = ""
      }, handleNodeDelete: function (e, t) {
        this.deleteDep({node: t, data: e, del: !1, $prompt: this.$prompt, $message: this.$message})
      }, handleNodeClick: function (e) {
        e.onlyRead ? this.$message({
          type: "warning",
          message: "您没有部门权限"
        }) : (this.resetCurrentPage(), this.updateCurrentDepId(e.id), this.getDepUnderUserAndSubdep({isLoadMore: !1}))
      }, handleDrop: function (e, t, a, s, n) {
        if ("user" == n) {
          if (t.data.onlyRead) return this.$message({type: "warning", message: "您没有部门权限"}), !1;
          this.userMove({userId: e.data.id, departmentId: t.data.id})
        } else this.moveDep({dropType: a, sourceNodeData: e.data, targetNodeData: t.data, $message: window.alert})
      }, allowDrop: function (e, t, a) {
        return t.data.onlyRead ? (this.$message({
          type: "warning",
          message: "您没有部门权限"
        }), !1) : t.data.id !== this.departmentTree[0].id || "prev" != a && "next" != a
      }, allowDrag: function (e) {
        return !e.data.onlyRead && e.data.id != this.departmentTree[0].id && !this.nodeEdit.isEdit
      }, getNode: function (e) {
        this.dropNode = this.$refs.tree.getNode(e)
      }
  },
    mounted: function () {
      this.getDepartmentsJson({loadType: "init"})
    }
  }
</script>
