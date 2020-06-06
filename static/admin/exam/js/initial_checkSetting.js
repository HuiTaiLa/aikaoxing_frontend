
  var checkUserName = getQueryString("userName");//checkUserName为账号
  var USER_ROLE = 'admin';

  /**** 判分  学员姓名隐藏 ****/
  var isLookURL=location.search
  var isLookarr=isLookURL.split('&')
  var isLook = '';
  isLookarr.forEach(function (item,index){
  var arr = item.split('=');
  if (arr[0] == 'isLook') {
  isLook = arr[1];
}
})

  $(function () {
  //获取上一人，下一人信息
  $.ajax({
    type: "POST",
    cache : false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/api/exam/prev_next_manmade_exam_ending",
    data: {
      "examInfoId":exam_info_id,
      "examResultsId":exam_results_id,
      'userName':checkUserName,
      'account': user.account,
      'companyId': user.companyId
    },
    success: function(msg){
      if(msg.success){
        if(msg.bizContent.prev&&msg.bizContent.prev.resultId!=0){
          $("#prevOneBtn").attr("data-exam-info-id", msg.bizContent.prev.examId)
            .attr("data-exam-results-id", msg.bizContent.prev.resultId)
            .attr("data-user-name", msg.bizContent.prev.userName).removeClass("disabled")
            .attr("data-isLook",isLook);
        }
        if(msg.bizContent.next&&msg.bizContent.next.resultId!=0){
          $("#nextOneBtn").attr("data-exam-info-id", msg.bizContent.next.examId)
            .attr("data-exam-results-id", msg.bizContent.next.resultId)
            .attr("data-user-name", msg.bizContent.next.userName).removeClass("disabled")
            .attr("data-isLook",isLook);
        }
        if($('#nextOneBtn').attr('data-isLook')=='0' && USER_ROLE=="sub_admin"){
          $('li.menu-item.menu-item-user').css('display','none')
          $('li.menu-item.menu-item-exam.menu-item-score').css('border-top','none')
        }
        if($('#prevOneBtn').attr('data-isLook')=='0' && USER_ROLE=="sub_admin"){
          $('li.menu-item.menu-item-user').css('display','none')
          $('li.menu-item.menu-item-exam.menu-item-score').css('border-top','none')
        }
      }
    }
  });

  //浏览照片
  $("#prevPic").click(function () {
  var _active = $("#pictureList .picture-li.active");
  var _next = $(_active).prev(".picture-li");

  if(_next.length!=0){
  $("#nextPic").removeClass("hidden");
  $("#pictureList .picture-li").removeClass("active");
  $(_next).addClass("active");
}else {
  $(this).addClass("hidden");
}
});

  $("#nextPic").click(function () {
  var _active = $("#pictureList .picture-li.active");
  var _prev = $(_active).next(".picture-li");

  if(_prev.length!=0){
  $("#prevPic").removeClass("hidden");
  $("#pictureList .picture-li").removeClass("active");
  $(_prev).addClass("active");
}else {
  $(this).addClass("hidden");
}
});

});

  /**** 判分  学员姓名隐藏 ****/
  if( isLook[1]=='0' && USER_ROLE=="sub_admin"){
  $('li.menu-item.menu-item-exam.menu-item-score.menu-item-pass').css('border-top','none')
}

  // 仅看错题
  $(".switch-select-error").click(function(){
  if($(this).hasClass("switch-off")){
    $(".paper").removeClass("select-error-paper");
    window.history.pushState(null, null, location.href.replace("&selectError=1",""));

}else {
    $(".paper").addClass("select-error-paper");
    window.history.pushState(null, null, location.href.replace("#/","") +"&selectError=1");
}
});

  // 判分框下至
  $(".switch-checkbox-after").click(function(){
  if($(this).hasClass("switch-off")){
  $(".manmade-mode").removeClass("after");
}else {
  $(".manmade-mode").addClass("after");
}
});

  //显示已批改过的评语
  var correct_comment="".replace(/\<br\/\>/g,'\n'); //加上换行处理
      $('.correct_commit_content').text(correct_comment);

      //改为正确，分数填写自动变为满分
      $("body").on("click",".icon-right",function(){
        $(this).addClass("icon-checked");
        $(this).next().removeClass("icon-checked");
        var q_score=$(this).parents(".question-operation").find(".question-score").attr("data-qscore");//大题满分
        $(this).parents(".question-operation").find(".question-score").val(q_score);
      })

      //改为错误，分数填写自动变为0分
      $("body").on("click",".icon-wrong",function(){
        $(this).addClass("icon-checked");
        $(this).prev().removeClass("icon-checked");
        $(this).parents(".question-operation").find(".question-score").val("0.0");
      })

      function closePage(){
        var dingtalkEnv = '1';
  if(dingtalkEnv == '0'){
  window.history.go(-1);
}else{
    window.opener=null;
    window.open('','_self');
  window.close();
}
  }
