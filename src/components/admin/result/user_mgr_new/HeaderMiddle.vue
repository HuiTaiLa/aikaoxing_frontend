<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix">
      <div class="body-toolbar-left pull-left toolbar-left-operation ksx-fit-config-container">
        <button type="button" class="btn btn-default ksx-fit-config-btn" id="selTypeLink"><i class="icon-a_btn_select btn-icon-left"></i>
          选择学员</button>
        <!--<div class="btn-group customer-btn-group ksx-fit-config-div">-->
          <!--<a class="btn btn-default dropdown-toggle exportBtn  " data-toggle="dropdown" href="#" style="padding: 0;" aria-expanded="false">-->
            <!--<i class="icons8-export btn-icon-left"></i>-->
            <!--导出-->
          <!--</a>-->
        <!--</div>-->
        <button type="button" class="btn btn-default btn-remove ksx-fit-config-btn">
          <i class="icons8-trash-can btn-icon-left"></i>
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderMiddle',
  }
</script>
