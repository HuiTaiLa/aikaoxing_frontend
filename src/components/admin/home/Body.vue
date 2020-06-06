<template>
  <el-container class="viewFrameWork-body">
    <el-main class="body-wrapper">
      <div class="body-content">
        <div class="main-index">
          <div></div> <!---->
          <div class="main-index-content">
            <ul class="count">
              <li><label>在线人数：</label> <span>{{online}}/{{total}}</span>
                <el-progress :percentage="online_percentage" :color="online_percentage>=100?'#F76377':'#1A8CFE'" :show-text="false">
                </el-progress>
              </li>
            </ul>
            <div class="shortcut">
              <ul class="operation-card clearfix">
                <li v-has-permission="['item:examAdd']" class="item"><a href="/admin/paper_add_new/#/index"><img
                  src="https://s6.kaoshixing.com/ksxing_static/vue/admin/index/icon-exam.png" alt="" class="icon">
                  <div class="info"><span class="name">创建考试</span>
                    <p class="intro">创建新试卷发布考试，或选择已有试卷发布考试</p></div>
                </a></li>
                <li v-has-permission="['item:questionAdd']" class="item"><a href="/admin/question_add_new/batch_import/#/index"><img
                  src="https://s6.kaoshixing.com/ksxing_static/vue/admin/index/icon-question.png" alt=""
                  class="icon">
                  <div class="info"><span class="name">添加题目</span>
                    <p class="intro">手动录入题目至题库，支持批量录入、Excel导入题目</p></div>
                </a></li>
                <li v-has-permission="['item:coursewareUpload']" class="item"><a
                  href="/admin/error/developing"><img
                  src="https://s6.kaoshixing.com/ksxing_static/vue/admin/index/icon-upload-file.png" alt=""
                  class="icon">
                  <div class="info"><span class="name">上传课件</span>
                    <p class="intro">上传音视频、文档至课件管理模块的课件列表</p></div>
                </a></li>
                <li v-has-permission="['item:userAdd']" class="item"><a href="/admin/user_add/#/index"><img
                  src="https://s6.kaoshixing.com/ksxing_static/vue/admin/index/icon-user.png" alt="" class="icon">
                  <div class="info"><span class="name">添加学员</span>
                    <p class="intro">在相关部门下新增学员，给学员分配账号等信息</p></div>
                </a></li>
              </ul>
              <!--<div class="user-login-card">-->
                <!--&lt;!&ndash;<ul class="tab clearfix tab-1">&ndash;&gt;-->
                  <!--&lt;!&ndash;<li class="active">学员登录二维码</li> &lt;!&ndash;&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                <!--<div>-->
                  <!--<div class="erweima-box linkImgDownLoad"><img-->
                    <!--src="https://cdnoss.kaoshixing.com/ksxing_static/logo.png" alt="" class="logo"> <img-->
                    <!--id="95aef435-0bf7-4aad-91a3-2038ac460dda" style="display: inline-block;"-->
                    <!--src="data:image/png;base64,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">-->
                    <!--<p class="intro">微信扫描二维码<br>登录学员系统</p></div>-->
                  <!--<div class="btn-box">-->
                    <!--<button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;small is-plain">&lt;!&ndash;&ndash;&gt;<i-->
                      <!--class="icon-a_operate_copy"></i><span>登录链接</span></button>-->
                    <!--<br> <a id="downloadImg" href="" download="二维码.png"></a>-->
                    <!--<button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;small is-plain">&lt;!&ndash;&ndash;&gt;<i-->
                      <!--class="icon-a_operate_download"></i><span>下载图片</span></button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            </div>
            <div class="in-progress-intro"></div>
            <!--<div class="in-progress">-->
              <!--<div>-->
                <!--<div>-->
                  <!--<div class="title">正在进行的考试（0）</div>-->
                  <!--<div class="empty-tip">还没有正在进行的考试，快去创建一场考试吧～</div>-->
                <!--</div> &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;</div>-->
            <!--</div>-->
            <div class="staff-dialog"></div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name:'Body',
    data(){
      return{
        total:"1",
        online:"1",
        online_percentage:0,
      }
    },
    computed:{
      ...mapState({
        user: state => state.account.user
      }),
    },
    created(){
      let that = this
      this.$post("/api/count/online",{
        account:that.user.account,
        companyId:that.user.companyId
      }).then(
        (res)=>{
          that.online = res.data.bizContent.online;
          that.total = res.data.bizContent.total;
          that.online_percentage = Number(that.total)? 100*Number(that.online)/Number(that.total):0;
        }
      )
    },
  }
</script>
