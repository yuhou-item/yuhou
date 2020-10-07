const MiniApp = window.MiniApp
import utils from '@/utils/utils.js'

/**
 * 登录
 */
function login() {
  MiniApp.listenOpenLogin({
    success(res) {
      console.log('登录成功', res)
    },
    fail() {
      console.error('登录失败')
    },
    complete() {
      console.log('完成登录')
    }
  })
}

/**
 * 获取用户信息
 */
function getUserInfo() {
  MiniApp.getUserInfo({
    success: (res) => {
      //存入cookie
      Cookies.set('userInfo', JSON.stringify(res))
      this.userInfo = JSON.parse(Cookies.get('userInfo'))
    },
    fail(res) {
      console.log(res)
    },
    complete(res) {
      console.log('完成')
    }
  })
}

/**
 * 小程序退出在后台
 */
function exit() {
  MiniApp.exitMiniApp({
    success: (res) => {
      console.log('成功退出', res)
    },
    fail: () => {
      console.log('失败')
    },
    complete: () => {
      console.log('完成')
    }
  })
}

/**
 * 获取用户当前位置
 */
function getLocation() {
  MiniApp.getLocation({
    success(res) {
      console.log('位置:', res)
    },
    fail: () => {
      console.log('失败')
    },
    complete: () => {
      console.log('完成')
    }
  })
}

/**
 * 获取用户存储空间信息
 */
function getDiskSpaceInfo() {
  MiniApp.getDiskSpaceInfo({
    success: (res) => {
      return res
    },
    fail: () => {
      console.log('失败')
    },
    complete: () => {
      console.log('完成')
    }
  })
}

export default {
  login,
  getUserInfo,
  exit,
  getLocation,
  getDiskSpaceInfo,

}