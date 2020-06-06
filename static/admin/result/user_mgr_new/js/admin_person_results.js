$(document).ready(function () {
  $(".navbarCustomer li").mouseover(function (e) {
    if (!$(this).hasClass("navSel")) {
      $(this).addClass("navHover");
    }
  });
  $(".navbarCustomer li").mouseout(function (e) {
    $(this).removeClass("navHover");
  });
  //选择学员
  $("body").on("click", "#selTypeLink", function (e) {
    e.stopPropagation();
    e.preventDefault();
    showSelType(this);
  });
  //判断是否已经有了用户数据，如果没有，进入页面时弹出选择弹框
  if(!document.location.href.match(/userId/))
  {
    $("#selTypeLink").click();
  }
  //全选
  $(".checkAll").change(function (e) {
    if ($(this).is(":checked")) {
      $(".checkSimple").each(function (index, element) {
        $(this).attr("checked", "checked");
      });
    } else {
      $(".checkSimple").each(function (index, element) {
        $(this).removeAttr("checked");
      });
    }
  });
  //批量删除
  $("body").on("click", ".btn-remove", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var ids = "";
    $(".select-box").each(function (index, element) {
      if ($(this).is(":checked")) {
        id = $(this).val();
        if (id != "all") {
          ids += id + ",";
        }
      }
    });
    if (ids == "") {
      alert("请选择要删除的成绩！");
      return;
    }
    delDate(ids);
  });



  //单条判分
  // $("#grid-data").bootgrid().on("loaded.rs.jquery.bootgrid", function () {
  //     $("#grid-data").bootgrid().find(".markPerson").on("click", function (e) {
  //         e.stopPropagation();
  //         e.preventDefault();
  //         var id = $(this).attr("personResultId");
  //         var user_name = $(this).attr("user_name");
  //         var exam_info_id = $(this).attr("exam_info_id");
  //         // $.ajax({
  //         //     type: "get",
  //         //     cache: false,
  //         //     headers: { "cache-control": "no-cache" },
  //         //     dataType: "json",
  //         //     url: "/examadmin/exam/manmade_exam_check?exam_info_id=" + exam_info_id + "&exam_results_id=" + id + "&user_name=" + user_name + "&check_able=1",
  //         //     success: function (msg) {
  //         //         if (msg.msg == "True") {
  //         //             tempwindow.location = "/examadmin/exam/manmade_exam_check?exam_info_id=" + exam_info_id + "&exam_results_id=" + id + "&user_name=" + user_name;
  //         //         } else {
  //         //             tempwindow.close();
  //         //             $("#gradeModal").modal("show");
  //         //         }
  //         //     }
  //         // });
  //         if ($(this).parent().prev().text() == '答题中') {
  //             alert ('学员正在答题中');
  //         }else {
  //             var tempwindow = window.open();
  //             tempwindow.location = "/examadmin/exam/manmade_exam_check?examInfoId=" + exam_info_id + "&examResultsId=" + id + "&userName=" + user_name;
  //         }
  //     })
  // });
  //单个学员答卷下载
  // $("#grid-data").bootgrid().on("loaded.rs.jquery.bootgrid", function () {
  //     $("#grid-data").bootgrid().find(".download").on("click", function (e) {
  //         e.stopPropagation();
  //         e.preventDefault();
  //         var export_id = $(this).attr("personResultId");
  //         window.open("/examadmin/exam/result/export_pdf/?resultId="+export_id,"_blank");
  //     })
  // });

  // 导出
  $(".exportBtn").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (user_id) {
      dataForm = "userId=" + user_id;
      var dialogTip = "";//导出提示语
      //获取表中是否有选中行
      var selectList = $("#grid-data").bootgrid("getSelectedRows");
      if (selectList.length == 0){
        dialogTip = "请确认是否导出此学员的全部考试成绩？";
      }else {
        dialogTip = "请确认是否导出此学员选中的考试成绩？";
        dataForm += "&examResultIds=" + selectList.join(",");
      }
      BootstrapDialog.show({
        title: "导出学员成绩",
        cssClass: "export-dialog",
        message: dialogTip,
        buttons: [{
          label: "取消",
          cssClass: "export-btn-no",
          action: function(dialogItself) {
            dialogItself.close();
          }
        },{
          label: "确定",
          cssClass: "export-btn-yes",
          action: function(dialogItself) {
            dialogItself.close();
            $.ajax({
              type: 'GET',
              cache: false,
              headers: { "cache-control": "no-cache" },
              dataType: "json",
              url: '/examadmin/admin/results/import/?' + dataForm,
              success: function(msg) {
                //导出失败
                if(msg.bizContent.exportStatus == "false"){
                  $('#gradeModal').modal({
                    backdrop: "static",
                    keyboard: false
                  });
                }else{
                  //导出成功
                  $('#exportPaperModal').modal({
                    backdrop: "static",
                    keyboard: false
                  });
                }
              }
            });

          }
        }]
      });


      // $.ajax({
      //     type: 'GET',
      //     cache: false,
      //     headers: { "cache-control": "no-cache" },
      //     dataType: "json",
      //     url: '/examadmin/admin/results/import/',
      //     data: dataForm,
      //     success: function (msg) {
      //     $("#loading").hide();
      // export_animate();
      //     }
      // });
    }
    else {
      alert("请选择学员");
    };
  });

  //修改考试认证状态
  $("#verifyStatusConfirm").click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    var examResultsId = $(this).attr("data-id");

    $.ajax({
      type: "get",
      cache: false,
      headers: { "cache-control": "no-cache" },
      dataType: "json",
      url: "/examadmin/admin/update/exam_verify_status/",
      data: "examResultsId=" + examResultsId,
      success: function (msg) {
        if(msg.success){
          $("#verifyStatusModal").modal('hide');
          $("#grid-data").bootgrid("reload");
        }
      }
    })
  })


});







