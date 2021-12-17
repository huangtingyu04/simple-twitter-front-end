<template>
  <div class="tweets">
    <div class="tweet" v-for="tweet in initialTweets" :key="tweet.id">
      <div class="tweet-icon">
        <img :src="tweet.User ? tweet.User.avatar : '' | emptyImage" alt="user-icon" class="tweet-icon-photo" />
      </div>
      <div class="tweet-body">
        <div class="tweet-body-head">
          <router-link 
            class="tweet-body-head-name"
            :to="{ name: 'user-tweet', params: { id: tweet.User.id } }">{{tweet.User.name}}</router-link>
          <div class="tweet-body-head-account">@{{ tweet.User.account }}</div>
          <span> · </span>
          <div class="tweet-body-head-time">{{ tweet.createdAt | fromNow }}</div>
        </div>
        <router-link :to="{ name: 'tweet', params: { id: tweet.id } }" class="tweet-body-content">{{ tweet.description }}</router-link>
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
            <span class="tweet-body-foot-comment-count">{{tweet.tweetReplyCount}}</span>
          </div>
          <div class="tweet-body-foot-liked">
            <img
              src="../../public/images/icon_like_2x.png"
              alt="tweet-liKed-icon"
              v-if="!tweet.isLike"
              class="tweet-body-foot-liked-icon"
              @click.stop.prevent="addLiked(tweet.id)"
            />
            <img
              src="../../public/images/icon_like_fill_2x.png"
              alt="tweet-isLiked-icon"
              v-else
              class="tweet-body-foot-liked-icon"
              @click.stop.prevent="deleteLiked(tweet.id)"
            />
            <span class="tweet-body-foot-liked-count">{{tweet.tweetLikeCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";
import { errorToast } from '../utils/toast'
import tweetsAPI from '../apis/tweets'

export default {
  name: "TweetItems",
  mixins: [ fromNowFilter, emptyImageFilter ],
  props: {
    initialTweets: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleTweetReply(tweetId) {
      this.$emit("toggle-tweet-reply", tweetId)
    },
    async addLiked(tweetId) {
      try {
        const response = await tweetsAPI.addLike({tweetId})
        if(response.data.status !== 'success') {
          throw new Error
        }
        this.$emit("add-liked", tweetId)
      } catch (error) {
        console.log(error)
        errorToast.fire({
          title: `無法按讚--`
        })
      }
      
    },
    async deleteLiked(tweetId) {
      try {
        const response = await tweetsAPI.deleteLike({tweetId})
        if(response.data.status !== 'success') {
          throw new Error
        }
        this.$emit("delete-liked", tweetId)
      } catch (error) {
        console.log(error)
        errorToast.fire({
          title: `無法取消讚--`
        })
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_tweet'
</style>