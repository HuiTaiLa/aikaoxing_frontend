<template>
  <div class="status-right">
    <div class="status-item item-user" id="stateUser">
      <div class="user-picture">
        <img :src="user.avatar == 'default.png'? '/static/avatar/default.png':user.avatar">
      </div>
      <i class="icon item-icon icon-a_arrow_down"></i>
      <div class="item-wrap">
        <div class="item-header">
          <div class="picture">
            <img :src="user.avatar == 'default.png'? '/static/avatar/default.png':user.avatar">
          </div>
          <div class="name ellipsis">{{user.userName}}</div>
          <div class="company ellipsis">{{user.companyName}}</div>
        </div>
        <div class="item-list">
          <div class="li">
            <a href="/admin/admin_information/#/index" style="text-decoration: none">
              <div class="icon left icon-a_personal_edit"></div>
              <div class="title">修改个人信息</div>
              <div class="icon right icon-a_arrow_right"></div>
            </a>
          </div>
          <div class="li" id="logoutBtn">
            <div class="icon left icon-a_personal_exit"></div>
            <div class="title">退出</div>
            <div class="icon right"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="status-item item-notification" id="stateMessage">
      <i class="icon item-icon icon-p_top_message"></i>
      <!--<span class="message-count hidden"></span>-->
    </div>
  </div>
</template>
<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name: 'HeaderRight',
    data(){
      return {
        // loading: false,
      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user
      }),
    },
    methods:{
      ...mapMutations({
        setLoading:'setting/setLoading',
      }),
      // async onLogout(){
      //   let that = this;
      //   this.$confirm("您是否要退出登录？", "", {
      //     customClass: "operation-warning",
      //     confirmButtonClass: "confirm",
      //     cancelButtonClass: "cancel",
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //     center: !0
      //   }).then( async ()=> {
      //     that.setLoading(true),
      //     that.$post('/api/admin/logout',{
      //       account:that.user.account,
      //       companyId:that.user.companyId
      //     }).then(
      //       (res)=>{
      //         that.setLoading(false);
      //         if(res.data.success){
      //           that.$db.clear();
      //           window.location.href=res.data.bizContent.url;
      //         }
      //         else{
      //           window.alert("注销失败，请联系管理员！");
      //         }
      //       }
      //     )
      //   }).catch((e)=>{
      //     that.setLoading(false);
      //     window.alert("注销失败！请联系管理员！");
      //   }
      //   )
      // },
    },
  }
</script>
