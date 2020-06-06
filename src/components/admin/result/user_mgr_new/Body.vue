<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area">
            <ul class="ksx-tabs-card">
              <li class="ksx-tab-item">
                <a href="/admin/result/mgr_new/">
                  按考试查询批改
                </a>
              </li>
              <li class="active ksx-tab-item">
                <a href="/admin/result/user_mgr_new/">
                  按学员查询批改
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="byTest">
            <div class="tab-wrap1">
              <div class="rqm-table1">
                <table v-if="userInfo != null" class="table admin-table table-style1">
                  <tbody><tr>
                    <th>账号</th>
                    <th>学员姓名</th>
                    <th>学员部门</th>

                  </tr>
                  <tr class="curr">
                    <td>{{userInfo.userName}}</td>
                    <td>{{userInfo.surname}}</td>
                    <td>{{userInfo.departmentName}}</td>
                  </tr></tbody>
                </table>
              </div>
              <div class="devide-line"></div>
              <div class="rqm-table2 com-drop">
                <table id="grid-data" class="table">
                  <thead>
                    <tr>
                      <th data-column-id="id" data-visible="false" data-type="numeric"
                          data-identifier="true" data-formatter="id"></th>
                      <th data-column-id="examName" data-sortable="false">考试名</th>
                      <th data-column-id="examStyleName" data-sortable="false" data-width="10%">分类</th>
                      <!--<th data-column-id="examVerifyStatus" data-formatter="verify" data-sortable="false" data-width="13%">身份认证状态</th>-->
                      <th data-column-id="results" data-width="8%">分数</th>
                      <th data-column-id="isPass" data-sortable="false" data-width="8%">及格</th>
                      <!--<th data-column-id="isMakeup" data-formatter="isMakeup" data-sortable="false" data-width="8%">是否为补考</th>-->
                      <th data-column-id="isForce" data-formatter="isForce" data-sortable="false" data-width="8%">强制交卷</th>
                      <th data-column-id="commitTime" data-width="14%">交卷时间</th>
                      <th data-column-id="sender" data-formatter="link" data-sortable="false" data-width="16%">操作</th>
                    </tr>

                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="byPerson">
            ......
          </div>
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
      userId:'',
      userInfo: null
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
    this.userId = this.getQueryString('userId');
    if (this.userId != '') {
      this.$post("/api/dept/getUser",{
        account:that.user.account,
        companyId:that.user.companyId,
        id:that.userId
      }).then(
        (res)=>{
          that.userInfo = res.data.bizContent;
        }
      )
    }
  },

}
</script>
