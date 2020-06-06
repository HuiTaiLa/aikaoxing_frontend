<template>
  <div class="header-middle">
    <div  id="addQuestion1" class="body-toolbar clearfix">
      <div  class="toolbar-left fl fit_config_container">
        <el-button @click="addQuestion" type="primary" size="small" class="fit_config_btn"
                    primary=""><!----><i class="icon-a_circle_plus"></i>添加试题
        </el-button>
        <el-dropdown  class="fit_config_div" @command="questionRepeat">
        <!--<span class="el-button-repeat">-->
          <!--<i class="icon-a_operate_retake btn-icon-left"></i>-->
        <!--试题查重-->
      <!--</span>-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">单选题</el-dropdown-item>
            <el-dropdown-item command="2">多选题</el-dropdown-item>
            <el-dropdown-item command="3">判断题</el-dropdown-item>
            <el-dropdown-item command="4">填空题</el-dropdown-item>
            <el-dropdown-item command="5">问答题</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button  type="primary" size="small" plain=""
                    class="fit_config_btn" @click="updateTest"><!----><i
          class="icon-a_btn_update"></i>批量更新
        </el-button>

        <!--<div>-->
          <el-dialog class="update-dialog" title="批量更新" :visible.sync="updateVisible" width="30%" :append-to-body="!0" :close-on-click-modal="!1" :modal="!1" center="" @close="closeUpdateDialog">
            <div class="content">
              <div>
                <span>
                  试题分类：
                </span>
                <el-button class="test-class" type="primary" plain="" size="small" @click="manageUpdateClass">
                  <span>
                  {{UpdateClass ? "已选择" : "请选择"}}
                  </span>
                </el-button>
                <el-dialog
                  :visible.sync="TypeDialogVisible" :close-on-click-modal="!1" :modal="!1" :append-to-body="!0">
                  <iframe width="100%" height="300px" ref="selUpdateTypeModal" name="selUpdateTypeModal" id="selUpdateTypeModal"></iframe>
                </el-dialog>
              </div>
              <div>
                <span>
                  试题难度：
                </span>
                <el-radio-group v-model="updateDifficult">
                  <el-radio label="简单">
                    简单
                </el-radio>
                  <el-radio label="普通">
                    普通
                  </el-radio>
                  <el-radio label="困难">
                    困难
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <div>
              <span :class="isAllFill ? '' : 'radio_disabled'">
                  答案乱序：
                </span>
              <el-radio-group v-model="updateDisort">
                <el-radio label="1" :disabled="!isAllFill">
                  开启
                </el-radio>
                <el-radio label="0" :disabled="!isAllFill">
                  关闭
                </el-radio>
              </el-radio-group>
              <div class="help_tip_container">
                <el-tooltip class="islook_txt" effect="dark" content="答案乱序仅限填空题批量更新使用，其他题型无法进行此操作" placement="bottom">
                  <i class="icon-a_nav_help islook_tip"></i>
                </el-tooltip>
              </div>
            </div>
            <span class="dialog-footer" slot="footer">
              <el-button @click="endUpdate">
                取 消
              </el-button>
              <el-button type="primary" @click="saveUpdate">
                确 定
              </el-button>
            </span>
          </el-dialog>
        <!--</div>-->
        <el-button  type="primary" size="small" plain @click="handleDelete"
                    class="fit_config_btn"><!----><i
          class="icon-a_btn_delete"></i>删除
        </el-button>
        <el-dropdown  class="fit_config_div" trigger="click" @command="handleTableCol">
          <el-button  type="primary" size="small" plain><!----><i
            class="icon-a_btn_custom_column"></i>自定义列
          </el-button>
          <el-dropdown-menu  class="ksx-dropdown check" slot="dropdown">
            <el-dropdown-item command="classification">
              <i v-show=" tableColumns.includes('classification')" class="el-icon-check icon-check"></i>
              分类
            </el-dropdown-item>
            <el-dropdown-item command="difficult">
              <i v-show=" tableColumns.includes('difficult')" class="el-icon-check icon-check"></i>
              难度
            </el-dropdown-item>
            <el-dropdown-item command="modifier"><!---->
              <i v-show=" tableColumns.includes('modifier')" class="el-icon-check icon-check"></i>
              修改人
            </el-dropdown-item>
            <el-dropdown-item command="modifyTime"><!---->
              <i v-show=" tableColumns.includes('modifyTime')" class="el-icon-check icon-check"></i>
              修改时间
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  class="fit_config_div" :hide-on-click="!1" trigger="click" @command="handleMore">
          <el-button  type="primary" size="small" plain><!---->
            <i class="icon-a_btn_classify"></i>更多
          </el-button>
          <el-dropdown-menu  class="ksx-dropdown check" slot="dropdown">
            <el-dropdown-item command="manageClass">
              管理试题分类
            </el-dropdown-item> <!---->
            <el-dialog
              :visible.sync="manageDialogVisible" :close-on-click-modal="!1" :modal="!1">
              <iframe width="100%" height="300px" ref="manageTypeModal" name="manageTypeModal" id="manageTypeModal"></iframe>
            </el-dialog>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div  class="toolbar-right fr">
        <div  class="ksx-search-group">
          <el-input ref="simpleSearch" v-model="searchKey" class="ksx-simple-search animate" :class="[tableSearchInfo.simpleSearch?'is-search':'']" @blur="handleBlurSimpleSearch" @keyup.enter.native="handleEnterSimpleSearch" placeholder="请输入试题或选项内容">
            <template slot="prefix"><i  class="el-icon-search"></i><!---->
            </template><!---->
            <template slot="append">
              <span @click="handleClickSimpleSearch" >搜索</span>
            </template>
          </el-input>
          <el-popover @show="handleShowAdvancedSearch" v-model="advancedSearch" trigger="click" popper-class="ksx-advanced-search" placement="bottom" width="423">
            <el-form ref="form" label-position="left" label-width="70px" size="mini">
              <div class="form-body-wrapper">
                <div  class="form-body">
                  <el-form-item label="创建人">
                    <el-input v-model="creater">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="试题分类">
                    <div class="el-form-choose tc" @click="handleClassOpen">{{"\n                  " + ("" == tableSearchInfo.advancedSearchKey.classification ? "请选择" : "已选择") + "\n                "}}
                    </div>
                    <el-dialog
                      :visible.sync="dialogVisible" :close-on-click-modal="!1" :modal="!1">
                      <iframe width="100%" height="300px" ref="selTypeModal" name="selTypeModal" id="selTypeModal"></iframe>
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="试题类型">
                    <el-row class="block-col-2">
                      <el-col :span="12">
                        <el-dropdown trigger="click" placement="bottom" @command="testType">
                          <span class="save-difficult el-dropdown-link">{{"" == testTypeText ? "请选择" : testTypeText}}</span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">单选题</el-dropdown-item>
                            <el-dropdown-item command="2">多选题</el-dropdown-item>
                            <el-dropdown-item command="3">判断题</el-dropdown-item>
                            <el-dropdown-item command="4">填空题</el-dropdown-item>
                            <el-dropdown-item command="5">问答题</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="试题难度">
                    <el-row class="block-col-2">
                      <el-col :span="12">
                        <el-dropdown trigger="click" placement="bottom" @command="testDiffcult">
                          <span class="el-dropdown-link save-difficult">{{"" == difficultText ? "请选择" : difficultText}}</span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="简单">简单</el-dropdown-item>
                            <el-dropdown-item command="普通">普通</el-dropdown-item>
                            <el-dropdown-item command="困难">困难</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </el-form-item> <!---->
                </div>
              </div>
              <el-form-item class="tc fixed-bottom"><!---->
                <el-button  type="primary" class="el-btn-search" @click="handleAdvancedSearch"><!---->
                  搜索
                </el-button>
              </el-form-item>
            </el-form>
            <el-button  type="text" size="medium"
                        class="el-btn-advance"
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
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name:'HeaderMiddle',
    data(){
      return{
        searchKey:"",
        advancedSearch:!1,
        creater:"",
        dialogVisible:!1,
        iframeWin: {},
        testTypeText:"",
        difficultText:"",
        updateVisible:!1,
        UpdateClass:"",
        TypeDialogVisible:!1,
        updateDifficult:"",
        // isAllFill:!1,
        updateDisort:"",
        manageDialogVisible:!1,
      }
    },
    watch:{
      searchKey(newVal,oldVal){
        this.setQuestionSearchKey(this.searchKey)
      },
      creater(newVal,oldVal){
        this.setAdvancedSearchKeyCreater(this.creater)
      },
    },
    computed:{
      ...mapState({
        user: state => state.account.user,
        tableColumns: state => state.setting.tableColumns,
        tableSearchInfo: state => state.setting.tableSearchInfo,
        selection: state => state.setting.selection,
      }),
      ...mapGetters({
        getSelectedIds: 'setting/getSelectedIds',
      }),
      isAllFill(){
        var flag = true
        var selectArr = this.selection
        for(var i = 0,len = selectArr.length;i < len;i++){
          if(selectArr[i].type != '填空题'){
            flag = false
            break
          }
            }
            return len ? flag:false
      },
    },
    methods:{
      ...mapMutations({
        setTableColumns: 'setting/setTableColumns',
        setLoading: 'setting/setLoading',
        setTableData: 'setting/setTableData',
        setQuestionCheckDup: 'setting/setQuestionCheckDup',
        setQuestionSimpleSearch: 'setting/setQuestionSimpleSearch',
        setQuestionAdvancedSearch: 'setting/setQuestionAdvancedSearch',
        setQuestionIsSearching:'setting/setQuestionIsSearching',
        setQuestionSearchKey: 'setting/setQuestionSearchKey',
        // setQuestionAdvancedSearchKey: 'setting/setQuestionAdvancedSearchKey',
        // resetCurrentPage: 'setting/resetCurrentPage',
        updateQustSearchStatus: 'setting/updateQustSearchStatus',
        resetQustAdvancedSearchKey: 'setting/resetQustAdvancedSearchKey',
        setAdvancedSearchKeyDifficult: 'setting/setAdvancedSearchKeyDifficult',
        setAdvancedSearchKeyType: 'setting/setAdvancedSearchKeyType',
        setAdvancedSearchKeyClass: 'setting/setAdvancedSearchKeyClass',
        setAdvancedSearchKeyCreater: 'setting/setAdvancedSearchKeyCreater',
        setAdvancedSearchKeyLabel: 'setting/setAdvancedSearchKeyLabel',
      }),
      ...mapActions({
        delTestQuestion: 'setting/delTestQuestion'
      }),
      // closeDialog:function(){
      //   // this.dialogVisible = !1
      //   // this.$nextTick(function (){
      //     console.log(this.dialogVisible)
      //   // })
      // },
      manageClass: function () {
        let that = this
        this.manageDialogVisible = !0
        that.$nextTick(function(){
          that.iframeWin = that.$refs.manageTypeModal.contentWindow
          that.iframeWin.location.href = '/admin/vue/manage_question_class'
        });
      },
      handleDelete: function () {
        var t = this;
        0 == this.selection.length ? this.$message({
          type: "warning",
          message: "当前没有选中的试题！"
        }) : this.$confirm("同时删除试卷中关联的试题", "确定要删除选中的试题吗?", {
          customClass: "del-label",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(function () {
          t.delTestQuestion({questionIds: t.getSelectedIds, $message: t.$message})
        }).catch(function () {
        })
      },
      handleMore: function (command) {
        this[command]()
      },
      endUpdate: function () {
        this.updateVisible = !1,this.TypeDialogVisible = !1,this.UpdateClass = '',this.updateDifficult = '' ,this.updateDisort = ''
      },
      saveUpdate: function () {
        this.setLoading(!0)
        let that = this
        var ids = []
        var selectArr = this.selection
        for(var i = 0,len = selectArr.length;i < len;i++){
          ids.push(selectArr[i].id)
        }
        var dataForm = {
          updateClass:this.UpdateClass,
          ids:ids,
          updateDifficult:this.updateDifficult,
          updateDisort:this.updateDisort
        }
        // console.log(dataForm)
        this.endUpdate(),(ids.length && (dataForm.updateClass || dataForm.updateDifficult || dataForm.updateDisort)) ? this.$post("/api/question/update",{
          tableUpdateInfo:JSON.stringify(dataForm),
          account:that.user.account,
          companyId:that.user.companyId
        }).then((res)=>{
          that.setLoading(!1)
          var content = res.data.bizContent
          that.setTableData(that.getTableData(content))
        }):that.setLoading(!1)
      },
      closeUpdateDialog: function () {
        this.TypeDialogVisible = !1,this.UpdateClass = '',this.updateDifficult = '' ,this.updateDisort = ''
      },
      updateTest: function () {
        "0" == this.selection.length ? this.$message("请选择要更新的试题") : (this.updateVisible = !0)
      },
      handleAdvancedSearch: function () {
        this.search()
      },
      testDiffcult: function (t) {
        this.setAdvancedSearchKeyDifficult(t),this.difficultText = t
      },
      testType: function (t) {
        this.setAdvancedSearchKeyType(t), "1" == t ? this.testTypeText = "单选题" : "2" == t ? this.testTypeText = "多选题" : "3" == t ? this.testTypeText = "判断题" : "4" == t ? this.testTypeText = "填空题" : "5" == t && (this.testTypeText = "问答题")
      },
      handleMessage (event) {
        // 根据上面制定的结构来解析iframe内部发回来的数据
        const data = event.data
        switch (data.cmd) {
          case 'returnClass':
            // 业务逻辑
            this.setAdvancedSearchKeyClass(data.params.data)
            this.dialogVisible = !1
            break
          case 'closeDialog':
            // 业务逻辑
            this.dialogVisible = !1
            break
          case 'returnUpdateClass':
            // 业务逻辑
            // this.setAdvancedSearchKeyClass(data.params.data)
            this.UpdateClass = data.params.data
            this.TypeDialogVisible = !1
            break
          case 'closeUpdateClassDialog':
            // 业务逻辑
            this.TypeDialogVisible = !1
            break
          case 'closeManageClassDialog':
            // 业务逻辑
            this.manageDialogVisible = !1
            break
        }
      },
      manageUpdateClass:function(){
        let that = this
        this.TypeDialogVisible = !0
        that.$nextTick(function(){
          that.iframeWin = that.$refs.selUpdateTypeModal.contentWindow
          that.iframeWin.location.href = '/admin/vue/batch_update_question'
        });
      },
      handleClassOpen:function(){
        let that = this
        this.dialogVisible = !0
        that.$nextTick(function(){
          that.iframeWin = that.$refs.selTypeModal.contentWindow
          that.iframeWin.location.href = '/admin/vue/search_question_class'
        });
      },
      handleShowAdvancedSearch: function () {
        this.updateQustSearchStatus({simpleSearch: !1, advancedSearch: !0}), this.setQuestionSearchKey(""),this.resetQustAdvancedSearchKey(),this.difficultText = '',this.testTypeText = ''
      },
      handleBlurSimpleSearch: function () {
        "" == this.tableSearchInfo.searchKey && !this.setQuestionSimpleSearch(!1)&&this.setQuestionAdvancedSearch("keep")
      },
      handleEnterSimpleSearch: function () {
        if ("" == this.tableSearchInfo.searchKey) return this.$message({type: "warning", message: "请输入搜索内容！"});
        this.search()
      },
      handleClickSimpleSearch: function () {
        this.tableSearchInfo.simpleSearch ? (this.search()) : (this.updateQustSearchStatus({
          simpleSearch: !0,
          advancedSearch: !1
        }), this.$refs.simpleSearch.focus(), this.resetQustAdvancedSearchKey())
      },
      addQuestion: function () {
        window.location.href = "/admin/question_add_new/batch_import"
      },
      search:function(){
        this.setLoading(!0)
        this.setQuestionIsSearching(!0)
        let that = this
        this.$post("/api/question/list",{
          tableSearchInfo:JSON.stringify(that.tableSearchInfo),
          account:that.user.account,
          companyId:that.user.companyId
        }).then((res)=>{
          that.setLoading(!1)
          that.setQuestionIsSearching(!1);
          var content = res.data.bizContent
          that.setTableData(that.getTableData(content))
        })
      },
      questionRepeat:function(command){
        this.setQuestionCheckDup(command)
        this.setQuestionSimpleSearch(!1)
        this.setQuestionAdvancedSearch(!1)
        this.search()
      },
      handleTableCol:function (command) {
        var colList = this.tableColumns
        // console.log(colList)
        if(colList.includes(command)){
          colList.pop(command)
          this.setTableColumns(colList)
        }else{
          colList.push(command)
          this.setTableColumns(colList)
        }
      },
      getTableData: function(tempData){
        var tableData = []
        for(var i = 0,len = tempData.length;i<len;i++){
          var json = {}
          var type = tempData[i].type
          json['id'] = tempData[i].id
          json["type"] = type == "1"?"单选题":type == "2"?"多选题":type == "3"?"判断题":type == "4"?"填空题":type == "5"?"简答题":type
          json["classification"] = tempData[i].questionClassificationName
          json["difficult"] = tempData[i].difficult
          json["label"] = tempData[i].label
          json["creater"] = tempData[i].creatorName
          json["createTime"] = tempData[i].createTime
          json["modifier"] = tempData[i].modifierName
          json["modifiedTime"] = tempData[i].modifyTime
          json["analysis"] = tempData[i].analysis
          json["content"] = tempData[i].question
          json["options"] = tempData[i].optionList
          json["answer"] = tempData[i].key
          tableData.push(json)
        }
        // console.log(tableData)
        return tableData;
      },
    },
    mounted(){
      window.addEventListener('message', this.handleMessage)
      // console.log(this.$refs.selTypeModal)
    },
  }
</script>
