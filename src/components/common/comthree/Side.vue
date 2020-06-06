<template>
  <div class="viewFrameWork-sidebar">
    <div class="sidebar-inner">
      <el-tooltip :content="setContent" placement="right">
        <div class="sidebar-fold" :class="setFold" id="sidebar-fold" @click="onClick">
          <i class="icons8" :class="setLeftOrRight"></i>
        </div>
      </el-tooltip>
      <SideBarNav></SideBarNav>
    </div>

  </div>
</template>
<script>
  import SideBarNav from './SideBarNav'
  export default {
    name: 'Side',
    data(){
      return{
        flag:false
      }
    },
    components:{SideBarNav},
    computed:{
      setFold(){
        return this.flag? "icon-fold":"icon-unfold"
      },
      setLeftOrRight(){
        return this.flag? "icons8-icon-3" : "icons8-icon"
      },
      setContent(){
        return this.flag? "展开导航" : "收起导航"
      },
    },
    methods:{
      onClick(){
        this.flag = !this.flag
        this.$emit('fold')
      },
    }
  }
</script>
