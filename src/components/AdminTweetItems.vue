<template>
  <Spinner v-if="isLoading" />
  <div class="" v-else>
    <div class="top">推文清單</div>
    <div class="tweets">
      <div class="tweet" v-for="tweet in tweets" :key="tweet.id">
        <div class="tweet-icon">
          <img :src="tweet.User.avatar | emptyImage" class="tweet-icon-photo" />
        </div>
        <div class="tweet-body">
          <div class="tweet-body-head">
            <div class="tweet-body-head-name">{{ tweet.User.name }}</div>
            <div class="tweet-body-head-account">@{{ tweet.User.account }}</div>
            <span> · </span>
            <div class="tweet-body-head-time">
              {{ tweet.createdAt | fromNow }}
            </div>
          </div>
          <a href="" class="tweet-body-content">{{ tweet.description }}</a>
        </div>
        <div class="tweet-delete">
          <img
            src="../../public/images/icon_close_admin.png"
            alt="tweet-delete"
            class="tweet-delete-icon"
            @click.stop.prevent="deleteTweet(tweet.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";
import adminAPI from "../apis/admin";
import { errorToast } from "../utils/toast";
import Spinner from "./../components/Spinner";

export default {
  name: "AdminTweetItems",
  mixins: [fromNowFilter, emptyImageFilter],
  components: {
    Spinner,
  },
  data() {
    return {
      tweets: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.tweets.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.tweets = data.tweets;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        errorToast.fire({
          title: "無法取得推文，請稍後再試",
        });
      }
    },
    async deleteTweet(tweetId) {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.tweets.delete({
          tweetId,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法刪除推文，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_tweet'

.top
  height: 55px
  padding: 15px
  font-size: 18px
  font-weight: 700
  color: $text-content
  border-bottom: 1px solid $input-border
</style>