import { apiHelper } from "../utils/apis";

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  create({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  reply( tweetId, reply ) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, reply )
  },
}