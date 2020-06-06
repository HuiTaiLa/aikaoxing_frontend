
$(document).ready( function() {


    // 点击查看例题
    $("#showExample").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var newHeight = $('.batch-input-box').height() / 2 - 40;
        // 切换icon
        changeIconClass($(this));
        // 规范icon恢复原状
        if($('#showStandard').find('.icon').hasClass('icon-a_arrow_up')){
            $('#showStandard').find('.icon').removeClass('icon-a_arrow_up');
            $('#showStandard').find('.icon').addClass('icon-a_arrow_down');
        }
        // 关闭范例
        changeDialogShow($("#qtStandard"));
        changeDialogShow($("#qtStandard1"));
        $('#qtStandard').css('height','0px');
        $('#qtStandard').removeClass('active');
        $('#qtStandard1').css('height','0px');
        $('#qtStandard1').removeClass('active');
        if ($('#qtExample').hasClass('active')){
            $('#qtExample').removeClass('active');
            changeDialogShow($("#qtExample"))
        } else {
            $('#qtExample').addClass('active');
            $("#qtExample").animate({
                height: newHeight
            });
        }
        if ($('#continueOpen').hasClass('active')){
            $('#qtExample .modal-footer').css('width','140px');
            $('#continueOpen').removeClass('active')
        }
    });

    $('#continueOpen').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var newHeight = $('.batch-input-box').height() / 2 - 40;
        $('.textarea-group').hide();
        newHeight = $('.batch-input-box').height() - 40;
        $("#qtExample").animate({
            height: newHeight
        });
        $('#qtExample .modal-footer').css('width','60px');
        $('#continueOpen').addClass('active')
    });

    // 点击关闭例题
    $("#qtExample .btn-close").click(function(e){
        e.stopPropagation();
        e.preventDefault();
        if($('#continueOpen').hasClass("active")){
            var newHeight = $('.batch-input-box').height() / 2 - 40;
            $("#qtExample").animate({
                height: newHeight
            });
            $('#qtExample .modal-footer').css('width','140px');
            $('#continueOpen').removeClass('active');
            $('.textarea-group').show();
        }else{
            changeIconClass($('#showExample'));
            $('.textarea-group').removeClass('active');
            $('#qtExample').removeClass('active');
            $('.textarea-group').show();
            // 动画关闭
            changeDialogShow($("#qtExample"))
        }
    });

    //点击查看规范
     $("#showStandard").click(function (e) {
         e.stopPropagation();
         e.preventDefault();
         changeIconClass($(this));
         if($('#showExample').find('.icon').hasClass('icon-a_arrow_up')){
             $('#showExample').find('.icon').removeClass('icon-a_arrow_up');
             $('#showExample').find('.icon').addClass('icon-a_arrow_down');
         }
         var newHeight = $('.batch-input-box').height() / 2 - 40;
         changeDialogShow($("#qtExample"));
         $('#qtExample').removeClass('active');
         $('#qtExample').css('height','0px');
         if (labelOpen==1) {
             if ($('#qtStandard').hasClass('active')){
                 $('#qtStandard').removeClass('active');
                 changeDialogShow($("#qtStandard"))
             } else {
                 $('#qtStandard').addClass('active');
                 $("#qtStandard").animate({
                     height: newHeight
                 });
             }
         } else {
             if ($('#qtStandard1').hasClass('active')){
                 $('#qtStandard1').removeClass('active');
                 changeDialogShow($("#qtStandard1"))
             } else {
                 $('#qtStandard1').addClass('active');
                 $("#qtStandard1").animate({
                     height: newHeight
                 });
             }
         }
     });

     // 点击关闭规范
     $("#qtStandard .btn-close").click(function(e){
         e.stopPropagation();
         e.preventDefault();
         changeIconClass($('#showStandard'));
         $('.textarea-group').removeClass('active');
         $('#qtStandard').removeClass('active');
         // 动画关闭
         changeDialogShow($("#qtStandard"))
     });
    $("#qtStandard1 .btn-close").click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $('.textarea-group').removeClass('active');
        $('#qtStandard1').removeClass('active');
        // 动画关闭
        changeDialogShow($("#qtStandard1"))
    });

	//导入试题
	$("#importBtn").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var previewHtml = $('#preview').html();
        var previewText = $('#preview').text();

        if($.trim(previewHtml) === '' || $.trim(previewText) === ''){
            alert('导入内容不能为空！');
            return false
        }

        if($('.check_error').size() > 0){
            alert('存在错误，请检查试题！');
            return false;
        }
        var text = $("#text-input .fr-view").html();
		$("#errorText , #errorTextNew").hide();
        if($("input[name=classification]").val()==''||$("input[name=classification]").val()=='1'){
          alert("请选择试题分类！");
          return false;
        }else{
            var data=serializeFn();
            // console.log(data)
            var dataForm=JSON.stringify(data);
            $("#import").hide();
            $("#import_questions").show();
            $.ajax({
              type: "POST",
              cache : false,
              headers: { "cache-control": "no-cache" },
              dataType: "json",
              // contentType: "application/json",
              url: "/api/question/batch_import/",
              data:
                {
                  dataForm:dataForm,
                  account:user.account,
                  companyId:user.companyId
                },
              traditional: true,
              success: function(msg){
                  $("#import_questions").hide();
                  $("#import").show();
                  var message="成功导入 "+msg.bizContent.right+" 道试题，失败 "+msg.bizContent.error+" 道题";
                  $("#import_result").text(message);
                  // if (USER_ROLE == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
                  //     $('#conResult').hide();
                  // }
                  $('#txtImport').modal();
                  // gio
                  // ksxProbe.gioTrack('enterQuestionSuccess', 1, {
                  //     'questionEnterMethod_var': '批量录入',
                  //     'questionEnterCount_var': msg.bizContent.successCount
                  // });

                  $('#txtImport').on('hidden.bs.modal', function (e) {
                      $( '#txtImport' ).off().on( 'hidden', 'hidden.bs.modal');
                      location.reload();
                  })
              }
          });
		}
    });


    //导入试题
    $("#importButton").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var previewHtml = $('#preview').html();
        var previewText = $('#preview').text();

        if($.trim(previewHtml) === '' || $.trim(previewText) === ''){
            alert('导入内容不能为空！');
            return false
        }

        if($('.check_error').size() > 0){
            alert('存在错误，请检查试题！');
            return false;
        }
        var text = $("#text-input .fr-view").html();
        $("#errorText , #errorTextNew").hide();
        if($("input[name=classification]").val()==''){
            alert("请选择试题分类！");
            return false;
        }else{
            var data=serializeFn();
            var dataForm=JSON.stringify(data);
            $("#import1").hide();
            $("#import_questions1").show();
            $.ajax({
                type: "POST",
                cache : false,
                headers: { "cache-control": "no-cache" },
                dataType: "json",
                contentType: "application/json",
                url: "/baseinfo/admin/upload_testqm_txt/",
                data: dataForm,
                success: function(msg){
                    $("#import_questions1").hide();
                    $("#import1").show();
                    var message="成功导入 "+msg.bizContent.successCount+" 道试题，失败 "+msg.bizContent.failCount+" 道题";
                    $("#import_result").text(message);
                    if (USER_ROLE == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
                        $('#conResult').hide();
                    }
                    $('#txtImport').modal();
                    // gio
                    ksxProbe.gioTrack('enterQuestionSuccess', 1, {
                        'questionEnterMethod_var': '批量录入',
                        'questionEnterCount_var': msg.bizContent.successCount
                    });

                    $('#txtImport').on('hidden.bs.modal', function (e) {
                        $( '#txtImport' ).off().on( 'hidden', 'hidden.bs.modal');
                        location.reload();
                    })

                }
            });
        }
    });

    $('#closeButton').click(function () {
        $('#txtImport').modal("hide");
        location.reload();
    });

    //点击确认关闭导入结果模态框
    $("#conResult").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('div#text-input').froalaEditor('html.set', '');
        $('div#text-input').froalaEditor('destroy');
        initFroala();
        $("#preview").empty();
        $('#txtImport').modal("hide");
        window.open('/admin/paper_add_new');
    });

    // 重载页面，继续录入
    $("#continueAddQuestion").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $( '#txtImport' ).off().on( 'hidden', 'hidden.bs.modal');
        location.reload();
    });
     var errorIndex = -1;
     var topNum = 0;
     var bottomNum = 0;
    // 点击显示下一个错误
    $("#nextError").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var boxOffsetTop = $('.box').offset().top;
        var error=$("#preview").find(".check_error");

        //先判断滚动条是否到底部
        if(bottomNum === 1){

            topNum = 0;
            bottomNum = 0;
            errorIndex = -1
        }else{
            errorIndex++;
            if(errorIndex > error.length-1){
                errorIndex = -1;
            }
            topNum += parseInt(error.eq(errorIndex).offset().top-boxOffsetTop-10);
        }

        // 范例和规范打开 对应错题显示
        if ($('#qtExample').hasClass('active')) {
            $('.box').scrollTop(topNum + $('#qtExample').height());
        }else if($('#qtStandard').hasClass('active')){
            $('.box').scrollTop(topNum + $('#qtStandard').height());
        }else if($('#qtStandard1').hasClass('active')){
            $('.box').scrollTop(topNum + $('#qtStandard1').height());
        } else {
            $('.box').scrollTop(topNum);
        }
        // checkError();

    });
    //滚动检测
    $('.box').scroll(function(){

        if($(this).scrollTop()+$(this).height() >= $('#preview').height()){

             errorIndex = -1;
             topNum = 0;
             bottomNum = 1
        }

    });
	//导入选择分类
    $("body").on("click", "#selTypeLink", function(e) {
        // e.stopPropagation();//解决点击'试题分类'，'试题难度'下拉框不隐藏的bug
		// e.preventDefault();
		showSelType(this);
    });

    $(".body-content .cont-r .tab-content .batch-type .simulationOption div").click(function(e){
        var $this = $(this);
        var idx = $this.index();
        $(".body-content .cont-r .tab-content .batch-type .simulationOption div").removeClass('now_diff'); //移除所有选项的选中标记
        $(this).addClass('now_diff'); //为被点选项加上选中标记，在输入区被编辑后进行校验时，调用该选项的点击，对所有难度的输入错误进行再次纠正，实现难度纠错状态的保存
        e.stopPropagation();
        $this.parents(".simulationSelect").next().children().prop("selected",false);
        $this.parents(".simulationSelect").children("span").text($this.text());
        $this.parent().hide();
        var errorChidren = $('#preview').children('.check_error');
        var errChidrenDiff = $('#preview').children('.check_error_diff');
        for(var i=0;i<$(errorChidren).length;i++){
            if($(errorChidren[i]).find('.qt_difficult').hasClass('qt_error')) {
                $(errorChidren[i]).addClass('new_error');
            }
        }
        for (var i = 0; i <$(errChidrenDiff).length ; i++) {
            if( $(errChidrenDiff[i]).find('.qt_difficult').hasClass('qt_error_diff')) {
                $(errChidrenDiff[i]).addClass('new_error');
            }
        }
        var newChidren = $('#preview').children('.new_error');
        if ($this.text() == '请选择'){
            for (var i = 0; i < newChidren.length ; i++) {
                var diffBox = $(newChidren[i]).find('.qt_difficult');
                $(diffBox).addClass('qt_error');
                $(diffBox).html('<span class="title">难度：</span>');
                $('.new_error').addClass('check_error');
            }
            //判断一下是否存在错误
            if($("#preview .qt_error").length > 0){
                $('#errorText').show();
                $('#nextError').show();
            }
        } else {
            for (var i = 0; i < newChidren.length ; i++) {
                var diffBox = $(newChidren[i]).find('.qt_difficult');

                diffBox.removeClass('qt_error');
                diffBox.removeClass('qt_error_diff');
                if($(newChidren[i]).find('.qt_error').length == 0){
                    $(newChidren[i]).removeClass('check_error');
                }
                if($(newChidren[i]).find('.qt_error_diff').length == 0){
                    $(newChidren[i]).removeClass('check_error_diff');
                }
                $(diffBox).html('<span class="title">难度：</span>' + $this.text());
            }
            //判断一下是否存在错误
            if($("#preview .qt_error").length == 0) {
                $('#errorText').hide();
                $('#nextError').hide();
            }else {
                $("#errorCount").text($('.check_error').size());
            }
        }

        //对所有单选题进行一次判断，如难度纠正后没有其他错误，放出'录入为多选题'选项 。取消纠正后，难度变为错误时，该选项隐藏
        $(".question[data-type=1]").each(function(){
            if($(this).find(".qt_error").length!=0){
                $(this).find('.change-type').hide()
            }else{
                $(this).find('.change-type').show()
            }
        })
    });

    //选择试题类型，显示不同示例
    $("#manualInput select[name=type]").change(function(e) {
        var $this = $(this);
        // 更换试题类型时给出提示信息
        if($("#inputArea").attr("style") != "display: none;"){
            if(confirm("输入区试题内容会清空，请确认")==false){
                $this.prev().children(".title-font").text($this.prev().children(".title-font").attr("oldValue"));
                $this.val(qt_type);
                return false;
            }
        }
        $this.prev().children(".title-font").attr("oldValue",$this.prev().children(".title-font").html());
        qt_type = $(this).val();
        $("#text-input .fr-view").html("");
        $("#preview").empty();
        $("#qtExample .accordion").hide();
        $("#accordion"+qt_type).show();
    });

    $('#helpBtn').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.open('https://www.kancloud.cn/zhoujun123/examstar-stbq/1071627')
    });

});

