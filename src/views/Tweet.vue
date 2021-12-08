<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <TweetContent 
          :initial-tweet="tweet"
          :is-like="isLike" />
        <ReplyItems 
          :replies="replies"
          :tweet-target="tweetTarget" />
        <TweetReplyModal
          :tweet-item="tweetItem"
          :current-user="currentUser"
          @create-new-reply="createNewReply"
        />
        <TweetModal :current-user="currentUser" />
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
      },
      tweetItem: {},
      replies: [],
      isLike: false,
      isLoading: true,
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
        this.isLoading = true;
        const { data, statusText } = await tweetsAPI.getTweet({ tweetId });
        if (statusText !== "OK") {
          throw new Error();
        }
        console.log(data);
        const { tweet, tweetLikeCount, tweetReplyCount } = data;
        const {
          id,
          description,
          createdAt,
          Replies,
          User,
          Likes
        } = tweet;
        this.tweet = {
          id,
          name: User ? User.name : "匿名",
          account: User ? User.account : "匿名",
          avatar: User ? User.avatar : "",
          description,
          replyLength: tweetReplyCount,
          likeLength: tweetLikeCount,
          createdAt,
        };
        this.tweetItem = {
          id,
          description,
          createdAt,
          User,
        };
        this.replies = Replies, 
        this.tweetTarget = tweet.User.account
        // 判斷isLike
        if(Likes === []) {
          this.isLike = false
        } else {
          Likes.filter(like => {
            if(like.UserId === this.currentUser.id) {
              this.isLike = like.isLike
            } else {
              this.isLike = false
            }
          })
        }

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        errorToast.fire({
          title: "無法取得推文",
        });
      }
    },
    createNewReply(payload) {
      const { replyId, tweetId, comment, User } = payload;
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