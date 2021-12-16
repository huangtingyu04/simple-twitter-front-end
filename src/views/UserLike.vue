<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <Spinner v-show="isLoading"/>
      <div class="main" v-show="!isLoading">
        <UserProfile
          :current-user="currentUser"
          :initial-user="user"
          @refresh="refresh"
        />
        <div v-if="tweets.length === 0" class="empty">使用者沒有任何喜歡的推文</div>
        <UserLikeItems
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
          @toggle-tweet-reply="toggleTweetReply"
          @refresh="refresh"
        />
        <UserEditModal 
          :current-user="currentUser"
          @refresh="refresh" />
        <TweetLikeReplyModal
          :current-user="currentUser"
          :tweet-item="tweetItem"
          @refresh="refresh"
        />
        <TweetModal :current-user="currentUser" @refresh="refresh" />
      </div>
      <PopularUsersCard @refresh="refresh" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { errorToast } from "../utils/toast";
import usersAPI from "../apis/users";

import Navbar from "./../components/Navbar";
import UserProfile from "../components/UserProfile.vue";
import UserLikeItems from "../components/UserLikeItems.vue";
import UserEditModal from "../components/UserEditModal.vue";
import TweetModal from "../components/TweetModal.vue";
import TweetLikeReplyModal from "../components/TweetLikeReplyModal.vue";
import Spinner from '../components/Spinner.vue'
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "UserLike",
  components: {
    Navbar,
    UserProfile,
    UserLikeItems,
    UserEditModal,
    TweetModal,
    TweetLikeReplyModal,
    Spinner,
    PopularUsersCard,
  },
  data() {
    return {
      user: {},
      tweetItem: {},
      tweets: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser({ userId });
    this.fetchLike({ userId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser({ userId });
    this.fetchLike({ userId });
    next();
  },
  methods: {
    async fetchLike({ userId }) {
      try {
        const response = await usersAPI.getUserLikes({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        this.tweets = data;
        this.tweetItem = this.tweets[0];
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取得使用者推文資訊",
        });
      }
    },
    async fetchUser({ userId }) {
      try {
        const response = await usersAPI.getUser({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        this.user = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.find((tweet) => tweet.TweetId === tweetId);
    },
    deleteLiked(tweetId) {
      this.tweets = this.tweets.filter((tweet) => tweet.TweetId !== tweetId);
    },
    userUpdate(payload) {
      const { name, introduction, avatar, cover } = payload;
      this.user.name = name;
      this.user.introduction = introduction;
      this.user.avatar = avatar;
      this.user.cover = cover;
    },
    refresh() {
      const { id: userId } = this.$route.params;
      this.fetchUser({ userId });
      this.fetchLike({ userId });
    },
  },
};
</script>

<style lang="sass" scoped>
.empty
  margin: 20px 
  font-size: 17px
  color: $input-label
</style>