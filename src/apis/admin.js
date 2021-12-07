import { apiHelper } from "./../utils/apis"
const getToken = () => localStorage.getItem('token')


export default {
    tweets: {
        get() {
            return apiHelper.get('/admin/tweets', {
                headers: { Authorization: `Bearer ${getToken()}` }
            })
        },
        delete({ tweetId }) {
            return apiHelper.delete(`/admin/tweets/${tweetId}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            })
        }
    }
}