<template>
  <div class="viewFrameWork-statusbar">
    <a href="/depts/exam/" class="status-left status-item company-logo" title="logo" id="companyLogo">
      <img class="icon-logo logo-ksx" src="/static/images/logo.jpg"></a>
    <slot name="header-middle"></slot>
    <HeaderRight></HeaderRight>
  </div>
</template>
<script>
  import HeaderRight from './HeaderRight'
  export default {
    name: 'Header',
    components: {HeaderRight}
  }
</script>
