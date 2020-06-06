<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="table-responsive" id="step2">
          <table id="grid-data" class="table text-nowrap bootgrid-table JColResizer" aria-busy="false">
            <thead>
              <tr>
                <th data-column-id="id" data-visible="false" data-identifier="true" ></th>
                <th data-column-id="examName" data-sortable="false"  data-formatter="examName">考试名称</th>
                <th data-column-id="examStyleName" data-sortable="false" >分类</th>
                <th data-column-id="paperTotalScore" data-sortable="false" >总分</th>
                <th data-column-id="examStartTime" data-sortable="true" >开始时间</th>
                <th data-column-id="examEndTime" data-sortable="true" >结束时间</th>
                <th data-column-id="createUserName" data-sortable="false" >创建人</th>
                <th data-column-id="createTime" data-sortable="true" >创建时间</th>
                <th data-column-id="sender" data-sortable="false"  data-formatter="link">操作</th>
              </tr>
            </thead>
          </table>
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
