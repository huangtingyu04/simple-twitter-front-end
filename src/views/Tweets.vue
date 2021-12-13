<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <AddTweet
          :current-user="currentUser"
          @create-new-tweet="createNewTweet"
        />
        <TweetItems
          :initial-tweets="tweets"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
          @delete-liked="deleteLiked"
        />
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
import Navbar from "./../components/Navbar";
import TweetItems from "./../components/TweetItems";
import PopularUsersCard from "./../components/PopularUsersCard";
import AddTweet from "./../components/AddTweet.vue";
import TweetModal from "./../components/TweetModal.vue";
import TweetReplyModal from "../components/TweetReplyModal.vue";

import { mapState } from 'vuex'
import tweetsAPI from '../apis/tweets'
import { errorToast } from '../utils/toast'

export default {
  name: "Tweets",
  components: {
    Navbar,
    AddTweet,
    TweetItems,
    TweetReplyModal,
    TweetModal,
    PopularUsersCard,
  },
  data() {
    return {
      tweets: [],
      tweetItem: {},
    };
  },
  computed: {
    ...mapState(["currentUser", 'isAuthenticated'])
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await tweetsAPI.getTweets()
        console.log(response)
        const { data, statusText } = response
        if(statusText !== 'OK') {
          throw new Error
        }
        this.tweets = data
      } catch (error) {
        console.log(error)
        errorToast.fire({
          title: '無法取得推文資訊'
        })
      }
    },
    createNewTweet(payload) {
      const { tweetId, text, User } = payload;
      this.tweets.unshift({
        id: tweetId,
        description: text,
        createdAt: new Date(),
        updatedAt: new Date(),
        User: User,
        Likes: [],
        tweetLikeCount: 0,
        Replies: [],
        tweetReplyCount: 0,
        isLiked: false,
      });
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
    },
    createNewReply(payload) {
      const { replyId, tweetId, text, User } = payload;
      console.log(replyId, tweetId, text, User)
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            tweetReplyCount: tweet.tweetReplyCount + 1
          };
        } else {
          return {...tweet};
        }
      });
    },
    addLiked(tweetId) {
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
    },
    deleteLiked(tweetId) {
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
    },
  },
};
</script>



