<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <Spinner v-show="isLoading"/>
      <div class="main" v-show="!isLoading">
        <AddTweet
          :current-user="currentUser"
          @refresh="refresh"
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
          @refresh="refresh"
        />
        <TweetModal
          :current-user="currentUser"
          @refresh="refresh"
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
import Spinner from '../components/Spinner.vue'

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
    Spinner,
    PopularUsersCard,
  },
  data() {
    return {
      tweets: [],
      tweetItem: {},
      isLoading: true
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
        const { data, statusText } = response
        if(statusText !== 'OK') {
          throw new Error
        }
        this.tweets = data
        this.isLoading = false;
      } catch (error) {
        console.log(error)
        errorToast.fire({
          title: '無法取得推文資訊'
        })
      }
    },
    refresh() {
      this.fetchData();
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
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



