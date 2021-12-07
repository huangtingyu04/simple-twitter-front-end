<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile :current-user="currentUser" :user="user" />
        <TweetItems
          :initial-tweets="tweets"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
          @delete-liked="deleteLiked"
        />
        <UserEditModal :current-user="currentUser" @user-update="userUpdate" />
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
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import tweetsAPI from "../apis/tweets";
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
      },
      tweets: [],
      tweetItem: {},
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    // this.fetchUser({ userId });
    this.fetchTweet({ userId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    // this.fetchUser({ userId });
    this.fetchTweet({ userId });
    next();
  },
  methods: {
    // async fetchUser({ userId }) {
    //   try {
    //     const response = await usersAPI.getUser({ userId });

    //     const { data, statusText } = response;
    //     if (statusText !== "OK") {
    //       throw new Error();
    //     }
    //     const { id, name, account, email, avatar, cover, introduction } =
    //       data.user;
    //     this.user = { id, name, account, email, avatar, cover, introduction };
    //   } catch (error) {
    //     console.log(error);
    //     errorToast.fire({
    //       title: "無法取得使用者資訊",
    //     });
    //   }
    // },
    async fetchTweet({ userId }) {
      try {
        const response = await usersAPI.getUserTweets({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        const { tweets, user } = data
        const { id, name, account, email, avatar, cover, introduction, FollowersCount, FollowingsCount, isFollower } = user
        this.user = { id, name, account, email, avatar, cover, introduction, followersLength: FollowersCount, followingsLength: FollowingsCount, isFollower }
        this.tweets = tweets
        console.log(response);
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取得使用者推文資訊",
        });
      }
    },
    createNewTweet(payload) {
      const { tweetId, text, User } = payload;
      this.tweets.push({
        id: tweetId,
        text: text,
        createdAt: new Date(),
        updatedAt: new Date(),
        User: User,
        LikeUsers: [],
        likesLength: 0,
        Comments: [],
        commentsLength: 0,
        isLiked: false,
      });
    },
    toggleTweetReply(tweetId) {
      console.log(tweetId)
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
    },
    createNewReply(payload) {
      const { replyId, tweetId, text, User } = payload;
      console.log(replyId, tweetId, text, User);
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            tweetReplyCount: tweet.tweetReplyCount + 1,
          };
        } else {
          return { ...tweet };
        }
      });
    },
    async addLiked(tweetId) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId });
        console.log(data);
        if(data.status !== 'success') {
          throw new Error(data.message)
        }
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
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法按讚",
        });
      }
    },
    async deleteLiked(tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId });
        console.log(data);
        if(data.status !== 'success') {
          throw new Error(data.message)
        }
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
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取消讚",
        });
      }
    },
    userUpdate(payload) {
      const { name, introduction, avatar, cover } = payload;
      this.user.name = name;
      this.user.introduction = introduction;
      this.user.avatar = avatar;
      this.user.cover = cover;
    },
  },
};
</script>