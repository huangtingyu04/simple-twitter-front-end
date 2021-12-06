<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <TweetContent :initial-tweet="tweet" />
        <ReplyItems 
          :replies="replies"
          :tweet-target="tweetTarget" />
        <TweetReplyModal
          :tweet-item="tweetItem"
          @create-new-reply="createNewReply"
        />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
// const dummyData = {
//   tweet: {
//     id: 56,
//     text: "Autem veniam tempore fdsfk iore jklerkjadkf adwerr jke trwertre opldlszl dfsdfwer.",
//     UserId: 2,
//     createdAt: "2021-11-23T07:25:29.000Z",
//     updatedAt: "2021-11-23T07:25:29.000Z",
//     User: {
//       id: 2,
//       name: "user1",
//       account: "user1",
//       email: "user1@example.com",
//       password: "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
//       isAdmin: false,
//       image: "https://i.imgur.com/RnQRoJb.png",
//       createdAt: "2021-11-23T07:25:29.000Z",
//       updatedAt: "2021-11-26T04:22:35.000Z",
//     },
//     Replies: [
//       {
//         id: 1,
//         UserId: 1,
//         User: {
//           name: "Mary Jane",
//           account: "mjjane",
//           image: "https://i.imgur.com/MRdy9z2.png",
//         },
//         createdAt: "2019-06-22T09:00:43.000Z",
//         text: "Great~",
//         tweetTarget: 'apple',
//       },
//       {
//         id: 2,
//         UserId: 221,
//         User: {
//           name: "Squishy Tom",
//           account: "sushiTom",
//           image: "https://i.imgur.com/a0BP98T.png",
//         },
//         createdAt: "2019-06-22T09:00:43.000Z",
//         text: "Good Job!",
//         tweetTarget: 'apple',
//       },
//       {
//         id: 3,
//         UserId: 13,
//         User: {
//           name: "Moter Forker",
//           account: "moterforker",
//           image: "https://i.imgur.com/RGxqLdu.png",
//         },
//         createdAt: "2019-06-22T09:00:43.000Z",
//         text: "Moter Forker!",
//         tweetTarget: 'apple',
//       },
//     ],
//     Likes: [{}, {}],
//     isLiked: true,
//   },
// };

import Navbar from "./../components/Navbar";
import PopularUsersCard from "./../components/PopularUsersCard";
import TweetContent from "./../components/TweetContent.vue";
import ReplyItems from "./../components/ReplyItems.vue";
import TweetReplyModal from "./../components/TweetReplyModal.vue";

import tweetsAPI from "../apis/tweets";
import { errorToast } from "../utils/toast";

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
        avatar: "",
        description: "",
        replyLength: 0,
        likeLength: 0,
        isLiked: false,
        createdAt: '',
      },
      tweetItem: {},
      replies: [],
      tweetTarget: "",
    };
  },
  created() {
    const { id: tweetId } = this.$route.params;
    this.fetchTweet({ tweetId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: tweetId } = to.params;
    this.fetchTweet({ tweetId });
    next();
  },
  methods: {
    async fetchTweet({ tweetId }) {
      try {
        const { data, statusText } = await tweetsAPI.getTweet({ tweetId });
        if (statusText !== "OK") {
          throw new Error();
        }
        console.log(data)
        const { tweet, tweetLikeCount, tweetReplyCount } = data;
        const {
          id,
          // UserId,
          description,
          createdAt,
          // updatedAt,
          // Likes,
          Replies,
          User,
        } = tweet;
        this.tweet = {
          id,
          name: User ? User.name : "匿名",
          account: User ? User.account : "匿名",
          avatar: User ? User.avatar : "",
          description,
          replyLength: tweetReplyCount,
          likeLength: tweetLikeCount,
          isLiked: false,
          createdAt,
        };
        this.tweetItem = {
          id,
          description,
          createdAt,
          User,
        };
        this.replies = Replies,
        this.tweetTarget = User ? User.account : ''
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取得推文",
        });
      }
      
      
      
    },
    createNewReply(payload) {
      const { replyId, tweetId, text, User } = payload;
      this.replies.push({
        id: replyId,
        tweetId,
        text,
        User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  },
};
</script>