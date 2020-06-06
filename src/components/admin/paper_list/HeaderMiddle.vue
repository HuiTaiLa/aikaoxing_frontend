<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix">
      <div class="body-toolbar-left pull-left toolbar-left-operation ksx-fit-config-container">

        <!--<button type="button" class="btn btn-primary createPaper ksx-fit-config-btn">-->
          <!--<i class="icon-a_circle_plus btn-icon-left"></i>-->
          <!--创建试卷-->
        <!--</button>-->

        <button type="button" class="btn btn-default inactive ksx-fit-config-btn" disabled="" id="batchDel">
          <i class="icons8-trash-can btn-icon-left"></i>
          删除
        </button>
        <button type="button" class="btn btn-default ksx-fit-config-btn" id="examClassify">
          <i class="icon icon-a_btn_classify"></i>
          管理试卷分类
        </button>
      </div>
      <div class="body-toolbar-right pull-right toolbar-right-operation">
        <div class="search-section">
          <div class="search-section-normal" id="normalSearch">
            <i class="icon-p_top_search search-section-icon" id="searchIcon"></i>
            <input class="search-section-area placeholder" name="paper_name" type="text" placeholder="请输入试卷名称">
          </div>
          <div class="search-section-adv" id="advSearch">
                    <span class="dropdown-toggle search-section-adv-title" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        高级搜索
                        <i class="icons8-expand-arrow"></i>
                    </span>
            <div class="dropdown-menu search-dropdown-menu search-section-adv-panel">
              <form name="form" method="get" id="subForm">
                <ul class="search-menu">
                  <li>
                    <span class="search-menu-title">试卷分类</span>
                    <button class="btn btn-default search-menu-content" id="selTypeLinkMulti">选择分类</button>
                    <input type="hidden" name="paper_style">
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
