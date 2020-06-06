<template>
<div id = "app">
  <el-container class="viewFrameWork  admin is-vertical" element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.8)">
    <BrowserHint></BrowserHint>
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
  import BrowserHint from './BrowserHint'
  import Body from './Body'

export default {
  name: 'QuestionListView',
  components: {Header,HeaderMiddle,Side,BrowserHint,Body},
}
</script>

