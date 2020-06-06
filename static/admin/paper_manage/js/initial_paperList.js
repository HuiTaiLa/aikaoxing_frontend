
  var customArr = [];//保存自定义设置
  var customPageCount = 10;//保存每页显示项数
  var firstLoad = true;//是否第一次加载，第一次加载的话不保存cookie
  //判断是是否有cookie
  var cookieName = "admin_paper_mgr_new";

  //判断搜索条件
  if(getCookie(cookieName)){
  customArr = getSearchCookie(cookieName,"customStr").split("+");
  //判断自定义设置
  if(customArr.length > 0 && customArr[0] != ""){
  $("#grid-data th").each(function(index, element){
  var num = $.inArray($(this).attr("data-column-id"), customArr);
  if(num > -1){
  $(this).attr("data-visible", "true");
}else {
  if($(this).attr("data-column-id") == 'perTimeRestrict'){
  $(this).attr("data-visible", "true");
}
  $(this).attr("data-visible", "false");
}
});
}
  //判断是否保存了每页显示项目数
  if(getSearchCookie(cookieName,"customPageCount")){
  customPageCount = getSearchCookie(cookieName,"customPageCount");
}
}
  $("#grid-data").bootgrid({
  ajax: true,
  ajaxSettings: {
  method:"POST",
  cache: false
},
  post: function ()
{
  var sortOrder = $("#grid-data").bootgrid("getSortDictionary");
  var sortKey,sortName;
  var paperName = $("input[name=paper_name]").val();
  var paperStyleName = $("input[name=paper_style_name]").val();
  var paperStyle = $("input[name=paper_style]").val();
  var paperStartTime = $("input[name=dateForm]").val();
  var paperEndTime = $("input[name=dateTo]").val();
  $.each(sortOrder, function (name, value) {
  sortKey = name;
  sortName = value;
});
  return {
  "sort": sortKey,
  "sortName": sortName,
  "paperName": paperName,
  "paperStyleName": paperStyleName,
  "paperStyle": paperStyle,
  "paperStartTime": paperStartTime,
  "paperEndTime": paperEndTime,
  "account":user.account,
  "companyId":user.companyId
};
},
  url: "/api/paper/mgr_grid/",
  selection: true,
  multiSelect: true,
  rowSelect: true,
  padding:1,
  navigation: 2,
  formatters: {
  "link": function(column, row)
{
  return "<a href='#' data-growing-title='previewPaper' class='icons8-eye previewPaper' paperId='"+row.id+"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='预览'></a>"+
  "<a href='#' data-growing-title='updatePaper' class='icons8-edit updatePaper' paperId='"+row.id+"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='编辑'></a>"+
  "<a href='#' data-growing-title='removePaper' class='icons8-trash-can removePaper' paperIsUsing='"+row.paperIsUsing+"' examUsing='"+row.examingIsUsing+"' paperId='"+row.id+"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='删除'></a>"+
  //"<a href='#' data-growing-title='copyPaper' class='icon-a_operate_copy copyPaper' data-trigger='hover'  paperId='"+row.id+"' data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='复制试卷'></a>"+
  "<a href='#' paperId='"+row.id+"' data-growing-title='copyPaper'  target='_blank' class='icon-a_operate_create_test create_exam' data-trigger='hover'  data-toggle=\"tooltip\" data-placement=\"top\" data-container=\"body\" title='创建考试'></a>";
}
}
}).on("loaded.rs.jquery.bootgrid", function (e){
  if(!firstLoad) {
  //自定义设置
  customArr = [];
  $(".custom-settings input:checked").each(function (index, element) {
  customArr.push($(this).attr("name"));
});
  //保存每页显示项目数目
  var cookieObj = {};
  cookieObj["customStr"] = customArr.join("+");
  cookieObj["customPageCount"] = $(".page-count-span").text().substring(2,4);
  setSearchCookie(cookieName, cookieObj);
}
  firstLoad = false;
  // initial tooltip
  $('#grid-data [data-toggle="tooltip"]').tooltip();
  $("#grid-data").colResizable({
  fixed:false,
  liveDrag:true,
  draggingClass:"dragging"
});
}).on("selected.rs.jquery.bootgrid", function (e) {
  $(".toolbar-left-operation .inactive#batchDel").removeClass("inactive").addClass("deactive").removeAttr("disabled");
}).on("deselected.rs.jquery.bootgrid", function (e) {
  var selectList = $("#grid-data").bootgrid("getSelectedRows");

  if (selectList.length == 0) {
  $(".toolbar-left-operation .btn#batchDel, .toolbar-left-operation .dropdown-menu").removeClass("deactive").addClass("inactive").attr("disabled","disabled");
}
}).on("load.rs.jquery.bootgrid", function () {
  $(".toolbar-left-operation .btn#batchDel, .toolbar-left-operation .dropdown-menu").removeClass("deactive").addClass("inactive").attr("disabled","disabled");
});//按钮的可用与禁用（inactive deactive)

  //答题时长方式选择
//   $("#createPaperModal .limit_t_btn").click(function(){
//   var value=$(this).attr("data-value");
//   $("input[name='perTimeRestrict']").val(value);
//   $("#createPaperModal .limit_t_btn").addClass('not-selected');
//   $(this).removeClass("not-selected");
// });
