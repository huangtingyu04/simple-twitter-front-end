<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile :current-user="currentUser" :user="user" />
        <TweetItems
          :initial-tweets="likes"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
          @delete-liked="deleteLiked"
        />
        <UserEditModal :current-user="currentUser" />
        <TweetReplyModal
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
const dummyUser = {
  currentUser: {
    id: "1",
    name: "Apple",
    account: "apple",
    email: "apple@example.com",
    password: "12345678",
    introduction:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ametsint.",
    avatar: "https://i.imgur.com/RGxqLdu.png",
    cover: "https://i.imgur.com/ifqzNgs.png",
  },
};

const dummyData = {
  users: {
    id: "1",
    name: "Apple",
    account: "apple",
    email: "apple@example.com",
    password: "12345678",
    introduction:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ametsint.",
    avatar: "https://i.imgur.com/RGxqLdu.png",
    cover: "https://i.imgur.com/ifqzNgs.png",
    Followings: [
      {
        id: "1",
        name: "John Doe",
        email: "heyjohn@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 2,
          followeringId: 1,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
      {
        id: "3",
        name: "Macdonalds",
        email: "macdonalds@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 1,
          followeringId: 3,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
    ],
    Followers: [
      {
        id: "1",
        name: "John Doe",
        email: "heyjohn@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 1,
          followeringId: 2,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
      {
        id: "3",
        name: "Macdonalds",
        email: "macdonalds@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 3,
          followeringId: 2,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
    ],
    isLiked: true,
    // 推文被 like 的數量
    Likes: [
      {
        id: 56,
        text: "Autem veniam tempore.",
        isLiked: true,
        TweetId: 8,
        likesLength: 1,
        commentsLength: 1,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 57,
        text: "Autem veniam tempore.",
        isLiked: true,
        TweetId: 9,
        likesLength: 1,
        commentsLength: 1,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
    ],
    // 推文數量
    Tweets: [
      {
        id: 56,
        text: "Autem veniam tempore.",
        isLiked: false,
        likesLength: 52,
        commentsLength: 1,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 57,
        text: "從 isAuthenticated 的狀態可以了解此 token 是否有效，接著在「如果 token 無效則轉址到登入頁」，很自然的會寫出下面的程式碼（但這樣會導致無窮迴圈的問題.",
        isLiked: false,
        likesLength: 1,
        commentsLength: 1,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 59,
        text: "sdfsdf wertyyyuivmv rew hgfdhi kjhaopnc dsdfsdfy jhjklpubc.",
        likesLength: 1,
        commentsLength: 1,
        isLiked: false,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 60,
        text: "asdferr fdfdfsas rewerfsdf reweqrwerq.",
        likesLength: 0,
        commentsLength: 1,
        isLiked: false,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
    ],
  },
};

// import usersAPI from "../apis/users";
// import tweetsAPI from "../apis/tweets";
// import { mapState } from "vuex";
// import { errorToast } from "../utils/toast";

import Navbar from "./../components/Navbar";
import UserProfile from "../components/UserProfile.vue";
import TweetItems from "../components/TweetItems.vue";
import UserEditModal from "../components/UserEditModal.vue";
import TweetModal from "../components/TweetModal.vue";
import TweetReplyModal from "../components/TweetReplyModal.vue";
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "User",
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
      currentUser: {},
      user: {
        id: 0,
        name: "",
        account: "",
        email: "",
        introduction: "",
        avatar: "",
        cover: "",
        isLiked: false,
        followingsLength: 0,
        followersLength: 0,
        tweetsCount: 0,
      },
      tweets: [],
      tweetItem: {},
      likes: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.currentUser = dummyUser.currentUser;
      const {
        id,
        name,
        account,
        email,
        avatar,
        cover,
        introduction,
        Tweets,
        Likes,
        Followings,
        Followers,
        isLiked,
      } = dummyData.users;
      this.user = {
        id,
        name,
        account,
        email,
        avatar,
        cover,
        isLiked,
        followingsLength: Followings ? Followings.length : 0,
        followersLength: Followers ? Followers.length : 0,
        introduction,
        tweetsCount: Tweets ? Tweets.length : 0,
      };
      this.tweets = Tweets;
      this.likes = Likes;
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
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
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
  },
};
</script>