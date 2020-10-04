/*const MiniApp = window.MiniApp
const MusicPlayer = MiniApp.createMusicPlayer({
  isInner: true
})*/
import axios from 'axios'



//将信息发送到我的电脑的后台服务器，因为傻逼的 vconsole 不能复制调试信息
function sendMsgToPC(msg, obj) {
  if (obj.type === 'get') { //get 请求
    axios.get("/demo/kugou/receive", {
      params: {
        "msg": msg
      }
    }).then(res => {
      console.log('请求成功', res);
    }).catch(err => {
      console.log('请求失败', err);
    })
  } else { // post 请求
    axios.post("/demo/kugou/receive", {
      params: {
        "msg": msg
      }
    }).then(res => {
      console.log('请求成功', res);
    }).catch(err => {
      console.log('请求失败', err);
    })
  }
}


//跳转到指定播放位置 ,单位，秒
/*function seekToPosition(second) {
  MusicPlayer.seek({
    position: second
  })
}*/

export default {
  sendMsgToPC,
}