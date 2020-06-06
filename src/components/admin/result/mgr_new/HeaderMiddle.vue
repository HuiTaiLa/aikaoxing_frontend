<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix">
      <div class="body-toolbar-left pull-left toolbar-left-operation ksx-fit-config-container">
        <button type="button" class="btn btn-default ksx-fit-config-btn" id="selTypeLink"><i class="icon-a_btn_select btn-icon-left"></i>
          选择考试</button>
        <!--<div class="btn-group customer-btn-group ksx-fit-config-div">-->
          <!--<a class="btn btn-default dropdown-toggle  " data-toggle="dropdown" href="#" style="line-height: 36px;padding: 0;" aria-expanded="false">-->
            <!--<i class="icon-a_btn_derivation btn-icon-left"></i>-->
            <!--导出-->
          <!--</a>-->
          <!--<ul class="dropdown-menu page-dropdown-menu">-->
            <!--<span class="horn"></span>-->
            <!--<li><a href="#" class="exportBtn_results">学员成绩</a></li>-->
            <!--<li><a href="#" class="exportBtn_answer">学员答案</a></li>-->
            <!--<li><a href="#" class="exportBtn_paper">学员答卷</a></li>-->
            <!--<li><a href="#" class="exportBtn_absence">未参考学员</a></li>-->
          <!--</ul>-->
        <!--</div>-->

        <!--<button type="button" class="btn btn-default ksx-fit-config-btn" id="forceSubmitBtn">-->
          <!--<i class="icon btn-icon-left icon-a_btn_batch"></i>-->
          <!--批量交卷-->
        <!--</button>-->
        <!--<button type="button" class="btn btn-default addsexit disable ksx-fit-config-btn" disabled="" id="addexitBtn">-->
          <!--<i class="icon btn-icon-left  icon-a_operate_retake"></i>-->
          <!--批量补考-->
        <!--</button>-->
        <button type="button" class="btn btn-default ksx-fit-config-btn" id="moreOpt">
          <i class="icon-a_btn_custom_column icon btn-icon-left"></i>
          更多
        </button>
        <ul data-show="0" class="el-dropdown-menu el-popper ksx-dropdown check" id="moreOptList" style="position: absolute; top: 52px; left: 604px; display: none;" x-placement="bottom-end">
          <!--<li tabindex="-1" class="el-dropdown-menu__item" id="changeDept">-->
            <!--修改部门-->
          <!--</li>-->
          <!--<li tabindex="-1" class="el-dropdown-menu__item" id="recoverExam">-->
            <!--恢复考试-->
          <!--</li>-->
          <!--<li tabindex="-1" class="el-dropdown-menu__item" id="exportFile">-->
            <!--导出附件链接-->
          <!--</li>-->
          <li tabindex="-1" class="el-dropdown-menu__item" id="btn-remove">
            删除
          </li>
          <div x-arrow="" class="popper__arrow"></div>
        </ul>
      </div>
      <div class="body-toolbar-right pull-right toolbar-right-operation">
        <div class="search-section">
          <div class="search-section-normal" id="normalSearch">
            <i class="icon-p_top_search search-section-icon" id="searchIcon"></i>
            <input class="search-section-area placeholder" name="user_name" type="text" placeholder="请输入姓名、账号信息">
          </div>
          <div class="search-section-adv" id="advSearch">
                    <span class="dropdown-toggle search-section-adv-title" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        高级搜索
                        <i class="icons8-expand-arrow"></i>
                    </span>
            <div class="dropdown-menu page-dropdown-menu search-dropdown-menu page-dropdown-menu search-section-adv-panel">
              <form name="form" method="get" id="subForm">
                <ul class="search-menu">
                  <li>
                    <span class="search-menu-title">所属部门</span>
                    <button class="btn btn-default search-menu-content" id="selDepLink"><span>选择部门</span></button>
                    <input type="hidden" name="dep_id">
                  </li>
                  <li>
                    <span class="search-menu-title">判分状态</span>
                    <select class="search-menu-content" name="is_grade">
                      <option value="" selected="">是否判分</option>
                      <option value="0">未判分</option>
                      <option value="1">已判分</option>
                    </select>
                  </li>

                  <!--<li>-->
                    <!--<span class="search-menu-title">考试时间</span>-->
                    <!--<div class="btn-group search-menu-content">-->
                      <!--<div class="calendar"><em></em><input name="exam_date_from" type="text" id="dateForm" value="" lay-key="1"></div>-->
                      <!--<span class="to">到</span>-->
                      <!--<div class="calendar"><em></em><input name="exam_date_to" type="text" id="dateTo" value="" lay-key="2"></div>-->
                    <!--</div>-->
                  <!--</li>-->
                  <li>
                    <span class="search-menu-title">是否及格</span>
                    <select class="search-menu-content" name="is_pass">
                      <option value="" selected="">请选择</option>
                      <option value="1">是</option>
                      <option value="0">否</option>
                    </select>
                  </li>
                  <li>
                    <span class="search-menu-title">分数区间</span>
                    <div class="btn-group search-menu-content">
                      <input class="score-left" name="score_left" type="text">
                      <span class="to">到</span>
                      <input class="score-right" name="score_right" type="text">
                    </div>
                  </li>
                  <!--<li>-->
                    <!--<span class="search-menu-title">认证状态</span>-->
                    <!--<select class="search-menu-content" name="verify_status">-->
                      <!--<option value="" selected="">请选择</option>-->
                      <!--<option value="1">已通过</option>-->
                      <!--<option value="2">认证失败</option>-->
                      <!--<option value="3">无认证信息</option>-->
                      <!--<option value="4">通过,与用户姓名不一致</option>-->
                    <!--</select>-->
                  <!--</li>-->
                  <li>
                    <span class="search-menu-title">是否交卷</span>
                    <select class="search-menu-content" name="is_commit">
                      <option value="-1" selected="">请选择</option>
                      <option value="1">是</option>
                      <option value="0">否</option>
                    </select>
                  </li>
                  <li>
                    <span class="search-menu-title">强制交卷</span>
                    <select class="search-menu-content" name="force_commit">
                      <option value="-1" selected="">请选择</option>
                      <option value="1">是</option>
                      <option value="0">否</option>
                    </select>
                  </li>
                </ul>
                <input type="text" name="name_search" class="hidden">
                <input type="text" name="dep_search" class="hidden">
                <input type="text" name="grade_search" class="hidden">
                <input type="text" name="start_time_search" class="hidden">
                <input type="text" name="end_time_search" class="hidden">
                <input type="text" name="pass_search" class="hidden">
                <input type="text" name="min_score_search" class="hidden">
                <input type="text" name="max_score_search" class="hidden">
                <input type="text" name="verify_status_search" class="hidden">
                <input type="text" name="is_commit_search" value="-1" class="hidden">
                <input type="text" name="force_commit_search" value="-1" class="hidden">
              </form>
              <div class="dropdown-footer">
                <button type="button" class="btn btn-primary" id="searchBtn">搜索</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderMiddle',
  }
</script>
