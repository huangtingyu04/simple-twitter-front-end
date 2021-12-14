import { apiHelper } from "../utils/apis";

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, {formData})
  },
  // 上傳大頭貼與名稱自介
  upload({ userId, formData }) {
    return apiHelper.put(`/users/${userId}/revise`, { formData })
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getUserFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getUserFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getPopularUsers() {
    return apiHelper.get('users/top')
  },
  addFollow( {userId} ) {
    return apiHelper.post(`/followships/`, { userId })
  },
  deleteFollow( {userId} ) {
    return apiHelper.delete(`/followships/${userId}`)
  }
}