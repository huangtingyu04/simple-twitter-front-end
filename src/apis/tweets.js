import { apiHelper  } from "../utils/apis";

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getTweet({tweetId}) {
    return apiHelper.get(`/tweets/${tweetId}`)
  }
}