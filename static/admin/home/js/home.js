$(function () {
  user = JSON.parse(window.localStorage.getItem("USER"))
// ajaxstart with loading shown
  $(document).ajaxStart(function () {
    $("#spinnerLoading").removeClass("hidden");
  });
// ajaxstop with loading hidden
  $(document).ajaxStop(function () {
    $("#spinnerLoading").addClass("hidden");
  });
  $.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    headers: {
      Authentication: JSON.parse(window.localStorage.getItem("USER_TOKEN"))
    },
    statusCode: {
      404: function () {
        window.location.href = "/admin/error/404";
      },
      504: function () {
        window.location.href = "/admin/error/default";
      },
      500: function () {
        window.location.href = "/admin/error/default";
      },
      429: function () {
        alert("您操作过于频繁！");
      },
      401: function () {
        window.location.href = "/admin/error/401";
      },
      400: function () {
        window.location.href = "/admin/error/400";
      },
      403: function () {
        window.location.href = "/admin/error/403";
      },
    }
  });
  $("#logoutBtn").click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    $.ajax({
      type: "POST",
      cache: false,
      dataType: "json",
      url: "/api/admin/logout",
      data: {
        account: user.account,
        companyId: user.companyId
      },
      success: function (msg) {
        var jump_url = msg.bizContent.url;
        window.location.href = jump_url;
      }
    });

  })
})
