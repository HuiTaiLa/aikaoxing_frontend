<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix" id="step1">
      <div class="body-toolbar-left pull-left toolbar-left-operation ksx-fit-config-container">

        <!--<a href="javascript:void(0);" class="add_exam">-->
          <!--<button type="button" class="btn btn-primary ksx-fit-config-btn">-->
            <!--<i class="icon-a_circle_plus btn-icon-left"></i>-->
            <!--创建考试-->
          <!--</button>-->
        <!--</a>-->

        <!--<button type="button" class="btn btn-default inactive ksx-fit-config-btn" disabled="" id="batchExport">-->
          <!--<i class="icons8-upload btn-icon-left"></i>-->
          <!--导出信息-->
        <!--</button>-->
        <button type="button" class="btn btn-default inactive ksx-fit-config-btn" disabled="" id="batchDel">
          <i class="icons8-trash-can btn-icon-left"></i>
          删除
        </button>
        <!--<button type="button" class="btn btn-default ksx-fit-config-btn" id="examTop">-->
          <!--<i class="icon icon-a_btn_top"></i>-->
          <!--置顶考试-->
        <!--</button>-->
        <button type="button" class="btn btn-default ksx-fit-config-btn" id="examClassify">
          <i class="icon icon-a_btn_classify"></i>
          管理考试分类
        </button>
      </div>
      <div class="body-toolbar-right pull-right toolbar-right-operation">
        <div class="search-section">
          <div class="search-section-normal" id="normalSearch">
            <i class="icon-p_top_search search-section-icon" id="searchIcon"></i>
            <input class="search-section-area placeholder" name="exam_name" type="text" placeholder="请输入考试名称">
          </div>
          <div class="search-section-adv" id="advSearch">
                    <span class="dropdown-toggle search-section-adv-title" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        高级搜索
                        <i class="icons8-expand-arrow"></i>
                    </span>
            <div class="dropdown-menu search-dropdown-menu search-section-adv-panel">
              <form name="form" method="get" id="subForm">
                <ul class="search-menu">
                  <li>
                    <span class="search-menu-title">启用状态</span>
                    <select class="search-menu-content" name="status">
                      <option value="" selected="">请选择</option>
                      <option value="0">正常</option>
                      <option value="1">禁用</option>
                    </select>
                  </li>
                  <li>
                    <span class="search-menu-title">考试分类</span>
                    <button class="btn btn-default search-menu-content" id="selTypeLink">选择分类</button>
                    <input type="hidden" name="exam_style">
                  </li>
                  <li>
                    <span class="search-menu-title">考试时间</span>
                    <div class="btn-group search-menu-content">
                      <div class="calendar">
                        <em></em>
                        <input name="dateFrom" autocomplete="off" type="text" id="dateFrom" value="" lay-key="1">
                      </div>
                      <span style="font-size: 12px; color: #494949;">到</span>
                      <div class="calendar">
                        <em></em>
                        <input name="dateTo" type="text" autocomplete="off" id="dateTo" value="" lay-key="2">
                      </div>
                    </div>
                  </li>
                </ul>
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
