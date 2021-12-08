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
      return src || 'https://media.istockphoto.com/photos/white-brick-wall-picture-id1250920176?b=1&k=20&m=1250920176&s=170667a&w=0&h=hXQiwcInam_MWs7AN8lshlZRW84zm9ORit027HJykws='
    }
  }
}