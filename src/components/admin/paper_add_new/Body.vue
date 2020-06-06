<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="cont-r">
          <div role="tabpanel" class="tab-area tab-col4">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active step1">
                <a href="javascript:;" aria-controls="create1" role="tab" data-toggle="tab">
                  第一步:创建试卷
                </a>
              </li>
              <li role="presentation" class="step3">
                <a href="javascript:;" aria-controls="create3" role="tab" data-toggle="">
                  第二步:添加试题
                </a>
              </li>
              <li role="presentation">
                <a href="javascript:;" aria-controls="create4" role="tab" data-toggle="">
                  第三步:发布考试
                </a>
              </li>
            </ul>

            <form action="" name="form" method="post" id="subForm">
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="createTest1">
                  <div class="create-test-area new-test-aera clearfix">
                    <div id="stepTop">
                      <div class="create-test-box guide col-xs-10 col-md-offset-1 animate" step="2">
                        <h3>
                          <input name="" type="radio" value="" checked="" class="new-test">
                          创建新试卷
                        </h3>
                        <div class="ctb-row">
                          试卷名称：
                          <input type="text" name="paper_name" placeholder="请输入试卷名称" maxlength="30" value="">
                          <span class="f-style4">*</span>
                        </div>
                        <div class="ctb-row">
                          试卷分类：
                          <a href="#" class="blue-link" id="selTypeLink"><span>试卷分类</span><i class="bulleted-list icon icon-a_btn_classify"></i></a>
                          <input type="hidden" class="" name="paper_style" value="">
                        </div>
                        <!--原第二步 组卷方式 -->
                        <div role="tabpanel" class="tab-pane " id="createTest">
                          <div class="create-test-area in-hand clearfix">
                            <div class="guide animate" step="3">
                              <div class="ctb-row pick-in-lib comb_paper_method">
                                组卷方式：
                                <span class="lib-type1 type1" name="paper_type_sel" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="勾选想出的题生成一份试卷">选题组卷</span>
                                <span class="lib-type0 type2" name="paper_type_sel" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="根据设置的抽取规则生成一份试卷，每个学员所用试卷内容一样">抽题组卷</span>
                                <span class="lib-type0 type3" name="paper_type_sel" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="设置好抽取规则，每个学员进入考试时随机生成一份试卷，每份试卷内容不一样">随机组卷</span>
                                <input type="hidden" value="1" name="paper_type" id="paper_type_select">
                              </div>
                            </div>
                          </div>

                        </div>
                        <input type="text" class="hidden" name="add_style">

                        <div class="limitquestiontime">
                          答题时长：
                          <span class="limit_t_btn limit_all_paper" data-value="0">整卷限制时长</span>
                          <!--<span class="limit_t_btn" data-value="1">单题限制时长</span>-->
                          <input type="hidden" id="limitQT" value="0" name="limitQtime">
                        </div>

                        <div class="btn-div">
                          <button type="button" class="btn btn-primary btn-step1 guide-btn">下一步</button>
                        </div>
                      </div>
                    </div>

                    <div id="stepBottom">
                      <div class="create-test-bar create-test-bar1 col-xs-10 col-md-offset-1 animate">
                        <input name="" type="radio" value="" class="pick-test">
                        从试卷库中选择一张试卷
                      </div>
                    </div>
                  </div>
                  <div class="create-test-area pick-test-aera clearfix" hidden="" style="display: none;">
                    <div class="create-test-bar create-test-bar2 col-md-10 col-md-offset-1 animate">
                      <input name="" type="radio" value="" class="new-test">
                      创建新试卷
                    </div>
                    <div class="create-test-box col-md-10 col-md-offset-1 animate">
                      <h3>
                        <input name="" type="radio" value="" checked="checked">从试卷库中选择一张试卷
                      </h3>
                      <a href="#" class="blue-link" id="selPaperLink">
                        <span>选择试卷</span>
                      </a>
                      <div class="btn-div">
                        <input type="hidden" class="" name="paper_set_num" value="1">
                        <input type="hidden" class="" name="paper_info_id" value="">
                        <button type="button" id="jumpToExam" data-dismiss="modal" class="btn btn-primary">
                          下一步
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


                <div role="tabpanel" class="tab-pane" id="createTest3">
                  <div class="input-questions-area clearfix pick-random" style="display: none;">
                    试卷状态：
                    <select name="paper_status">
                      <option value="0" selected="">正常</option>
                      <option value="1">禁用</option>
                    </select>
                    试卷总分：
                    <input type="text" style="width:50px;" name="total_score" value="100">
                    <div class="topSelDiv">
                      <div class="title">题型设置</div>
                      <ul class="addIconUl">
                        <li class="addDanxuanLi" name="1" title="单选"><i class="glyphicon glyphicon-plus-sign"></i> 单选</li>
                        <li class="addDuoxuanLi" name="2" title="多选"><i class="glyphicon glyphicon-plus-sign"></i> 多选</li>
                        <li class="addPanduanLi" name="3" title="判断"><i class="glyphicon glyphicon-plus-sign"></i> 判断</li>
                        <li class="addTiankongLi" name="4" title="填空"><i class="glyphicon glyphicon-plus-sign"></i> 填空</li>
                        <li class="addWendaLi" name="5" title="问答"><i class="glyphicon glyphicon-plus-sign"></i> 问答</li>
                      </ul>
                    </div>
                    <!--选题组卷-->
                    <table class="table table-condensed table-hover customerTab tab1">
                      <thead>
                      <tr>
                        <th>排序</th>
                        <th>题型</th>
                        <th>数量</th>
                        <th class="contentTh">题型标题</th>
                        <th>每题分数</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody class="typeTabBody">
                      </tbody>
                    </table>
                    <!--抽题组卷-->
                    <table class="table table-condensed table-hover customerTab tab2" style="display: none;">
                      <thead>
                      <tr>
                        <th>排序</th>
                        <th>题型</th>
                        <th>数量</th>
                        <th class="contentTh">题型标题</th>
                        <th>每题分数</th>
                        <th>试题分类</th>
                        <th>抽取数量</th>
                      </tr>
                      </thead>
                      <tbody class="typeTabBody">
                      </tbody>
                    </table>
                    <!--随机组卷-->
                    <table class="table table-condensed table-hover customerTab tab3" style="display: none;">
                      <thead>
                      <tr>
                        <th>排序</th>
                        <th>题型</th>
                        <th>数量</th>
                        <th class="contentTh">题型标题</th>
                        <th>每题分数</th>
                        <th>试题分类</th>
                        <th>抽取数量</th>
                      </tr>
                      </thead>
                      <tbody class="typeTabBody">
                      </tbody>
                    </table>
                    <input type="hidden" class="" name="paper_set_num" value="">
                    <p class="buttonP">
                      <a class="button" href="#" id="previewBtn">预览</a>
                      <a class="button" href="#" id="saveBtn">保存</a>
                      <a class="button" href="#" id="downloadBtn">下载</a>
                    </p>
                    <!-- 3-2结束 -->
                  </div>
                  <div role="tabpanel" class="tab-pane" id="createTest4"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading'

export default {
  name:'Body',
  components:{
    Loading,
  },
}
</script>