function changeDialogShow(_this){
    _this.animate({
        height: '0px'
    });
}

function changeIconClass(_this){
    if (_this.find('.icon').hasClass('icon-a_arrow_down')){
        _this.find('.icon').removeClass('icon-a_arrow_down');
        _this.find('.icon').addClass('icon-a_arrow_up');
        $('.textarea-group').addClass('active');
    } else {
        _this.find('.icon').removeClass('icon-a_arrow_up');
        _this.find('.icon').addClass('icon-a_arrow_down');
        $('.textarea-group').removeClass('active');
    }
}


//显示选择分类对话框
function showSelType(obj){
	selTypeModal.location.href = "/admin/question_class";
	$('#classDialog').show();
	// $('#typeModal').modal({
	// 	backdrop:"static",
	// 	keyboard:false
	// });
}

//关闭选择分类对话框
function hideSelType(obj){
    $('#classDialog').hide();
	// $('#typeModal').modal('hide');
}

//接受选择分类数据
function selType(id,name){
	$("input[name=classification]").val(id);
	$("#selTypeLink").text(name);
}


//点击导入时检查试题中是否存在错误
function checkError() {
    // 首先检查题目中有无重复项，若有重复则对整题做标记
    $("#preview").find(".question").each(function (index,element) {
        var key_t=[];
        var ans;
        var diffBox = $(this).find(".qt_error_diff").length;
        key_t[0]=$(this).find(".key_A").length;
        key_t[1]=$(this).find(".key_B").length;
        key_t[2]=$(this).find(".key_C").length;
        key_t[3]=$(this).find(".key_D").length;
        key_t[4]=$(this).find(".key_E").length;
        key_t[5]=$(this).find(".key_F").length;
        key_t[6]=$(this).find(".key_G").length;
        key_t[7]=$(this).find(".key_H").length;
        // 按照选项重复个数从大到小排序
        key_t.sort(function(a,b) {
            return b-a;
        });
        if(key_t[0]>1 || diffBox>1 ){
            $(this).addClass("check_error");
        }
        // 对按照答案对选型进行检索，若答案不在选项中，则将答案标记为错误
        if(qt_type=="1"||qt_type=="2"){
            ans=$(this).find(".qt_answer").text().replace(/^答案[:：]/,"").replace(/\s/g,"").toUpperCase();
            if(ans.replace(/[A-Z]/g,"")!=""){
                $(this).addClass("check_error");
            }else {
                var ans_l=$.trim(ans).split("");
                for (var i = 0; i < ans_l.length; i++) {
                    var key_f=$(this).find(".key_"+ans_l[i]).length;
                    if(key_f==0){
                        $(this).addClass("check_error");
                        break;
                    }
                }
            }
        }
        if(qt_type=="3") {
            ans=$(this).find(".qt_answer").text().replace(/^答案[:：]/,"").replace(/\s/g,"");
            if(ans != '正确' && ans != '错误' && ans != '对' && ans != '错'){
                // $(this).addClass("check_error");
                $(this).find(".qt_answer").addClass("error");
            }
        }
        if(qt_type=='4'||qt_type=='5'){
            ans=$(this).find(".qt_answer").text().replace(/^答案[:：]/,"").replace(/\s/g,"");
            if(ans==''){
                $(this).addClass("check_error");
            }
        }
    });
}

