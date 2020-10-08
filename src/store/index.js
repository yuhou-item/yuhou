import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    maxTime: 10, //最大答题时间
    countScore: 0,
    //答题次数
    countQuestion: 0,
    //答对次数
    countRight: 0,
    //成功答对单题用时，秒
    rightTime: 0,
    //成功答题总用时，秒
    countRightTime: 0,

  },
  getters: {
    getMaxTime(state) {
      return state.maxTime
    },
    getCountScore(state) {
      return state.countScore
    },
    getCountQuestion(state) {
      return state.countQuestion
    },
    getCountRight(state) {
      return state.countRight

    },
    getRightTime(state) {
      return state.rightTime
    },
    getCountRightTime(state) {
      return state.countRightTime
    }
  },
  mutations: {
    setMaxTime(state, maxTime) {
      state.maxTime = maxTime
    },
    setCountScore(state, newScore) {
      state.countScore = newScore
    },
    setCountQuestion(state) {
      state.countQuestion += 1
    },
    setCountRight(state) {
      state.countRight += 1

    },
    setRightTime(state, rightTime) {
      state.rightTime = rightTime
    },
    setCountRightTime(state, countRightTime) {
      state.countRightTime = countRightTime
    }
  },
  actions: {},
  modules: {}
})