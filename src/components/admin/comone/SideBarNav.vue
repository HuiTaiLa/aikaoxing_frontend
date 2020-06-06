<template>
  <div id="ksxAdminSidebar" class="sidebar-nav"><!---->
    <ul class="sidebar-trans">
      <li class="nav-item nav-no-sub"><a href="/admin/home#/index"
                                         class="nav-item-wrap">
        <div class="nav-icon"><i class="icon icon-a_nav_home"></i></div>
        <div class="nav-title">
          首页
          <!----></div>
      </a></li>
    </ul>
    <ul v-for="(trans,index_trans) in menuList" class="sidebar-trans" :key="index_trans">
      <li v-for="(menu,index_menu) in trans.trans" class="nav-item" :key="index_trans + '_' + index_menu">
        <div class="nav-item-wrap">
          <div class="nav-icon"><i class="icon" :class="menu.icon"></i></div>
          <div class="nav-title">
            {{menu.title}}
            <i class="icon icon-a_arrow_right"></i></div>
        </div>
        <div v-if="menu.sub_menu.length" :ref="menu.id" class="nav-sub-item-wrap clearfix" style="">
          <div v-for="(sub_menu,index_sub_menu) in menu.sub_menu" class="nav-sub-item" :key="index_trans + '_' + index_menu + '_' + index_sub_menu">
            <div class="title">{{sub_menu.title}}</div>
            <div class="split"></div>
            <ul class="item-list" v-for="(item,index_item) in sub_menu.item" :key="index_trans + '_' + index_menu + '_' + index_sub_menu + '_' + index_item">
              <li><a :href="item.ref">
                {{item.title}}
                <!----></a></li>
            </ul>
          </div>
        </div>
        <div v-else :ref="menu.id" class="nav-sub-item-wrap clearfix" style="">
          <ul class="item-list">
            <li v-for="(item,index_item) in menu.item" :key="index_trans + '_' + index_menu + '_' + index_item"><a :href="item.ref">{{item.title}}</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  // import { mapState } from 'vuex'
  export default {
    name: 'SideBarNav',
    data(){
      return{
        menuList:[]
      }
    },
    methods:{
      //获取 包含nav-sub-item-wrap的ID
      getMenuIdList(){
        let tempList = this.menuList
        let idList = []
        for(var i = 0;i < tempList.length; i++){
          let tempTrans = tempList[i].trans
          for(var j = 0;j < tempTrans.length;j++){
            if(tempTrans[j].id){
              idList.push(tempTrans[j].id)
            }
          }
        }
        // console.log(idList)
        return idList
      },
      renderMenuWrap(){
        let wrapIds = this.getMenuIdList()
        let that = this
        for(var k = 0;k < wrapIds.length;k++){
          var parentObj = that.$refs[wrapIds[k]][0].parentElement
          var offsetTop = parentObj.offsetTop
          var padding = document.defaultView.getComputedStyle(parentObj,null)["padding"]
          var topPadding = padding.split("px")[0]
          // console.log(offsetTop,padding)
          that.$refs[wrapIds[k]][0].style.top = (Number(offsetTop) + Number(topPadding)).toString() + "px"
          that.$refs[wrapIds[k]][0].style.bottom = "initial"
        }
      }
    },
    beforeCreate (){

    },
    created(){
      let routers = this.$db.get('USER_ROUTER')
      this.menuList = routers
    },
    mounted(){
      this.renderMenuWrap()
    },
  }
</script>

