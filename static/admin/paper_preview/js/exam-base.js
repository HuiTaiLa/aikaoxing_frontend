var currentPoint = 1;
$(function () {
    // showBtnByEnv();
    // initial tooltip
    $('[data-toggle="tooltip"]').tooltip();
    // initial popover
    $('[data-toggle="popover"]').popover();

    //页面加载完毕
    $(function () {
        $("#spinnerLoading").addClass("hidden");
    });
  user = JSON.parse(window.localStorage.getItem("USER"));
  $.ajaxSetup({
    contentType:"application/x-www-form-urlencoded;charset=utf-8",
    headers:{
      Authentication:JSON.parse(window.localStorage.getItem("USER_TOKEN"))
    },
    statusCode: {
      404: function() {
        window.location.href="/admin/error/404";
      },
      504: function() {
        window.location.href="/admin/error/default";
      },
      500: function() {
        window.location.href="/admin/error/default";
      },
      429:function () {
        alert("您操作过于频繁！");
      },
      401:function () {
        window.location.href="/admin/error/401";
      },
      400:function () {
        window.location.href="/admin/error/400";
      },
      403:function () {
        window.location.href="/admin/error/403";
      },
    }
  });

    // ajaxstart with loading shown
    $( document ).ajaxStart(function() {
        $("#spinnerLoading").removeClass("hidden");
    });
    // ajaxstop with loading hidden
    $( document ).ajaxStop(function() {
        $("#spinnerLoading").addClass("hidden");
    });

    //
    // //读取用户自定义LOGO
    // if($("#companyLogo").length>0){
    //     var _this = $("#companyLogo");
    //
    //     $.ajax({
    //         type: "GET",
    //         cache : false,
    //         dataType: "json",
    //         url: "/setting/admin/modify_get_logo",
    //         success: function(msg){
    //             if(msg.success){
    //                 var logo_url = msg.bizContent.logoUrl;
    //                 var img = '<img class="icon-logo logo-ksx" src="'+logo_url+'" />';
    //                 $(_this).append(img);
    //             }
    //         }
    //     });
    // }



    //展开状态下不显示提示卡
    if($(".sidebar-fold").hasClass("icon-unfold")){
        $('.sidebar-nav [data-toggle="tooltip"]').tooltip('destroy');
    }

    // fold sidebar
    $("#sidebar-fold").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        if($(this).hasClass("icon-unfold")){
            // fold sidebar
            $('.show-num').css({
                'left':'28px'
            });
            $(this).removeClass("icon-unfold").addClass("icon-fold").attr("title","展开导航").attr("data-original-title","展开导航");
            $(this).find(".icons8").removeClass("icons8-icon").addClass("icons8-icon-3");
            $(".viewFrameWork").removeClass("sidebar-full").addClass("sidebar-min");
            document.cookie = "ksxFoldState=fold; path =; domain=;";
            $('.sidebar-inner [data-toggle="tooltip"]').tooltip();
        }else if ($(this).hasClass("icon-fold")) {
            // unfold sidebar
            $('.show-num').css({
                'left':'76px'
            });
            $(this).removeClass("icon-fold").addClass("icon-unfold").attr("title","收起导航").attr("data-original-title","收起导航");
            $(this).find(".icons8").removeClass("icons8-icon-3").addClass("icons8-icon");
            $(".viewFrameWork").removeClass("sidebar-min").addClass("sidebar-full");
            document.cookie = "ksxFoldState=unfold; path =; domain=;";
            /*$('.sidebar-inner [data-toggle="tooltip"]').tooltip();*/
            $('.sidebar-nav [data-toggle="tooltip"]').tooltip('destroy');
        }
    });

    //一级导航对应模块显示激活状态
    // $(function () {
    //     //当前地址
    //     var current_url = window.location.href;
    //     //导航应当激活项(默认为首页)
    //     var current_item = 'exam';
    //     //查询状态
    //     var query_status = false;
    //     //所有带导航页面url结构列表
    //     var url_list = {
    //         "exam":["/exam/history","/exam/wrong_topic"],
    //         "course": ["course/show","course/mine","course/study/"],
    //         "certificate": ["certificate/certificate_mine"],
    //         "netdisk":["/exam/file_mgr"],
    //     };
    //
    //     for(var o in url_list){
    //         var item_list = url_list[o];
    //
    //         for(var i=0; i< item_list.length; i++){
    //             if(current_url.indexOf(item_list[i])!=-1){
    //                 query_status = true;
    //                 break;
    //             }
    //         }
    //
    //         if(query_status){
    //             current_item = o;
    //             break;
    //         }
    //     }
    //
    //     $(".sidebar-trans .nav-item.nav-item-"+current_item).addClass("nav-item-active");
    // });

    //导航栏搜索配置
    // $(function () {
    //     //当前地址
    //     var current_url = window.location.href;
    //     var _form = $("#searchForm");
    //     //默认为当前考试列表页搜索，不列入配置当中
    //     //url:当前路径，name:搜索name，status:要不要显示
    //     var search_list = [
    //         {url: 'exam/history', name: 'name', method: 'get', action: '/exam/history_search',
    //             status: true},
    //         {url: 'exam/wrong_topic', status: false},
    //         {url: 'course/show', status: false},
    //         {url: 'exam/file_mgr', name: 'name', method: '', action: '', status: true},
    //         {url: 'certificate/certificate_mine', status: false}
    //     ];
    //
    //     for(var i=0; i<search_list.length; i++){
    //         if(current_url.indexOf(search_list[i].url)!=-1){
    //             if(search_list[i].status){
    //                 $(".status-item.item-search").removeClass("hidden");
    //                 $(_form).attr("method", search_list[i].method).attr("action", search_list[i].action);
    //                 $(_form).find(".item-key-input").attr("name", search_list[i].name);
    //             }else{
    //                 $(".status-item.item-search").addClass("hidden");
    //             }
    //         }
    //     }
    //
    // });
    //知识库页面搜索禁用
    if(window.location.pathname != "/exam/file_mgr") {
        //搜索
        $("#searchBtn").click(function(e){
            $("#searchForm").submit();
        });

        $("#searchForm .item-key-input").keydown(function(e){
            if(e.keyCode==13){
                $("#searchForm").submit();
            }
        });
    }

    //导航栏个人中心
    $("#userInfoBtn").click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        $("#userInfoModal").modal();
    });

    //导航栏修改密码
    $("#setPasswordBtn").click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        $("#setPasswordModal").modal();
    });

    //第三方需求，隐藏logo和退出
    $(function () {
        //获取cookie
        var thirdParty = getCookie('thirdParty');

        if(thirdParty=='true'){
            $("#logoutBtn").addClass("hidden");
        }
    });



    $(".exam-point-score-top").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        pointScoreFn();
    });

    $("#examPointScoreModal .bottom-more").click(function (e) {
        currentPoint = currentPoint+1;
        pointScoreFn('currentChange');
    });

    $('.close-point').click(function () {
        currentPoint = 1;
        $("#examPointScoreModal").modal('hide');
    });
});
var tableInfo = [];
function pointScoreFn(msgTip) {
    var dataForm;
    var lastUserData = tableInfo[tableInfo.length-1];

    if (msgTip == 'currentChange'){
        dataForm = {
            userId: userId,
            current: currentPoint,
            rowCount: 10, //一页显示条数
            lastId: lastUserData.userId,
            lastRank: lastUserData.rank,
            lastScore: lastUserData.score
        };
    } else {
        dataForm = {
            userId: userId,
            current: currentPoint,
            rowCount: 10 //一页显示条数
        };
    }

    //积分排名
    $.ajax({
        url:'/point/rank/'+userId,
        type:'POST',
        dataType: "json",
        data: dataForm,
        success:function(msg){
            if(msg.success){
                var rows = msg.bizContent.rows;
                var staffRank = msg.bizContent.staffRank;
                var parentBox = $('#examPointScoreModal .table-content');
                var html = '';

                if (msgTip == 'currentChange'){
                    for (var i = 0; i <rows.length ; i++) {
                        tableInfo.push(rows[i]);
                    }
                }else {
                    tableInfo = rows;
                }

                for (var j = 0; j < tableInfo.length; j++) {
                    var ele = tableInfo[j];
                    html += '<div class="point-one">' +
                        '<span class= '+(ele.rank == 1? 'one': (ele.rank == 2? 'two': (ele.rank == 3? 'three':'')))+'><i>'+ele.rank+'</i></span>' +
                        '<span>'+ele.surname+'</span>' +
                        '<span>'+ele.score+'</span>' +
                        '</div>';
                    parentBox.html(html);
                }
                if (rows.length < 10){
                    $('#examPointScoreModal .bottom-more').hide();
                }
                if(rows.length == 0){
                    $('#noData').show();
                }

                $('#staffRank').text(staffRank);
                $('#examPointScoreModal .point-one span.one').text('');
                $('#examPointScoreModal .point-one span.two').text('');
                $('#examPointScoreModal .point-one span.three').text('');
                $('#examPointScoreModal').modal({
                    backdrop: "static",
                    keyboard: false
                });
            }
        }
    });
}


