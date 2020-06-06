if (window.location.pathname != "/depts/exam" && window.location.pathname != "/depts/exam/" && window.location.pathname != "/depts/exam/#/" && window.location.pathname != "/depts/exam#/") {
  document.removeEventListener('plusready', appReturn);
  document.addEventListener('plusready', appReturn);
}
function appReturn() {
  var webview = plus.webview.currentWebview();
  if (webview) {
    plus.key.addEventListener('backbutton', function () {
      webview.canBack(function (e) {
        if (e.canBack) {
          webview.back();
        } else {
          webview.close();
        }
      })
    });
  }
}
