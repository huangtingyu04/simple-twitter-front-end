import moment from "moment/min/moment-with-locales"
moment.locale('zh-tw')

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://github.com/huangtingyu04/simple-twitter-front-end/blob/main/src/image/default%20cover.png'
    }
  }
}