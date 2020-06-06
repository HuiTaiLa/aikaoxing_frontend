<template>
  <div class="status-right">
    <div class="status-item item-search">
      <form id="searchForm" action="/depts/exam/history_search/" method="get">
        <i class="icon item-icon icon-p_top_search"></i>
        <input type="text" class="item-input item-key-input animate" name="name" placeholder="请输入搜索关键词" value="">
        <span class="item-label" id="searchBtn">搜索</span>
      </form>
    </div>
    <div class="status-item item-mine">
      <div class="item-arrow-group">
                    <span class="item-icon">
                        <img class="item-img character-img" :src="user.avatar == 'default.png'? '/static/avatar/default.png':user.avatar">
                    </span>
        <i class="icon icon-a_arrow_down"></i>
      </div>
      <div class="dropdown-menu bottom panel-mine">
        <div class="arrow"></div>

        <ul class="menu-items">
          <li>
            <span class="menu-item" id="userInfoBtn">个人信息</span>
          </li>
          <li>
            <span class="menu-item" id="setPasswordBtn">修改密码</span>
          </li>
        </ul>

        <div class="split"></div>

        <div class="menu-items">
          <span class="menu-item" id="logoutBtn">退出</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapState} from 'vuex'
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

  }
</script>
