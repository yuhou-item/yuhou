import axios from 'axios'
/**
 * 将信息发送到我的电脑的后台服务器，因为傻逼的 vconsole 不能复制调试信息
 * @param {String} params  发送的信息对象
 * @param {Object} obj  请求参数 ，一般是 {"type":"get"}
 */
function sendMsgToPC(params, obj) {
  if (obj.type === 'get') { //get 请求
    axios.get("/demo/kugou/receive", {
      params: params
    }).then(res => {
      console.log('请求成功', res);
    }).catch(err => {
      console.log('请求失败', err);
    })
  } else { // post 请求
    axios.get("/demo/kugou/accept", {
      params: params
    }).then(res => {
      console.log('请求成功', res);
    }).catch(err => {
      console.log('请求失败', err);
    })
  }
}

/**将歌曲时长转为时间 @param duration [number] duration 毫秒 */
function parseDurationToTime(duration) {
  var date = new Date(duration);
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (minute < 10)
    minute = '0' + minute
  if (second < 10)
    second = '0' + second
  return `${minute}:${second}`
}

//判断是不是全面屏手机
function judgeBigScreen() {
  const res = window.MiniApp.getSystemInfoSync()
  let result = false;
  const rate = res.windowHeight / res.windowWidth;
  let limit = res.windowHeight == res.screenHeight ? 1.8 : 1.65; // 临界判断值
  if (rate > limit) {
    result = true;
  }
  return result;
}

export default {
  sendMsgToPC,
  parseDurationToTime,
  judgeBigScreen,
}