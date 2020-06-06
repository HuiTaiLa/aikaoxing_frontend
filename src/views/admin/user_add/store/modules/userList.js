import axios from 'axios'
import account from './account'
// import {Message} from 'element-ui'
let _ = axios.create({
  // baseURL: 'http://mapengapi.enjoysala.top',
  responseType: 'json',
  validateStatus (status) {
    // 200 外的状态码都认定为失败
    return status === 200
  }
})

_.interceptors.request.use((config) => {
  // 有 token就带上
  if (account.state.token) {
    config.headers.Authentication = account.state.token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
export default {
  namespaced: !0,
  state: {
    departmentTree: [],
    defaultExpandedKeys: [],
    treeLoading: !1,
    currentDepId: "",
    searchInfo: {
      simpleSearch: !1,
      advancedSearch: !1,
      isSearching: !1,
      rowCount: 10,
      current: 1,
      searchKey: "",
      advancedSearchKey: {
        name: [],
        userName: [],
        sex: "",
        status: "",
        canValue: "",
        departmentIds: "",
        departmentNames: "",
        departmentKey: "",
        userLabelIds: "",
        phone: [],
        identityCard: "",
        position: "",
        email: "",
        isBindWechatDesc: "",
        bindStatus: "",
        notice: "",
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: ""
      },
      sort: {prop: "name", order: "desc"}
    },
    tableConfig: {
      tableInfo: [],
      columns: {
        sex: !0,
        phone: !1,
        identityCard: !1,
        // position: !0,
        email: !1,
        // isBindWechat: !1,
        // permission: !1,
        // bindStatus: !1,
        notice: !1,
        identityImg: !0,
        // userLabelNames: !1,
        field1: !1,
        field2: !1,
        field3: !1,
        field4: !1,
        field5: !1
      }
    },
    tableAttributes: {headerSelectionStatus: !1, selection: [], noSelection: [], canLoadMore: !0, loading: !1},
    userInfo: {
      userName: "",
      isReduplicated: !1,
      surname: "",
      canValue: "",
      passwordTmp: "",
      password: "",
      departmentId: "",
      departmentName: "",
      userLabelIds: "",
      userLabelNames: "",
      sex: 1,
      phone: "",
      identityCard: "",
      position: "",
      email: "",
      notice: "",
      identityImg: "",
      identityImgName: "",
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: ""
    },
    userInfoKeyName: {
      position: "职位",
      notice: "备注",
      identityImg: "证件照",
      identityCard: "证件号",
      field1: "字段1",
      field2: "字段2",
      field3: "字段3",
      field4: "字段4",
      field5: "字段5"
    },
    moduleRights: {exercise: !1},
    registConfig: [],
    importUserCallback: {succNum: "", warning: [], fail: []},
    dialogs: {
      userInfoAdd: !1,
      userInfoEdit: !1,
      importUser: {showState: !1, inProgress: !1},
      importDep: !1,
      depTree: {showState: !1, sureMethod: ""},
      multiDepTree: !1,
      importCallback: !1,
      advancedSearch: !1,
      userLabelTreeEdit: {showState: !1, data: []},
      userLabelTree: {showState: !1}
    },
    platformType: 0
  },
  getters: {
    departmentTree: function (e) {
      return e.departmentTree
    }, defaultExpandedKeys: function (e) {
      return e.defaultExpandedKeys
    }, treeLoading: function (e) {
      return e.treeLoading
    }, currentDepId: function (e, t) {
      return e.currentDepId
    }, searchInfo: function (e) {
      return e.searchInfo
    }, isSearching: function (e) {
      return e.searchInfo.isSearching
    }, nameTags: function (e) {
      return e.searchInfo.advancedSearchKey.name
    }, userNameTags: function (e) {
      return e.searchInfo.advancedSearchKey.userName
    }, phoneTags: function (e) {
      return e.searchInfo.advancedSearchKey.phone
    }, tableConfig: function (e) {
      return e.tableConfig
    }, columns: function (e) {
      return e.tableConfig.columns
    }, tableInfo: function (e) {
      return e.tableConfig.tableInfo
    }, tableAttributes: function (e) {
      return e.tableAttributes
    }, getSelection: function (e) {
      return e.tableAttributes.selection
    }, getSelectedIds: function (e) {
      var t = e.tableAttributes.selection, a = e.tableAttributes.noSelection, s = [], n = [], i = [], o = [],
        r = [], l = "";
      if (e.searchInfo.isSearching) for (var c = 0; c < t.length; c++) {
        var d = t[c];
        1 == d.type ? (s.push(d.id), r.push(d.id)) : n.push(d.id)
      } else {
        for (var u = 0; u < t.length; u++) {
          var p = t[u];
          1 == p.type ? (p.id == e.currentDepId ? l = p.id : s.push(p.id), r.push(p.id)) : n.push(p.id)
        }
        for (var m = 0; m < a.length; m++) {
          var h = a[m];
          1 == h.type ? i.push(h.id) : o.push(h.id)
        }
      }
      return {
        rootId: l,
        selectDepIds: s.join(","),
        selectUserIds: n.join(","),
        noSelectDepIds: i.join(","),
        noSelectUserIds: o.join(","),
        selectMoveDepIds: r.join(",")
      }
    }, userInfo: function (e) {
      return e.userInfo
    }, userInfoKeyName: function (e) {
      return e.userInfoKeyName
    }, registConfig: function (e) {
      return e.registConfig
    }, importUserCallback: function (e) {
      return e.importUserCallback
    }, dialogs: function (e) {
      return e.dialogs
    }, moduleRights: function (e) {
      return e.moduleRights
    }, platformType: function (e) {
      return e.platformType
    }
  },
  mutations: {
    UPDATE_CURRENT_DEP_ID: function (e, t) {
      e.currentDepId = t, e.defaultExpandedKeys = "" == t ? [] : [t]
    },
    RESET_CURRENT_PAGE: function (e) {
      e.searchInfo.current = 1
    },
    RESET_USER_INFO_FORM: function (e) {
      e.userInfo = {
        userName: "",
        isReduplicated: !1,
        surname: "",
        passwordTmp: "",
        password: "",
        departmentId: "",
        departmentName: "总部",
        userLabelIds: "",
        userLabelNames: "",
        sex: 1,
        phone: "",
        identityCard: "",
        position: "",
        email: "",
        notice: "",
        identityImg: "",
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: ""
      }
    },
    UPDATE_USER_INFO_FORM_DEP: function (e, t) {
      e.userInfo.departmentId = t.id, e.userInfo.departmentName = t.name
    },
    ENCRYPT_PASSWORD: function (e, t) {
      e.userInfo[t.key] = t.value
    },
    UPDATE_TABLE_COLUMNS: function (e, t) {
      t.columns ? e.tableConfig.columns = t.columns : e.tableConfig.columns[t.col] = !e.tableConfig.columns[t.col]
    },
    UPDATE_TABLE_SELECTION: function (e, t) {
      var a = t.selection;
      if (e.isSearching) e.tableAttributes.selection = a, e.tableAttributes.noSelection = []; else if (a.length > 0 && a[0].id == e.currentDepId) {
        for (var s = e.tableConfig.tableInfo, n = [], i = 0; i < s.length; i++) {
          for (var o = s[i], r = !1, l = 0; l < a.length; l++) {
            a[l].id == o.id && (r = !0)
          }
          0 == r && n.push(o)
        }
        e.tableAttributes.noSelection = n, e.tableAttributes.selection = a
      } else e.tableAttributes.noSelection = [], e.tableAttributes.selection = a
    },
    UPDATE_TABLE_SORT: function (e, t) {
      e.searchInfo.sort.prop = t.prop, e.searchInfo.sort.order = t.order
    },
    UPDATE_SEARCH_STATUS: function (e, t) {
      "keep" != t.simpleSearch && (e.searchInfo.simpleSearch = t.simpleSearch), "keep" != t.advancedSearch && (e.searchInfo.advancedSearch = t.advancedSearch)
    },
    RESET_SEARCH_KEY: function (e, t) {
      e.searchInfo.searchKey = ""
    },
    RESET_ADVANCED_SEARCH_KEY: function (e, t) {
      e.searchInfo.advancedSearchKey = {
        name: [],
        userName: [],
        sex: "",
        status: "",
        departmentIds: "",
        departmentNames: "",
        departmentKey: "",
        userLabelIds: "",
        phone: [],
        identityCard: "",
        position: "",
        email: "",
        isBindWechatDesc: "",
        notice: "",
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: ""
      }
    },
    UPDATE_SEARCH_TAGS: function (e, t) {
      e.searchInfo.advancedSearchKey[t.key] = t.value
    },
    UPDATE_SEARCH_DEP: function (e, t) {
      for (var a = [], s = [], n = 0; n < t.department.length; n++) {
        var i = t.department[n];
        a.push(i.id), s.push(i.name)
      }
      e.searchInfo.advancedSearchKey.departmentIds = a.join(","), e.searchInfo.advancedSearchKey.departmentNames = s.join(",")
    },
    updateImportUserCallback: function (e, t) {
      e.importUserCallback = t
    },
    QUESTION_IMG_UPLOAD: function (e, t) {
      e.userInfo.identityImg = t.imageId, e.userInfo.identityImgName = t.fileName
    },
    QUESTION_IMG_DELETE: function (e, t) {
      e.userInfo.identityImg = "", e.userInfo.identityImgName = "", t.dialogImageId = "", t.dialogImageName = ""
    },
  },
  actions: {
    getDepartmentsJson: function (e, t) {
      e.state.treeLoading = !0;
      var a = {
        account:account.state.user.account,
        companyId:account.state.user.companyId,
      };
      request.post('/api/dept/getDepartmentsJson',a).then(function (a) {
        var s = a.data;
        s.success && (e.state.departmentTree = s.bizContent, "frompointRank" != t.loadType && ("init" == t.loadType ? (e.commit("UPDATE_CURRENT_DEP_ID", e.getters.departmentTree[0].id), !e.state.departmentTree[0].onlyRead && e.dispatch("getDepUnderUserAndSubdep", {isLoadMore: !1})) : e.dispatch("getDepUnderUserAndSubdep", {isLoadMore: !1}))), e.state.treeLoading = !1
      })
    },
    getDepUnderUserAndSubdep: function (e, t) {
      e.state.tableAttributes.loading = !0, e.commit("UPDATE_SEARCH_STATUS", {
        simpleSearch: !1,
        advancedSearch: !1
      }), e.commit("RESET_SEARCH_KEY"), e.commit("RESET_ADVANCED_SEARCH_KEY"), t.isLoadMore || e.commit("RESET_CURRENT_PAGE"), e.state.searchInfo.isSearching = !1, e.state.tableAttributes.headerSelectionStatus = !1;
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        depId: e.getters.currentDepId,
        pages: e.getters.searchInfo.current,
        order: e.getters.searchInfo.sort.order,
        orderColumn: e.getters.searchInfo.sort.prop,
      };
      request.post('/api/dept/getDepUnderUserAndSubdep',a).then(function (a) {
        var s = a.data;
        if (s.success) {
          if (t.isLoadMore) for (var n = 0; n < s.bizContent.length; n++) e.state.tableConfig.tableInfo.push(s.bizContent[n]); else e.state.tableConfig.tableInfo = s.bizContent;
          e.state.tableAttributes.canLoadMore = !(s.bizContent.length < 20)
        }
        e.state.tableAttributes.loading = !1
      })
    },
    addDep: function (e, t) {
      var a = t.data, s = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        name: t.name,
        pId: a.id
      };
      request.post("/api/dept/addDep",s).then(function (t) {
        var s = t.data;
        s.success && (a.children || (a.children = []), a.children.push(s.bizContent), e.dispatch("getDepartmentsJson", {loadType: "update"}), e.dispatch("getDepUnderUserAndSubdep", {isLoadMore: !1}))
      })
    },
    updateDep: function (e, t) {
      var a = t.data, s = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        name: t.name,
        pId: a.pid,
        id: a.id
      };
      request.post('/api/dept/updateDep',s).then(function (s) {
        s.data.success && (a.name = t.name, e.dispatch("getDepUnderUserAndSubdep", {isLoadMore: !1}))
      })
    },
    deleteDep: function (e, t) {
      var a = t.node, s = t.data, n = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        id: s.id,
        del: t.del
      };
      request.post("/api/dept/deleteDep",n).then(function (n) {
        var i = n.data;
        if (i.success) {
          var o = a.parent, r = o.data.children || o.data, l = r.findIndex(function (e) {
            return e.id === s.id
          });
          r.splice(l, 1), s.id == e.state.currentDepId && e.commit("UPDATE_CURRENT_DEP_ID", e.getters.departmentTree[0].id), e.dispatch("getDepUnderUserAndSubdep", {isLoadMore: !1})
        } else {
          var c = t.$prompt, d = t.$message;
          31025 == i.code ? c("此部门下包含学员或部门，确认删除？", "", {
            customClass: "operation-warning",
            confirmButtonClass: "confirm",
            cancelButtonClass: "cancel",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^DEL$/,
            inputPlaceholder: "输入DEL确认删除",
            inputErrorMessage: "输入DEL确认删除",
            type: "warning",
            center: !0
          }).then(function (t) {
            t.value;
            e.dispatch("deleteDep", {node: a, data: s, del: !0})
          }).catch(function () {
          }) : 35006 == i.code && window.alert(i.desc)//({type: "error", message: i.desc})
        }
      })
    },
    moveDep: function (e, t) {
      var a = t.targetNodeData, s = t.sourceNodeData, n = t.$message, i = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: {move: t.dropType, sourceNodeId: s.id, targetNodeId: a.id, targetNodePid: a.pid}
      };
      i.jsonParam = JSON.stringify(i.jsonParam)
      request.post('/api/dept/moveDep',i).then(function (t) {
        t.data.success || n("拖动失败，请重试"), e.dispatch("tableReload", {reloadTree: !0})
      })
    },
    getSelfConfig: function (e, t) {
      var a = {
        methodName: "getSelfConfig",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {}
      };
      _({method: "POST", data: a}).then(function (e) {
        e.data.success
      })
    },
    getSelfName: function (e, t) {
      // var a = {methodName: "getSelfName", token: e.rootGetters.token, userId: e.rootGetters.user.id, jsonParam: {}};
      // _({method: "POST", data: a}).then(function (t) {
      //   var a = t.data;
      //   a.success && (e.state.userInfoKeyName = a.bizContent)
      // })
    },
    getExerciseRight: function (e, t) {
      // var a = {methodName: "", token: e.rootGetters.token, userId: e.rootGetters.user.id, jsonParam: {}};
      // _({
      //   data: a,
      //   method: "POST",
      //   url: e.rootGetters.api.apiBase("admin") + "/exercise/getRight"
      // }).then(function (t) {
      //   var a = t;
      //   a.success && (e.state.moduleRights.exercise = a.bizContent)
      // })
    },
    // getPlatformType: function (e, t) {
    //   var a = {methodName: "", token: e.rootGetters.token, userId: e.rootGetters.user.id, jsonParam: {}};
    //   _({
    //     data: a,
    //     method: "POST",
    //     url: e.rootGetters.api.apiBase("admin") + "/exercise/admin/getDeveloperInfo"
    //   }).then(function (t) {
    //     var a = t;
    //     a.success && (e.state.platformType = a.bizContent.platformType)
    //   })
    // },
    addUser: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: JSON.stringify(e.getters.userInfo)
      };
      request.post('/api/dept/addUser',a).then(function (a) {
        var s = a.data, n = t.$message;
        s.success ? (n(
          "添加成功！"
        ), e.state.dialogs.userInfoAdd = !1, setTimeout("window.location.href=window.location.href.replace('','');window.location.reload();", 1e3)) : 33003 == s.code ? e.state.userInfo.isReduplicated = !0 : n(
          s.desc
        )
      }).catch(function () {
        n("操作失败，请重试！")
      })
    },
    checkUnameExist: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        userName: e.getters.userInfo.userName
      };
      request.post('/api/dept/checkUnameExist',a).then(function (t) {
        t.data.success ? e.state.userInfo.isReduplicated = !0 : t.data.code == 555? (e.state.userInfo.isReduplicated = !1,window.alert(t.data.desc)):!1
      })
    },
    // checkPhoneExist: function (e, t) {
    //   var a = {
    //     account: account.state.user.account,
    //     companyId: account.state.user.companyId,
    //     phone: e.getters.userInfo.phone
    //   };
    //   request.post('/api/dept/checkPhoneExist',a).then(function (t) {
    //     t.data.success ? window.alert(t.data.desc): !1
    //   })
    // },
    getUser: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        id: t.id
      };
      request.post('/api/dept/getUser',a).then(function (a) {
        var s = a.data;
        if (s.success) {
          var n = s.bizContent;
          n.passwordTmp = "", n.password = "",n.sex = n.sex=='男'?1:n.sex=='女'?0:n.sex, e.state.userInfo = n, t.open()
        }
      })
    },
    editUser: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: e.getters.userInfo
      }, s = t.$message;
      a.jsonParam.isEditPass = t.isEditPass,a.jsonParam = JSON.stringify(a.jsonParam), request.post("/api/dept/editUser",a).then(function (t) {
        t.data.success ? (s(
          "修改成功！"
        ), e.state.dialogs.userInfoEdit = !1, e.dispatch("tableReload", {reloadTree: !0})) : s(
         "操作失败，请重试！"
        )
      }).catch(function () {
        s( "操作失败，请重试！")
      })
    },
    userMove: function (e, t) {
      var a = {
        methodName: "userMove",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {userId: t.userId, departmentId: t.departmentId}
      };
      a.jsonParam.isEditPass = t.isEditPass, _({method: "POST", data: a}).then(function (t) {
        t.data.success && e.dispatch("tableReload", {reloadTree: !0})
      })
    },
    delUser: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        userIds: t.userIds
      };
      request.post('/api/dept/delUser',a).then(function (a) {
        var s = a.data, n = t.$message;
        s.success ? (window.alert("删除成功"), e.dispatch("tableReload", {reloadTree: !0})) : window.alert("删除失败")
      }).catch(function () {
        window.alert("操作失败，请重试！")
      })
    },
    search: function (e, t) {
      e.state.tableAttributes.loading = !0, e.commit("UPDATE_CURRENT_DEP_ID", ""), e.state.searchInfo.isSearching = !0;
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: {
          pages: e.getters.searchInfo.current,
          searchKey: e.getters.searchInfo.searchKey,
          orderColumn: e.getters.searchInfo.sort.prop,
          order: e.getters.searchInfo.sort.order
        }
      };
      a.jsonParam = JSON.stringify(a.jsonParam);
      request.post('/api/dept/simple_search',a).then(function (a) {
        var s = a.data;
        if (s.success) {
          if (t.isLoadMore) for (var n = 0; n < s.bizContent.length; n++) e.state.tableConfig.tableInfo.push(s.bizContent[n]); else e.state.tableConfig.tableInfo = s.bizContent;
          e.state.tableAttributes.canLoadMore = !(s.bizContent.length < 20)
        }
        e.state.tableAttributes.loading = !1
      })
    },
    seniorSearch: function (e, t) {
      e.state.tableAttributes.loading = !0, e.state.searchInfo.isSearching = !0, e.commit("UPDATE_CURRENT_DEP_ID", "");
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: {
          pages: e.getters.searchInfo.current,
          orderColumn: e.getters.searchInfo.sort.prop,
          order: e.getters.searchInfo.sort.order
        }
      }, s = e.getters.searchInfo.advancedSearchKey;
      for (var n in s) s.hasOwnProperty(n) && (a.jsonParam[n] = s[n]);
      a.jsonParam = JSON.stringify(a.jsonParam);
      request.post('/api/dept/senior_search',a).then(function (a) {
        var s = a.data;
        if (s.success) {
          if (t.isLoadMore) for (var n = 0; n < s.bizContent.length; n++) e.state.tableConfig.tableInfo.push(s.bizContent[n]); else e.state.tableConfig.tableInfo = s.bizContent;
          e.state.tableAttributes.canLoadMore = !(s.bizContent.length < 20)
        }
        e.state.tableAttributes.loading = !1
      })
    },
    tableReload: function (e, t) {
      var a = e.getters.searchInfo;
      a.simpleSearch ? (e.commit("RESET_CURRENT_PAGE"), e.dispatch("search", {isLoadMore: !1})) : a.advancedSearch ? (e.commit("RESET_CURRENT_PAGE"), e.dispatch("seniorSearch", {isLoadMore: !1})) : t.reloadTree ? e.dispatch("getDepartmentsJson", {loadType: "update"}) : e.dispatch("getDepUnderUserAndSubdep", {isLoadMore: !1})
    },
    getUserLabelTree: function (e, t) {
      var a = {
        methodName: "userLabelTreeGetJson",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {}
      };
      _({method: "POST", data: a}).then(function (a) {
        var s = a.data;
        s.success && (e.state.dialogs.userLabelTreeEdit.data = s.bizContent, t.callbackFn && t.callbackFn())
      }).catch(function () {
      })
    },
    addUserLabel: function (e, t) {
      var a = {
        methodName: "userLabelAdd",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {labelName: t.name, pId: t.id}
      };
      _({method: "POST", data: a}).then(function (t) {
        t.data.success && e.dispatch("getUserLabelTree")
      }).catch(function () {
      })
    },
    editUserLabel: function (e, t) {
      var a = {
        methodName: "userLabelEdit",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {labelName: t.labelName, pId: t.pId, id: t.id}
      }, s = t.$message;
      _({method: "POST", data: a}).then(function (t) {
        var a = t.data;
        a.success ? e.dispatch("getUserLabelTree") : s({type: "error", message: a.desc ? a.desc : "编辑标签失败"})
      }).catch(function () {
      })
    },
    delUserLabel: function (e, t) {
      var a = {
        methodName: "userLabelDelete",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {id: t.id, del: t.del}
      };
      _({method: "POST", data: a}).then(function (t) {
        t.data.success && e.dispatch("getUserLabelTree")
      }).catch(function () {
      })
    },
    batchUpdateUserLabel: function (e, t) {
      var a = {
        methodName: "batchUpdateUserLabel",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {
          depIds: e.getters.getSelectedIds.selectMoveDepIds,
          userIds: e.getters.getSelectedIds.selectUserIds,
          targetLabel: t.targetLabel
        }
      }, s = t.$message;
      _({method: "POST", data: a}).then(function (t) {
        t.data.success && (s({type: "success", message: "标签调整成功！"}), e.dispatch("tableReload", {reloadTree: !1}))
      }).catch(function () {
      })
    },
    exportUserByDepNode: function (e, t) {
      var a = {
        methodName: "exportUserByDepNode",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {rootId: e.getters.currentDepId}
      }, s = t.$message;
      _({method: "POST", data: a}).then(function (e) {
        e.data.success ? s({type: "success", message: "导出成功，请到消息中心查看！"}) : s({type: "error", message: "操作失败，请重试！"})
      }).catch(function () {
        s({type: "error", message: "操作失败，请重试！"})
      })
    },
    exportUserBySearch: function (e, t) {
      var a = {
        methodName: "exportUserBySearch",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {searchKey: e.getters.searchInfo.searchKey}
      }, s = t.$message;
      _({method: "POST", data: a}).then(function (e) {
        e.data.success ? s({type: "success", message: "导出成功，请到消息中心查看！"}) : s({type: "error", message: "操作失败，请重试！"})
      }).catch(function () {
        s({type: "error", message: "操作失败，请重试！"})
      })
    },
    exportUserBySeniorSearch: function (e, t) {
      var a = {
        methodName: "exportUserBySeniorSearch",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {}
      }, s = e.getters.searchInfo.advancedSearchKey;
      for (var n in s) s.hasOwnProperty(n) && (a.jsonParam[n] = s[n]);
      _({method: "POST", data: a}).then(function (e) {
        var a = e.data, s = t.$message;
        a.success ? s({type: "success", message: "导出成功，请到消息中心查看！"}) : s({type: "error", message: "操作失败，请重试！"})
      }).catch(function () {
        $message({type: "error", message: "操作失败，请重试！"})
      })
    },
    exportUserBySelect: function (e, t) {
      var a = {
        methodName: "exportUserBySelect",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {
          rootId: e.getters.getSelectedIds.rootId,
          selectDepIds: e.getters.getSelectedIds.selectDepIds,
          selectUserIds: e.getters.getSelectedIds.selectUserIds,
          noSelectDepIds: e.getters.getSelectedIds.noSelectDepIds,
          noSelectUserIds: e.getters.getSelectedIds.noSelectUserIds
        }
      };
      _({method: "POST", data: a}).then(function (e) {
        var a = e.data, s = t.$message;
        a.success ? s({type: "success", message: "导出成功，请到消息中心查看！"}) : s({type: "error", message: "操作失败，请重试！"})
      }).catch(function () {
        $message({type: "error", message: "操作失败，请重试！"})
      })
    },
    batchMoveDepAndUser: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: {
          depIds: e.getters.getSelectedIds.selectMoveDepIds,
          userIds: e.getters.getSelectedIds.selectUserIds,
          targetDep: t.targetDep,
          rootId: e.getters.currentDepId
        }
      };
      a.jsonParam = JSON.stringify(a.jsonParam)
      request.post('/api/dept/batchMoveUser',a).then(function (a) {
        var s = a.data, n = t.$message;
        s.success ? (e.dispatch("getDepartmentsJson", {loadType: "update"}), n(s.desc
        )) : n(s.desc)
      })
    },
    batchDelUser: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: {
          rootId: e.getters.getSelectedIds.rootId,
          selectDepIds: e.getters.getSelectedIds.selectMoveDepIds,
          selectUserIds: e.getters.getSelectedIds.selectUserIds,
          noSelectDepIds: e.getters.getSelectedIds.noSelectDepIds,
          noSelectUserIds: e.getters.getSelectedIds.noSelectUserIds
        }
      }, s = t.$message;
      a.jsonParam = JSON.stringify(a.jsonParam);
      request.post('/api/dept/BatchDelDept',a).then(function (t) {
        var a = t.data;
        a.success ? (s("删除成功！"
        ), e.dispatch("getDepartmentsJson", {loadType: "update"})) : 35006 == a.code ? s(a.desc
        ) : s( "操作失败，请重试！")
      }).catch(function () {
        s( "操作失败，请重试！")
      })
    },
    verifyEmails: function (e, t) {
      var a = {
        methodName: "verifyEmails",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {
          rootId: e.getters.getSelectedIds.rootId,
          selectDepIds: e.getters.getSelectedIds.selectDepIds,
          selectUserIds: e.getters.getSelectedIds.selectUserIds,
          noSelectDepIds: e.getters.getSelectedIds.noSelectDepIds,
          noSelectUserIds: e.getters.getSelectedIds.noSelectUserIds
        }
      };
      _({method: "POST", data: a}).then(function (e) {
        var a = e.data, s = t.$message;
        a.success ? s({type: "success", message: "验证邮件已发送，请注意查收！"}) : s({type: "error", message: "操作失败，请重试！"})
      }).catch(function () {
        $message({type: "error", message: "操作失败，请重试！"})
      })
    },
    updatePassword: function (e, t) {
      var a = {
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        jsonParam: {
          rootId: e.getters.getSelectedIds.rootId,
          selectDepIds: e.getters.getSelectedIds.selectDepIds,
          selectUserIds: e.getters.getSelectedIds.selectUserIds,
          noSelectDepIds: e.getters.getSelectedIds.noSelectDepIds,
          noSelectUserIds: e.getters.getSelectedIds.noSelectUserIds,
          password: t.password
        }
      };
      a.jsonParam = JSON.stringify(a.jsonParam);
      request.post('/api/dept/BatchUpdatePassword',a).then(function (e) {
        var a = e.data, s = t.$message;
        a.success ? s("修改成功！") : s( "操作失败，请重试！")
      }).catch(function () {
        window.alert("操作失败，请重试！")
      })
    },
    editUserPermission: function (e, t) {
      var a = {
        methodName: "editUserPermission",
        token: e.rootGetters.token,
        userId: e.rootGetters.user.id,
        jsonParam: {
          userId: t.userId ? t.userId : "",
          rootId: e.getters.getSelectedIds.rootId,
          selectDepIds: e.getters.getSelectedIds.selectDepIds,
          selectUserIds: e.getters.getSelectedIds.selectUserIds,
          noSelectDepIds: e.getters.getSelectedIds.noSelectDepIds,
          noSelectUserIds: e.getters.getSelectedIds.noSelectUserIds,
          platform: t.platform,
          permission: t.permission,
          type: t.type
        }
      }, s = t.$message;
      _({
        url: e.rootGetters.api.apiBase("admin") + "/exercise/admin_user/excute",
        method: "POST",
        data: a
      }).then(function (t) {
        var a = t.data;
        a.success ? (s({
          type: "success",
          message: "修改成功！"
        }), e.dispatch("getDepartmentsJson", {loadType: "update"})) : s({type: "error", message: a.desc})
      }).catch(function () {
        s({type: "error", message: "操作失败，请重试！"})
      })
    }
  }
}