//中英文切换
function switchLang(lang) {
    //en:english
    //zh-CN:Chinese
    $.ajax( {
        type:"post",
        url:"/login/account/set_cookie",
        dataType:"json",
        data: "cookieName=language&cookieValue=" + lang + "&expiresTime=86400",
        success:function(msg){
            window.location.href = window.location.href+"?"+Math.random();
        }
    });

}

// set cookie
function setCookie(cookieName, cookieValue, expiresTime){
    $("#spinnerLoading").addClass("hide");

    $.ajax( {
        type:"post",
        url:"/login/account/set_cookie",
        dataType:"json",
        data: "cookieName=" + cookieName + "&cookieValue=" + cookieValue + "&expiresTime=" + expiresTime,
        success:function(msg){
            $("#spinnerLoading").removeClass("hide");
            return msg;
        },
        error:function (msg) {
            $("#spinnerLoading").removeClass("hide");
        }
    });

}

// 新加-set cookie
function setCookieByMaxAge(cookieName, cookieValue, maxAge, path){
    document.cookie=cookieName + "="+cookieValue +";max-age="+maxAge+";path="+path;
}


// get cookie
function getCookie(c_name){
    if(document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=")
        if(c_start!=-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1){
                c_end=document.cookie.length
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

// 获取url中参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return '';
}

//处理aliyun oss url问题，进行uri编码
function aliyunEncodeURI(url) {
    if (url.indexOf("https://kaoshixing.oss-cn-beijing.aliyuncs.com/") > -1){
        url = url.replace("https://kaoshixing.oss-cn-beijing.aliyuncs.com/", '');
        url = "https://kaoshixing.oss-cn-beijing.aliyuncs.com/" + encodeURIComponent(url);
    } else if (url.indexOf("https://s6.kaoshixing.com/") > -1) {
        url = url.replace("https://s6.kaoshixing.com/", '');
        url = "https://s6.kaoshixing.com/" + encodeURIComponent(url);
    } else if (url.indexOf("https://cdnoss.kaoshixing.com/") > -1) {
        url = url.replace("https://cdnoss.kaoshixing.com/", '');
        url = "https://cdnoss.kaoshixing.com/" + encodeURIComponent(url);
    }
    return url;
}

// 退出登录(清空cookie,session&&sessionId)
$("#logoutBtn").click(function (e) {
    e.preventDefault();

    $("#logoutModal").modal();
});

//确认退出登录
$("#confirmLogoutBtn").click(function () {
    $.ajax({
        type: "POST",
        cache : false,
        dataType: "json",
        url: "/api/admin/logout",
        data:{
          account:user.account,
          companyId:user.companyId
        },
        success: function(msg){
          var jump_url = msg.bizContent.url;
          window.location.href = jump_url;
        }
    });
});

function checkIOS() {//判断苹果手机系统，进行兼容
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return false;
    }
    if (isIOS) {
        return true;
    }
}

//通过css、js在不同项目环境下控制一些按钮的显隐。 线上项目：显示'管理员入口'按钮    钉钉项目：不显示'管理员入口'按钮、隐藏'退出'

function showBtnByEnv(){
    $.ajax({
        type: "POST",
        cache : false,
        dataType: "json",
        url: "/login/public/get_dingtalk_env",
        success: function(msg) {
            if(msg.data != 0){
                $("#enterAdminSystem").css('display','list-item');
            }else{
                $("#logoutBtn").parents(".dropdown-menu").find(".split").remove();
                $("#logoutBtn").remove();
            }
        },
    })
}
