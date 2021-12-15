<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile
          :current-user="currentUser"
          :initial-user="user"
          @add-follow="addFollow"
          @delete-follow="deleteFollow"
        />
        <UserLikeItems
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
          @toggle-tweet-reply="toggleTweetReply"
          @delete-liked="deleteLiked"
        />
        <UserEditModal :current-user="currentUser" />
        <TweetLikeReplyModal
          :current-user="currentUser"
          :tweet-item="tweetItem"
          @create-new-reply="createNewReply"
        />
        <TweetModal
          :current-user="currentUser"
          @create-new-tweet="createNewTweet"
        />
      </div>
      <PopularUsersCard />
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
    PopularUsersCard,
  },
  data() {
    return {
      user: {},
      tweetItem: {},
      tweets: [],
      
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser({ userId });
    this.fetchLike({ userId });
    this.toggleTweetReply()
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
        console.log(response);
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        this.tweets = data.tweets
        this.tweetItem = this.tweets[0]
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
    createNewTweet() {
      this.tweetsCount += 1
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.find(tweet => tweet.TweetId === tweetId)
    },
    createNewReply(tweetId) {
      console.log(tweetId)
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.TweetId === tweetId) {
          return {
            ...tweet,
            ...tweet.Tweet,
            Replies: tweet.Tweet.Replies.push({})
          };
        } else {
          return { ...tweet };
        }
      });
      // console.log(this.tweets)
    },
    deleteLiked(tweetId) {
      console.log(tweetId)
      this.tweets = this.tweets.filter(tweet => tweet.TweetId !== tweetId);
    },
    userUpdate(payload) {
      const { name, introduction, avatar, cover } = payload;
      this.user.name = name;
      this.user.introduction = introduction;
      this.user.avatar = avatar;
      this.user.cover = cover;
    },
    addFollow() {
      this.user.isFollower = true;
      this.user.followersLength += 1
    },
    deleteFollow() {
      this.user.isFollower = false;
      this.user.followersLength -= 1
    },
  },
};
</script>