if(sessionStorage.getItem('ksxSaveData')){
  sessionStorage.setItem('ksxSaveData',0)
}
$(function() {
  $('.pick-test-aera').hide();
  $('.in-lib').hide();
  $('.pick-random').hide();
  //点击下一步切换标签，跳转到第二步
  $('.btn-step1').click(function() {
    if($("input[name=paper_name]").val()==""){
      alert("请输入试卷名称");
      return;
    }else if($("input[name=paper_name]").val().length > 50){
      alert("试卷名称不得大于50字！");
      return;
    }

    if(!$("input[name=paper_style]").val() || $("input[name=paper_style]").val()==1){
      alert("请选择试卷分类");
      return;
    }

    $(".step3").addClass('active');
    $('#createTest3').addClass('active');
    $('#createTest1').removeClass('active');
    $(".step1").removeClass('active');

    //传递 选题、随机、抽题组卷 到第三步
    $("input[name=add_style]").val("select");
    $("input[name=classification]").val("");
    var type = $("#paper_type_select").val(); //试卷类型
    // var limit_q_time = $('input[name="limitQtime"]').val(); //限制每题时长
    manualInputTest("", type);
  });

  // //跳转到3-1
  // $('.btn-step2').click(function() {
  //     /*$('.pick-by-hand').show();
  //     $('.pick-random').hide();
  //     $('.step3').addClass('active');
  //     $('#createTest3').addClass('active');
  //     $('.step2').removeClass('active');
  //     $('#createTest2').removeClass('active');*/
  // });
  // //跳转到3-2
  // $('.btn-random').click(function() {
  //     /*$('.pick-by-hand').hide();
  //     $('.pick-random').show();
  //     $('.step3').addClass('active');
  //     $('#createTest3').addClass('active');
  //     $('.step2').removeClass('active');
  //     $('#createTest2').removeClass('active');*/
  // });
  //点击单选按钮
  $('.pick-test').click(function(e) {
    $('.new-test-aera').find('.new-test').prop('checked', true);
    $('.new-test-aera').find('.pick-test').prop('checked', false);
  });
  $('.new-test').click(function(e) {
    $('.pick-test-aera').find('.new-test').prop('checked', false);
    $('.pick-test-aera').find('.pick-test').prop('checked', true);

  });
  // $('.item-in-hand').click(function(e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     $('.in-hand').findExamResultWhetherIsGraded('.item-in-lib').prop('checked', true);
  //     $('.in-hand').findExamResultWhetherIsGraded('.item-in-hand').prop('checked', false);
  // });
  // $('.item-in-lib').click(function(e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     $('.in-lib').findExamResultWhetherIsGraded('.item-in-hand').prop('checked', true);
  //     $('.in-lib').findExamResultWhetherIsGraded('.item-in-lib').prop('checked', false);
  // });
  //点击creat-textbar
  $('.create-test-bar1').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.new-test-aera').hide();
    $('.pick-test-aera').show();
  });
  $('.create-test-bar2').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().hide();
    $('.new-test-aera').show();
  });
  $('.create-test-bar3').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().hide();
    $('.in-hand').find('.item-in-lib').prop('checked', true);
    $('.in-hand').find('.item-in-hand').prop('checked', false);
    $('.in-hand').show();
  });
  $('.create-test-bar4').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().hide();
    $('.in-lib').find('.item-in-hand').prop('checked', true);
    $('.in-lib').find('.item-in-lib').prop('checked', false);
    $('.in-lib').show();
  });
  //从题库中选题
  $('.pick-in-lib').children().eq(0).click(function() {
    $(this).addClass('lib-type1').removeClass('lib-type0')
    $('.pick-in-lib').find('span').eq(1).addClass('lib-type0').removeClass('lib-type1');
    $('.pick-in-lib').find('span').eq(2).addClass('lib-type0').removeClass('lib-type1');
    var a = 1;
  });
  $('.pick-in-lib').children().eq(1).click(function() {
    $(this).addClass('lib-type1').removeClass('lib-type0');
    $('.pick-in-lib').find('span').eq(0).addClass('lib-type0').removeClass('lib-type1');
    $('.pick-in-lib').find('span').eq(2).addClass('lib-type0').removeClass('lib-type1');
    var a = 2;
  });
  $('.pick-in-lib').children().eq(2).click(function() {
    $(this).addClass('lib-type1').removeClass('lib-type0');
    $('.pick-in-lib').find('span').eq(0).addClass('lib-type0').removeClass('lib-type1');
    $('.pick-in-lib').find('span').eq(1).addClass('lib-type0').removeClass('lib-type1');
    var a = 3;
  });
  //get the tab cookie
  function Get_Cookie( a ) {

    var start = document.cookie.indexOf( a + "=" );
    var len = start + a.length + 1;
    if ( ( !start ) &&
      ( a != document.cookie.substring( 0, a.length ) ) )
    {
      return 0;
    }
    if ( start == -1 ) return 0;
    var end = document.cookie.indexOf( ";", len );
    if ( end == -1 ) end = document.cookie.length;
    return unescape( document.cookie.substring( len, end ) );
  }

  //答题时长方式选择
  $(".limitquestiontime .limit_t_btn").click(function(){
    var value=$(this).attr("data-value");
    $('#limitQT').val(value);
    $(".limitquestiontime .limit_t_btn").css('color','#999999').css('border','1px solid #999999');
    $(this).css('color','#1A8CFE').css('border','1px solid #1A8CFE');
  });
})