function containRole(id) {
  var flag=0;
  for(var i=0,len=account.state.roles.length;i<len;i++)
    if(account.state.roles[i].roleId == id){
       flag = !0
      break
  }
  return flag
}

const request = {
  post (url, params, config) {
    return _.post(url, params, config || {
      transformRequest: [(params) => {
        let result = ''
        if (typeof params === 'string') {
          // eslint-disable-next-line no-return-assign
          return result = params
        }
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  put (url, params) {
    return _.put(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  get (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return _.get(`${url}${_params}`)
    // return _.get(url, {
    //   params: params,
    //   paramsSerializer: params => {
    //     return qs.stringify(params, { indices: false })
    //   }})
  },

  delete (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return _.delete(`${url}${_params}`)
  },
  export (url, params = {}) {
    message.loading('导出数据中')
    return _.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      responseType: 'blob'
    }).then((r) => {
      const content = r.data
      const blob = new Blob([content])
      const fileName = `${new Date().getTime()}_导出结果.xlsx`
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, fileName)
      }
    }).catch((r) => {
      console.error(r)
      message.error('导出失败')
    })
  },
  download (url, params, filename) {
    message.loading('文件传输中')
    return _.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      responseType: 'blob'
    }).then((r) => {
      const content = r.data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((r) => {
      console.error(r)
      message.error('下载失败')
    })
  },
  upload (url, params) {
    return _.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
