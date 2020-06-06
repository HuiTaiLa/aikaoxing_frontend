<template>
<div id = "app">
  <el-container class="viewFrameWork  admin is-vertical" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.8)">
    <Header>
      <HeaderMiddle slot="header-middle"></HeaderMiddle>
    </Header>
    <el-container>
      <Side></Side>
      <Body></Body>
    </el-container>
  </el-container>
</div>
</template>

<script>
import Header from '../comone/Header'
import HeaderMiddle from './HeaderMiddle'
import Side  from '../comone/Side'
import Body from './Body'
import {mapState} from 'vuex'
export default {
  name: 'HomeView',
  components: {Header,Side,HeaderMiddle,Body},
  computed:{
    ...mapState({
      loading:state => state.setting.loading,
    })
  },
}
</script>

