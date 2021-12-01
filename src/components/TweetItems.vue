<template>
  <div class="tweets">
    <div class="tweet" v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-icon">
        <img :src="tweet.User.image" alt="user-icon" class="tweet-icon-photo">
      </div>
      <div class="tweet-body">
        <div class="tweet-body-head">
          <div class="tweet-body-head-account">@{{tweet.User.account}}</div>
          <span> · </span>
          <div class="tweet-body-head-time">{{tweet.createdAt}}</div>
        </div>
        <a href="" class="tweet-body-content">{{tweet.text}}</a>
        <div class="tweet-body-foot">
          <div class="tweet-body-foot-comment">
            <img 
              src="../../public/images/icon_message_2x" 
              alt="tweet-comment"  
              class="tweet-body-foot-comment-icon"
              data-bs-toggle="modal"
              data-bs-target="#tweet-reply-modal"
              @click.prevent.stop ="toggleTweetReply(tweet.id)">
            <span class="tweet-body-foot-comment-count">{{tweet.Comments.length}}</span>
          </div>
          <div class="tweet-body-foot-liked">
            <img src="../../public/images/icon_like_2x" alt="tweet-liKed-icon" v-if="!tweet.isLiked" class="tweet-body-foot-liked-icon">
            <img src="../../public/images/icon_like_fill_2x" alt="tweet-isLiked-icon" v-else class="tweet-body-foot-liked-icon">
            <span class="tweet-body-foot-liked-count">{{tweet.Likes.length}}</span>
          </div>
        </div>
      </div>
      <TweetReplyModal :tweet-item="tweetItem"/>
    </div>
  </div>
</template>

<script>
const dummyData = {
  tweets: [
    {
      id: 1,
      text: "Autem veniam tempore.",
      UserId: 1,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      User: {
        id: 1,
        name: "user1",
        account: 'user1',
        email: "user1@example.com",
        password:
          "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
        isAdmin: false,
        image: "https://i.imgur.com/RnQRoJb.png",
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-26T04:22:35.000Z",
      },
      LikeUsers: [],
      isLiked: false
    },
    {
      id: 2,
      text: "zrtdhuua trtdghui etsfgj gfgfgrtewrt.",
      UserId: 1,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      User: {
        id: 1,
        name: "user1",
        account: 'user1',
        email: "user1@example.com",
        password:
          "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
        isAdmin: false,
        image: "https://i.imgur.com/RnQRoJb.png",
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-26T04:22:35.000Z",
      },
      LikeUsers: [{}, {}],
      isLiked: true
    },
    {
      id: 3,
      text: "iuyituncg trdsnujkgta wefdfghhjbnsfgqerq dfsdfwerwerqwtrh fdsfe fdwer aswhjjyuir.",
      UserId: 2,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      User: {
        id: 2,
        name: "user2",
        account: 'user2',
        email: "user2@example.com",
        password:
          "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
        isAdmin: false,
        image: "https://i.imgur.com/RGxqLdu.png",
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-26T04:22:35.000Z",
      },
      LikeUsers: [{}, {}, {}],
      isLiked: true
    },
  ],
};
import TweetReplyModal from './TweetReplyModal.vue'
export default {
  name: "TweetItems",
  components: {
    TweetReplyModal,
  },
  data() {
    return {
      tweets:[],
      tweetItem: {}
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyData.tweets
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.filter(tweet => tweet.id === tweetId)
    }
  }
  
};
</script>