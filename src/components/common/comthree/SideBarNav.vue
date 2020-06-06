<template>
  <div class="sidebar-nav">
    <ul class="sidebar-trans">

      <li class="nav-item nav-item-exam  nav-item-active">
        <a href="/depts/exam" data-toggle="tooltip" data-placement="right" data-container="body" title="考试" data-original-title="考试">
          <div class="nav-icon">
            <i class="icon icon-p_leftnav_exam icon-exam"></i>
          </div>
          <span class="nav-title">
                                        考试
                                       <span class="show-num exam-num-box" style="left: 74px; display: none;">---</span>
                                    </span>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SideBarNav',
  }
</script>
