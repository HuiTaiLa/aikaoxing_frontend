<template>
  <div class="tree-wrapper ksx-tree" :isfilter="isFilter">
    <el-input v-if="isFilter" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree ref="ksxTree" :data="treeData" node-key="id" :highlight-current="!multiSelect" :show-checkbox="multiSelect"
             :check-on-click-node="multiSelect" :expand-on-click-node="!1" :default-expand-all="!noDefaultExpandAll" :default-expanded-keys="defaultExpandedKeys"
             :props="noDefaultExpandAll ? rootDisabledProps : defaultProps" :default-checked-keys="selectedArr" :filter-node-method="filterNode"
             :check-strictly="!(!checkStrictly && !checkStrictlyProp)" @node-click="handleNodeClick" @check-change="handleCheckChange" @check="handleCheck">
        <template slot-scope="{data,node}">
          <span :class="['el-tree-node__label',selectedData.id == data.id ? 'selected' : '']" :data-id="node.id">
            <span class="el-tree-node-label">{{labelKey ? data[labelKey] : data.name}}</span>
          </span>
        </template>
    </el-tree>
  </div>
</template>

<script>
  export default {
    name:'BaseTree',
    data: function () {
      return {
        selectedData: "",
        checkedNodes: [],
        defaultProps: {
          disabled: function (e, t) {
            return t.onlyRead
          }
        }, rootDisabledProps: {
          disabled: function (e, t) {
            return 0 == e.pid || t.onlyRead
          }
        },
        filterText: "",
        checkStrictly: !1
      }
    },
    props: [
      "treeData",
      "multiSelect",
      "isFilter",
      "showDialog",
      "selectedArr",
      "labelKey",
      "checkStrictlyProp",
      "noDefaultExpandAll",
      "checkParent"
    ],
    computed: {
      defaultExpandedKeys: function () {
        if (void 0 === this.treeData[0] || void 0 === this.treeData[0]) return [];
        if (this.treeData[0].id) {
          if (this.noDefaultExpandAll && this.selectedArr && this.selectedArr.length > 0) {
            for (var e = [], t = 0; t < this.selectedArr.length; t++) "" != this.selectedArr[t] && e.push(Number(this.selectedArr[t]));
            return e.length > 0 ? e : [this.treeData[0].id]
          }
          return [this.treeData[0].id]
        }
        return this.treeData[0].id ? [this.treeData[0].id] : void 0
      }
    },
    methods: {
      handleCheck:function(e,t){
        e.onlyRead?( this.$message({
          type: "warning",
          message: "您不具有选择该部门的权限！"
        }), this.$refs.ksxTree.setChecked(e.id,false)):''
      },
      handleNodeClick: function (e) {
        e.onlyRead?(this.$message({
          type: "warning",
          message: "您不具有选择该部门的权限！"
        }),this.clearCheckNode):(console.log(666), this.multiSelect || (this.selectedData = e, this.$emit("node-select", this.selectedData)))
      },
      handleCheckChange: function (e, t) {
        this.multiSelect && (this.checkedNodes = this.$refs.ksxTree.getCheckedNodes(), this.$emit("node-select", this.checkedNodes, {
          item: e,
          isSelected: t,
          $tree: this.$refs.ksxTree
        }))
      }, clearCheckNode: function () {
        this.selectedData = ""
      },
      filterNode: function (e, t) {
        return !e || -1 !== t.name.indexOf(e)
      }
    },
    watch: {
      filterText: function (e) {
        this.isFilter && (this.checkStrictly = e.length > 0, this.$refs.ksxTree.filter(e))
      },
      showDialog: function (e) {
        this.isFilter && (this.filterText = "")
      }
    }
  }
</script>
