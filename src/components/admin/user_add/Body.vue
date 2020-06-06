<template>
  <el-container class="viewFrameWork-body">
    <el-main class="body-wrapper">
      <div class="user-manager-wrapper">
        <div class="content user-manager">
          <div id="userList2" class="content-left">
            <dep-tree ref="deptree"></dep-tree>
          </div>

          <div id="userList3" class="content-right">
            <detail></detail>
          </div>
        </div>
        <dialog-tree></dialog-tree>
        <dialog-multi-tree></dialog-multi-tree>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import depTree from './depTree'
  import detail from './detail'
  import dialogTree from './UpdateDeptTree'
  import dialogMultiTree from './DialogMultiTree'
  export default {
    name: 'Body',
    components: {depTree, detail,dialogTree,dialogMultiTree},
    data() {
      return {
        dropEl: "",
        dropNode: "",
        dragedRow: "",
        againIntro: ""
      };
    },
    methods: {
      handleDragStart: function (e, t) {
      }, handleDragEnter: function (e, t, a) {
      }, handleDragLeave: function (e, t, a) {
      }, handleDragOver: function (e, t, a) {
      }, handleDragEnd: function (e, t, a, s) {
      }, handleDrop: function (e, t, a, s, n) {
        this.$refs.deptree.handleDrop({data: e}, t, a, s, n)
      }, getNode: function (e) {
        this.$refs.deptree.getNode(e)
      }, handleTableReload: function () {
        for (var e = this, t = document.getElementsByClassName("el-table__body-wrapper")[0].getElementsByClassName("el-table__row"), a = this, s = function (s) {
          var n = t[s], i = e.tableInfo[s];
          2 == i.type && n.setAttribute("draggable", !0), n.addEventListener("dragstart", function (e) {
            a.dragstartHandler(e, i)
          }, !1)
        }, n = 0; n < t.length; n++) s(n);
        document.addEventListener("dragenter", this.dragenterHandler, !1), document.addEventListener("dragover", this.dragPreventHandler, !1), document.addEventListener("dragend", this.dragendHandler, !1), document.addEventListener("drop", this.dragPreventHandler, !1)
      }, dragstartHandler: function (e, t) {
        this.dragedRow = t, e.target.style.opacity = .5, e.dataTransfer.setData("Text", t.id)
      }, dragenterHandler: function (e) {
        var t = e.target.parentNode, a = t.parentNode;
        "el-tree-node__label" == e.target.className ? (this.dropEl = e.target, this.dropEl.style.background = "#1a8dff", this.dropEl.style.color = "#fff", this.dropNode = this.getNode(this.dropEl.getAttribute("data-id")), this.handleDragEnter(this.dragedRow, this.$refs.deptree.dropNode, e)) : "el-tree-node__label" == t.className ? (this.dropEl = t, this.dropEl.style.background = "#1a8dff", this.dropEl.style.color = "#fff", this.dropNode = this.getNode(this.dropEl.getAttribute("data-id")), this.handleDragEnter(this.dragedRow, this.$refs.deptree.dropNode, e)) : "el-tree-node__label" == a.className ? (this.dropEl = a, this.dropEl.style.background = "#1a8dff", this.dropEl.style.color = "#fff", this.dropNode = this.getNode(this.dropEl.getAttribute("data-id")), this.handleDragEnter(this.dragedRow, this.$refs.deptree.dropNode, e)) : ("" != this.dropEl && (this.dropEl.style.background = "inherit", this.dropEl.style.color = "inherit"), this.dropEl = "")
      }, dragendHandler: function (e, t) {
        e.target.style.opacity = 1, "" != this.dropEl && (this.dropEl.style.background = "inherit", this.dropEl.style.color = "inherit"), "el-tree-node__label" == this.dropEl.className && (this.getNode(this.dropEl.getAttribute("data-id")), this.handleDrop(this.dragedRow, this.$refs.deptree.dropNode, "inner", e, "user")), this.dropEl = "";
        for (var a = document.getElementById("departmentTree").getElementsByClassName("el-tree-node__label"), s = void 0, n = 0; n < a.length; n++) (s = a[n]).style.background = "inherit", s.style.color = "inherit"
      }, dragleaveHandler: function (e) {
        "el-tree-node__label" == e.target.className && (this.dropEl.style.background = "inherit", this.dropEl.style.color = "inherit", this.dropEl = "")
      }, dragPreventHandler: function (e) {
        e.preventDefault()
      },

    },
    computed: {
      ...mapGetters({
        dialogs: "userList/dialogs",
        // showIntroRights: "showIntroRights",
        tableInfo: "userList/tableInfo"
      }),
    },
    watch: {
      tableInfo: function () {
        var e = this;
        this.dropEl = "", document.removeEventListener("dragstart", this.dragstartHandler), document.removeEventListener("dragenter", this.dragenterHandler), document.removeEventListener("dragend", this.dragendHandler), setTimeout(function () {
          e.handleTableReload()
        }, 500)
      }
    },
  }
</script>
