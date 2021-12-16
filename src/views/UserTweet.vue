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
        <div v-if="tweets.length === 0" class="empty">使用者沒有任何推文</div>
        <TweetItems
          :initial-tweets="tweets"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
          @delete-liked="deleteLiked"
        />
        <UserEditModal
          :current-user="currentUser"
          @refresh="refresh"
        />
        <TweetReplyModal
          :tweet-item="tweetItem"
          :current-user="currentUser"
          @refresh="refresh"
        />
        <TweetModal
          :current-user="currentUser"
          @refresh="refresh"
        />
      </div>
      <PopularUsersCard @refresh="refresh"/>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { mapState } from "vuex";
import { errorToast } from "../utils/toast";

import Navbar from "./../components/Navbar";
import UserProfile from "../components/UserProfile.vue";
import TweetItems from "../components/TweetItems.vue";
import UserEditModal from "../components/UserEditModal.vue";
import TweetModal from "../components/TweetModal.vue";
import TweetReplyModal from "../components/TweetReplyModal.vue";
import Spinner from '../components/Spinner.vue'
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "UserTweet",
  components: {
    Navbar,
    UserProfile,
    TweetItems,
    UserEditModal,
    TweetModal,
    TweetReplyModal,
    Spinner,
    PopularUsersCard,
  },
  data() {
    return {
      user: {},
      tweets: [],
      tweetItem: {},
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchTweet({ userId });
    this.fetchUser({ userId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchTweet({ userId });
    this.fetchUser({ userId });
    next();
  },

  methods: {
    async fetchTweet({ userId }) {
      try {
        const response = await usersAPI.getUserTweets({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        this.tweets = data;
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
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
    },
    addLiked(tweetId) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            tweetLikeCount: tweet.tweetLikeCount + 1,
            isLike: true,
          };
        } else {
          return tweet;
        }
      });
    },
    deleteLiked(tweetId) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            tweetLikeCount: tweet.tweetLikeCount - 1,
            isLike: false,
          };
        } else {
          return tweet;
        }
      });
    },
    refresh() {
      const { id: userId } = this.$route.params;
      this.fetchTweet({ userId });
      this.fetchUser({ userId });
    }
  },
};
</script>

<style lang="sass" scoped>
.empty
  margin: 20px 
  font-size: 17px
  color: $input-label
</style>