<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <Spinner v-show="isLoading"/>
      <div class="main" v-show="!isLoading">
        <TweetContent :initial-tweet="tweet" />
        <ReplyItems :replies="replies" :tweet-target="tweetTarget" />
        <TweetReplyModal :tweet-item="tweetItem" @refresh="refresh" />
        <TweetModal @refresh="refresh"/>
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
import TweetModal from "../components/TweetModal.vue";
import Spinner from '../components/Spinner.vue'

import tweetsAPI from "../apis/tweets";
import { errorToast } from "../utils/toast";
import { mapState } from "vuex";

export default {
  name: "Tweet",
  components: {
    Navbar,
    TweetContent,
    ReplyItems,
    TweetReplyModal,
    TweetModal,
    Spinner,
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
        createdAt: "",
        isLike: false,
      },
      tweetItem: {},
      replies: [],
      isLoading: true,
      tweetTarget: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: tweetId } = this.$route.params;
    this.fetchTweet(tweetId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: tweetId } = to.params;
    this.fetchTweet(tweetId);
    next();
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        this.isLoading = true;
        const { data, statusText } = await tweetsAPI.getTweet(tweetId);
        if (statusText !== "OK") {
          throw new Error();
        }
        const {
          id,
          createdAt,
          description,
          isLike,
          tweetLikeCount,
          tweetReplyCount,
          User,
          Replies,
        } = data;
        (this.tweet = {
          id,
          name: User ? User.name : "",
          account: User ? User.account : "",
          avatar: User ? User.avatar : "",
          description,
          replyLength: tweetReplyCount,
          likeLength: tweetLikeCount,
          createdAt: createdAt,
          isLike: isLike,
        }),
          (this.tweetItem = { id, description, createdAt, User });
        (this.replies = Replies), (this.tweetTarget = data.User.account);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        errorToast.fire({
          title: "無法取得推文",
        });
      }
    },
    refresh() {
      const { id: tweetId } = this.$route.params;
      this.fetchTweet(tweetId);
    },
  },
};
</script>