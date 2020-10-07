///导入 辅助js
import utils from '@/utils/utils.js'

//导入歌曲实体类
import {
  Song, //歌曲信息
  SongSheet, //歌单
  Album, //专辑
  Mv, //mv
  Albums, //有声读物
  UserInfo, //用户信息
} from '@/utils/entity.js'


/**
 * 根据关键字搜索歌曲，并返回歌曲的详细信息 ，根据类型不同返回不同的实体类
 * @param {String} keyWord  搜索关键字
 * @param {Number} type 1（单曲搜索|默认值）；2（歌单搜索）；3（专辑搜索）；4（MV搜索）；5（长音频搜索）
 * @param {Number} page 搜索返回页数 默认1
 * @param {Number} pageSize  搜索返回每页的个数 默认2
 */
function searchSong(keyWord, type, page, pageSize) {
  var obj = {
    "res": null
  }

  switch (type) {
    //歌曲
    case 1:
      var song = new Song(new Array(), new Array(), 0)
      MiniApp.searchSource({
        type: type,
        keyword: keyWord,
        page: page,
        pageSize: pageSize,
        success: (res) => {
          //1 歌曲id
          for (let i = 0; i < res.song_data_list.length; i++)
            song.album_audio_ids.push(res.song_data_list[i].album_audio_id)

          //2 歌曲信息 歌曲长度 单位是 毫秒
          song.duration = parseInt(res.song_data_list[0].audio_info.duration)
          //3 设置专辑图片
          for (let i = 0; i < res.song_data_list.length; i++)
            song.image_list.push(res.song_data_list[i].album_sizable_cover.replace('{size}/', ''))

          obj.res = res

        },
        error: (err) => {
          console.error(err)
        }
      })
      return song
      //return song
      //搜歌单并封装为实体类
    default:
      var songSheet = new SongSheet()
      MiniApp.searchSource({
        type: type,
        keyword: keyWord,
        page: page,
        pageSize: pageSize,
        success: (res) => {
          obj.res = res
          utils.sendMsgToPC({
            "msg": JSON.stringify(res),
            'type': type
          }, {
            "type": 'post'
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
      return obj
      break;
      utils.sendMsgToPC({
        "msg": JSON.stringify(res),
        'type': type
      }, {
        "type": 'post'
      })
      //专辑
      /*case 3:
        break;

        //mv
      case 4:
        break;

        //有声读物
      case 5:
        break;*/
  }

}

/** 获取mv信息*/
function getMv(mvIdList) {
  let that = this
  MiniApp.getMVsDetail({
    mv_ids: mvIdList,
    success: function (res) {
      utils.sendMsgToPC({
        "msg": JSON.stringify(res)
      }, {
        type: 'get'
      })
    },
    error: function (err) {
      console.error(err);
    }
  })
}

export default {
  searchSong,
  getMv,
}