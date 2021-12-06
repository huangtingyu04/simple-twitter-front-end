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
      return src || '../../public/images/default cover.png'
    }
  }
}