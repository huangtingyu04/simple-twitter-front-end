<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <TweetContent :tweet="tweet"/>
        <ReplyItems :replies="replies"/>
        <TweetReplyModal :tweet-item="tweetItem"/>
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
const dummyData = {
  tweet: {
    id: 56,
    text: "Autem veniam tempore fdsfk iore jklerkjadkf adwerr jke trwertre opldlszl dfsdfwer.",
    UserId: 2,
    createdAt: "2021-11-23T07:25:29.000Z",
    updatedAt: "2021-11-23T07:25:29.000Z",
    User: {
      id: 2,
      name: "user1",
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
      isAdmin: false,
      image: "https://i.imgur.com/RnQRoJb.png",
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-26T04:22:35.000Z",
    },
    Replies: [
      {
        id: 1,
        UserId: 1,
        User: {
          name: "Mary Jane",
          account: "mjjane",
          image: "https://i.imgur.com/MRdy9z2.png",
        },
        createdAt: "2019-06-22T09:00:43.000Z",
        text: "Great~",
      },
      {
        id: 2,
        UserId: 221,
        User: {
          name: "Squishy Tom",
          account: "sushiTom",
          image: "https://i.imgur.com/a0BP98T.png",
        },
        createdAt: "2019-06-22T09:00:43.000Z",
        text: "Good Job!",
      },
      {
        id: 3,
        UserId: 13,
        User: {
          name: "Moter Forker",
          account: "moterforker",
          image: "https://i.imgur.com/RGxqLdu.png",
        },
        createdAt: "2019-06-22T09:00:43.000Z",
        text: "Moter Forker!",
      },
    ],
    Likes: [{}, {}],
    isLiked: true,
  },
};

import Navbar from "./../components/Navbar";
import PopularUsersCard from "./../components/PopularUsersCard";
import TweetContent from "./../components/TweetContent.vue";
import ReplyItems from "./../components/ReplyItems.vue";
import TweetReplyModal from "./../components/TweetReplyModal.vue"

export default {
  name: "Tweet",
  components: {
    Navbar,
    TweetContent,
    ReplyItems,
    TweetReplyModal,
    PopularUsersCard,
  },
  data() {
    return {
      tweet: {
        id: 1,
        name: "",
        account: "",
        image: "",
        text: "",
        replyLength: 0,
        likeLength: 0,
        isLiked: false,
      },
      tweetItem: {},
      replies: [],
    };
  },
  created() {
    this.fetchTweet();
  },
  methods: {
    fetchTweet() {
      const { id, createdAt, updatedAt, User, Replies, text, Likes, isLiked } =
        dummyData.tweet;
      this.tweet = {
        id,
        createdAt,
        updatedAt,
        name: User ? User.name : "匿名",
        account: User ? User.account : "匿名",
        image: User ? User.image : "",
        text,
        replyLength: Replies ? Replies.length : 0,
        likeLength: Likes ? Likes.length : 0,
        isLiked,
      };
      this.tweetItem = {
        id,
        text,
        createdAt,
        User,
      };
      this.replies = Replies
    },
    addLike(tweetId) {
      console.log(tweetId);
      this.tweet.isLiked = true;
      this.tweet.likeLength = this.tweet.likeLength + 1;
    },
    deleteLike(tweetId) {
      console.log(tweetId);
      this.tweet.isLiked = false;
      this.tweet.likeLength = this.tweet.likeLength - 1;
    },
  },
};
</script>