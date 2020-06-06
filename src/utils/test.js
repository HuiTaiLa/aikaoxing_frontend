webpackJsonp([1], {
  "+3Nt": function (t, e) {
  }, 0: function (t, e, i) {
    i("j1ja"), t.exports = i("14vi")
  }, "14vi": function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var a = {};
    i.d(a, "broswerHintShow", function () {
      return Vt
    }), i.d(a, "loading", function () {
      return Mt
    }), i.d(a, "url", function () {
      return Ht
    }), i.d(a, "api", function () {
      return qt
    }), i.d(a, "token", function () {
      return Wt
    }), i.d(a, "user", function () {
      return Kt
    }), i.d(a, "company", function () {
      return Jt
    }), i.d(a, "cmodify", function () {
      return Xt
    }), i.d(a, "companyRights", function () {
      return Yt
    }), i.d(a, "baseRights", function () {
      return Qt
    }), i.d(a, "advancedSetRights", function () {
      return Zt
    }), i.d(a, "showIntroRights", function () {
      return te
    }), i.d(a, "userPointData", function () {
      return ee
    }), i.d(a, "pointScoreInfo", function () {
      return ie
    }), i.d(a, "currentNavItem", function () {
      return ae
    }), i.d(a, "dingtalkEnv", function () {
      return ne
    }), i.d(a, "adminNavs", function () {
      return se
    }), i.d(a, "examPcNavs", function () {
      return oe
    }), i.d(a, "examMNavs", function () {
      return re
    }), i.d(a, "dialogs", function () {
      return ce
    }), i.d(a, "notShowTecSup", function () {
      return le
    }), i.d(a, "notificationCount", function () {
      return de
    });
    var n = {
        render: function () {
          var t = this.$createElement, e = this._self._c || t;
          return e("div", {attrs: {id: "app"}}, [e("router-view")], 1)
        }, staticRenderFns: []
      }, s = i("VU/8")({name: "App"}, n, !1, null, null, null).exports, o = (i("AVXi"), i("pRNm")), r = i.n(o),
      c = "prod", l = "/admin/index", d = {
        apiBase: function (t) {
          return u(t)
        }, apiProject: function () {
          return function () {
            var t = void 0;
            switch (l) {
              case"/admin/index":
                t = u("admin") + "/index/admin/home";
                break;
              case"/admin/testQuestions":
                t = u("admin") + "/baseinfo/admin/excute";
                break;
              case"/admin/application":
                t = u("admin") + "/process/api_sign_up/excute";
                break;
              case"/exam/m/application":
              case"/exam/pc/application":
                t = u("exam") + "/api_sign_up/excute";
                break;
              case"/admin/customprocess":
                t = u("admin") + "/process/custom_process/excute";
                break;
              case"/exam/m/customprocess":
              case"/exam/pc/customprocess":
                t = u("exam") + "/custom_process/excute";
                break;
              case"/admin/user":
                t = u("admin") + "/baseinfo/admin_user/excute";
                break;
              case"/admin/course":
                t = u("admin") + "/courses/course/excute";
                break;
              case"/exam/pc/course":
              case"/exam/m/course":
                t = u("exam") + "/staff_course/excute";
                break;
              case"/admin/live":
                t = u("admin") + "/live/excute";
                break;
              case"/exam/pc/live":
              case"/exam/m/live":
                t = u("exam") + "/staff-live/excute"
            }
            return t
          }()
        }
      };

    function u(t) {
      return t && void 0 != t ? "prod" == c ? "https://" + t + ".kaoshixing.com" : "localhost" == c ? "http://" + t + "dev.kaoshixing.com" : "dingtalkdev" == c ? "https://dtdev.kaoshixing.com" : "dingtalkpreview" == c ? "https://dtpreview.kaoshixing.com" : "dingtalk" == c ? "https://dtwww.kaoshixing.com" : "https://" + t + c + ".kaoshixing.com" : "https://exam.kaoshixing.com"
    }

    var m = i("mvHQ"), p = i.n(m), h = i("hKoQ"), v = i.n(h), g = i("OMN4"), f = i.n(g);
    v.a.polyfill();
    var _ = f.a.create({baseURL: d.apiProject(), timeout: 6e4});
    _.interceptors.response.use(function (t) {
      return t.data
    }, function (t) {
    });
    var C = _, x = "prod", b = "/admin/index", k = window.location.port, w = {
      urlBase: function () {
        return y()
      }, urlProject: function (t) {
        return function (t) {
          return "prod" == x || "dingtalkdev" == x || "dingtalkpreview" == x || "dingtalk" == x ? void 0 == t ? y() + b + "/#" : y() + t + "/#" : void 0 == t ? y() + ":" + k + b + "/#" : y() + t + "/#"
        }(t)
      }
    };

    function y() {
      var t = void 0;
      if ("prod" == x) t = "https://v.kaoshixing.com"; else if ("localhost" == x) t = "http://vdev.kaoshixing.com"; else {
        if ("dingtalkdev" == x) return "http://dtvdev.kaoshixing.com";
        if ("dingtalkpreview" == x) return "https://dtv.kaoshixing.com";
        if ("dingtalk" == x) return "https://dtv.kaoshixing.com";
        t = "https://v" + x + ".kaoshixing.com"
      }
      return t
    }

    var S, I = function (t, e) {
      var i = e.to, a = (e.from, e.next), n = i.meta.checkRights ? i.meta.checkRights : {};
      n.isFreeFn ? t.dispatch(n.isFreeFn.methodName, {
        rightName: n.isFreeFn.key, toLimit: function () {
          a("/info")
        }, toNext: function () {
          t.dispatch("getAllRights", {
            rightName: n.getAllRights, toLimit: function () {
              a("/info")
            }, toNext: function () {
              a()
            }
          })
        }, toFreeTrial: function (t) {
          a({path: "/freeTrail", query: t})
        }
      }) : t.dispatch("getAllRights", {
        rightName: n.getAllRights, toLimit: function () {
          a("/info")
        }, toNext: function () {
          a()
        }
      })
    }, T = function (t, e) {
      var i = e.to, a = (e.from, e.next), n = i.meta.checkRights ? i.meta.checkRights : {};
      t.dispatch("getExamBaseInfo", {
        companyId: e.companyId,
        ignoreLoginCheck: i.meta.ignoreLoginCheck,
        rightName: n.getExamBaseInfo,
        toLimit: function () {
          a("/info?status=noModuleRight")
        },
        toNext: function () {
          a()
        }
      })
    }, N = d.apiBase("www"), P = i("Dd8w"), L = i.n(P), E = i("SJI6"), F = {
      computed: L()({}, Object(E.mapGetters)({api: "api", url: "url"})), methods: {
        goBack: function () {
          this.$router.go(-1)
        }, goOriginal: function () {
          window.location.href = this.url.urlBase() + "/admin/index/#/index"
        }
      }
    }, R = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-container", {staticClass: "viewFrameWork public responsive"}, [i("el-main", {staticClass: "viewFrameWork-main"}, [i("div", {staticClass: "info-area"}, [i("div", {staticClass: "status-img"}, [i("img", {
          attrs: {
            src: "https://cdnoss.kaoshixing.com/ksxing_static/vue/images/public/404.png",
            alt: ""
          }
        })]), t._v(" "), i("div", {staticClass: "desc"}, [t._v("\n        你访问的页面不存在 \n      ")]), t._v(" "), i("div", {staticClass: "jump hidden-xs"}, [i("el-button", {
          attrs: {type: "text"},
          on: {click: t.goOriginal}
        }, [t._v("回到首页")])], 1), t._v(" "), i("div", {staticClass: "jump visible-xs"}, [i("el-button", {
          attrs: {
            type: "primary",
            round: ""
          }, on: {click: t.goOriginal}
        }, [t._v("回到首页")])], 1)])])], 1)
      }, staticRenderFns: []
    }, D = i("VU/8")(F, R, !1, null, null, null).exports, B = {
      computed: L()({}, Object(E.mapGetters)({api: "api", url: "url"})), methods: {
        goBack: function () {
          this.$router.go(-1)
        }, goOriginal: function () {
          window.location.href = this.url.urlBase() + "/admin/index/#/index"
        }
      }
    }, G = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-container", {staticClass: "viewFrameWork public"}, [i("el-main", {staticClass: "viewFrameWork-main"}, [i("div", {staticClass: "info-area"}, [i("div", {staticClass: "status-img"}, [i("img", {
          attrs: {
            src: "https://cdnoss.kaoshixing.com/ksxing_static/vue/images/public/500.png",
            alt: ""
          }
        })]), t._v(" "), i("div", {staticClass: "desc"}, [t._v("\n        系统发生故障，请联系管理员\n      ")]), t._v(" "), i("div", {staticClass: "jump hidden-xs"}, [i("el-button", {
          attrs: {type: "text"},
          on: {click: t.goBack}
        }, [t._v("重试")]), t._v(" "), i("el-button", {
          attrs: {type: "text"},
          on: {click: t.goOriginal}
        }, [t._v("回到首页")])], 1), t._v(" "), i("div", {staticClass: "jump visible-xs"}, [i("el-button", {
          attrs: {
            type: "primary",
            plain: "",
            round: ""
          }
        }, [t._v("重试")]), t._v(" "), i("el-button", {
          attrs: {type: "primary", round: ""},
          on: {click: t.goOriginal}
        }, [t._v("回到首页")])], 1)])])], 1)
      }, staticRenderFns: []
    }, O = i("VU/8")(B, G, !1, null, null, null).exports, j = {
      data: function () {
        return {
          messageCollection: {
            course0: {desc: "您没有权限参加此课程"},
            course1: {desc: "课程被禁用"},
            course2: {desc: "课程未开始"},
            course3: {desc: "课程已结束"},
            course4: {desc: "该课程不属于您所在的公司，您没有权限"},
            live0: {desc: "直播流量已超限，请联系管理员", isExaminee: !0},
            live1: {desc: "无直播权限，请联系管理员", isExaminee: !0},
            live2: {desc: "直播被禁用", isExaminee: !0},
            live3: {desc: "直播未开始", isExaminee: !0},
            live4: {desc: "直播已结束", isExaminee: !0},
            noModuleRight: {desc: "您所在的公司未开通此功能，请联系管理员", isExaminee: !0}
          }
        }
      }, computed: L()({}, Object(E.mapGetters)({api: "api", url: "url"}), {
        message: function () {
          var t = "您没有权限，请联系管理员";
          if (this.$route.query.message) t = this.$route.query.message; else if (this.$route.query.status) {
            var e = this.$route.query.status;
            t = this.messageCollection[e] ? this.messageCollection[e].desc : "您没有权限，请联系管理员"
          }
          return t
        }
      }), methods: {
        goBack: function () {
          this.$router.go(-1)
        }, goOriginal: function () {
          var t = this.$route.query.status;
          this.messageCollection[t] && this.messageCollection[t].isExaminee ? window.location.href = this.api.apiBase("exam") + "/exam" : window.location.href = this.url.urlBase() + "/admin/index/#/index"
        }
      }
    }, U = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-container", {staticClass: "viewFrameWork public"}, [i("el-header", {
          staticClass: "viewFrameWork-header hidden-xs",
          attrs: {height: "70px"}
        }, [i("div", {staticClass: "header"}, [i("div", {staticClass: "header-left"}, [i("img", {
          staticClass: "item item-logo",
          attrs: {
            src: "https://cdnoss.kaoshixing.com/ksxing_static/vue/images/base/logo-transparent-header.svg",
            alt: ""
          }
        })]), t._v(" "), i("div", {staticClass: "header-right"}, [i("div", {staticClass: "item service"}, [i("i", {staticClass: "icon icon-a_help_service"}), t._v("\n          400-800-1477\n        ")])])])]), t._v(" "), i("el-main", {staticClass: "viewFrameWork-main"}, [i("div", {staticClass: "info-area"}, [i("div", {staticClass: "status-img"}, [i("img", {
          attrs: {
            src: "https://cdnoss.kaoshixing.com/ksxing_static/vue/images/public/info.png",
            alt: ""
          }
        })]), t._v(" "), i("div", {staticClass: "desc"}, [t._v(t._s(t.message))]), t._v(" "), i("div", {staticClass: "jump hidden-xs"}, [i("el-button", {
          attrs: {type: "text"},
          on: {click: t.goBack}
        }, [t._v("重试")]), t._v(" "), i("el-button", {
          attrs: {type: "text"},
          on: {click: t.goOriginal}
        }, [t._v("回到首页")])], 1), t._v(" "), i("div", {staticClass: "jump visible-xs"}, [i("el-button", {
          attrs: {
            type: "primary",
            plain: "",
            round: ""
          }
        }, [t._v("重试")]), t._v(" "), i("el-button", {
          attrs: {type: "primary", round: ""},
          on: {click: t.goOriginal}
        }, [t._v("回到首页")])], 1)])])], 1)
      }, staticRenderFns: []
    }, A = i("VU/8")(j, U, !1, null, null, null).exports, z = i("bOdI"), $ = i.n(z), V = i("1f+G");
    Vue.use(V.a);
    var M = {
      name: "adminApp",
      data: function () {
        return {
          isCollapse: !1,
          currentMenu: "",
          defaultPic: "https://cdnoss.kaoshixing.com/ksxing_static/vue/images/user/default-pic.png",
          techSupport: {show: !1, step: 1, interval: "", downTime: 0, content: {key: "", link: "", expireTime: 0}}
        }
      },
      computed: L()({}, Object(E.mapGetters)((S = {
        user: "user",
        url: "url",
        api: "api",
        loading: "loading",
        company: "company"
      }, $()(S, "user", "user"), $()(S, "navs", "adminNavs"), $()(S, "currentNavItem", "currentNavItem"), $()(S, "notShowTecSup", "notShowTecSup"), $()(S, "notificationCount", "notificationCount"), $()(S, "dingtalkEnv", "dingtalkEnv"), $()(S, "broswerHintShow", "broswerHintShow"), S)), {
        formatTechSupportTime: function () {
          var t = this.techSupport.downTime, e = Math.floor(t / 86400), i = t - 86400 * e, a = Math.floor(i / 3600),
            n = i - 3600 * a, s = Math.floor(n / 60), o = n - 60 * s;
          return (0 == e ? "" : e + "天:") + (a < 10 ? "0" + a : a) + ":" + (s < 10 ? "0" + s : s) + ":" + (o < 10 ? "0" + o : o)
        }, userPicture: function () {
          return this.user.picture ? this.user.picture : "https://s1.kaoshixing.com/static/account/images/default-pic.png"
        }, showLogout: function () {
          return !this.dingtalkEnv
        }, showEnterExamineeSystem: function () {
          return !this.dingtalkEnv
        }
      }),
      methods: L()({}, Object(E.mapActions)({
        logout: "logout",
        getNavConfig: "getNavConfig",
        checkAdvancedSet: "checkAdvancedSet",
        inquireTechnologySupportLink: "inquireTechnologySupportLink",
        getTechnologySupportLink: "getTechnologySupportLink",
        operateTechnologySupportLink: "operateTechnologySupportLink"
      }), {
        getUrlPrefix: function (t) {
          var e = "";
          switch (t) {
            case"getAdminUrlPrefix":
              e = this.api.apiBase("admin");
              break;
            case"getHfUrlPrefix":
              e = this.api.apiBase("huinot");
              break;
            case"getStaticUrlPrefix":
              e = this.url.urlBase();
              break;
            default:
              e = ""
          }
          return e
        }, goNotification: function () {
          window.location.href = this.api.apiBase("admin") + "/index/account/notification/"
        }, navCollapse: function (t) {
          this.isCollapse = !this.isCollapse
        }, handleOpen: function (t, e) {
          this.currentMenu = t
        }, handleClose: function (t, e) {
          this.$refs.menu.open(this.currentMenu)
        }, handleLiMouseEnter: function (t) {
          t.preventDefault(), t.stopPropagation();
          var e = t.target, i = document.body.clientHeight, a = e.getBoundingClientRect().top + 6, n = i - a,
            s = e.getElementsByClassName("nav-sub-item-wrap");
          s.length > 0 && (n < (s = s[0]).offsetHeight ? (s.style.top = "initial", s.style.bottom = 0) : (s.style.top = a + "px", s.style.bottom = "initial"))
        }, handleLiMouseLeave: function (t) {
          t.preventDefault(), t.stopPropagation();
          var e = t.target.getElementsByClassName("nav-sub-item-wrap");
          e.length > 0 && ((e = e[0]).style.top = "initial", e.style.bottom = 0)
        }, toExam: function () {
          window.location.href = this.api.apiBase("exam") + "/exam"
        }, toChangeInfo: function () {
          window.location.href = this.api.apiBase("admin") + "/setting/admin/admin_information"
        }, onLogout: function () {
          var t = this;
          this.$confirm("您是否要退出登录？", "", {
            customClass: "operation-warning",
            confirmButtonClass: "confirm",
            cancelButtonClass: "cancel",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: !0
          }).then(function () {
            t.logout({domain: "admin"})
          }).catch(function () {
          })
        }, showZhichi: function () {
          qimoChatClick(), ksxProbe.gioTrack("onlineInquire", 1, {
            inquireFromPage_var: window.location.href,
            inquireFromPageName_var: "vue项目内",
            inquireFromPosition_var: "管理端帮助在线咨询"
          })
        }, showTechSupportFn: function (t) {
          t.preventDefault(), this.inquireTSLink()
        }, inquireTSLink: function () {
          var t = this;
          this.inquireTechnologySupportLink({
            callbackFn: function (e) {
              var i = e.data, a = t;
              i.success ? (t.techSupport.step = 2, t.techSupport.content = i.bizContent, t.techSupport.downTime = parseInt(t.techSupport.content.expireTime)) : t.techSupport.step = 1, clearInterval(a.techSupport.interval), a.techSupport.interval = setInterval(function () {
                a.techSupport.downTime--, a.techSupport.downTime <= 0 && (clearInterval(a.techSupport.interval), t.techSupport.step = 1)
              }, 1e3), t.techSupport.show = !0
            }
          })
        }, getTSLink: function () {
          var t = this;
          this.getTechnologySupportLink({
            callbackFn: function (e) {
              var i = e.data, a = t;
              i.success ? (t.techSupport.step = 2, t.techSupport.content = i.bizContent, t.techSupport.downTime = parseInt(t.techSupport.content.expireTime)) : t.techSupport.step = 1, clearInterval(a.techSupport.interval), a.techSupport.interval = setInterval(function () {
                a.techSupport.downTime--, a.techSupport.downTime <= 0 && (clearInterval(a.techSupport.interval), t.techSupport.step = 1)
              }, 1e3), t.techSupport.show = !0
            }
          })
        }, operateTSLink: function (t) {
          var e = this;
          this.operateTechnologySupportLink({
            callbackFn: function (t) {
              var i = t.data;
              i.success && (e.techSupport.content.expireTime = i.bizContent.expireTime, e.techSupport.downTime = parseInt(e.techSupport.content.expireTime))
            }, key: e.techSupport.content.key, operate: t
          })
        }, handleCopySuccess: function (t) {
          this.$message("复制成功")
        }, handleCopyError: function (t) {
          this.$message("复制失败")
        }, filterNavItem: function (t) {
          return "allowUserAdd" != t.key && !t.dingTalkNotShow || !this.dingtalkEnv
        }
      }),
      beforeCreate: function () {
        this.$store.commit("START_LOADING"), this.$store.dispatch("checkAdvancedSet"), this.$store.dispatch("getNotificationCount")
      },
      mounted: function () {
        this.$store.commit("END_LOADING")
      }
    }, H = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-container", {
          directives: [{
            name: "loading",
            rawName: "v-loading",
            value: t.loading,
            expression: "loading"
          }],
          staticClass: "viewFrameWork admin",
          attrs: {"element-loading-text": "拼命加载中", "element-loading-background": "rgba(0, 0, 0, 0.8)"}
        }, [i("el-collapse-transition", [i("div", {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: t.broswerHintShow,
            expression: "broswerHintShow"
          }], staticClass: "browserHint"
        }, [t._v("系统检测您使用的非谷歌浏览器，建议您使用谷歌浏览器获得更稳定的服务体验! "), i("a", {
          staticClass: "downloadGoogle",
          attrs: {href: "https://www.google.cn/chrome/", target: "_blank"}
        }, [t._v("点击下载")])])]), t._v(" "), i("el-header", {
          staticClass: "viewFrameWork-header",
          attrs: {height: "70px"}
        }, [i("div", {staticClass: "header"}, [i("div", {staticClass: "header-left"}, [i("a", {attrs: {href: t.url.urlBase() + "/admin/index/#/index"}}, [i("img", {
          staticClass: "item item-logo",
          attrs: {src: t.company.logoUrl, alt: ""}
        })])]), t._v(" "), i("div", {staticClass: "header-middle"}, [i("router-view", {attrs: {name: "subNav"}})], 1), t._v(" "), i("div", {staticClass: "header-right"}, [i("div", {
          staticClass: "status-item item-user",
          attrs: {id: "stateUser"}
        }, [i("div", {staticClass: "user-picture"}, [i("img", {attrs: {src: t.userPicture}})]), t._v(" "), i("i", {staticClass: "icon item-icon icon-a_arrow_down"}), t._v(" "), i("div", {staticClass: "item-wrap"}, [i("div", {staticClass: "item-header"}, [i("div", {staticClass: "picture"}, [i("img", {attrs: {src: t.userPicture}})]), t._v(" "), i("div", {staticClass: "name ellipsis"}, [t._v(t._s(t.user.surname))]), t._v(" "), i("div", {staticClass: "company ellipsis"}, [t._v(t._s(t.company.companyName))])]), t._v(" "), i("div", {staticClass: "item-list"}, [i("div", {staticClass: "li"}, [i("a", {attrs: {href: t.api.apiBase("admin") + "/setting/admin/admin_information"}}, [i("div", {staticClass: "icon left icon-a_personal_edit"}), t._v(" "), i("div", {staticClass: "title"}, [t._v("修改个人信息")]), t._v(" "), i("div", {staticClass: "icon right icon-a_arrow_right"})])]), t._v(" "), t.showLogout ? i("div", {
          staticClass: "li",
          on: {click: t.onLogout}
        }, [i("div", {staticClass: "icon left icon-a_personal_exit"}), t._v(" "), i("div", {staticClass: "title"}, [t._v("退出")]), t._v(" "), i("div", {staticClass: "icon right"})]) : t._e()])])]), t._v(" "), i("div", {
          staticClass: "status-item item-notification",
          attrs: {id: "stateMessage"},
          on: {click: t.goNotification}
        }, [i("i", {staticClass: "icon item-icon icon-p_top_message"}), t._v(" "), i("span", {staticClass: "message-count"}, [t._v(t._s(t.notificationCount > 9 ? "9+" : t.notificationCount))])])])])]), t._v(" "), i("el-container", [i("el-aside", {class: ["viewFrameWork-sidebar", t.isCollapse ? "sidebar-mini" : "sidebar-full"]}, [i("div", {staticClass: "sidebar sidebar-inner"}, [i("el-tooltip", {
          attrs: {
            effect: "dark",
            content: t.isCollapse ? "展开导航" : "收起导航",
            placement: "right"
          }
        }, [i("li", {
          staticClass: "el-menu-item sidebar-fold",
          on: {click: t.navCollapse}
        }, [i("i", {class: [t.isCollapse ? "el-icon-d-arrow-right" : "el-icon-d-arrow-left"]})])]), t._v(" "), i("div", {
          staticClass: "sidebar-nav",
          attrs: {id: "ksxAdminSidebar"}
        }, [0 == t.navs.length ? [i("ul", {staticClass: "sidebar-trans placeholder"}, [i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])])]), t._v(" "), i("ul", {staticClass: "sidebar-trans placeholder"}, [i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])]), t._v(" "), i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])]), t._v(" "), i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])]), t._v(" "), i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])])]), t._v(" "), i("ul", {staticClass: "sidebar-trans placeholder"}, [i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])]), t._v(" "), i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])]), t._v(" "), i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])]), t._v(" "), i("li", {staticClass: "nav-item"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon"})]), t._v(" "), i("div", {staticClass: "nav-title"})])])])] : t._e(), t._v(" "), t._l(t.navs, function (e, a) {
          return [i("ul", {key: a, staticClass: "sidebar-trans"}, [t._l(e, function (e, a) {
            return [e.children ? [e.show ? i("li", {
              key: a, staticClass: "nav-item", on: {
                mouseenter: function (e) {
                  return e.target !== e.currentTarget ? null : (e.stopPropagation(), t.handleLiMouseEnter(e))
                }, mouseleave: function (e) {
                  return e.target !== e.currentTarget ? null : (e.stopPropagation(), t.handleLiMouseLeave(e))
                }
              }
            }, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {class: ["icon", e.icon]})]), t._v(" "), i("div", {staticClass: "nav-title"}, [t._v("\n                        " + t._s(e.name) + "\n                        "), e.children ? i("i", {staticClass: "icon icon-a_arrow_right"}) : t._e()])]), t._v(" "), e.children ? i("div", {staticClass: "nav-sub-item-wrap clearfix"}, [e.children[0].children ? [t._l(e.children, function (e, a) {
              return [e.show ? i("div", {
                key: a,
                class: ["nav-sub-item", e.name.length > 6 ? "more-length" : ""]
              }, [i("div", {
                staticClass: "title",
                domProps: {innerHTML: t._s(e.name)}
              }), t._v(" "), i("div", {staticClass: "split"}), t._v(" "), i("ul", {staticClass: "item-list"}, [t._l(e.children, function (e, a) {
                return [e.show ? i("li", {key: a}, [i("a", {attrs: {href: t.getUrlPrefix(e.prefix) + e.url}}, [t._v("\n                                    " + t._s(e.name) + "\n                                    "), e.beta ? i("img", {
                  staticClass: "mark-icon",
                  attrs: {src: "https://s6.kaoshixing.com/ksxing_static/vue/images/icon/a_nav_beta.svg"}
                }) : t._e()])]) : t._e()]
              })], 2)]) : t._e()]
            }), t._v(" "), e.expirationDateKey ? i("div", {staticClass: "expiration-date"}, [t._v("功能到期时间：" + t._s(e.expirationDate))]) : t._e()] : [i("ul", {staticClass: "item-list"}, [t._l(e.children, function (e, a) {
              return [e.show && t.filterNavItem(e) ? i("li", {key: a}, [i("a", {attrs: {href: t.getUrlPrefix(e.prefix) + e.url}}, [t._v(t._s(e.name))])]) : t._e()]
            })], 2)]], 2) : t._e()]) : t._e()] : [e.show ? i("li", {
              key: a,
              staticClass: "nav-item nav-no-sub"
            }, [i("a", {
              staticClass: "nav-item-wrap",
              attrs: {href: t.getUrlPrefix(e.prefix) + e.url}
            }, [i("div", {staticClass: "nav-icon"}, [i("i", {class: ["icon", e.icon]})]), t._v(" "), i("div", {staticClass: "nav-title"}, [t._v("\n                        " + t._s(e.name) + "\n                        "), e.children ? i("i", {staticClass: "icon icon-a_arrow_right"}) : t._e()])])]) : t._e()]]
          })], 2)]
        })], 2)], 1), t._v(" "), i("div", {staticClass: "sidebar sidebar-bottom"}, [i("ul", {staticClass: "sidebar-trans"}, [i("li", {staticClass: "nav-item nav-item-help"}, [i("div", {staticClass: "nav-item-wrap"}, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon icon-a_nav_help1"})]), t._v(" "), i("div", {staticClass: "nav-title"}, [t._v("帮助")])]), t._v(" "), i("div", {staticClass: "nav-sub-item-wrap"}, [i("ul", {staticClass: "item-list"}, [i("li", [i("i", {staticClass: "icon icon-a_help_document"}), t._v(" "), i("div", {staticClass: "content"}, [i("div", {staticClass: "title"}, [t._v("帮助文档")]), t._v(" "), i("div", {staticClass: "sub-title"}, [i("a", {
          staticClass: "specLink",
          attrs: {href: "https://www.kancloud.cn/exam-star/ksxhelp_1/1552313", target: "_blank"}
        }, [t._v("去查看")])])])]), t._v(" "), t.notShowTecSup ? t._e() : i("li", [i("i", {staticClass: "icon icon-a_nav_help"}), t._v(" "), i("div", {staticClass: "content"}, [i("div", {staticClass: "title"}, [t._v("\n                      技术支持\n                      "), i("el-tooltip", {attrs: {placement: "right"}}, [i("div", {
          attrs: {slot: "content"},
          slot: "content"
        }, [t._v("获取技术支持链接能够直接以您"), i("br"), t._v("的账号登录系统，不会泄露账"), i("br"), t._v("号密码，便于考试星技术支持人"), i("br"), t._v("员更快定位问题")]), t._v(" "), i("i", {staticClass: "icon icon-a_nav_help2"})])], 1), t._v(" "), i("div", {staticClass: "sub-title"}, [i("a", {
          staticClass: "showTechHelpModal",
          attrs: {href: "javascript:void(0)"},
          on: {
            click: function (e) {
              t.showTechSupportFn(e)
            }
          }
        }, [t._v("获取技术支持链接")])])])]), t._v(" "), i("li", [i("i", {staticClass: "icon icon-a_help_service"}), t._v(" "), i("div", {staticClass: "content"}, [i("div", {staticClass: "title"}, [t._v("人工客服")]), t._v(" "), i("div", {staticClass: "sub-title"}, [t._v("\n                      可\n                      "), i("a", {
          staticClass: "zhiCustomBtn gio-inquire-position",
          attrs: {href: "javascript:void(0)", "data-gio-position": "管理端帮助在线咨询"},
          on: {click: t.showZhichi}
        }, [t._v("在线咨询")]), t._v("\n                      或拨打电话\n                      "), i("span", {staticClass: "tel-phone"}, [t._v("400-870-1477")])])])])])])]), t._v(" "), t.showEnterExamineeSystem ? i("li", {staticClass: "nav-item nav-no-sub"}, [i("a", {
          staticClass: "nav-item-wrap",
          attrs: {href: this.api.apiBase("exam") + "/exam"}
        }, [i("div", {staticClass: "nav-icon"}, [i("i", {staticClass: "icon icon-a_nav_enter"})]), t._v(" "), i("div", {staticClass: "nav-title"}, [t._v("进入学员系统")])])]) : t._e()])])]), t._v(" "), i("el-container", {staticClass: "viewFrameWork-body"}, [i("el-main", {staticClass: "body-wrapper"}, [i("div", {staticClass: "body-content"}, [i("router-view", {attrs: {name: "main"}})], 1)])], 1)], 1), t._v(" "), i("el-dialog", {
          staticClass: "tech-help-modal",
          attrs: {title: "技术支持链接", visible: t.techSupport.show, width: "440px", center: "", "show-close": !1},
          on: {
            "update:visible": function (e) {
              t.$set(t.techSupport, "show", e)
            }
          }
        }, [1 == t.techSupport.step || parseInt(t.techSupport.content.expireTime) <= 0 ? i("div", {staticClass: "firstStep"}, [i("div", {
          staticClass: "getTechUsingLink",
          on: {
            click: function (e) {
              t.getTSLink()
            }
          }
        }, [t._v("点击此处获取链接")])]) : t._e(), t._v(" "), 2 == t.techSupport.step && parseInt(t.techSupport.content.expireTime) > 0 ? i("div", {staticClass: "secondStep"}, [i("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: t.techSupport.content.link,
            expression: "techSupport.content.link"
          }],
          staticClass: "link_input",
          attrs: {type: "text", id: "techSupportLinkInput", readonly: ""},
          domProps: {value: t.techSupport.content.link},
          on: {
            input: function (e) {
              e.target.composing || t.$set(t.techSupport.content, "link", e.target.value)
            }
          }
        }), t._v(" "), i("el-button", {
          directives: [{
            name: "clipboard",
            rawName: "v-clipboard",
            value: t.techSupport.content.link,
            expression: "techSupport.content.link"
          }],
          staticClass: "copyLinkBtn",
          attrs: {type: "primary"},
          on: {success: t.handleCopySuccess, error: t.handleCopyError}
        }, [t._v("复制")]), t._v(" "), i("div", {staticClass: "tip"}, [t._v("请将此链接复制给考试星相关技术支持人员，"), i("span", {staticClass: "alert"}, [t._v("请勿随意传播！")])]), t._v(" "), i("span", {staticClass: "downTime"}, [t._v(t._s(t.formatTechSupportTime) + " 后到期")])], 1) : t._e(), t._v(" "), 2 == t.techSupport.step && parseInt(t.techSupport.content.expireTime) > 0 ? i("span", {
          staticClass: "dialog-footer",
          attrs: {slot: "footer"},
          slot: "footer"
        }, [i("el-button", {
          staticClass: "btn btn-primary increase-hour",
          attrs: {type: "button", id: "increaseHourBtn"},
          on: {
            click: function (e) {
              t.operateTSLink(1)
            }
          }
        }, [t._v("延长1小时")]), t._v(" "), i("el-button", {
          staticClass: "btn btn-primary decrease-hour",
          attrs: {type: "button", id: "decreaseHourBtn"},
          on: {
            click: function (e) {
              t.operateTSLink(-1)
            }
          }
        }, [t._v("减少1小时")]), t._v(" "), i("el-button", {
          staticClass: "btn btn-primary delete-link",
          attrs: {type: "button", id: "deleteTechLinkBtn"},
          on: {
            click: function (e) {
              t.operateTSLink(0)
            }
          }
        }, [t._v("作废链接")])], 1) : t._e()])], 1)
      }, staticRenderFns: []
    };
    var q = i("VU/8")(M, H, !1, function (t) {
      i("LgEi")
    }, null, null).exports, W = i("lHA8"), K = i.n(W), J = i("c/Tr"), X = i.n(J), Y = {
      data: function () {
        return {
          css: {
            videoJs: "https://s6.kaoshixing.com/ksxing_static/vue/css/video-js.css",
            kalendae: "https://s6.kaoshixing.com/ksxing_static/vue/css/kalendae.css"
          },
          js: {
            docReaderV2: "https://static.bcedocument.com/reader/v2/doc_reader_v2.js?v=201806271557",
            videoJs: "https://s6.kaoshixing.com/ksxing_static/vue/js/video.min.js",
            kalendae: "https://s6.kaoshixing.com/ksxing_static/vue/js/kalendae.standalone.min.js",
            echart: "https://s6.kaoshixing.com/ksxing_static/vue/js/echart.js",
            pdfJs: "https://s6.kaoshixing.com/ksxing_static/vue/js/pdf.js?v=3bf63018e7",
            pdfWorkerJs: "https://s6.kaoshixing.com/ksxing_static/vue/js/pdf.worker.js?v=3bf63018e3"
          }
        }
      }, props: ["module", "page", "cssLink", "jsSrc"], computed: {
        useStatic: function () {
          var t = [], e = [];
          return "courseAdd" == this.page && (t.push(this.css.videoJs), e.push(this.js.videoJs)), this.cssLink && t.push(this.css[this.cssLink]), this.jsSrc && e.push(this.js[this.jsSrc]), {
            css: t = X()(new K.a(t)),
            js: e = X()(new K.a(e))
          }
        }
      }, components: {
        "remote-css": {
          render: function (t) {
            var e = this;
            return t("link", {
              attrs: {rel: "stylesheet", href: this.href}, on: {
                load: function () {
                  e.$emit("load-css-finish")
                }
              }
            })
          }, props: {href: {type: String, required: !0}}
        }, "remote-js": {
          render: function (t) {
            var e = this;
            return t("script", {
              attrs: {type: "text/javascript", src: this.src}, on: {
                load: function () {
                  e.$emit("load-js-finish")
                }
              }
            })
          }, props: {src: {type: String, required: !0}}
        }
      }, methods: {
        loadedCallback: function () {
          this.$emit("loadedCallback")
        }, cssLoadedCallback: function () {
          this.$emit("cssLoadedCallback")
        }
      }, mounted: function () {
      }
    }, Q = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", [t._l(t.useStatic.css, function (e, a) {
          return i("remote-css", {key: "css" + a, attrs: {href: e}, on: {"load-css-finish": t.cssLoadedCallback}})
        }), t._v(" "), t._l(t.useStatic.js, function (e, a) {
          return i("remote-js", {key: "js" + a, attrs: {src: e}, on: {"load-js-finish": t.loadedCallback}})
        })], 2)
      }, staticRenderFns: []
    }, Z = i("VU/8")(Y, Q, !1, null, null, null).exports, tt = {
      data: function () {
        return {}
      },
      computed: L()({}, Object(E.mapGetters)({data: "index/huiValueData", option: "index/huiValueOption"})),
      components: {RemoteStatic: Z},
      methods: L()({}, Object(E.mapActions)({getHuiValue: "index/getHuiValue"}), {
        drawChartFn: function () {
          var t = document.getElementById("chartBox");
          echarts.init(t).setOption(this.option, !0)
        }, getHuiValueFn: function () {
          this.getHuiValue({callbackFn: this.drawChartFn})
        }
      }),
      mounted: function () {
      }
    }, et = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "btn-show-tip-modal"}, [i("remote-static", {
          attrs: {jsSrc: "echart"},
          on: {loadedCallback: t.getHuiValueFn}
        }), t._v(" "), i("div", {staticClass: "hui-statistic-title"}, [t._v("组织会值")]), t._v(" "), i("div", {staticClass: "hui-statistic-value"}, [t._v(t._s(t.data.canValueThisWeek))]), t._v(" "), i("div", {staticClass: "hover-tip-modal"}, [i("div", {staticClass: "chart-box"}, [i("div", {staticClass: "chart-title"}, [i("i", {staticClass: "blue-border"}), t._v("组织会值\n        "), i("div", {staticClass: "time"}, [t._v("\n          评估时间：\n          "), i("span", [t._v(t._s(t.data.modifiedTime))])])]), t._v(" "), i("div", {staticClass: "chart-content"}, [i("div", {
          staticClass: "chart",
          attrs: {id: "chartBox"}
        }), t._v(" "), i("div", {staticClass: "count"}, [i("ul", [i("li", [i("span", [t._v(t._s(t.data.canValueThisWeek))]), t._v(" "), i("span", [t._v("组织会值")])]), t._v(" "), i("li", [i("span", [t._v(t._s(t.data.beatRatio))]), t._v(" "), i("span", [t._v("的其他组织被击败")])])])])])]), t._v(" "), t._m(0)])], 1)
      }, staticRenderFns: [function () {
        var t = this.$createElement, e = this._self._c || t;
        return e("div", {staticClass: "hui-statistic-intro"}, [e("div", {staticClass: "hui-title"}, [this._v("会值是什么？")]), this._v(" "), e("div", {staticClass: "hui-intro"}, [this._v("会否基于学员练习记录，对每个学员的练习情况进行智能计算，构建了多维度会值体系，更直观地反映练习情况和效果。")])])
      }]
    };
    var it = {
      data: function () {
        return {}
      },
      components: {
        huiValueCard: i("VU/8")(tt, et, !1, function (t) {
          i("zMMH")
        }, null, null).exports
      },
      computed: L()({}, Object(E.mapGetters)({
        broswerHintShow: "broswerHintShow",
        user: "user",
        company: "company",
        companyRights: "companyRights",
        indexInfo: "index/indexInfo"
      })),
      watch: {},
      methods: L()({}, Object(E.mapMutations)({}), Object(E.mapActions)({}), {
        checkBroswerWebKit: function () {
          var t = navigator.userAgent;
          navigator.appVersion;
          return t.indexOf("AppleWebKit") > -1
        }
      }),
      mounted: function () {
        this.checkBroswerWebKit() || this.$store.commit("BROSWER_HINTSHOW")
      }
    }, at = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "body-toolbar clearfix"}, [i("div", {staticClass: "toolbar-left fl"}, [i("span", {staticClass: "system-name"}, [t._v("\n      " + t._s(t.indexInfo.systemName) + "\n      "), i("span", [t._v("(组织ID: " + t._s(t.company.id) + ")")])]), t._v(" "), i("span", {staticClass: "version-name"}, [t._v(t._s(t.indexInfo.companyConfig.versionName) + " (" + t._s(t.company.expirationTime) + ")")])]), t._v(" "), i("div", {staticClass: "toolbar-right fr"}, [t.indexInfo.companyConfig.canExercise ? i("hui-value-card") : t._e()], 1)])
      }, staticRenderFns: []
    };
    var nt = i("VU/8")(it, at, !1, function (t) {
      i("Amau")
    }, "data-v-9fd633a0", null).exports, st = i("PUIo"), ot = i.n(st), rt = i("eMjc"), ct = i.n(rt), lt = {
      data: function () {
        return {qrCode: "", linkDownloadData: "", nowItem: "login"}
      },
      computed: L()({}, Object(E.mapGetters)({
        url: "url",
        company: "company",
        indexInfo: "index/indexInfo"
      }), {
        companyConfig: function () {
          return this.indexInfo.companyConfig
        }, erweimaData: function () {
          return {
            wechat: {
              url: this.indexInfo.exerciseUrl ? this.indexInfo.exerciseUrl : "",
              intro: "微信扫码接收<br/>每日学练推送",
              img: "wechat.png"
            },
            dingTalk: {
              url: this.indexInfo.exerciseUrl ? this.indexInfo.exerciseUrl : "",
              intro: "钉钉扫码接收<br/>每日学练推送",
              img: "dingTalk.ico"
            },
            wechatOA: {
              url: this.indexInfo.exerciseUrl ? this.indexInfo.exerciseUrl : "",
              intro: "企业微信扫码接<br/>收每日学练推送",
              img: "wechatOA.png"
            },
            login: {url: this.indexInfo.loginUrl ? this.indexInfo.loginUrl : "", intro: "微信扫描二维码<br/>登录学员系统", img: ""}
          }[this.nowItem]
        }
      }),
      components: {VueQr: ot.a},
      methods: {
        handleCopySuccess: function (t) {
          this.$message({message: "复制成功", type: "success"})
        }, handleCopyError: function (t) {
          this.$message("复制失败")
        }, switchLogin: function () {
          this.nowItem = "login"
        }, switchExercise: function () {
          if (this.indexInfo.developerInfoSet) switch (this.indexInfo.developerInfoSet.platformType) {
            case 0:
              this.nowItem = "wechat";
              break;
            case 1:
              this.nowItem = "dingTalk";
              break;
            case 2:
              this.nowItem = "wechatOA";
              break;
            case 3:
            default:
              this.nowItem = "wechat"
          }
        }, doScreeenShots: function () {
          var t = this;
          setTimeout(function () {
            var e = document.getElementsByClassName("linkImgDownLoad")[0], i = e.offsetWidth, a = e.offsetHeight,
              n = document.createElement("canvas");
            e.width = 1 * i, e.height = 1 * a;
            var s = n.getContext("2d");
            s && s.scale(1, 1);
            var o = {scale: 1, canvas: n, logging: !0, width: i, height: a, useCORS: !0};
            ct()(e, o).then(function (e) {
              var i = n.getContext("2d");
              i && (i.scale(1, 1), i.mozImageSmoothingEnabled = !1, i.webkitImageSmoothingEnabled = !1, i.imageSmoothingEnabled = !1), t.linkDownloadData = e.toDataURL(), setTimeout(function () {
                document.getElementById("downloadImg").click()
              }, 300)
            })
          }, 100)
        }
      },
      mounted: function () {
      }
    }, dt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "user-login-card"}, [i("ul", {class: ["tab clearfix", t.companyConfig.canExercise ? "tab-2" : "tab-1"]}, [i("li", {
          class: "login" == t.nowItem ? "active" : "",
          on: {click: t.switchLogin}
        }, [t._v("学员登录二维码")]), t._v(" "), t.companyConfig.canExercise ? i("li", {
          class: "login" == t.nowItem ? "" : "active",
          on: {click: t.switchExercise}
        }, [t._v("练习接收二维码")]) : t._e()]), t._v(" "), i("div", [i("div", {staticClass: "erweima-box linkImgDownLoad"}, [i("img", {
          staticClass: "logo",
          attrs: {src: t.company.logoUrl, alt: ""}
        }), t._v(" "), "login" == t.nowItem ? i("vue-qr", {
          attrs: {
            text: this.erweimaData.url,
            margin: 5,
            size: 100
          }
        }) : i("vue-qr", {
          attrs: {
            logoSrc: "https://s6.kaoshixing.com/ksxing_static/vue/admin/index/" + t.erweimaData.img,
            logoMargin: 1,
            logoCornerRadius: 0,
            logoBackgroundColor: "#FFF",
            text: this.erweimaData.url,
            margin: 5,
            size: 100
          }
        }), t._v(" "), i("p", {
          staticClass: "intro",
          domProps: {innerHTML: t._s(t.erweimaData.intro)}
        })], 1), t._v(" "), i("div", {staticClass: "btn-box"}, [i("el-button", {
          directives: [{
            name: "clipboard",
            rawName: "v-clipboard",
            value: t.erweimaData.url,
            expression: "erweimaData.url"
          }],
          attrs: {type: "primary", plain: "", size: "small", icon: "icon-a_operate_copy"},
          on: {success: t.handleCopySuccess, error: t.handleCopyError}
        }, [t._v("登录链接")]), t._v(" "), i("br"), t._v(" "), i("a", {
          attrs: {
            id: "downloadImg",
            href: t.linkDownloadData,
            download: "二维码.png"
          }
        }), t._v(" "), i("el-button", {
          attrs: {
            type: "primary",
            plain: "",
            size: "small",
            icon: "icon-a_operate_download"
          }, on: {click: t.doScreeenShots}
        }, [t._v("下载图片")])], 1)])])
      }, staticRenderFns: []
    };
    var ut = i("VU/8")(lt, dt, !1, function (t) {
      i("ieZk")
    }, null, null).exports, mt = {
      data: function () {
        return {}
      },
      props: ["itemData"],
      computed: L()({}, Object(E.mapGetters)({api: "api", company: "company"})),
      methods: {
        shareExamFn: function () {
          this.$emit("shareLinkFn", this.itemData, "考试")
        }
      },
      mounted: function () {
      }
    }, pt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "exam-card"}, [i("img", {
          staticClass: "img-border",
          attrs: {src: "https://s5.kaoshixing.com/ksxing_static/vue/admin/index/icon-border-blue.png", alt: ""}
        }), t._v(" "), i("div", {staticClass: "name"}, [t._v(t._s(t.itemData.examName))]), t._v(" "), i("el-dropdown", {attrs: {placement: "bottom"}}, [i("span", {staticClass: "el-dropdown-link"}, [t._v("\n      操作\n      "), i("i", {staticClass: "el-icon-arrow-down el-icon--right"})]), t._v(" "), i("el-dropdown-menu", {
          attrs: {slot: "dropdown"},
          slot: "dropdown"
        }, [i("el-dropdown-item", [i("a", {
          staticClass: "specLink",
          attrs: {href: t.api.apiBase("admin") + "/examadmin/admin/exam/update/" + t.itemData.id}
        }, [i("i", {staticClass: "icon icon-a_operate_edit"}), t._v("编辑考试\n        ")])]), t._v(" "), i("el-dropdown-item", {
          nativeOn: {
            click: function (e) {
              return t.shareExamFn(e)
            }
          }
        }, [i("i", {staticClass: "icon icon-a_operate_link"}), t._v("分享链接\n      ")]), t._v(" "), i("el-dropdown-item", [i("a", {attrs: {href: t.api.apiBase("admin") + "/examadmin/admin/result/mgr_new?examInfoId=" + t.itemData.id}}, [i("i", {staticClass: "icon icon-a_operate_mark"}), t._v("成绩查询批改\n        ")])])], 1)], 1), t._v(" "), i("ul", {staticClass: "detail clearfix"}, [i("li", {staticClass: "time"}, [t._v(t._s(t.itemData.examStartTime) + " 至 " + t._s(t.itemData.examEndTime))]), t._v(" "), i("li", [i("label", [t._v("分数：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.paperTotalScore))]), t._v(" "), i("br"), t._v(" "), i("label", [t._v("时长：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.examTime))])]), t._v(" "), i("li", [i("label", [t._v("方式：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.paperType))]), t._v(" "), i("br"), t._v(" "), i("label", [t._v("类型：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.skip))])]), t._v(" "), i("li", {staticClass: "examinee-count"}, [i("label", [t._v("正在考试：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.userExamingCount))])])])], 1)
      }, staticRenderFns: []
    };
    var ht = i("VU/8")(mt, pt, !1, function (t) {
      i("6aJm")
    }, null, null).exports, vt = {
      data: function () {
        return {}
      },
      props: ["itemData"],
      computed: L()({}, Object(E.mapGetters)({api: "api", url: "url", company: "company"})),
      methods: {
        shareCourseFn: function () {
          this.$emit("shareLinkFn", this.itemData, "课程")
        }
      },
      mounted: function () {
      }
    }, gt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "course-card"}, [i("img", {
          staticClass: "img-border",
          attrs: {src: "https://s5.kaoshixing.com/ksxing_static/vue/admin/index/icon-border-green.png", alt: ""}
        }), t._v(" "), i("div", {staticClass: "name"}, [t._v(t._s(t.itemData.courseName))]), t._v(" "), i("el-dropdown", {attrs: {placement: "bottom"}}, [i("span", {staticClass: "el-dropdown-link"}, [t._v("\n      操作\n      "), i("i", {staticClass: "el-icon-arrow-down el-icon--right"})]), t._v(" "), i("el-dropdown-menu", {
          attrs: {slot: "dropdown"},
          slot: "dropdown"
        }, [i("el-dropdown-item", [i("a", {attrs: {href: t.url.urlProject("/admin/course") + "/edit/" + t.itemData.id}}, [i("i", {staticClass: "icon icon-a_operate_edit"}), t._v("编辑课程\n        ")])]), t._v(" "), i("el-dropdown-item", {
          nativeOn: {
            click: function (e) {
              return t.shareCourseFn(e)
            }
          }
        }, [i("i", {staticClass: "icon icon-a_operate_link"}), t._v("分享链接\n      ")]), t._v(" "), i("el-dropdown-item", [i("a", {attrs: {href: t.api.apiBase("admin") + "/courses/course/study_record_mgr/course/?courseId=" + t.itemData.id}}, [i("i", {staticClass: "icon icon-a_operate_mark"}), t._v("学习记录\n        ")])])], 1)], 1), t._v(" "), i("ul", {staticClass: "detail clearfix"}, [i("li", {staticClass: "time"}, [t._v(t._s(t.itemData.courseStartTime) + " 至 " + t._s(t.itemData.courseEndTime))]), t._v(" "), i("li", [i("label", [t._v("分类：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.courseStyleName))])])])], 1)
      }, staticRenderFns: []
    };
    var ft = i("VU/8")(vt, gt, !1, function (t) {
      i("DnGG")
    }, null, null).exports, _t = {
      data: function () {
        return {}
      },
      props: ["itemData"],
      computed: L()({}, Object(E.mapGetters)({api: "api", url: "url", company: "company"})),
      methods: {},
      mounted: function () {
      }
    }, Ct = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "process-card"}, [i("img", {
          staticClass: "img-border",
          attrs: {src: "https://s5.kaoshixing.com/ksxing_static/vue/admin/index/icon-border-purple.png", alt: ""}
        }), t._v(" "), i("div", {staticClass: "name"}, [t._v(t._s(t.itemData.processName))]), t._v(" "), i("el-dropdown", {attrs: {placement: "bottom"}}, [i("span", {staticClass: "el-dropdown-link"}, [t._v("\n      操作\n      "), i("i", {staticClass: "el-icon-arrow-down el-icon--right"})]), t._v(" "), i("el-dropdown-menu", {
          attrs: {slot: "dropdown"},
          slot: "dropdown"
        }, [i("el-dropdown-item", [i("a", {attrs: {href: t.url.urlProject("/admin/customprocess") + "/create/" + t.itemData.id}}, [i("i", {staticClass: "icon icon-a_operate_edit"}), t._v("编辑任务\n        ")])]), t._v(" "), i("el-dropdown-item", [i("a", {attrs: {href: t.url.urlProject("/admin/customprocess") + "/progress/" + t.itemData.id}}, [i("i", {staticClass: "icon icon-a_operate_progressReport"}), t._v("查看进度\n        ")])])], 1)], 1), t._v(" "), i("ul", {staticClass: "detail clearfix"}, [i("li", {staticClass: "time"}, [t._v(t._s(t.itemData.processStartTime) + " 至 " + t._s(t.itemData.processEndTime))])])], 1)
      }, staticRenderFns: []
    };
    var xt = i("VU/8")(_t, Ct, !1, function (t) {
      i("7C2x")
    }, null, null).exports, bt = {
      data: function () {
        return {dateValue: [], pushNum: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]}
      },
      props: ["id", "itemData"],
      computed: L()({}, Object(E.mapGetters)({api: "api", url: "url", company: "company"})),
      methods: {
        initKalendae: function () {
          for (var t = {}, e = X()(this.itemData.pushDateList), i = 0; i < e.length; i++) t[e[i]] = "k-selected";
          new Kalendae("kal" + this.id, {
            months: 1,
            mode: "multiple",
            dateClassMap: t,
            subscribe: {
              "date-clicked": function (t) {
                return !1
              }
            }
          })
        }
      },
      mounted: function () {
        this.initKalendae()
      }
    }, kt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "exercise-card"}, [i("img", {
          staticClass: "img-border",
          attrs: {src: "https://s5.kaoshixing.com/ksxing_static/vue/admin/index/icon-border-yellow.png", alt: ""}
        }), t._v(" "), i("div", {staticClass: "name"}, [t._v(t._s(t.itemData.exerciseName))]), t._v(" "), i("el-dropdown", {attrs: {placement: "bottom"}}, [i("span", {staticClass: "el-dropdown-link"}, [t._v("\n      操作\n      "), i("i", {staticClass: "el-icon-arrow-down el-icon--right"})]), t._v(" "), i("el-dropdown-menu", {
          attrs: {slot: "dropdown"},
          slot: "dropdown"
        }, [i("el-dropdown-item", [i("a", {attrs: {href: t.api.apiBase("admin") + "/exercise/edit_exercise_plan/" + t.itemData.exerciseInfoId}}, [i("i", {staticClass: "icon icon-a_operate_edit"}), t._v("编辑练习\n        ")])]), t._v(" "), i("el-dropdown-item", [i("a", {attrs: {href: t.api.apiBase("admin") + "/exercise/admin/results/analysis/exercise?exerciseInfoId=" + t.itemData.exerciseInfoId}}, [i("i", {staticClass: "icon icon-a_operate_mark"}), t._v("统计分析\n        ")])])], 1)], 1), t._v(" "), i("ul", {staticClass: "detail"}, [i("li", [i("label", [t._v("练习时间：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.exerciseStartTime) + " — " + t._s(t.itemData.exerciseEndTime))])]), t._v(" "), i("li", [i("label", [t._v("推送时间：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.pushTime))])]), t._v(" "), i("li", [i("label", [t._v("推送题数：")]), t._v(" "), i("span", [t._v("每日" + t._s(t.pushNum[t.itemData.pushTestNum - 1]) + "题")])]), t._v(" "), i("li", {staticClass: "examinee-count"}, [i("label", [t._v("已参人数：")]), t._v(" "), i("span", [t._v(t._s(t.itemData.userExercisedNum))])])]), t._v(" "), i("div", {staticClass: "block"}, [i("div", {
          staticClass: "kal",
          attrs: {id: "kal" + t.id}
        }), t._v(" "), i("div", {staticClass: "push-days"}, [i("label", [t._v("推送天数：")]), t._v(" "), i("span", {staticClass: "now-day"}, [t._v(t._s(t.itemData.hasPushDateNum))]), t._v(" "), i("span", {staticClass: "all-day"}, [t._v("/" + t._s(t.itemData.pushDateNum))])])])], 1)
      }, staticRenderFns: []
    };
    var wt = i("VU/8")(bt, kt, !1, function (t) {
      i("2d1R")
    }, null, null).exports, yt = i("MJLE"), St = i.n(yt), It = {
      data: function () {
        return {qrCode: "", linkDownloadData: "javascript:;", email: !1, message: !1}
      },
      props: ["item", "value", "type", "goPage"],
      computed: L()({}, Object(E.mapGetters)({
        api: "api",
        url: "url",
        company: "company"
      }), {
        showState: {
          get: function () {
            return this.value
          }, set: function (t) {
            this.showState = t
          }
        }, btnText: function () {
          var t = "";
          switch (this.type) {
            case"考试":
              t = "考一下";
              break;
            case"课程":
              t = "学一下";
              break;
            default:
              t = ""
          }
          return t
        }
      }),
      watch: {
        item: {
          handler: function () {
            var t = this;
            "" != this.qrCode ? (this.qrCode.clear(), this.qrCode.makeCode(this.item.link)) : setTimeout(function () {
              t.qrCode = new St.a("qrcode", {width: 150, height: 150, text: t.item.link})
            }, 500), setTimeout(function () {
              t.doScreeenShots()
            }, 600), this.message = !1, this.email = !1
          }, deep: !0
        }
      },
      methods: L()({}, Object(E.mapActions)({
        examNotice: "examNotice",
        courseNotice: "courseNotice"
      }), {
        handleCopySuccess: function (t) {
          this.$message("复制成功")
        }, handleCopyError: function (t) {
          this.$message("复制失败")
        }, goToFn: function () {
          window.location.href = this.item.link
        }, saveNotice: function () {
          var t = [];
          this.email && t.push("email"), this.message && t.push("message"), 0 != t.length && (t = t.join(","), "考试" == this.type ? this.examNotice({
            id: this.item.id,
            sendWay: t,
            $message: this.$message
          }) : "课程" == this.type && this.courseNotice({
            id: this.item.id,
            sendWay: t,
            $message: this.$message
          })), this.closeDialog(), this.goPage && this.$router.push(this.goPage)
        }, doScreeenShots: function () {
          var t = this;
          setTimeout(function () {
            var e = document.getElementsByClassName("shareImg")[0], i = e.offsetWidth, a = e.offsetHeight,
              n = document.createElement("canvas");
            e.width = 1 * i, e.height = 1 * a;
            var s = n.getContext("2d");
            s && s.scale(1, 1);
            var o = {scale: 1, canvas: n, logging: !0, width: i, height: a, useCORS: !0};
            ct()(e, o).then(function (e) {
              var i = n.getContext("2d");
              i && (i.scale(1, 1), i.mozImageSmoothingEnabled = !1, i.webkitImageSmoothingEnabled = !1, i.imageSmoothingEnabled = !1), t.linkDownloadData = e.toDataURL()
            })
          }, 100)
        }, closeDialog: function () {
          this.$emit("input", !1)
        }
      })
    }, Tt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-dialog", {
          staticClass: "share-link-dialog",
          attrs: {
            visible: t.showState,
            width: "692px",
            center: !0,
            "append-to-body": "",
            "before-close": t.closeDialog
          },
          on: {
            "update:visible": function (e) {
              t.showState = e
            }
          }
        }, [i("div", {staticClass: "left-box shareImg"}, [i("div", {staticClass: "content"}, [i("img", {
          attrs: {
            src: t.company.logoUrl,
            alt: "企业logo"
          }
        }), t._v(" "), i("div", {staticClass: "title"}, [i("p", {staticClass: "guide"}, [i("span", {staticClass: "left-border"}), t._v("\n          邀请你参加" + t._s(t.type) + "\n          "), i("span", {staticClass: "right-border"})]), t._v(" "), i("p", {staticClass: "item-name"}, [t._v(t._s(t.item.name))]), t._v(" "), i("div", {staticClass: "triangle left"}), t._v(" "), i("div", {staticClass: "triangle right"})]), t._v(" "), i("div", {staticClass: "time"}, [i("p", [t._v("开始时间：" + t._s(t.item.startTime))]), t._v(" "), i("p", [t._v("结束时间：" + t._s(t.item.endTime))]), t._v(" "), t.item.examTime > 0 ? i("p", [t._v("考试时长：" + t._s(t.item.examTime) + "分钟")]) : t._e(), t._v(" "), i("div", {staticClass: "half_circle left"}), t._v(" "), i("div", {staticClass: "half_circle right"})]), t._v(" "), i("div", {staticClass: "erweima"}, [i("div", {
          staticClass: "qr-code",
          attrs: {id: "qrcode"}
        }), t._v(" "), i("span", {staticClass: "tip"}, [t._v("识别二维码参加" + t._s(t.type))])])])]), t._v(" "), i("div", {staticClass: "right-box"}, [i("div", {staticClass: "title"}, [t._v(t._s(t.type) + "链接")]), t._v(" "), i("div", {staticClass: "item-link"}, [t._v("\n      " + t._s(t.type) + "地址\n      "), i("div", {staticClass: "copy-url"}, [i("span", [t._v(t._s(t.item.link))]), t._v(" "), i("el-button", {
          directives: [{
            name: "clipboard",
            rawName: "v-clipboard",
            value: t.item.link,
            expression: "item.link"
          }],
          staticClass: "btn-copy-url",
          attrs: {size: "mini", icon: "icon-a_operate_copy"},
          on: {success: t.handleCopySuccess, error: t.handleCopyError}
        }, [t._v("复制链接")])], 1)]), t._v(" "), "考试" == this.type ? i("div", {staticClass: "item-notice"}, [-1 == this.item.link.indexOf("exam_phone_skip_login") ? i("div", [t._v("\n        发送" + t._s(t.type) + "通知\n        "), i("el-popover", {
          attrs: {
            placement: "right",
            width: "342",
            trigger: "hover"
          }
        }, [i("div", {staticClass: "notification-tip"}, [i("h4", [t._v('什么是"发送' + t._s(t.type) + '通知"?')]), t._v(" "), i("p", [t._v("\n              将会发送" + t._s(t.type) + "的日期、时间、" + t._s(t.type) + "名称和" + t._s(t.type) + "链接给学员。支持对已验证邮箱的学员发送邮件,和对已预留手机号的学员发送短信,如无学员联系方式,将无法送达。发送短信时,第三方供应商将会收取一定的费用。\n              "), i("a", {attrs: {href: t.api.apiBase("admin") + "/setting/account/admin_pay_center"}}, [t._v("去充值->")])]), t._v(" "), i("div", [i("img", {attrs: {src: "https://s5.kaoshixing.com/static/admin/images/SMS_notification.png"}}), t._v(" "), t.item.msgContent ? i("div", {staticClass: "notification"}, [i("p", {staticClass: "notification-content"}, [t._v(t._s(t.item.msgContent))])]) : t._e()])]), t._v(" "), i("i", {
          staticClass: "icon icon-a_nav_help2",
          attrs: {slot: "reference"},
          slot: "reference"
        })]), t._v(" "), i("div", [i("el-checkbox", {
          model: {
            value: t.email, callback: function (e) {
              t.email = e
            }, expression: "email"
          }
        }, [t._v("邮件")]), t._v(" "), i("el-checkbox", {
          model: {
            value: t.message, callback: function (e) {
              t.message = e
            }, expression: "message"
          }
        }, [t._v("短信")])], 1)], 1) : t._e()]) : i("div", {staticClass: "item-notice"}, [t._v("\n      发送" + t._s(t.type) + "通知\n      "), i("el-popover", {
          attrs: {
            placement: "right",
            width: "342",
            trigger: "hover"
          }
        }, [i("div", {staticClass: "notification-tip"}, [i("h4", [t._v('什么是"发送' + t._s(t.type) + '通知"?')]), t._v(" "), i("p", [t._v("\n            将会发送" + t._s(t.type) + "的日期、时间、" + t._s(t.type) + "名称和" + t._s(t.type) + "链接给学员。支持对已验证邮箱的学员发送邮件,和对已预留手机号的学员发送短信,如无学员联系方式,将无法送达。发送短信时,第三方供应商将会收取一定的费用。\n            "), i("a", {attrs: {href: t.api.apiBase("admin") + "/setting/account/admin_pay_center"}}, [t._v("去充值->")])]), t._v(" "), i("div", [i("img", {attrs: {src: "https://s5.kaoshixing.com/static/admin/images/SMS_notification.png"}}), t._v(" "), t.item.msgContent ? i("div", {staticClass: "notification"}, [i("p", {staticClass: "notification-content"}, [t._v(t._s(t.item.msgContent))])]) : t._e()])]), t._v(" "), i("i", {
          staticClass: "icon icon-a_nav_help2",
          attrs: {slot: "reference"},
          slot: "reference"
        })]), t._v(" "), i("div", [i("el-checkbox", {
          model: {
            value: t.email, callback: function (e) {
              t.email = e
            }, expression: "email"
          }
        }, [t._v("邮件")]), t._v(" "), i("el-checkbox", {
          model: {
            value: t.message, callback: function (e) {
              t.message = e
            }, expression: "message"
          }
        }, [t._v("短信")])], 1)], 1), t._v(" "), i("div", {staticClass: "btn-box"}, [i("a", {
          staticClass: "el-button el-button--primary el-button--mini is-plain",
          attrs: {type: "primary", id: "linkDownload", href: t.linkDownloadData, plain: "", download: "二维码.png"}
        }, [t._v("下载图片")]), t._v(" "), "" != t.btnText ? i("el-button", {
          attrs: {
            type: "primary",
            size: "mini",
            plain: ""
          }, on: {click: t.goToFn}
        }, [t._v(t._s(t.btnText))]) : t._e(), t._v(" "), i("el-button", {
          attrs: {type: "primary", size: "mini"},
          on: {click: t.saveNotice}
        }, [t._v("确定")])], 1)])])
      }, staticRenderFns: []
    };
    var Nt = i("VU/8")(It, Tt, !1, function (t) {
      i("Docd")
    }, null, null).exports, Pt = {
      data: function () {
        return {showState: !0}
      },
      props: ["publicNotification"],
      computed: L()({}, Object(E.mapGetters)({api: "api", url: "url", company: "company", dialogs: "index/dialogs"})),
      methods: L()({}, Object(E.mapActions)({readChangeLog: "index/readChangeLog"}), {
        hasReadLogFn: function () {
          this.dialogs.changeLog.showState = !1, this.readChangeLog()
        }
      })
    }, Lt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-dialog", {
          staticClass: "change-log",
          attrs: {
            visible: t.dialogs.changeLog.showState,
            width: "600px",
            center: !0,
            "append-to-body": "",
            "show-close": !1
          },
          on: {
            "update:visible": function (e) {
              t.$set(t.dialogs.changeLog, "showState", e)
            }
          }
        }, [i("div", {staticClass: "title"}, [t._v(t._s(t.publicNotification.title))]), t._v(" "), i("span", {staticClass: "version"}, [t._v(t._s(t.publicNotification.version))]), t._v(" "), i("div", {staticClass: "content"}, [t.publicNotification.newCapabilities ? i("div", [i("div", {staticClass: "item-title"}, [t._v("【新版本特性】")]), t._v(" "), i("div", {
          staticClass: "item-detail",
          domProps: {innerHTML: t._s(t.publicNotification.newCapabilities)}
        })]) : t._e(), t._v(" "), t.publicNotification.optimization ? i("div", {staticStyle: {"margin-top": "30px"}}, [i("div", {staticClass: "item-title"}, [t._v("【新版本优化】")]), t._v(" "), i("div", {
          staticClass: "item-detail",
          domProps: {innerHTML: t._s(t.publicNotification.optimization)}
        })]) : t._e()]), t._v(" "), i("div", {
          staticClass: "dialog-footer",
          attrs: {slot: "footer"},
          slot: "footer"
        }, [i("el-button", {
          attrs: {type: "primary"},
          on: {click: t.hasReadLogFn}
        }, [t._v("知道了")]), t._v(" "), i("a", {
          staticClass: "link-change-log specLink",
          attrs: {href: "https://www.kaoshixing.com/change/log/", target: "_blank"}
        }, [t._v("了解更多")])], 1)])
      }, staticRenderFns: []
    };
    var Et = i("VU/8")(Pt, Lt, !1, function (t) {
      i("+3Nt")
    }, null, null).exports, Ft = {
      data: function () {
        return {
          showExerciseFreeForm: !1,
          todayNotShow: !1,
          showForm: !1,
          form: {companyName: "", userName: "", phone: "", usersCount: ""}
        }
      }, props: ["versionName"], computed: {
        checkBroswerChrome: function () {
          return window.navigator.userAgent.indexOf("Chrome") > -1
        }, cookieExpiresTime: function () {
          var t = new Date, e = t.getTime(), i = t.toLocaleDateString(),
            a = 864e5 - (e - (this.checkBroswerChrome ? new Date(i).getTime() + 288e5 - 1 : new Date(i).getTime() - 1)),
            n = new Date;
          return n.setTime(a + e), n.toGMTString()
        }
      }, methods: L()({}, Object(E.mapActions)({exerciseFreeExp: "index/exerciseFreeExp"}), {
        showFormFn: function () {
          this.showForm = !0
        }, submitFn: function () {
          this.exerciseFreeExp({$message: this.$message, callbackFn: this.closeDialogFn})
        }, closeDialogFn: function () {
          if (this.todayNotShow) {
            Number(this.remainSecond / 60 / 60 / 24);
            document.cookie = "indexTodayNotShowDialog=true; expires=" + this.cookieExpiresTime + "; path=/; domain=.kaoshixing.com"
          }
          this.showExerciseFreeForm = !1
        }, showDialogFn: function () {
          var t = KSX.getCookie("indexTodayNotShowDialog");
          this.showExerciseFreeForm = !t
        }
      }), mounted: function () {
        this.showDialogFn()
      }
    }, Rt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("el-dialog", {
          staticClass: "exercise-dialog",
          attrs: {
            visible: t.showExerciseFreeForm,
            width: "440px",
            center: !0,
            "append-to-body": "",
            "show-close": !1,
            "close-on-click-modal": !1
          },
          on: {
            "update:visible": function (e) {
              t.showExerciseFreeForm = e
            }
          }
        }, [i("div", {staticClass: "page-box"}, [i("div", {staticClass: "page-scroll-box"}, [i("div", {class: ["info-page", "page", "免费版" == t.versionName ? "free" : ""]}, [i("el-button", {
          staticClass: "btn-application",
          attrs: {type: "text"},
          on: {click: t.submitFn}
        }, [t._v("戳这里申请体验名额")])], 1)])]), t._v(" "), i("div", {staticClass: "close-box"}, [i("el-checkbox", {
          model: {
            value: t.todayNotShow,
            callback: function (e) {
              t.todayNotShow = e
            },
            expression: "todayNotShow"
          }
        }, [t._v("今日不再提示")]), t._v(" "), i("div", {staticClass: "white-border"}), t._v(" "), i("el-button", {
          staticClass: "btn-close-dialog",
          attrs: {type: "text"},
          on: {click: t.closeDialogFn}
        }, [t._v("关闭")])], 1)])
      }, staticRenderFns: []
    };
    var Dt = i("VU/8")(Ft, Rt, !1, function (t) {
      i("FrwU")
    }, null, null).exports, Bt = {
      data: function () {
        return {
          staffDialogLog: !1,
          pushNotificationShow: !0,
          shareItem: {showState: !1, data: {name: "", startTime: "", endTime: "", link: "", msgContent: ""}, type: ""},
          collapse: {exam: !0, course: !0, exercise: !0, process: !0},
          showExerciseCard: !1
        }
      },
      computed: L()({}, Object(E.mapGetters)({
        user: "user",
        company: "company",
        companyRights: "companyRights",
        baseRights: "baseRights",
        operationCard: "index/operationCard",
        indexInfo: "index/indexInfo",
        dingtalkEnv: "dingtalkEnv"
      }), {
        companyConfig: function () {
          return this.indexInfo.companyConfig
        }, operationRightCard: function () {
          var t = this, e = this.operationCard.filter(function (e) {
            return e.baseRight ? t.companyRights[e.right] && t.baseRights[e.baseRight] : t.companyRights[e.right]
          });
          return this.dingtalkEnv ? e.length > 8 && (e = e.splice(0, 8)) : e.length > 6 && (e = e.splice(0, 6)), e
        }, haveConsumerSumPrecent: function () {
          return this.companyConfig.haveConsumerSumFlow / this.companyConfig.sumFlow * 100
        }, inProgressList: function () {
          var t = {
            examings: {
              key: "examings",
              subAdminRight: this.companyRights.allowExamShow,
              adminRight: !0,
              data: this.indexInfo.examings
            },
            courseUsingList: {
              key: "courseUsingList",
              subAdminRight: this.companyRights.allowCourseShow && this.baseRights.canCourse,
              adminRight: this.baseRights.canCourse,
              data: this.indexInfo.courseUsingList
            },
            exercisings: {
              key: "exercisings",
              subAdminRight: this.companyRights.allowExerciseShow && this.baseRights.canExercise,
              adminRight: this.baseRights.canExercise,
              data: this.indexInfo.exercisings
            },
            processUsingList: {
              key: "processUsingList",
              subAdminRight: this.companyRights.allowProcessShow,
              adminRight: !0,
              data: this.indexInfo.processUsingList
            }
          }, e = [];
          for (var i in t) {
            var a = "subAdminRight";
            "admin" == this.user.role && (a = "adminRight"), t[i][a] && e.push(t[i])
          }
          for (var n = 0; n < e.length - 1; n++) for (var s = n + 1; s < e.length; s++) if (e[n].data.length < e[s].data.length) {
            var o = e[s];
            e[s] = e[n], e[n] = o
          }
          return e
        }
      }),
      components: {
        UserLoginCard: ut,
        ExamCard: ht,
        CourseCard: ft,
        ProcessCard: xt,
        ExerciseCard: wt,
        ShareLinkDialog: Nt,
        publicLogDialog: Et,
        exerciseFreeDiglog: Dt,
        RemoteStatic: Z
      },
      methods: L()({}, Object(E.mapMutations)({updateCurrentNav: "UPDATE_CURRENT_NAV"}), Object(E.mapActions)({
        checkBaseRights: "index/checkBaseRights",
        superGuild: "superGuild",
        getIndexInfo: "index/getIndexInfo",
        getExamLink: "getExamLink",
        getCourseLink: "getCourseLink",
        getCompanyBaseRights: "getCompanyBaseRights"
      }), {
        introFn: function () {
          var t = introJs();
          t.setOptions({
            prevLabel: "上一步",
            nextLabel: "下一步<i class='icon-a_arrow_right'></i>",
            skipLabel: "跳过",
            doneLabel: "知道了",
            highlightClass: "highlightStyle",
            steps: [{
              element: ".viewFrameWork-sidebar",
              intro: '<div class="intro-box"><span class="title-tip">菜单导航栏<span class="blue"></span></span><p class="content-tip">考试星管理端所有模块入口，考试、课程、每日学练、流程、题目、课件、学员、系统设置等</p><dl class="tip-list"><dt>版本升级提示：</dt><dd>1.试题库正式更名为题目管理，知识库正式更名为课件管理，人员管理正式更名为学员管理；</dd><dd>2.自定义任务、报名、证书已移至流程；</dd><dd>3.支付中心移至系统设置。（如需了解更多帮助请前往帮助中心）</dd></dl></div>',
              position: "bottom"
            }, {
              element: ".operation-card",
              intro: '<div class="intro-box file-last-box"><span class="title-tip">首页快捷操作<span class="blue"></span></span><p class="content-tip">系统各个模块的快捷操作入口，可在此快速进行录题、创建考试、创建课程等操作</p></div>',
              position: "left",
              tooltipClass: "custom-left"
            }, {
              element: ".user-login-card",
              intro: '<div class="intro-box file-last-box"><span class="title-tip">登录方式<span class="blue"></span></span><p class="content-tip">学员登录二维码用于学员端登录，若需要接收每日学练推送，则需要让学员扫描练习接收二维码</p></div>',
              position: "bottom",
              tooltipClass: "custom-left"
            }, {
              element: ".in-progress-intro",
              intro: '<div class="intro-box file-last-box"><span class="title-tip">首页内容模块<span class="blue"></span></span><p class="content-tip">正在进行的考试、课程、每日学练、自定义任务将在首页进行展示</p></div><button class="again-btn vue-btn" id="seeAgain">再看一遍</button>',
              position: "top",
              tooltipClass: "custom-left"
            }]
          }).start().onchange(function (e) {
            setTimeout(function () {
              var e = document.getElementById("seeAgain");
              console.log(e), e && document.getElementById("seeAgain").addEventListener("click", function () {
                t.goToStep(1)
              })
            }, 500)
          })
        }, shareLinkFn: function (t, e) {
          this.shareItem.type = e, "考试" == e ? this.getExamLink({
            id: t.id,
            callbackFn: this.showShareLinkDialog,
            $alert: this.$alert
          }) : "课程" == e && this.getCourseLink({id: t.id, callbackFn: this.showShareLinkDialog, $alert: this.$alert})
        }, showShareLinkDialog: function (t) {
          this.shareItem.data = t, this.shareItem.showState = !0
        }, filterOperation: function (t) {
          return "allowUserAdd" != t.key || !this.dingtalkEnv
        }, showStaffDialog: function () {
          window.open("https://www.kaoshixing.com/tuiguang/huinot.html")
        }
      }),
      beforeCreate: function () {
        this.$store.dispatch("getCompanyBaseRights")
      },
      mounted: function () {
        this.checkBaseRights({role: this.user.role}), this.updateCurrentNav("Index"), this.superGuild({
          from: "adminIndex",
          introjs: introJs(),
          introIndexFn: this.introFn
        }), this.getIndexInfo()
      }
    }, Gt = {
      render: function () {
        var t = this, e = t.$createElement, i = t._self._c || e;
        return i("div", {staticClass: "main-index"}, [i("remote-static", {
          attrs: {
            cssLink: "kalendae",
            jsSrc: "kalendae"
          }, on: {
            loadedCallback: function (e) {
              t.showExerciseCard = !0
            }
          }
        }), t._v(" "), t.indexInfo.pushNotification && t.pushNotificationShow ? i("div", {
          staticClass: "el-alert el-alert--warning is-center",
          attrs: {role: "alert"}
        }, [i("i", {staticClass: "el-alert__icon el-icon-warning"}), t._v(" "), i("div", {staticClass: "el-alert__content"}, [i("span", {
          staticClass: "el-alert__title",
          domProps: {innerHTML: t._s(t.indexInfo.pushNotification)}
        }), t._v(" "), i("i", {
          staticClass: "el-alert__closebtn el-icon-close", on: {
            click: function (e) {
              t.pushNotificationShow = !1
            }
          }
        })])]) : t._e(), t._v(" "), i("div", {staticClass: "main-index-content"}, ["admin" == t.user.role ? i("ul", {staticClass: "count"}, [t.dingtalkEnv ? t._e() : i("li", [i("label", [t._v("在线人数：")]), t._v(" "), i("span", [t._v(t._s(t.companyConfig.onlineCount) + "/" + t._s(t.companyConfig.onlineLimit))]), t._v(" "), i("el-progress", {
          attrs: {
            percentage: t.companyConfig.onlinePercent > 100 ? 100 : t.companyConfig.onlinePercent,
            color: t.companyConfig.onlinePercent > 100 ? "#F76377" : "#1A8CFE",
            "show-text": !1
          }
        }), t._v(" "), t.companyConfig.onlinePercent > 100 ? i("a", {
          staticClass: "icon-a_circle_plus_outline",
          attrs: {href: "https://www.kaoshixing.com/price/"}
        }) : t._e()], 1), t._v(" "), t.dingtalkEnv ? t._e() : i("li", [t.dingtalkEnv ? [i("label", [t._v("授权人数：")])] : [i("label", [t._v("注册人数：")])], t._v(" "), i("span", [t._v(t._s(t.companyConfig.userCounts) + "/" + t._s(t.companyConfig.countLimit))]), t._v(" "), i("el-progress", {
          attrs: {
            percentage: t.companyConfig.userPercent > 100 ? 100 : t.companyConfig.userPercent,
            color: t.companyConfig.userIsLimit ? "#F76377" : "#1A8CFE",
            "show-text": !1
          }
        }), t._v(" "), t.companyConfig.userIsLimit ? i("a", {
          staticClass: "icon-a_circle_plus_outline",
          attrs: {href: "https://www.kaoshixing.com/price/"}
        }) : t._e()], 2), t._v(" "), t.companyConfig.canExercise && !t.dingtalkEnv ? i("li", [i("label", [t._v("每日学练人数：")]), t._v(" "), i("span", [t._v(t._s(t.companyConfig.exerciseCount) + "/" + t._s(t.companyConfig.exerciseCountLimit))]), t._v(" "), i("el-progress", {
          attrs: {
            percentage: t.companyConfig.exercisePercent > 100 ? 100 : t.companyConfig.exercisePercent,
            color: t.companyConfig.exerciseIsLimit ? "#F76377" : "#1A8CFE",
            "show-text": !1
          }
        }), t._v(" "), t.companyConfig.exerciseIsLimit ? i("a", {
          staticClass: "icon-a_circle_plus_outline",
          attrs: {href: "https://www.kaoshixing.com/price/"}
        }) : t._e()], 1) : t._e(), t._v(" "), i("li", [i("label", [t._v("存储空间：")]), t._v(" "), i("span", [t._v(t._s(t.companyConfig.spaceSize) + "/" + t._s(t.companyConfig.spaceLimit) + "MB")]), t._v(" "), i("el-progress", {
          attrs: {
            percentage: t.companyConfig.spacePercent > 100 ? 100 : t.companyConfig.spacePercent,
            color: t.companyConfig.spacePercent > 100 ? "#F76377" : "#1A8CFE",
            "show-text": !1
          }
        }), t._v(" "), t.companyConfig.spacePercent > 100 ? i("a", {
          staticClass: "icon-a_circle_plus_outline",
          attrs: {href: "https://www.kaoshixing.com/price/"}
        }) : t._e()], 1), t._v(" "), i("li", [i("label", [t._v("消耗流量：")]), t._v(" "), i("span", [t._v(t._s(t.companyConfig.haveConsumerSumFlow) + "/" + t._s(t.companyConfig.sumFlow) + "GB")]), t._v(" "), i("el-progress", {
          attrs: {
            percentage: t.companyConfig.haveConsumerSumPrecent > 100 ? 100 : t.companyConfig.haveConsumerSumPrecent,
            color: t.companyConfig.haveConsumerSumPrecent > 100 ? "#F76377" : "#1A8CFE",
            "show-text": !1
          }
        }), t._v(" "), t.companyConfig.haveConsumerSumPrecent > 100 ? i("a", {
          staticClass: "icon-a_circle_plus_outline",
          attrs: {href: "https://www.kaoshixing.com/price/"}
        }) : t._e()], 1)]) : t._e(), t._v(" "), i("div", {staticClass: "shortcut"}, [i("ul", {class: ["operation-card", "clearfix", t.dingtalkEnv ? "operation-card-ding" : ""]}, [t._l(t.operationRightCard, function (e, a) {
          return [t.filterOperation(e) ? i("li", {
            key: a,
            staticClass: "item"
          }, [i("a", {attrs: {href: e.href}}, [i("img", {
            staticClass: "icon",
            attrs: {src: "https://s6.kaoshixing.com/ksxing_static/vue/admin/index/" + e.icon + ".png", alt: ""}
          }), t._v(" "), i("div", {staticClass: "info"}, [i("span", {staticClass: "name"}, [t._v(t._s(e.operation))]), t._v(" "), i("p", {staticClass: "intro"}, [t._v(t._s(e.intro))])])])]) : t._e()]
        })], 2), t._v(" "), t.dingtalkEnv ? t._e() : i("user-login-card")], 1), t._v(" "), i("div", {staticClass: "in-progress-intro"}), t._v(" "), i("div", {staticClass: "in-progress"}, t._l(t.inProgressList, function (e, a) {
          return i("div", {key: a}, ["examings" == e.key ? i("div", [i("div", {staticClass: "title"}, [t._v("正在进行的考试（" + t._s(e.data.length) + "）")]), t._v(" "), e.data.length > 0 ? i("div", {staticClass: "panel"}, [i("div", {
            staticClass: "control-collapse",
            on: {
              click: function (e) {
                t.collapse.exam = !t.collapse.exam
              }
            }
          }, [t.collapse.exam ? i("span", [t._v("\n                展开\n                "), i("i", {staticClass: "icon icon-a_arrow_down"})]) : i("span", [t._v("\n                收起\n                "), i("i", {staticClass: "icon icon-a_arrow_up"})])]), t._v(" "), i("ul", {class: ["card-box", "clearfix", t.collapse.exam ? "collapse" : ""]}, t._l(e.data, function (e, a) {
            return i("li", {key: a, staticClass: "card"}, [i("exam-card", {
              attrs: {itemData: e},
              on: {shareLinkFn: t.shareLinkFn}
            })], 1)
          }))]) : i("div", {staticClass: "empty-tip"}, [t._v("还没有正在进行的考试，快去创建一场考试吧～")])]) : t._e(), t._v(" "), "courseUsingList" == e.key ? i("div", [i("div", {staticClass: "title"}, [t._v("正在进行的课程（" + t._s(e.data.length) + "）")]), t._v(" "), e.data.length > 0 ? i("div", {staticClass: "panel"}, [i("div", {
            staticClass: "control-collapse",
            on: {
              click: function (e) {
                t.collapse.course = !t.collapse.course
              }
            }
          }, [t.collapse.course ? i("span", [t._v("\n                展开\n                "), i("i", {staticClass: "icon icon-a_arrow_down"})]) : i("span", [t._v("\n                收起\n                "), i("i", {staticClass: "icon icon-a_arrow_up"})])]), t._v(" "), i("ul", {class: ["card-box", "clearfix", t.collapse.course ? "collapse" : ""]}, t._l(e.data, function (e, a) {
            return i("li", {key: a, staticClass: "card"}, [i("course-card", {
              attrs: {itemData: e},
              on: {shareLinkFn: t.shareLinkFn}
            })], 1)
          }))]) : i("div", {staticClass: "empty-tip"}, [t._v("还没有正在进行的课程，快去创建一场课程吧～")])]) : t._e(), t._v(" "), "exercisings" == e.key ? i("div", [i("div", {staticClass: "title"}, [t._v("正在进行的每日学练（" + t._s(e.data.length) + "）")]), t._v(" "), e.data.length > 0 ? i("div", {staticClass: "panel"}, [i("div", {
            staticClass: "control-collapse",
            on: {
              click: function (e) {
                t.collapse.exercise = !t.collapse.exercise
              }
            }
          }, [t.collapse.exercise ? i("span", [t._v("\n                展开\n                "), i("i", {staticClass: "icon icon-a_arrow_down"})]) : i("span", [t._v("\n                收起\n                "), i("i", {staticClass: "icon icon-a_arrow_up"})])]), t._v(" "), i("ul", {class: ["card-box", "clearfix", t.collapse.exercise ? "collapse" : ""]}, t._l(e.data, function (e, a) {
            return i("li", {key: a, staticClass: "card"}, [t.showExerciseCard ? i("exercise-card", {
              attrs: {
                id: a,
                itemData: e
              }
            }) : t._e()], 1)
          }))]) : i("div", {staticClass: "empty-tip"}, [t._v("还没有正在进行的每日学练，快去创建一场练习吧～")])]) : t._e(), t._v(" "), "processUsingList" == e.key ? i("div", [i("div", {staticClass: "title"}, [t._v("正在进行的任务（" + t._s(e.data.length) + "）")]), t._v(" "), e.data.length > 0 ? i("div", {staticClass: "panel"}, [i("div", {
            staticClass: "control-collapse",
            on: {
              click: function (e) {
                t.collapse.process = !t.collapse.process
              }
            }
          }, [t.collapse.process ? i("span", [t._v("\n                展开\n                "), i("i", {staticClass: "icon icon-a_arrow_down"})]) : i("span", [t._v("\n                收起\n                "), i("i", {staticClass: "icon icon-a_arrow_up"})])]), t._v(" "), i("ul", {class: ["card-box", "clearfix", t.collapse.process ? "collapse" : ""]}, t._l(e.data, function (t, e) {
            return i("li", {key: e, staticClass: "card"}, [i("process-card", {attrs: {itemData: t}})], 1)
          }))]) : i("div", {staticClass: "empty-tip"}, [t._v("还没有正在进行的任务，快去创建一次任务吧～")])]) : t._e()])
        })), t._v(" "), i("div", {staticClass: "staff-dialog"}, [i("el-dialog", {
          staticClass: "staff-dialog-log",
          attrs: {visible: t.staffDialogLog, width: "400px", center: !0, "append-to-body": ""},
          on: {
            "update:visible": function (e) {
              t.staffDialogLog = e
            }
          }
        }, [i("img", {
          attrs: {
            src: "https://s6.kaoshixing.com/ksxing_static/vue/images/base/ygpx.jpg",
            alt: ""
          }
        }), t._v(" "), i("el-button", {
          staticClass: "staffDialogButton",
          on: {click: t.showStaffDialog}
        }, [t._v("了解详情")])], 1)], 1), t._v(" "), i("share-link-dialog", {
          attrs: {
            item: t.shareItem.data,
            type: t.shareItem.type
          }, model: {
            value: t.shareItem.showState, callback: function (e) {
              t.$set(t.shareItem, "showState", e)
            }, expression: "shareItem.showState"
          }
        }), t._v(" "), i("public-log-dialog", {attrs: {publicNotification: t.indexInfo.publicNotification}}), t._v(" "), 1 == t.indexInfo.isPopUpHfPromotion ? i("exercise-free-diglog", {attrs: {versionName: t.company.versionName}}) : t._e()], 1)], 1)
      }, staticRenderFns: []
    }, Ot = i("VU/8")(Bt, Gt, !1, null, null, null).exports;
    Vue.use(r.a);
    var jt, Ut = new r.a({
      routes: [{
        path: "/",
        redirect: "/index",
        name: "adminApp",
        component: q,
        children: [{
          path: "index", name: "index", components: {subNav: nt, main: Ot}, beforeEnter: function (t, e, i) {
            !function (t) {
              var e = window.navigator.userAgent.toLowerCase();
              "mobile" == KSX.getPlatform(e) ? window.location.href = d.apiBase("exam") + "/exam" : t()
            }(i)
          }
        }]
      }, {path: "/error", component: O}, {path: "/info", component: A}, {path: "*", component: D}]
    });
    (jt = Ut).beforeEach(function (t, e, i) {
      var a = window.navigator.userAgent.toLowerCase(), n = KSX.getPlatform(a), s = /^\/admin/, o = "",
        r = KSX.getCookie("sessionId"), c = t.query.companyId ? "/" + t.query.companyId : "";
      if ("" == c) {
        var l = KSX.getCookie("KSX_CID");
        "" != l && (c = "/" + l)
      }
      if ("pc" == n && /exam\/m\//.test("/admin/index")) {
        var u = jt.resolve({path: t.path, params: t.params, query: t.query});
        o = w.urlBase() + "/admin/index".replace(/exam\/m\//, "exam/pc/") + u.href
      }
      if ("mobile" == n && /exam\/pc\//.test("/admin/index")) {
        var m = jt.resolve({path: t.path, params: t.params, query: t.query});
        o = w.urlBase() + "/admin/index".replace(/exam\/pc\//, "exam/m/") + m.href
      }
      if (o) window.location.href = o; else {
        var h = N + "/login/account/login" + c + "?nextUrl=" + encodeURIComponent(window.location.href);
        if ("" == r) t.matched.some(function (t) {
          return t.meta.ignoreLoginCheck
        }) ? i() : window.open(h, "_self"); else {
          var v = {sessionId: r};
          C({url: d.apiBase("exam") + "/login/public/login_check", method: "POST", data: p()(v)}).then(function (a) {
            var n = a.data;
            n.success ? (jt.app.$store.commit("END_LOADING"), jt.app.$store.commit("SET_TOKEN", n.bizContent.token), jt.app.$store.commit("SET_USER", n.bizContent.user), jt.app.$store.commit("SET_COMPANY", n.bizContent.company), jt.app.$store.commit("SET_COMPANY_ATTR", {
              versionName: n.bizContent.versionName,
              userCounts: n.bizContent.userCounts,
              countLimit: n.bizContent.countLimit,
              logoUrl: n.bizContent.logoUrl,
              spaceLimit: n.bizContent.spaceLimit,
              spaceSize: n.bizContent.spaceSize,
              followStatus: n.bizContent.followStatus
            }), "applicationSheet" != t.name ? (ksxProbe.gioInit({
              userId: n.bizContent.user.id,
              companyId: n.bizContent.company.id,
              companyName: n.bizContent.company.companyName,
              rightsGrade: n.bizContent.company.rightsGrade
            }), s.test("/admin/index") ? I(jt.app.$options.store, {
              to: t,
              from: e,
              next: i
            }) : T(jt.app.$options.store, {
              to: t,
              from: e,
              next: i,
              companyId: n.bizContent.company.id
            })) : i()) : window.open(h, "_self")
          }).catch(function (t) {
            console.log(t)
          })
        }
      }
    });
    var At, zt = Ut, $t = {
      broswerHintShow: !1,
      url: w,
      api: d,
      token: "",
      user: {},
      company: {},
      companyRights: {},
      baseRights: {},
      otherRights: {payRight: !1, notAllowExamineeChangeInfo: 0, forceExamineeWechatLogin: 0},
      cmodify: {},
      currentNavItem: "",
      loading: !1,
      dialogs: {userInfo: !1, setPassword: !1},
      number: {exam: 0, course: 0, process: 0},
      advancedSetRights: {labelOpen: "", pointOpen: ""},
      showIntroRights: {},
      userPointData: {userPhoto: "", userPoint: "", staffRank: ""},
      pointScoreInfo: {pointDialog: !1, pointScoreArr: [], canLoadMore: !0, current: 1, rowCount: 10},
      notShowTecSup: !1,
      dingtalkEnv: !1,
      notificationCount: 0,
      navConfig: {admin: [], exam: []}
    }, Vt = function (t) {
      return t.broswerHintShow
    }, Mt = function (t) {
      return t.loading
    }, Ht = function (t) {
      return t.url
    }, qt = function (t) {
      return t.api
    }, Wt = function (t) {
      return t.token
    }, Kt = function (t) {
      return t.user
    }, Jt = function (t) {
      return t.company
    }, Xt = function (t) {
      return t.cmodify
    }, Yt = function (t) {
      return t.companyRights
    }, Qt = function (t) {
      return t.baseRights
    }, Zt = function (t) {
      return t.advancedSetRights
    }, te = function (t) {
      return t.showIntroRights
    }, ee = function (t) {
      return t.userPointData
    }, ie = function (t) {
      return t.pointScoreInfo
    }, ae = function (t) {
      return t.currentNavItem
    }, ne = function (t) {
      return t.dingtalkEnv
    }, se = function (t, e) {
      return t.navConfig.admin
    }, oe = function (t, e) {
      var i = e.api, a = e.url, n = e.companyRights, s = 1 == e.user.isSkipLogin, o = t.number;
      return [{
        title: n.examName,
        show: !s && n.canExam,
        icon: "icon-p_leftnav_exam",
        url: i.apiBase("exam") + "/exam",
        id: "Exam",
        isShowNum: o.exam > 9 ? "9+" : o.exam
      }, {
        title: n.courseName,
        show: !s && n.canCourse,
        icon: "icon-p_icon_leftnav_course",
        url: a.urlProject("/exam/pc/course") + "/list",
        id: "Course",
        isShowNum: o.course > 9 ? "9+" : o.course
      }, {
        title: n.liveName,
        show: !s && n.canLive,
        icon: "icon-a_nav_live",
        url: a.urlProject("/exam/pc/live") + "/list",
        id: "Live",
        isShowNum: o.live > 9 ? "9+" : o.live
      }, {
        title: n.processName,
        show: !s && n.canProcess,
        icon: "icon-a_icon_nav_process",
        url: a.urlProject("/exam/pc/customprocess") + "/list",
        id: "CustomProcess",
        isShowNum: o.process > 9 ? "9+" : o.process
      }, {
        title: n.fileManagerName,
        show: !s && n.canFileManager,
        icon: "icon-p_icon_leftnav_repository",
        url: i.apiBase("exam") + "/exam/file_mgr",
        id: "Netdisk"
      }, {
        title: n.certificateName,
        show: !s && n.canCertificate,
        icon: "icon-p_leftnav_certification",
        url: i.apiBase("exam") + "/certificate/certificate_mine",
        id: "Certificate",
        isStaffShow: n.canCertificate
      }, {
        title: n.signupName,
        show: !s && n.canSignup,
        icon: "icon-a_nav_sign_up",
        url: a.urlProject("/exam/pc/application") + "/list",
        id: "Application",
        isStaffShow: n.canSignup
      }]
    }, re = function (t, e) {
      var i = e.api, a = (e.url, e.companyRights), n = 1 == e.user.isSkipLogin;
      return [{
        title: "首页",
        show: !0,
        icon: "icon-p_leftnav_exam",
        url: i.apiBase("exam") + "/exam",
        id: "Exam"
      }, {
        title: "历史",
        show: !0,
        icon: "icon-p_leftnav_history",
        url: i.apiBase("exam") + "/exam/history",
        id: "History"
      }, {
        title: "知识库",
        show: !n && a.canFileManager,
        icon: "icon-p_leftnav_learn",
        url: i.apiBase("exam") + "/exam/m_file_mgr",
        id: "Course"
      }, {title: "我的", show: !0, icon: "icon-m_nav_my", url: i.apiBase("exam") + "/account/m_user_info", id: "Mine"}]
    }, ce = function (t) {
      return t.dialogs
    }, le = function (t) {
      return t.notShowTecSup
    }, de = function (t) {
      return t.notificationCount
    }, ue = (At = {}, $()(At, "SET_TOKEN", function (t, e) {
      t.token = e
    }), $()(At, "SET_USER", function (t, e) {
      t.user = e
    }), $()(At, "SET_COMPANY", function (t, e) {
      t.company = e
    }), $()(At, "SET_COMPANY_ATTR", function (t, e) {
      for (var i in e) e.hasOwnProperty(i) && (t.company[i] = e[i])
    }), $()(At, "GET_NUMBER", function (t, e) {
      t.number = e
    }), $()(At, "SET_COMPANY_RIGHTS", function (t, e) {
      t.companyRights = e
    }), $()(At, "SET_BASE_RIGHTS", function (t, e) {
      t.baseRights = e
    }), $()(At, "UPDATE_CURRENT_NAV", function (t, e) {
      t.currentNavItem = e
    }), $()(At, "BROSWER_HINTSHOW", function (t) {
      t.broswerHintShow = !0
    }), $()(At, "START_LOADING", function (t) {
      t.loading = !0
    }), $()(At, "END_LOADING", function (t) {
      t.loading = !1
    }), $()(At, "RESPONSE_HANDLE", function (t, e) {
      var i = this.getters.url;
      500 == e.code ? window.location.href = i.urlBase() + "/error" : window.location.href = i.urlBase() + "/info?message=" + e.desc
    }), $()(At, "SET_DINGTALK_ENV", function (t, e) {
      0 === e ? t.dingtalkEnv = !0 : 1 === e && (t.dingtalkEnv = !1)
    }), At), me = {
      logout: function (t, e) {
        C({url: d.apiBase("admin") + "/login/public/logout", method: "POST", withCredentials: !0}).then(function (t) {
          var e = t.data;
          e.success && (window.location.href = e.bizContent.url)
        })
      }, getNotificationCount: function (t) {
        var e = {token: t.rootGetters.token, userId: t.rootGetters.user.id, jsonParam: {}};
        C({
          url: d.apiBase("admin") + "/index/admin/count_notification",
          method: "POST",
          data: p()(e)
        }).then(function (e) {
          var i = e;
          i.success && (t.state.notificationCount = i.bizContent)
        })
      }, getAllRights: function (t, e) {
        var i = {methodName: "getAllRights", token: t.rootGetters.token, userId: t.rootGetters.user.id, jsonParam: {}};
        C({
          url: d.apiBase("exam") + "/index/public/excute",
          method: "POST",
          withCredentials: !0,
          data: p()(i)
        }).then(function (i) {
          var a = i.data;
          a.success && (e && e.rightName ? a.bizContent[e.rightName] ? e.toNext() : e.toLimit() : e.toNext(), t.state.notShowTecSup = a.bizContent.notShowTecSup, t.commit("SET_COMPANY_RIGHTS", a.bizContent), t.dispatch("getNavConfig"))
        })
      }, getNavConfig: function (t) {
        var e = "https://s1.kaoshixing.com/config_file/ksx-nav.json?v=20200508";
        C({url: e, method: "GET"}).then(function (e) {
          t.state.navConfig = e;
          for (var i = t.state.navConfig.admin, a = t.state.companyRights, n = 0; n < i.length; n++) for (var s = i[n], o = 0; o < s.length; o++) {
            var r = s[o];
            if (r.hasOwnProperty("children")) {
              for (var c = 0; c < r.children.length; c++) {
                var l = r.children[c];
                if (l.hasOwnProperty("children")) {
                  for (var d = 0; d < l.children.length; d++) {
                    var u = l.children[d];
                    u.show = u.key ? a[u.key] : u.show
                  }
                  var m = l.children.filter(function (t) {
                    return t.show
                  });
                  l.show = m.length > 0
                } else l.show = l.key ? a[l.key] : l.show
              }
              r.hasOwnProperty("expirationDateKey") && (r.expirationDate = a[r.expirationDateKey]);
              var p = r.children.filter(function (t) {
                return t.show
              });
              r.show = p.length > 0
            } else r.show = r.key ? a[r.key] : r.show
          }
          t.state.navConfig.admin = i
        })
      }, getExamBaseInfo: function (t, e) {
        var i = {
          methodName: "getExamBaseInfo",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          tokenFlag: e.ignoreLoginCheck ? 1 : 0,
          jsonParam: {companyId: e.companyId}
        };
        C({url: d.apiBase("exam") + "/public/excute", method: "POST", data: p()(i)}).then(function (i) {
          var a = i.data;
          if (e.callback && e.callback(), a && a.success) {
            for (var n in e && e.rightName ? a.bizContent.companyRights[e.rightName] ? e.toNext() : e.toLimit() : e.toNext(), t.commit("SET_COMPANY", a.bizContent.company), t.commit("SET_COMPANY_RIGHTS", a.bizContent.companyRights), t.state.company.adminUrl = a.bizContent.adminUrl, t.state.user.weBindUrl = a.bizContent.weBindUrl, t.state.company.logoUrl = a.bizContent.logoUrl, a.bizContent.numberHint) a.bizContent.numberHint[n] && (t.state.number[n] = a.bizContent.numberHint[n]);
            a.bizContent.cmodify.customTab && (document.title = a.bizContent.cmodify.customTab), t.state.otherRights.notAllowExamineeChangeInfo = a.bizContent.notAllowExamineeChangeInfo, t.state.otherRights.forceExamineeWechatLogin = a.bizContent.forceExamineeWechatLogin
          }
        })
      }, userUpdate: function (t, e) {
        var i = {
          methodName: "userUpdate",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {picture: e.picture, surname: e.surname, email: e.email, phone: e.phone, sex: e.sex}
        };
        C({url: d.apiBase("exam") + "/public/excute", method: "POST", data: p()(i)}).then(function (i) {
          i.data.success && (t.state.user.picture = e.picture, t.state.user.surname = e.surname, t.state.user.email = e.email, t.state.user.phone = e.phone, t.state.user.sex = e.sex, t.state.dialogs.userInfo = !1)
        })
      }, modifyGetLogo: function (t) {
        var e = {methodName: "modifyGetLogo", token: t.rootGetters.token, userId: t.rootGetters.user.id, jsonParam: {}};
        C({url: d.apiBase("exam") + "/setting/public/excute", method: "POST", data: p()(e)}).then(function (e) {
          var i = e.data;
          i.success && (t.state.company.logoUrl = i.bizContent.logoUrl)
        })
      }, unbindWeChat: function (t) {
        var e = {methodName: "unbindWeChat", token: t.rootGetters.token, userId: t.rootGetters.user.id, jsonParam: {}};
        C({url: d.apiBase("exam") + "/public/excute", method: "POST", data: p()(e)}).then(function (e) {
          e.data.success && (t.state.user.wechatId = null)
        })
      }, verifyEmails: function (t, e) {
        var i = e.$message,
          a = {methodName: "verifyEmails", token: t.rootGetters.token, userId: t.rootGetters.user.id, jsonParam: {}};
        C({url: d.apiBase("exam") + "/public/excute", method: "POST", data: p()(a)}).then(function (t) {
          t.data.success && i({message: "验证邮件已发送，请注意查收", type: "info"})
        })
      }, userSetPass: function (t, e) {
        var i = e.$message, a = {
          methodName: "userSetPass",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {newPassword: e.newPassword, oldPassword: e.oldPassword}
        };
        C({url: d.apiBase("exam") + "/public/excute", method: "POST", data: p()(a)}).then(function (e) {
          var a = e.data;
          a.success ? t.state.dialogs.setPassword = !1 : i({type: "error", message: a.desc})
        })
      }, getFollowAppStatus: function (t, e) {
        t.state.loading = !0;
        var i = e.callback, a = {
          methodName: "getFollowAppStatus",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {}
        };
        C({url: d.apiBase("exam") + "/setting/public/excute", method: "POST", data: p()(a)}).then(function (e) {
          var a = e.data;
          a.success && (t.state.company.followApp = a.bizContent.allowFollow, i && i(t.state.company.followApp)), t.state.loading = !1
        }).catch(function () {
          t.state.loading = !1
        })
      }, checkAdvancedSet: function (t, e) {
        if (t.rootGetters.token || t.rootGetters.user.id) {
          var i = {
            methodName: "checkAdvancedSet",
            token: t.rootGetters.token,
            userId: t.rootGetters.user.id,
            jsonParam: {}
          };
          C({url: d.apiBase("exam") + "/setting/public/excute", method: "POST", data: p()(i)}).then(function (e) {
            var i = e.data;
            i.success && (t.state.advancedSetRights.labelOpen = i.bizContent.labelOpen, t.state.advancedSetRights.pointOpen = i.bizContent.pointOpen, t.state.advancedSetRights.userLabelOpen = i.bizContent.userLabelOpen)
          })
        }
      }, superGuild: function (t, e) {
        var i = "";
        "testList" == e.from ? i = "/baseinfo/admin/showtestqm_grid" : "userList" == e.from ? i = "/admin_user/excute" : "processList" == e.from ? i = "/custom_process/list" : "courseList" == e.from ? i = "/admin_course/list" : "adminIndex" == e.from && (i = "/admin/index/#/index");
        var a = {
          methodName: "superGuild",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {url: i}
        };
        C({url: d.apiBase("admin") + "/index/public/excute", method: "POST", data: p()(a)}).then(function (i) {
          var a = i.data;
          a.success && (t.state.showIntroRights = a.bizContent, void 0 != e && (1 == t.state.showIntroRights.isItemBank && "testList" == e.from && e.introTestFn(), 1 == t.state.showIntroRights.isAddPeople && "userList" == e.from && e.introUserFn(), 1 == t.state.showIntroRights.isCourseList && "courseList" == e.from && e.introCourseFn(), 1 == t.state.showIntroRights.isMain && "adminIndex" == e.from && e.introIndexFn()))
        })
      }, getUserInfo: function (t, e) {
        var i = {
          methodName: "getUserInfo",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {userId: e.userId}
        };
        C({url: d.apiBase("exam") + "/public/excute", method: "POST", data: p()(i)}).then(function (e) {
          var i = e.data;
          i.success && (i.bizContent.longDepartmentName && (t.state.user.depName = i.bizContent.longDepartmentName), t.state.userPointData.userPoint = i.bizContent.userPoint, t.state.userPointData.userPhoto = i.bizContent.userPhoto)
        })
      }, getUserRankPage: function (t, e) {
        var i = {
          methodName: "getUserRankPage",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {userId: e.userId, current: e.current, rowCount: 10}
        };
        C({
          url: t.rootGetters.api.apiBase("admin") + "/baseinfo/point/excute",
          method: "POST",
          data: p()(i)
        }).then(function (i) {
          var a = i.data;
          if (a.success) {
            var n = a.bizContent.rows;
            if (t.state.userPointData.staffRank = a.bizContent.staffRank, e.canLoadMore) for (var s = 0; s < n.length; s++) t.state.pointScoreInfo.pointScoreArr.push(n[s]); else t.state.pointScoreInfo.pointScoreArr = a.bizContent.rows;
            t.state.pointScoreInfo.pointDialog = !0, t.state.pointScoreInfo.canLoadMore = !(n.length < 10)
          }
        })
      }, getUserLabelTree: function (t, e) {
        var i = {
          methodName: "userLabelTreeGetJson",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {}
        };
        C({method: "POST", url: d.apiBase("admin") + "/baseinfo/admin_user/excute", data: p()(i)}).then(function (t) {
          var i = t.data;
          i.success && e.callbackFn && e.callbackFn(i.bizContent)
        }).catch(function () {
        })
      }, getDepartmentsJson: function (t, e) {
        var i = {
          methodName: "getDepartmentsJson",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {}
        };
        C({method: "POST", url: d.apiBase("admin") + "/baseinfo/admin_user/excute", data: p()(i)}).then(function (i) {
          var a = i.data;
          a.success && e.callbackFn && e.callbackFn(a.bizContent.data), t.state.treeLoading = !1
        })
      }, getUsers: function (t, e) {
        var i = {
          methodName: "selUserModal",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: e.paramData
        };
        C({method: "POST", url: d.apiBase("admin") + "/baseinfo/public/excute", data: p()(i)}).then(function (t) {
          var i = t.data;
          i.success && e.callbackFn && e.callbackFn(i.bizContent)
        })
      }, getExamLink: function (t, e) {
        var i = {
          methodName: "examLinkInfo",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {examId: e.id}
        };
        C({
          method: "POST",
          url: d.apiBase("admin") + "/examadmin/admin/exam/link_info/" + e.id,
          data: i
        }).then(function (t) {
          var i = t.bizContent;
          if (t.success) {
            if (1 == i.setProcess) return void e.$alert("本场考试已关联自定义任务，无法通过二维码、链接进入，请前往考生端参加本场考试。", "考试链接", {
              customClass: "",
              confirmButtonClass: "primary",
              confirmButtonText: "确定",
              showClose: !1,
              center: !0,
              callback: function () {
              }
            });
            if (e.callbackFn) {
              var a = {
                id: e.id,
                name: i.examName,
                link: i.examUrl,
                startTime: i.examStartTime,
                endTime: i.examEndTime,
                msgContent: i.msgContent,
                examTime: i.examTime
              };
              e.callbackFn(a)
            }
          }
        })
      }, examNotice: function (t, e) {
        var i = {
          methodName: "examNotice",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {examInfoId: e.id, sendWay: e.sendWay}
        };
        C({method: "POST", url: d.apiBase("admin") + "/examadmin/admin/exam/notice", data: p()(i)}).then(function (t) {
          t.data.success && e.$message("消息发送中...群发完成后您将在消息中心收到提醒")
        }).then(function (t) {
        })
      }, getCourseLink: function (t, e) {
        var i = {
          methodName: "courseLinkInfo",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {courseId: e.id}
        };
        C({method: "POST", url: d.apiBase("admin") + "/courses/course/excute", data: p()(i)}).then(function (t) {
          var i = t.data;
          if (i.success) {
            var a = i.bizContent;
            if (1 == a.setProcess) return void e.$alert("本门课程已关联自定义任务，无法通过二维码、链接进入，请前往学员端学习本门课程。", "课程链接", {
              customClass: "",
              confirmButtonClass: "primary",
              confirmButtonText: "确定",
              showClose: !1,
              center: !0,
              callback: function () {
              }
            });
            if (e.callbackFn) {
              var n = {
                id: e.id,
                name: a.courseName,
                link: a.courseLink,
                startTime: a.startTime,
                endTime: a.endTime,
                msgContent: a.msgContent
              };
              e.callbackFn(n)
            }
          }
        }).then(function (t) {
        })
      }, courseNotice: function (t, e) {
        var i = {
          methodName: "courseNotice",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {courseId: e.id, sendWay: e.sendWay}
        };
        C({method: "POST", url: d.apiBase("admin") + "/courses/course/excute", data: p()(i)}).then(function (t) {
          t.data.success && e.$message("消息发送中...群发完成后您将在消息中心收到提醒")
        }).then(function (t) {
        })
      }, getCompanyBaseRights: function (t, e) {
        var i = {methodName: "baseRight", token: t.rootGetters.token, userId: t.rootGetters.user.id, jsonParam: {}};
        C({method: "POST", url: d.apiBase("admin") + "/baseinfo/company/baseRight", data: p()(i)}).then(function (e) {
          var i = e;
          i.success && t.commit("SET_BASE_RIGHTS", i.bizContent)
        }).then(function (t) {
        })
      }, checkFreeCourseRight: function (t, e) {
        var i = {
          methodName: "checkCourseRight",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {companyId: t.rootGetters.company.id, type: e.rightName}
        };
        C({url: d.apiBase("admin") + "/setting/public/excute", method: "POST", data: p()(i)}).then(function (i) {
          if (31016 == i.data.code || 31020 == i.data.code) e.toLimit(); else if (0 === Number(i.data.bizContent.signUpFlag)) {
            var a = Number(i.data.bizContent.canTrial), n = i.data.bizContent.url,
              s = encodeURIComponent(i.data.bizContent.content);
            e.toFreeTrial({canTrial: a, imgUrl: n, content: s, fun: "1"})
          } else t.state.otherRights.payRight = i.data.bizContent.payRight, e.toNext()
        })
      }, checkFreeSignUpRight: function (t, e) {
        var i = {
          methodName: "checkSignUpRight",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {companyId: t.rootGetters.company.id}
        };
        C({url: d.apiBase("admin") + "/setting/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          if (31016 == t.data.code) e.toLimit(); else if (0 === Number(t.data.bizContent.signUpFlag)) {
            var i = Number(t.data.bizContent.canTrial), a = t.data.bizContent.url,
              n = encodeURIComponent(t.data.bizContent.content);
            e.toFreeTrial({canTrial: i, imgUrl: a, content: n, fun: "2"})
          } else e.toNext()
        })
      }, checkFreeProcessRight: function (t, e) {
        var i = {
          methodName: "checkProcessRight",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {companyId: t.rootGetters.company.id}
        };
        C({url: d.apiBase("admin") + "/setting/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          t.data.success ? e.toNext() : e.toLimit()
        })
      }, checkFreeLiveRight: function (t, e) {
        var i = {
          methodName: "checkLiveRight",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {companyId: t.rootGetters.company.id, type: e.rightName}
        };
        C({url: d.apiBase("admin") + "/setting/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          if (31016 == t.data.code || 31020 == t.data.code) e.toLimit(); else if (0 === Number(t.data.bizContent.signUpFlag)) {
            var i = Number(t.data.bizContent.canTrial), a = t.data.bizContent.url,
              n = encodeURIComponent(t.data.bizContent.content);
            e.toFreeTrial({canTrial: i, imgUrl: a, content: n, fun: "3"})
          } else e.toNext()
        })
      }, freeTrailModuleFn: function (t, e) {
        var i = {
          methodName: e.methodName,
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {companyId: t.rootGetters.company.id}
        };
        C({url: d.apiBase("admin") + "/setting/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          e.callbackFn && e.callbackFn()
        })
      }, inquireTechnologySupportLink: function (t, e) {
        var i = {
          methodName: "inquireTechnologySupportLink",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {}
        };
        C({url: d.apiBase("admin") + "/index/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          e && e.callbackFn && e.callbackFn(t)
        })
      }, getTechnologySupportLink: function (t, e) {
        var i = {
          methodName: "getTechnologySupportLink",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {}
        };
        C({url: d.apiBase("admin") + "/index/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          e && e.callbackFn && e.callbackFn(t)
        })
      }, operateTechnologySupportLink: function (t, e) {
        var i = {
          methodName: "operateTechnologySupportLink",
          token: t.rootGetters.token,
          userId: t.rootGetters.user.id,
          jsonParam: {key: e.key, operate: e.operate}
        };
        C({url: d.apiBase("admin") + "/index/public/excute", method: "POST", data: p()(i)}).then(function (t) {
          e && e.callbackFn && e.callbackFn(t)
        })
      }
    }, pe = (i("sax8"), {
      namespaced: !0,
      state: {
        operationCard: [{
          operation: "创建考试",
          right: "allowPaperAdd",
          intro: "创建新试卷发布考试，或选择已有试卷发布考试",
          icon: "icon-exam",
          href: d.apiBase("admin") + "/examadmin/admin/paper_add_new"
        }, {
          operation: "创建课程",
          right: "allowCourseAdd",
          baseRight: "canCourse",
          intro: "选择课件创建课程，需先上传课件",
          icon: "icon-course",
          href: w.urlProject("/admin/course") + "/create"
        }, {
          operation: "创建每日学练",
          right: "allowExerciseAdd",
          baseRight: "canExercise",
          intro: "自由定制短、中、长期练习计划",
          icon: "icon-exercise",
          href: d.apiBase("admin") + "/exercise/admin/exercise_plan_add"
        }, {
          operation: "添加题目",
          right: "allowAddtestqm",
          intro: "手动录入题目至题库，支持批量录入、Excel导入题目",
          icon: "icon-question",
          href: d.apiBase("admin") + "/baseinfo/admin/online_import_html"
        }, {
          operation: "上传课件",
          right: "allowFileAdd",
          baseRight: "canFile",
          intro: "上传音视频、文档至课件管理模块的课件列表",
          icon: "icon-upload-file",
          href: d.apiBase("admin") + "/baseinfo/admin/file/manager?pageName=uploadFile"
        }, {
          operation: "添加学员",
          right: "allowUserAdd",
          intro: "在相关部门下新增学员，给学员分配账号等信息",
          icon: "icon-user",
          href: w.urlProject("/admin/user") + "/list?userAdd=1",
          key: "allowUserAdd"
        }, {
          operation: "创建自定义任务",
          right: "allowCustomProcessAdd",
          intro: "组合报名、课程、考试、证书、支付和红包形成任务",
          icon: "icon-process",
          href: w.urlProject("/admin/customprocess") + "/create"
        }, {
          operation: "创建报名",
          right: "allowSignUpAdd",
          intro: "自定义报名表满足各类信息填写和上传，报名注册一步完成",
          icon: "icon-application",
          href: w.urlProject("/admin/application") + "/sheet"
        }, {
          operation: "创建证书",
          right: "allowCertificateAdd",
          intro: "自由定制个性化证书、准考证",
          icon: "icon-certificate",
          href: d.apiBase("admin") + "/process/certificate/certificate_center?pageName=createCertificate"
        }],
        indexInfo: {
          isVisitFirst: !1,
          loginUrl: "",
          exerciseUrl: "",
          jwtInfo: "",
          examings: [],
          courseUsingList: [],
          processUsingList: [],
          exercisings: [],
          isDangjian: !1,
          sourceFrom: "adminIndex",
          message: 1,
          pushNotification: "",
          publicNotification: {},
          isPopUpHfPromotion: 0,
          companyConfig: {
            onlineLimit: 0,
            onlineCount: 0,
            onlinePercent: 0,
            countLimit: 0,
            userCounts: 0,
            userPercent: 0,
            userIsLimit: !1,
            exerciseCountLimit: 0,
            exerciseCount: 0,
            exercisePercent: 0,
            exerciseIsLimit: !1,
            spaceLimit: 0,
            spaceSize: 0,
            spacePercent: 0,
            frequencyDeficiency: !1,
            haveConsumerSumFlow: 0,
            haveConsumerSumPrecent: 0,
            sumFlow: 0,
            versionName: "-"
          }
        },
        huiValue: {
          option: {
            title: {},
            tooltip: {},
            legend: {data: []},
            radar: {
              name: {textStyle: {color: "#6D717C", backgroundColor: "#FFF", borderRadius: 3, fontSize: 10}},
              indicator: [{name: "参与率", max: 100}, {name: "参与时间", max: 100}, {name: "分享", max: 100}, {
                name: "复习",
                max: 100
              }, {name: "击败率", max: 100}, {name: "正确率", max: 100}],
              nameGap: 4,
              axisLine: {lineStyle: {color: "#F1F3F8"}},
              splitArea: {areaStyle: {color: "#FFF"}},
              splitLine: {lineStyle: {color: "#F1F3F8"}}
            },
            series: [{
              name: "",
              type: "radar",
              data: [{value: [0, 0, 0, 0, 0, 0], name: "会值"}],
              areaStyle: {normal: {color: "rgba(60,130,253,0.10)"}},
              color: "#3C82FD"
            }]
          }, data: {modifiedTime: "0000-00-00", canValueThisWeek: "0.00", beatRatio: "0.00"}
        },
        dialogs: {changeLog: {showState: !1}}
      },
      getters: {
        operationCard: function (t) {
          return t.operationCard
        }, indexInfo: function (t) {
          return t.indexInfo
        }, huiValueOption: function (t) {
          return t.huiValue.option
        }, huiValueData: function (t) {
          return t.huiValue.data
        }, dialogs: function (t) {
          return t.dialogs
        }
      },
      actions: {
        checkBaseRights: function (t, e) {
          e && "staff" == e.role && (window.location.href = w.urlProject("/admin/index") + "/info")
        }, getIndexInfo: function (t) {
          var e = {
            methodName: "getIndexInfo",
            token: t.rootGetters.token,
            userId: t.rootGetters.user.id,
            jsonParam: {}
          };
          C({method: "POST", data: p()(e)}).then(function (e) {
            var i = e;
            i.success && (t.state.indexInfo = i.bizContent, i.bizContent.publicNotification ? t.state.dialogs.changeLog.showState = !0 : t.state.indexInfo.publicNotification = {})
          })
        }, getHuiValue: function (t, e) {
          C({
            method: "GET",
            url: d.apiBase("admin") + "/exercise/report/organize_can_value?companyId=" + t.rootGetters.company.id
          }).then(function (i) {
            var a = i;
            if (a && a.success) {
              var n = a.bizContent;
              t.state.huiValue.option.series[0].data[0].value = [n.exerciseRateScore, n.involveTimeScore, n.shareScore, n.reviewScore, n.beatRatioScore, n.correctRatioScore], t.state.huiValue.data.modifiedTime = n.modifiedTime, t.state.huiValue.data.canValueThisWeek = n.canValueThisWeek, t.state.huiValue.data.beatRatio = n.beatRatio
            }
            e.callbackFn && e.callbackFn()
          })
        }, readChangeLog: function (t, e) {
          var i = {
            methodName: "getIndexInfo",
            token: t.rootGetters.token,
            userId: t.rootGetters.user.id,
            jsonParam: {}
          };
          C({method: "POST", data: p()(i), url: d.apiBase("admin") + "/index/admin/read_public"}).then(function (t) {
            t && t.success
          })
        }, exerciseFreeExp: function (t, e) {
          var i = {
            methodName: "hfPromotionCap",
            token: t.rootGetters.token,
            userId: t.rootGetters.user.id,
            jsonParam: {}
          }, a = e.$message;
          C({
            method: "POST",
            data: p()(i),
            url: d.apiBase("admin") + "/login/account/indexHfPromotionCap"
          }).then(function (t) {
            t && t.success ? a({
              message: "您的体验申请已成功提交！",
              type: "success"
            }) : a.error("您的体验申请提交失败，请重试！"), e.callbackFn && e.callbackFn()
          })
        }
      }
    });
    Vue.use(Vuex);
    var he = new Vuex.Store({state: $t, getters: a, mutations: ue, actions: me, modules: {index: pe}, plugins: []});
    Vue.config.productionTip = !1, new Vue({
      el: "#app",
      router: zt,
      store: he,
      components: {App: s},
      template: "<App/>"
    })
  }, "2d1R": function (t, e) {
  }, "6aJm": function (t, e) {
  }, "7C2x": function (t, e) {
  }, AVXi: function (t, e) {
  }, Amau: function (t, e) {
  }, DnGG: function (t, e) {
  }, Docd: function (t, e) {
  }, FrwU: function (t, e) {
  }, LgEi: function (t, e) {
  }, OMN4: function (t, e) {
    t.exports = axios
  }, SJI6: function (t, e) {
    t.exports = Vuex
  }, ieZk: function (t, e) {
  }, pRNm: function (t, e) {
    t.exports = VueRouter
  }, zMMH: function (t, e) {
  }
}, [0]);
