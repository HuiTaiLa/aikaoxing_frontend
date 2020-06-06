<template>
  <div class="status-middle toolbar">
    <div class="body-toolbar clearfix">
      <div class="body-toolbar-right pull-right toolbar-right-operation">
        <button type="button" class="btn btn-warning btn-size" id="importBtn">
          <span id="import" style="display:inline-block;">录入</span>
          <span id="import_questions" style="display:none;">录入中<span class="ani_dot">...</span></span>
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