//显示考试对话框
function showSelType(obj) {
  selTypeModal.location.href = "/admin/result/exam_sel_user";
  $('#typeModal').modal({
    backdrop: "static",
    keyboard: false
  });
}
//关闭考试对话框
function hideSelType(obj) {
  $('#typeModal').modal('hide');
}
//删除方法
function delDate(id) {
  BootstrapDialog.show({
    title: "",
    cssClass: 'batch-del',
    message: "确定要删除选中的成绩吗？",
    buttons: [{
      label: "取消",
      cssClass: 'batch-del-no',
      action: function (dialogItself) {
        dialogItself.close();
      }
    },{
      label: "确认",
      cssClass: 'batch-del-yes',
      action: function (dialogItself) {
        dialogItself.close();
        var dataForm = "ids=" + id + "&account=" + user.account + "&companyId=" + user.companyId;
        $.ajax({
          type: "post",
          cache: false,
          headers: { "cache-control": "no-cache" },
          dataType: "json",
          url: "/api/exam/result/del/",
          data: dataForm,
          success: function (msg) {
            if (msg.success == true) {
              $("#grid-data").bootgrid("reload");
              //移除被删除项的tooltip
              $(".tooltip.fade").remove();
            } else {
              alert(msg.desc);
            }
          }
        });
      }
    }]
  });


  // if (confirm("确定要删除选中的成绩吗？")) {
  //     var dataForm = "ids=" + id;
  //     $.ajax({
  //         type: "get",
  //         cache: false,
  //         headers: { "cache-control": "no-cache" },
  //         dataType: "json",
  //         url: "/examadmin/admin/results/del/",
  //         data: dataForm,
  //         success: function (msg) {
  //             if (msg.success == true) {
  //                 //window.location.href = "/examadmin/admin/result/mgr_new?exam_info_id="+exam_info_id;
  //                 // window.location.reload();
  //                 $("#grid-data").bootgrid("reload");
  //                 //移除被删除项的tooltip
  //                 $(".tooltip.fade").remove();
  //             } else {
  //                 alert("操作失败，请联系管理员！");
  //             }
  //         }
  //     });
  // } else {
  //     return;
  // }
}

//补考方法
function addExit(examResultId) {
  BootstrapDialog.show({
    title: "确定设置为补考？",
    cssClass: 'add_show',
    message: "补考会为选中的学员增加一次答题次数，是否继续?" +
    "(每条成绩只可操作一次，补考后可通过最新成绩再次设置补考)",
    buttons: [{
      label: "取消",
      action: function (dialogItself) {
        dialogItself.close();
      }
    },{
      label: "确认",
      action: function (dialogItself) {
        dialogItself.close();
        var dataForm = "examResultId=" + examResultId;
        $.ajax({
          type: "get",
          cache: false,
          headers: { "cache-control": "no-cache" },
          dataType: "json",
          url: "/examadmin/admin/make_up/exam/",
          data: dataForm,
          success: function (msg) {
            if (msg.success == true) {
              alert("操作成功");
              $("#grid-data").bootgrid("reload");
            } else {
              alert("操作失败，请联系管理员！");
            }
          }
        });
      }
    }]
  });
}


//编辑考试认证状态
//驳回
$(".modal-verify-status .btn-check-verify-fail").click(function(){
  if($(this).hasClass('active')) return;
  var dataJson = "examResultsId=" + $("#verifyInfoModal .examResultsId").val() + "&examInfoId=" + $("#verifyInfoModal .examInfoId").val();
  dataJson += "&manualVerifyStatus=3";
  $.ajax({
    type: "post",
    cache: false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/examadmin/admin/manual_verify",
    data: dataJson,
    success: function (msg) {
      if(msg.success){
        $(".modal-verify-status .btn-check-verify-succ").hide();
        $(".modal-verify-status .btn-check-verify-fail").addClass("active");
        $("#verifyInfoModal").modal('hide');
        $("#grid-data").bootgrid("reload");
      }else {
        alert('出错了，请稍后再试!')
      }
    }
  })
})
//通过
$(".modal-verify-status .btn-check-verify-succ").click(function(){
  if($(this).hasClass('active')) return;
  var dataJson = "examResultsId=" + $("#verifyInfoModal .examResultsId").val() + "&examInfoId=" + $("#verifyInfoModal .examInfoId").val();
  dataJson += "&manualVerifyStatus=2";
  $.ajax({
    type: "post",
    cache: false,
    headers: { "cache-control": "no-cache" },
    dataType: "json",
    url: "/examadmin/admin/manual_verify",
    data: dataJson,
    success: function (msg) {
      if(msg.success){
        $(".modal-verify-status .btn-check-verify-fail").hide();
        $(".modal-verify-status .btn-check-verify-succ").addClass("active");
        $("#verifyInfoModal").modal('hide');
        $("#grid-data").bootgrid("reload");
      }else {
        alert('出错了，请稍后再试!')
      }
    }
  })
})
