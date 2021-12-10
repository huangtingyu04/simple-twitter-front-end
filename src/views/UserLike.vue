<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile
          :current-user="currentUser"
          :user="user"
          :tweets-count="tweetsCount"
          @add-follow="addFollow"
          @delete-follow="deleteFollow"
        />
        <UserLikeItems
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
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
      user: {
        id: 0,
        name: "",
        account: "",
        email: "",
        introduction: "",
        avatar: "",
        cover: "",
        followingsLength: 0,
        followersLength: 0,
        isFollower: false,
      },
      tweetsCount: 0,
      tweets: [],
      tweetItem: {},
      likes: [],
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchTweet({ userId });
    this.fetchLike({ userId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchTweet({ userId });
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
        const { user, tweets } = data;
        const {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          Followers,
          Followings,
          
        } = user;
        this.user = {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          followersLength: Followers.length,
          followingsLength: Followings.length,
        };
        this.tweets = tweets;
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取得使用者推文資訊",
        });
      }
    },
    async fetchTweet({ userId }) {
      try {
        const response = await usersAPI.getUserTweets({ userId });
        const { data } = response;
        const { tweets } = data;
        this.tweetsCount = tweets.length;
      } catch (error) {
        console.log(error);
      }
    },
    createNewTweet() {
      this.tweetsCount += 1
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.filter(tweet => tweet.TweetId === tweetId)[0]
      console.log(this.tweetItem)
    },
    createNewReply(payload) {
      const { replyId, tweetId, text, User } = payload;
      console.log(replyId, tweetId, text, User);
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            commentsLength: tweet.commentsLength + 1,
          };
        } else {
          return { ...tweet };
        }
      });
    },
    addLiked(tweetId) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            likesLength: tweet.likesLength + 1,
            isLiked: true,
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
            likesLength: tweet.likesLength - 1,
            isLiked: false,
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