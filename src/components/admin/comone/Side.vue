<template>
  <el-aside class="viewFrameWork-sidebar" :class="setFullOrMini" style="width: 300px;">
    <div class="sidebar sidebar-inner">
      <el-tooltip :content="setContent" placement="right">
        <li class="el-menu-item sidebar-fold " @click="onClick" tabindex="0">
          <i :class="setLeftOrRight" ></i>
        </li>
      </el-tooltip>
      <SideBarNav></SideBarNav>
    </div>
  </el-aside>
</template>

<script>
  // import {mapState} from 'vuex'
import SideBarNav from './SideBarNav'

  export default {
    name: 'Side',
    components:{SideBarNav},
    data(){
      return {
        flag:false,
      }
    },
    computed:{
      setFullOrMini(){
        return this.flag ? "sidebar-mini" : "sidebar-full"
      },
      setLeftOrRight(){
        return this.flag? "el-icon-d-arrow-right" : "el-icon-d-arrow-left"
      },
      setContent(){
        return this.flag? "展开导航" : "收起导航"
      }
    },
    methods:{
      onClick(){
        this.flag = !this.flag
      },
    },
  }
</script>

