<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <ul class="ksx-tabs-card" role="tablist">
            <li class="ksx-tab-item active">
              <a href="/admin/result/mgr_new/">
                按考试查询批改
              </a>
            </li>

            <li class="ksx-tab-item" aria-controls="manual" role="tab">
              <a href="/admin/result/user_mgr_new/">
                按学员查询批改
              </a>
            </li>

            <!--<li class="ksx-item-right ">-->
              <!--<span class="islook">学员信息对子管理员可见</span>-->
              <!--<div id="islook_box">-->
                <!--<i class="icons8-help " id="islook_tips" data-container="body" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="关闭后，所有子管理员不可见学员相关信息，同时无法进行导出、下载、按学员查询批改等相关功能" data-original-title="" title=""></i>-->
                <!--<span class="switch-hidden switch-wechatSkipLogin-copy switch-on" islook="0">-->
                        <!--<span class="slider"></span>-->
                    <!--</span>-->
              <!--</div>-->
            <!--</li>-->
          </ul>
        </div>

        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="byTest">
            <div class="tab-wrap1">
              <div class="rqm-table1">
                <table v-if="examInfo != null" class="table admin-table table-style1">
                  <tbody><tr>
                    <th>考试名称</th>
                    <th>考试类型</th>
                    <th>考试时间</th>
                  </tr>
                    <tr class="curr">
                      <td>{{examInfo.examName}}</td>
                      <td>{{examInfo.examStyleName}}</td>
                      <td>{{examInfo.startTime}} - {{examInfo.endTime}}</td>
                    </tr>
                  </tbody></table>
              </div>
              <div class="devide-line"></div>
              <div class="rqm-table2 com-drop">

                <table id="grid-data" class="table">
                  <thead>
                    <tr>
                      <th data-column-id="id" data-visible="false" data-type="numeric" data-identifier="true" data-formatter="id"></th>
                      <th data-column-id="userName" data-sortable="false" data-formatter="userName" data-width="10%">账号</th>
                      <th data-column-id="surname" data-sortable="false" data-width="10%">用户名</th>
                      <th data-column-id="deptName" data-sortable="false" data-width="10%">所属部门</th>
                      <!--<th data-column-id="examVerifyStatus" data-formatter="verify" data-sortable="false" data-width="12%">身份认证状态</th>-->
                      <th data-column-id="results" data-width="6%">分数</th>
                      <th data-column-id="isPass" data-sortable="false" data-width="8%">及格</th>
                      <!--<th data-column-id="isMakeup" data-formatter="isMakeup" data-sortable="false" data-width="8%">是否为补考</th>-->
                      <th data-column-id="isForce" data-formatter="isForce" data-sortable="false" data-width="8%">强制交卷</th>
                      <th data-column-id="commitTime" data-width="13%">交卷时间</th>
                      <th data-column-id="sender" data-formatter="link" data-sortable="false">操作
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="byPerson">......</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading'
  import {mapState} from 'vuex'
export default {
  name:'Body',
  data(){
    return{
      examInfoId:'',
      examInfo: null
    }
  },
  components:{
    Loading,
  },
  computed:{
    ...mapState({
      user: state => state.account.user
    }),
  },
  methods:{
    getQueryString : function (name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return '';
  }
  },
  created(){
    let that = this
    this.examInfoId = this.getQueryString('examInfoId');
    if (this.examInfoId != '') {
      this.$post("/api/exam/get_simple_exam",{
        account:that.user.account,
        companyId:that.user.companyId,
        examInfoId:that.examInfoId
      }).then(
        (res)=>{
          that.examInfo = res.data.bizContent;
        }
      )
    }
  },

}
</script>
