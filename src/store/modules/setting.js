import db from 'utils/localstorage'

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
  mutations: {
    resetQustAdvancedSearchKey(state){
      state.tableSearchInfo.advancedSearchKey = {creater: "", classification: "", type: "", difficult: "", testLabel: ""}
    },
    updateQustSearchStatus(state,b){
      state.simpleSearch = b.simpleSearch
      state.advancedSearch = b.advancedSearch
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
    setQuestionAdvancedSearchKey(state,key,value){
      state.tableSearchInfo.advancedSearchKey[key] = value
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
