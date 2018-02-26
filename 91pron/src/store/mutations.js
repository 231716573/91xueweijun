import * as types from './mutation-types'

const matutations = {
  [types.SET_ACTICLE](state, acticle) {
    state.acticle = acticle
    console.log(state.acticle)
  },
  [types.SET_ACTICLE_ID](state, id) {
    state.acticleId = id
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_NEWTOKEN](state, token) {
    state.newToken = token
  },
  [types.SET_SCHOOLID](state, id) {
    state.schoolId = id
  }
}

export default matutations
