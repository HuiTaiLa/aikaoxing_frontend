<template>
  <div id="qtExample">

    <div class="body-box">
      <div class="modal-body">
        <div class="accordion batch-cont" id="accordion1">
          <div class="accordion-group">
            <div id="collapse1" class="b-example accordion-body collapse in">
              <h2>单选题</h2>
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。<br>
                  2、选项支持A.和A、两种格式，最多支持 20 个选项。<br>
                  3、答案中请勿加分隔符或空格
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.驾驶人有下列哪种违法行为一次记6分</span><br>
                  <span>A、使用其他车辆行驶证</span><br>
                  <span>B、饮酒后驾驶机动车</span><br>
                  <span>C、车速超过规定时速50%以上</span><br>
                  <span>D、违法占用应急车道行驶</span><br>
                  <span>答案:D</span><br>
                  <span>解析:请仔细阅读交规<span style="color:#F00">(若无解析本行可不填)</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion batch-cont" id="accordion2" style="display:none">
          <div class="accordion-group">
            <div id="collapse2" class="b-example accordion-body collapse in">
              <h2>多选题</h2>
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。<br>
                  2、选项支持A.和A、两种格式，最多支持 20 个选项。<br>
                  3、答案中请勿加分隔符或空格
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.驾驶人有下列哪种违法行为一次记6分？</span><br>
                  <span>A、使用其他车辆行驶证</span><br>
                  <span>B、饮酒后驾驶机动车</span><br>
                  <span>C、车速超过规定时速50%以上</span><br>
                  <span>D、违法占用应急车道行驶</span><br>
                  <span>答案:ABCD</span><br>
                  <span>解析:请仔细阅读交规<span style="color:#F00">(若无解析本行可不填)</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion batch-cont" id="accordion3" style="display:none">
          <div class="accordion-group">
            <div id="collapse3" class="b-example accordion-body collapse in">
              <h2>判断题</h2>
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。<br>
                  2、答案支持正确、错误和对、错两种格式。

                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.国际象棋起源于英国吗？</span><br>
                  <span>答案:对</span><br>
                  <span>解析:请仔细阅读交规<span style="color:#F00">(若无解析本行可不填)</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion batch-cont" id="accordion4" style="display:none">
          <div class="accordion-group">
            <div id="collapse4" class="b-example accordion-body collapse in">
              <h2>填空题</h2>
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。<br>
                  2、若有多空，请使用竖线|分隔。<br>
                  3、填空答案支持输入同义词，用&amp;&amp;连接多个同义词答案。<br>
                </p>
                <h3>输入范例</h3>
                <span class="txt-style">1.我国古典四大名著是&nbsp;(&nbsp;)&nbsp;(&nbsp;)&nbsp;(&nbsp;)&nbsp;(&nbsp;)</span><br>
                <span class="txt-style">答案:红楼梦&amp;&amp;石头记|水浒传|三国演义|西游记 </span><br>
                <span class="txt-style">解析:请仔细阅读交规<span style="color:#F00;">(若无解析本行可不填)</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion batch-cont" id="accordion5" style="display:none">
          <div class="accordion-group">
            <div id="collapse5" class="b-example accordion-body collapse in">
              <h2>问答题</h2>
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。<br>
                  2、支持人工判卷
                </p>
                <h3>输入范例</h3>
                <span class="txt-style">1.请论述全球化对国家政治产生了哪些深刻的影响？</span><br>
                <span class="txt-style">答案:全球化使国家主权受到一定的制约； 全球化对政府的治理提出了更高的要求。</span><br>
                <span class="txt-style">解析:请仔细阅读交规<span style="color:#F00">(若无解析本行可不填)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default btn-close" data-dismiss="modal"> <span class="icon-a_d_arrow_up"></span> 收起</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Example'
  }
</script>
