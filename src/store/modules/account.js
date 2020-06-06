import db from 'utils/localstorage'

export default {
  namespaced: true,
  state: {
    ksx: db.get('KSX_USER'),
    editWang: db.get('EDITOR_OBJ'),
    token: db.get('USER_TOKEN'),
    expireTime: db.get('EXPIRE_TIME'),
    user: db.get('USER'),
    permissions: db.get('PERMISSIONS'),
    roles: db.get('ROLES')
  },
  mutations: {
    setKsx (state, val) {
      db.save('KSX_USER', val)
      state.ksx = val
    },
    setEdit (state, val) {
      db.save('EDITOR_OBJ', val)
      state.editWang = val
    },
    setToken (state, val) {
      db.save('USER_TOKEN', val)
      state.token = val
    },
    setExpireTime (state, val) {
      db.save('EXPIRE_TIME', val)
      state.expireTime = val
    },
    setUser (state, val) {
      db.save('USER', val)
      state.user = val
    },
    setPermissions (state, val) {
      db.save('PERMISSIONS', val)
      state.permissions = val
    },
    setRoles (state, val) {
      db.save('ROLES', val)
      state.roles = val
    }
  }
}
