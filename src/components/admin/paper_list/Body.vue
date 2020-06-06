<template>
  <div class="viewFrameWork-body">
    <!-- loading -->
    <Loading></Loading>
    <div class="body-wrapper">
      <div class="body-content">
        <div class="table-responsive">
          <table id="grid-data" class="table text-nowrap bootgrid-table JColResizer" aria-busy="false">
            <thead>
              <tr>
                <th data-column-id="id" data-visible="false" data-identifier="true"></th>
                <th data-column-id="name" data-sortable="false" >名称</th>
                <th data-column-id="paperIsUsing" data-visible="false" data-sortable="false" ></th>
                <th data-column-id="examingIsUsing" data-visible="false" data-sortable="false" ></th>
                <th data-column-id="paperStyleName" data-sortable="false" >试卷分类</th>
                <th data-column-id="status" data-sortable="false" >状态</th>
                <th data-column-id="type" data-sortable="true" >组卷方式</th>
                <th data-column-id="timeRestrict" data-sortable="false" >限制每题时长</th>
                <th data-column-id="totalScore" data-sortable="false" >总分</th>
                <th data-column-id="creatorName" data-sortable="false" >创建人</th>
                <th data-column-id="createTime" data-sortable="true" >创建时间</th>
                <th data-column-id="modifierName" data-sortable="false" >修改人</th>
                <th data-column-id="updateTime" data-sortable="true" >修改时间</th>
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
