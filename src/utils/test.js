/**模拟请求的歌曲数据 */
//导入实体类
import {
  Song,
  Question,
} from '@/utils/entity.js'

/**
 * 模拟请求的歌曲数据
 */
function getRandomSong() {
  var song = new Song(["32072514", "108735213"], [
    'http://imge.kugou.com/kugouicon/165/20160427/20160427184517977230.jpg',
    'https://webimg.kgimg.com/df5fd7f05e8d6369442c1e362a9d3a50.png',
  ], 3 * 60 * 1000)
  return song
}

/**
 * 模拟选题]
 * @returns  数组对象
 */
function getRandomQuestionItem() {
  var size = 4 //选项个数
  var questionItemList = new Array()
  let item = null
  for (let i = 0; i < size; i++) {
    item = parseInt(Math.random() * 100 + 100) + '选项'
    questionItemList.push(new Question(item, item))
  }
  return questionItemList
}

function getRandomQuestion() {
  return getRandomName(3) + '是谁?'
}

// 获取指定范围内的随机数
function randomAccess(min, max) {
  return Math.floor(Math.random() * (min - max) + max)
}

// 解码
function decodeUnicode(str) {
  //Unicode显示方式是\u4e00
  str = "\\u" + str
  str = str.replace(/\\/g, "%");
  //转换中文
  str = unescape(str);
  //将其他受影响的转换回原来
  str = str.replace(/%/g, "\\");
  return str;
}

/*
 *@param Number NameLength 要获取的名字长度
 */
function getRandomName(NameLength) {
  let name = ""
  for (let i = 0; i < NameLength; i++) {
    let unicodeNum = ""
    unicodeNum = randomAccess(0x4e00, 0x9fa5).toString(16)
    name += decodeUnicode(unicodeNum)
  }
  return name
}



export default {
  getRandomSong,
  getRandomQuestionItem,
  getRandomQuestion,
}