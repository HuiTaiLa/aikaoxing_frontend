<template>
  <div class="header-middle">
  <div class="body-toolbar clearfix">
    <div class="toolbar-left fl"><span class="system-name">
      {{user.companyName}}
      <span>(企业ID: {{user.companyId}})</span></span>
      <!--<span class="version-name"></span>-->
    </div>
    <div class="toolbar-right fr"><!----></div>
  </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'HeaderMiddle',
    computed:{
      ...mapState({
        user: state => state.account.user
      })
    },
  }
</script>

<style lang="less" scoped>
  /*组件私有样式*/
  .system-name {
    font-size: 24px;
    color: #27274a;
    font-weight: 500;
    vertical-align: middle;
  }
  .version-name {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    background: #fe8545;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    margin-left: 6px;
  }
</style>
