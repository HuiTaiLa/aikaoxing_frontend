<template>
  <div id="qtStandard1" style="height: 0px;" class="">
    <div class="modal-body input-body">
      <div class="input-rule">
        <div class="input-rule-content">
          <p class="input-common-title" style="margin-left: -10px;color: #1A8CFE;margin-bottom: 10px;font-weight: 500">输入规范</p>
          1、所有题型标号支持1.或1、或（1）三种格式。<br>
          2、所有题型必须含有 “ <span style="color: #F76377">答案：</span>”字段，且不能为空。<br>
          3、所有题型 “ <span style="color: #F76377">解析：</span>” 字段非必需，没有可不填。<br>
          4、所有题型必须含有 “ <span style="color: #F76377">难度：</span>”字段，且不能为空。<br>
          5、所有题型题目中包含图片，则将图片插入到指定位置即可。<br>
          6、<span style="color: #1A8CFE">选择题</span>最少支持2个选项A,B，最多支持8个选项A,B,C,D,E,F,G,H且按照顺序使用。<br>
          7、<span style="color: #1A8CFE">选择题</span>A-H这些选项号与内容之间要用、或 . 分开。<br>
          8、<span style="color: #1A8CFE">选择题</span>答案中请勿加分隔符或者空格。<br>
          9、<span style="color: #F76377">判断题</span>答案支持 “错误”，“正确” 或者 “错”，“对”。<br>
          10、<span style="color:#A06AD2">填空题</span>仅支持题目中出现括号。<br>
          11、<span style="color:#A06AD2">填空题</span>目里的多个填空答案要用 | 分割，单个答案不用添加。<br>
          12、<span style="color:#A06AD2">填空题</span>的填空答案支持输入同义词，用&amp;&amp;连接多个同义词答案。<br>
          13、<span style="color:#C9A310">问答题</span>可以包含 “普通关键词：” 和 “ 核心关键词：”，没有可不填。<br>
          14、<span style="color:#C9A310">问答题</span>多个关键词用、去分隔，并列关键词（或的关系）用 | 去分隔。<br>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default btn-close"> <span class="icon-a_d_arrow_up"></span> 收起</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Standard1',
  }
</script>
