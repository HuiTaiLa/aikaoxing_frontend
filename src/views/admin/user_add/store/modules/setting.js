import db from 'utils/localstorage'

export default {
  namespaced: true,
  state: {
    userList:db.get('USER_LIST',{
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
    }),

  },
  getters:{

  },
  actions:{

  },
  mutations: {
    setUserList(state,list){
      state.userList = list
      db.save('USER_LIST',list)
    },
    setDevice (state, isMobile) {
      state.isMobile = isMobile
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
