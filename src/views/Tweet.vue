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
          :current-user="currentUser"
          @create-new-reply="createNewReply"
        />
        <TweetModal :current-user="currentUser"/>
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import PopularUsersCard from "./../components/PopularUsersCard";
import TweetContent from "./../components/TweetContent.vue";
import ReplyItems from "./../components/ReplyItems.vue";
import TweetReplyModal from "./../components/TweetReplyModal.vue";
import TweetModal from '../components/TweetModal.vue'

import tweetsAPI from "../apis/tweets";
import { errorToast } from "../utils/toast";
import { mapState } from "vuex"

export default {
  name: "Tweet",
  components: {
    Navbar,
    TweetContent,
    ReplyItems,
    TweetReplyModal,
    TweetModal,
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
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
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
      const { replyId, tweetId, comment, User } = payload;
      console.log(comment)
      this.replies.push({
        id: replyId,
        tweetId,
        comment,
        User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  },
};
</script>