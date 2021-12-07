import { apiHelper } from "../utils/apis";

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  getUser({userId}) {
    return apiHelper.get(`/users/${userId}`)
  }
}