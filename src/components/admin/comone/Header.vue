<template>
  <el-header class="viewFrameWork-header" style="height: 70px;">
    <div class="header">
      <div class="header-left"><a href="/admin/home#/index"><img
        src="/static/images/logo.jpg" alt="" class="item item-logo"></a></div>
      <slot name="header-middle"></slot>
      <HeaderRight></HeaderRight>
    </div>
  </el-header>
</template>

<script>

import { mapState } from 'vuex'
import HeaderRight from './HeaderRight'

export default {
    name: 'Header',
    components: {HeaderRight},
    computed: {
      ...mapState({
        user: state => state.account.user
      })
    },
  }

</script>

