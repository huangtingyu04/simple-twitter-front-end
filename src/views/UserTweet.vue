<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile
          :current-user="currentUser"
          :initial-user="user"
          @refresh="refresh"
        />
        <TweetItems
          :initial-tweets="tweets"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
          @delete-liked="deleteLiked"
        />
        <UserEditModal
          :current-user="currentUser"
          @update-profile="handleUpdateProfile"
        />
        <TweetReplyModal
          :tweet-item="tweetItem"
          :current-user="currentUser"
          @create-new-reply="createNewReply"
        />
        <TweetModal
          :current-user="currentUser"
          @create-new-tweet="createNewTweet"
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
    PopularUsersCard,
  },
  data() {
    return {
      user: {},
      tweets: [],
      tweetItem: {},
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async handleUpdateProfile(formData) {
      try {
        const { data } = await usersAPI.update(
          { userId: this.user.id },
          formData
        );
        console.log(data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log(this.user.id);
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法編輯使用者個人資訊",
        });
      }
    },
    updated() {
      const { id: userId } = this.$route.params;
      this.fetchTweet({ userId });
      this.fetchUser({ userId });
    },
    createNewTweet() {
      this.updated()
    },
    toggleTweetReply(tweetId) {
      console.log(tweetId);
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
    },
    createNewReply() {
      this.updated()
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
    userUpdate(payload) {
      const { name, introduction, avatar, cover } = payload;
      this.user.name = name;
      this.user.introduction = introduction;
      this.user.avatar = avatar;
      this.user.cover = cover;
    },
    refresh() {
      const { id: userId } = this.$route.params;
      this.fetchTweet({ userId });
      this.fetchUser({ userId });
    }
  },
};
</script>