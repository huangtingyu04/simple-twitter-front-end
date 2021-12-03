<template>
  <div class="tweets">
    <div class="tweet" v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-icon">
        <img :src="tweet.User.image" alt="user-icon" class="tweet-icon-photo" />
      </div>
      <div class="tweet-body">
        <div class="tweet-body-head">
          <div class="tweet-body-head-name">{{tweet.User.name}}</div>
          <div class="tweet-body-head-account">@{{ tweet.User.account }}</div>
          <span> · </span>
          <div class="tweet-body-head-time">{{ tweet.createdAt }}</div>
        </div>
        <router-link to="/tweets/1" class="tweet-body-content">{{ tweet.text }}</router-link>
        <div class="tweet-body-foot">
          <div class="tweet-body-foot-comment">
            <img
              src="../../public/images/icon_message_2x.png"
              alt="tweet-comment"
              class="tweet-body-foot-comment-icon"
              data-bs-toggle="modal"
              data-bs-target="#tweet-reply-modal"
              @click.prevent.stop="toggleTweetReply(tweet.id)"
            />
            <span class="tweet-body-foot-comment-count">{{tweet.Comments ? tweet.Comments.length: 0}}</span>
          </div>
          <div class="tweet-body-foot-liked">
            <img
              src="../../public/images/icon_like_2x.png"
              alt="tweet-liKed-icon"
              v-if="!tweet.isLiked"
              class="tweet-body-foot-liked-icon"
            />
            <img
              src="../../public/images/icon_like_fill_2x.png"
              alt="tweet-isLiked-icon"
              v-else
              class="tweet-body-foot-liked-icon"
            />
            <span class="tweet-body-foot-liked-count">{{tweet.LikeUsers ? tweet.LikeUsers.length: 0}}</span>
          </div>
        </div>
      </div>
      <TweetReplyModal 
        :tweet-item="tweetItem"
        @create-new-reply="createNewReply" />
    </div>
  </div>
</template>

<script>

import TweetReplyModal from "./TweetReplyModal.vue";
export default {
  name: "TweetItems",
  components: {
    TweetReplyModal,
  },
  props: {
    initialTweets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tweets: [],
      tweetItem: {},
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = this.initialTweets;
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.find(tweet => tweet.id === tweetId);
    },
    createNewReply(payload) {
      const {tweetId, text, User} = payload
      this.tweets = this.tweets.map((tweet) => {
        if(tweet.id === tweetId) {
          console.log(tweetId, text, User)
        }
      })
      
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_tweet'
</style>