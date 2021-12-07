import { apiHelper } from "../utils/apis";

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  getUser({userId}) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({userId}) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies({userId}) {
    return apiHelper.get(`/users/${userId}/replies`)
  },
  addFollow({userId}) {
    return apiHelper.post(`/followships/${userId}`, null)
  },
  deleteFollow({userId}) {
    return apiHelper.delete(`/followships/${userId}`)
  }
}