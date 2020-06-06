<template>
  <el-container class="viewFrameWork-body">
    <el-main class="body-wrapper">
      <div class="body-content">
        <div class="user-manager-wrapper">
          <div class="content user-manager">
            <div class="content-right">
              <div class="detail-list question-list el-table-area">
                <div id="addQuestion2">
                  <el-table border v-loading="loading" :data="loadData" style="width: 100%; height: 100%;" tooltip-effect="dark" @select="handleSelect" @select-all="handleSelectAll">
                    <el-table-column  type="selection"></el-table-column>
                    <el-table-column  show-overflow-tooltip type="expand">
                      <template slot-scope="scope">
                        <div class="expandBox">
                          <div class="leftContent">
                            <div class="item">
                              <div class="keyTitle">题干</div>
                              <div class="keyValue" v-html="scope.row.content"></div>
                            </div>
                            <div v-if="scope.row.options">
                              <div v-for="(option,index) in scope.row.options" class="item" :key="index">
                                <div class="keyTitle"></div>
                                <div class="keyValue" v-html="option"></div>
                              </div>
                            </div>
                          </div>
                          <div class="rightContent">
                            <div class="item">
                              <div class="keyTitle">答案</div>
                              <div class="keyValue" v-html="scope.row.answer"></div>
                            </div>
                            <div class="item">
                              <div class="keyTitle">解析</div>
                              <div class="keyValue" v-html="scope.row.analysis"></div>
                            </div>
                            <div class="item">
                              <div class="keyTitle">难度</div>
                              <div class="keyValue" v-html="scope.row.difficult"></div>
                            </div>
                            <div v-if="scope.row.label" class="item">
                              <div class="keyTitle">标签</div>
                              <div class="keyValue" v-html="scope.row.label"></div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="type" label="题型"></el-table-column>
                    <el-table-column v-if=" tableColumns.includes('classification')" show-overflow-tooltip prop="classification" label="分类"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="content" label="试题内容"></el-table-column>
                    <el-table-column v-if="tableColumns.includes('difficult')" show-overflow-tooltip prop="difficult" label="难度"></el-table-column>
                    <!--<el-table-column show-overflow-tooltip prop="label" label="试题标签" width="80"></el-table-column>-->
                    <el-table-column show-overflow-tooltip prop="creater" label="创建人"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="createTime" label="创建时间" sortable></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top" effect="dark">
                          <i class="el-icon icon-a_operate_edit" @click="editQuestion(scope.row)"></i>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" effect="dark">
                          <i class="el-icon icon-a_operate_delete" @click="delQuestion(scope.row)"></i>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column v-if=" tableColumns.includes('modifier')" show-overflow-tooltip prop="modifier" label="修改人"></el-table-column>
                    <el-table-column v-if=" tableColumns.includes('modifyTime')" show-overflow-tooltip prop="modifiedTime" label="修改时间" sortable></el-table-column>
                  </el-table>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    name:'Body',
    data(){
      return{
        pageSize:10,
        currentPage:1,
        // loading:true,
        //   tableData:[],
      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user,
        tableColumns: state => state.setting.tableColumns,
        loading: state => state.setting.loading,
        tableData: state => state.setting.tableData,
        tableSearchInfo: state => state.setting.tableSearchInfo
      }),
      loadData(){
        // this.loading = true
        let tempData = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        // this.loading = false
        return tempData
      },
    },
    methods:{
      ...mapMutations({
        setLoading: 'setting/setLoading',
        setTableData: 'setting/setTableData',
        setSelection: 'setting/setSelection',
      }),
      ...mapActions({
        delTestQuestion: 'setting/delTestQuestion',
      }),
      editQuestion: function (e) {
        window.open("/admin/question_update/#/" + e.id)
      },
      handleSelect: function (t) {
        this.setSelection(t)
      },
      handleSelectAll: function (t) {
        this.setSelection(t)
      },
      handleSizeChange(size){
        this.pageSize = size
      },
      handleCurrentChange(page){
        this.currentPage = page
      },
      delQuestion: function (e) {
        var a = this;
        this.$confirm("同时删除试卷中关联的试题", "确定要删除选中的试题吗?", {
          customClass: "del-label",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(function () {
          a.delTestQuestion({questionIds: e.id, $message: a.$message})
        }).catch(function () {
        })
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
          json["content"] = tempData[i].mode == 2 ? tempData[i].rawQuestion : tempData[i].question
          json["options"] = tempData[i].optionList
          json["answer"] = tempData[i].key
          tableData.push(json)
        }
        return tableData;
        },

      computeTableData: function(tempData){
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
          json["content"] = tempData[i].mode == 2 ? tempData[i].rawQuestion : tempData[i].question
          var truth = tempData[i].key
          var options = []
          if(truth){// batch_mode
            json["answer"] = truth
            if(Number(tempData[i].type) == 1||Number(tempData[i].type) == 2){
              var option = tempData[i].answer1
              var code = "A".charCodeAt()
              var suffix = 1
              while (option){
                var preffix = String.fromCharCode(code)
                suffix = suffix + 1
                options.push(preffix + "、" + option)
                option = tempData[i]["answer"+ suffix]
                code = code + 1
              }
            }
            // json["options"] = options
          } else{//hand_mode
            if(Number(tempData[i].type) == 1||Number(tempData[i].type) == 2){
              var temp = tempData[i].key1
              var option = tempData[i].answer1
              var code = "A".charCodeAt()
              var suffix = 1
              var tempT = ""
              while (temp){
                var preffix = String.fromCharCode(code)
                suffix = suffix + 1
                options.push(preffix + "、" + option)
                if(String(temp) == "1"){
                  tempT = tempT + preffix
                }
                temp = tempData[i]["key" + suffix]
                code = code + 1
              }
              json["answer"] = tempT
            }else if(Number(tempData[i].type) == 3){
              json["answer"] = String(tempData[i].key1)=="1"?"正确":String(tempData[i].key2)=="1"?"错误":""
            }else if(Number(tempData[i].type) == 4){
              var temp = tempData[i].key1
              var ans = tempData[i].answer1
              var suffix = 1
              // var s = "|"
              while (temp&&suffix++&&tempData[i]["key" + suffix]){
                // suffix = suffix + 1
                ans = ans + "|" + tempData[i]["answer" + suffix]
                temp = tempData[i]["key" + suffix]
              }
              json["answer"] = ans
            }else if(Number(tempData[i].type) == 5){
              json["answer"] = tempData[i].answer1
            }
          }
          json["options"] = options
          tableData.push(json)
        }
        return tableData
      },
    },
    created(){
      let that = this
      // this.loading = true
      this.setLoading(true)
      this.$post("/api/question/list",{
        tableSearchInfo:JSON.stringify(that.tableSearchInfo),
        account:that.user.account,
        companyId:that.user.companyId
      }).then((res)=>{
        // that.loading = false
        that.setLoading(false)
        var content = res.data.bizContent
        // that.tableData = that.computeTableData(content)
        that.setTableData(that.getTableData(content))

      })
    },
  }
</script>
