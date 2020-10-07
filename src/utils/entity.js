/** 五种歌曲类型 type 1（单曲搜索|默认值）；2（歌单搜索）；3（专辑搜索）；4（MV搜索）；5（长音频搜索） */
/**
 * 歌曲实体类
 */
export class Song {
  constructor(album_audio_ids, image_list, duration) {
    //歌曲id
    this.album_audio_ids = album_audio_ids
    //歌曲图片
    this.image_list = image_list
    //歌曲长度
    this.duration = duration
  }
}

/**
 * 歌单实体类
 */
export class SongSheet {
  constructor(publish_time, flexible_cover, collection_name, global_collection_id, user_name, intro, song_count) {
    this.publish_time = publish_time
    this.flexible_cover = flexible_cover
    this.collection_name = collection_name
    this.global_collection_id = global_collection_id
    this.user_name = user_name
    this.intro = intro
    this.song_count = song_count
  }
}

/**
 * 专辑实体类
 */
export class Album {
  constructor(album_name, album_sizable_cover, album_id, author_name, song_count) {
    this.album_name = album_name
    this.album_sizable_cover = album_sizable_cover
    this.album_id = album_id
    this.author_name = author_name
    this.song_count = song_count
  }
}

/**
 *authors 是数组
 mv 实体类
 */
export class MV {
  constructor(
    sd_filesize, author_name, sizable_cover, fhd_filesize, mv_id,
    intro, mv_name, hd_filesize, mkv_sd_filesize, album_audio_id, authors, qhd_filesize
  ) {
    this.sd_filesize = sd_filesize
    this.author_name = author_name
    this.sizable_cover = sizable_cover
    this.fhd_filesize = fhd_filesize
    this.mv_id = mv_id
    this.intro = intro
    this.mv_name = mv_name
    this.hd_filesize = hd_filesize
    this.mkv_sd_filesize = mkv_sd_filesize
    this.album_audio_id = album_audio_id
    this.authors = authors
    this.qhd_filesize = qhd_filesize
  }
}

/**
有声读物
 */
export class Albums {
  constructor(album_name, album_id, author_name, sizable_cover, audio_count) {
    this.audio_count = audio_count
    this.album_id = album_id
    this.author_name = author_name
    this.sizable_cover = sizable_cover
    this.audio_count = audio_count
  }
}


/**
 * 用户信息实体类
 */
export class UserInfo {
  constructor(gender, avatarUrl, openid, nickName) {
    //性别 1男
    this.gender = gender

    //头像
    this.avatarUrl = avatarUrl

    //
    this.openid = openid

    //昵称
    this.nickName = nickName

  }
}