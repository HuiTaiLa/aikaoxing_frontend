import db from 'utils/localstorage'
import account from './account'
import axios from 'axios'
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
  namespaced: true,
  state: {
    sidebar: {
      opened: true
    },
    settingBar: {
      opened: false
    },
    loading:false,
    isMobile: false,
    theme: db.get('THEME', 'light'),
    layout: db.get('LAYOUT', 'side'),
    systemName: '考试系统',
    companyId: '',
    companyName:'',
    copyright: `${new Date().getFullYear()} <a href="https://mrbird.cc" target="_blank">MrBird</a>`,
    multipage: getBooleanValue(db.get('MULTIPAGE'), false),
    fixSiderbar: getBooleanValue(db.get('FIX_SIDERBAR'), true),
    fixHeader: getBooleanValue(db.get('FIX_HEADER'), true),
    colorList: [
      'rgb(245, 34, 45)',
      'rgb(250, 84, 28)',
      'rgb(250, 173, 20)',
      'rgb(66, 185, 131)',
      'rgb(82, 196, 26)',
      'rgb(24, 144, 255)',
      'rgb(47, 84, 235)',
      'rgb(114, 46, 209)'
    ],
    ksx:db.get('ksxUser'),
    color: db.get('COLOR', 'rgb(24, 144, 255)'),
    tableColumns:db.get('TABLE_COLUMNS',["classification","difficult"]),
    selection:[],
    tableData:[],
    tableSearchInfo:{
      checkDup: "0",
      simpleSearch: !1,
      advancedSearch: !1,
      isSearching: !1,
      searchKey: "",
      advancedSearchKey: {creater: "", classification: "", type: "", difficult: "", testLabel: ""}
    }
  },
  getters: {
    getSelectedIds: function (t) {
      for (var e = t.selection, a = [], s = 0; s < e.length; s++) {
        var i = e[s];
        a.push(i.id)
      }
      return a.join(",")
    }
  },
  mutations: {
    setSelection(state,t){
      state.selection = t
    },
    resetQustAdvancedSearchKey(state){
      state.tableSearchInfo.advancedSearchKey = {creater: "", classification: "", type: "", difficult: "", testLabel: ""}
    },
    updateQustSearchStatus(state,b){
      state.tableSearchInfo.simpleSearch = b.simpleSearch
      state.tableSearchInfo.advancedSearch = b.advancedSearch
    },
    // resetQustCurrentPage(state){
    //   state.tableSearchInfo = {
    //     checkDup: "0",
    //     simpleSearch: !1,
    //     advancedSearch: !1,
    //     isSearching: !1,
    //     searchKey: state.tableSearchInfo.searchKey,
    //     advancedSearchKey: state.tableSearchInfo.advancedSearchKey
    //   }
    // },
    setQuestionCheckDup(state,command){
      state.tableSearchInfo.checkDup = command
    },
    setQuestionSimpleSearch(state,command){
      state.tableSearchInfo.simpleSearch = command
    },
    setQuestionAdvancedSearch(state,command){
      state.tableSearchInfo.advancedSearch = command
    },
    setQuestionIsSearching(state,command){
      state.tableSearchInfo.isSearching = command
    },
    setQuestionSearchKey(state,command){
      state.tableSearchInfo.searchKey = command
    },
    setAdvancedSearchKeyDifficult(state,value){
      state.tableSearchInfo.advancedSearchKey.difficult = value
    },
    setAdvancedSearchKeyType(state,value){
      state.tableSearchInfo.advancedSearchKey.type = value
    },
    setAdvancedSearchKeyClass(state,value){
      state.tableSearchInfo.advancedSearchKey.classification = value
    },
    setAdvancedSearchKeyCreater(state,value){
      state.tableSearchInfo.advancedSearchKey.creater = value
    },
    setAdvancedSearchKeyLabel(state,value){
      state.tableSearchInfo.advancedSearchKey.testLabel = value
    },
    setTableColumns(state,list){
      state.tableColumns = list
      db.save('TABLE_COLUMNS',list)
    },
    setTableData(state,data){
      state.tableData = data
    },
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setLoading (state,loading){
      state.loading = loading
    },
    setTheme (state, theme) {
      db.save('THEME', theme)
      state.theme = theme
    },
    setLayout (state, layout) {
      db.save('LAYOUT', layout)
      state.layout = layout
    },
    setMultipage (state, multipage) {
      db.save('MULTIPAGE', multipage)
      state.multipage = multipage
    },
    setSidebar (state, type) {
      state.sidebar.opened = type
    },
    fixSiderbar (state, flag) {
      db.save('FIX_SIDERBAR', flag)
      state.fixSiderbar = flag
    },
    fixHeader (state, flag) {
      db.save('FIX_HEADER', flag)
      state.fixHeader = flag
    },
    setSettingBar (state, flag) {
      state.settingBar.opened = flag
    },
    setColor (state, color) {
      db.save('COLOR', color)
      state.color = color
    },
  },
  actions: {
    delTestQuestion: function (t, e) {
      var a = e.$message, s = {
        methodName: "removeTestQm",
        account: account.state.user.account,
        companyId: account.state.user.companyId,
        questionIds: e.questionIds
      };
      t.state.loading = !0, request.post('/api/question/delTestQuestion',s).then(function (e) {
        e.data.success ? (t.state.loading = !1,  window.alert("删除成功！"), window.location.reload()) : window.alert("删除失败！")
      })
    }
  }
}

function getBooleanValue (value, defaultValue) {
  if (Object.is(value, null)) {
    return defaultValue
  }
  if (JSON.stringify(value) !== '{}') {
    return value
  } else {
    return false
  }
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
