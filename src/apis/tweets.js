import { apiHelper } from "../utils/apis";

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getTweet( tweetId ) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getTweetReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  create( {comment} ) {
    return apiHelper.post('/tweets', { comment} )
  },
  reply( tweetId, reply ) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, reply )
  },
  addLike({tweetId}) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  deleteLike({tweetId}) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  },
}