// 组织导入试题的信息
function serializeFn() {
    var classification = $("input[name=classification]").val();
    // var difficult=$("select[name=difficult]").val();
    var data=[];

    $("#preview").find(".question").each(function (index,element) {
        var type = $(this).attr('data-type');
        var reQuestion = $(this).find(".qt_title").html().replace(/^[\s\S]*<span class="type-box"[\s\S]*>[\s\S]+<\/span>([\s\S]*)$/,"$1");
        var question=escapeHTML(reQuestion);
        var answer1=$(this).find(".key_A").length==0 ? "" : (escapeHTML($(this).find(".key_A").html())==""?" ":escapeHTML($(this).find(".key_A").html()));
        var answer2=$(this).find(".key_B").length==0 ? "" : (escapeHTML($(this).find(".key_B").html())==""?" ":escapeHTML($(this).find(".key_B").html()))
        var answer3=$(this).find(".key_C").length==0 ? "" : (escapeHTML($(this).find(".key_C").html())==""?" ":escapeHTML($(this).find(".key_C").html()))
        var answer4=$(this).find(".key_D").length==0 ? "" : (escapeHTML($(this).find(".key_D").html())==""?" ":escapeHTML($(this).find(".key_D").html()))
        var answer5=$(this).find(".key_E").length==0 ? "" : (escapeHTML($(this).find(".key_E").html())==""?" ":escapeHTML($(this).find(".key_E").html()))
        var answer6=$(this).find(".key_F").length==0 ? "" : (escapeHTML($(this).find(".key_F").html())==""?" ":escapeHTML($(this).find(".key_F").html()))
        var answer7=$(this).find(".key_G").length==0 ? "" : (escapeHTML($(this).find(".key_G").html())==""?" ":escapeHTML($(this).find(".key_G").html()))
        var answer8=$(this).find(".key_H").length==0 ? "" : (escapeHTML($(this).find(".key_H").html())==""?" ":escapeHTML($(this).find(".key_H").html()))
        if(type=="1"||type=="2"){
            var key=escapeHTML($(this).find(".qt_answer").html()).replace(/&nbsp;/g,"").toUpperCase().replace(/<BR CLASS="MARKDOWN_RETURN">/g, "");
        }else if (type=="3") {
            var key=escapeHTML($(this).find(".qt_answer").html()).replace(/(^\s+)|(\s+$)/g,"").replace(/(正确|对)/,1).replace(/(错误|错)/,0);
        }else{
            var key=escapeHTML($(this).find(".qt_answer").html());
        }
        var comKeyWord = $(this).find(".qt_comKeyWord").length==0 ? "" : escapeHTML($(this).find(".qt_comKeyWord").html());
        var coreKeyWord = $(this).find(".qt_coreKeyWord").length==0 ? "" : escapeHTML($(this).find(".qt_coreKeyWord").html());
        var analysis=$(this).find(".qt_analysis").length==0 ? "" : escapeHTML($(this).find(".qt_analysis").html());
        var difficult=$(this).find(".qt_difficult").length==0 ? "" : escapeHTML($(this).find(".qt_difficult").html());
        if ($(this).find(".qt_difficult").length!=0){
            difficult=difficult.slice(0,2);
        }
        var label=$(this).find(".qt_label").length==0 ? "" : escapeHTML($(this).find(".qt_label").html());
        data[index]={
            "classification":classification,
            "type":type,
            "difficult":difficult,
            "question":question,
            "answer1":answer1,
            "answer2":answer2,
            "answer3":answer3,
            "answer4":answer4,
            "answer5":answer5,
            "answer6":answer6,
            "answer7":answer7,
            "answer8":answer8,
            'normalWords':comKeyWord,
            "keyWords":coreKeyWord,
            "key":key,
            "analysis":analysis,
            "label":label,
            "disorder":1
        };
        // 若不存在该项则不存入
        for (i in data[index]) {
            if(data[index][i]==""||!data[index][i]){
                delete data[index][i];
            }
        }
    });
    return data;
}

//转义部分，换行　$markdown_return 进行两次替换
// 按照URL换码协议，＋会被转换成空格，所以要做相应处理
function escapeHTML( text ) {
    return text.replace(/^[\s\S]*<span class="title"[\s\S]*>[\s\S]+<\/span>([\s\S]*)$/,"$1")
               .replace(/<br class="markdown_return">/g, "$markdown_return")
               .replace(/\&nbsp;/g, " ")
               .replace(/\$markdown_return/g, '<br class="markdown_return">')
}
