<template>
  <div>
    <div class="top">
      <img
        src="./../../public/images/icon_back.png"
        alt=""
        class="top-back"
        @click="$router.back()"
      />
      <p class="top-title">推文</p>
    </div>
    <div class="content">
      <div class="content-header">
        <img
          :src="tweet.avatar | emptyImage"
          alt=""
          class="content-header-icon"
        />
        <div class="content-header-title">
          <div class="content-header-title-name">{{ tweet.name }}</div>
          <div class="content-header-title-account">@{{ tweet.account }}</div>
        </div>
      </div>
      <div class="content-body">
        {{ tweet.description }}
      </div>
      <div class="content-time">{{ tweet.createdAt | fromNow }}</div>
      <div class="content-info">
        <div class="content-info-reply">
          <div class="content-info-reply-count">
            {{ tweet.replyLength
            }}<span class="content-info-reply-unit"> 回覆</span>
          </div>
        </div>
        <div class="content-info-liked">
          <div class="content-info-liked-count">
            {{ tweet.likeLength
            }}<span class="content-info-liked-unit"> 喜歡次數</span>
          </div>
        </div>
      </div>
      <div class="content-action">
        <img
          src="./../../public/images/icon_message_2x.png"
          alt=""
          class="content-action-reply"
          data-bs-toggle="modal"
          data-bs-target="#tweet-reply-modal"
        />
        <img
          v-if="!tweet.isLike"
          src="./../../public/images/icon_like_2x.png"
          alt=""
          class="content-action-liked"
          @click.stop.prevent="addLike(tweet.id)"
        />
        <img
          v-else
          src="./../../public/images/icon_like_fill_2x.png"
          alt=""
          class="content-action-liked"
          @click.stop.prevent="deleteLike(tweet.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";
import tweetsAPI from "../apis/tweets";
import { errorToast } from "../utils/toast";

export default {
  name: "TweetContent",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: {},
      isLiked: false
    };
  },
  watch: {
    initialTweet(newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue,
      };
    },
  },
  methods: {
    async addLike(tweetId) {
      try {
        const response = await tweetsAPI.addLike({tweetId});
        const { data } = response;
        this.tweet.isLike = true;
        this.tweet.likeLength = this.tweet.likeLength + 1;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法按讚，請稍後再試",
        });
      }
    },
    async deleteLike(tweetId) {
      try {
        const response = await tweetsAPI.deleteLike({tweetId});
        const { data } = response;
        this.tweet.isLike = false;
        this.tweet.likeLength = this.tweet.likeLength - 1;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法按讚，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.top
  height: 55px
  padding: 6px 19px 6px 19px
  display: flex
  align-items: center
  border-bottom: 1px solid $input-border
  .top-back
    width: 24px
    height: 24px
    object-fit: cover
    margin-right: 5%
    cursor: pointer
  .top-title
    margin: 0
    font-size: 18px
    font-weight: 700
    color: $text-content

.content
  padding: 15px
  border-bottom: 1px solid $input-border
  .content-header
    display: flex
    .content-header-icon
      width: 50px
      height: 50px
      border-radius: 50%
      object-fit: cover
    .content-header-title
      padding-top: 3px
      margin-left: 10px
      .content-header-title-name
        font-size: 15px
        font-weight: 700
        color: $text-content
      .content-header-title-account
        font-size: 14px
        font-weight: 500
        color: $input-label
  .content-body
    padding-top: 15px
    font-size: 20px
    font-weight: 500
    color: $text-content
  .content-time
    padding-top: 15px
    padding-bottom: 15px
    font-size: 14px
    font-weight: 500
    color: $input-label
    border-bottom: 1px solid $input-border
  .content-info
    padding-top: 20px
    padding-bottom: 20px
    display: flex
    justify-content: start
    font-size: 16px
    border-bottom: 1px solid $input-border
    .content-info-reply
      margin-right: 20%
      .content-info-reply-count
        color: $text-content
        font-weight: 700
      .content-info-reply-unit
        color: $input-label
        font-weight: 500
    .content-info-liked
      .content-info-liked-count
        color: $text-content
        font-weight: 700
      .content-info-liked-unit
        color: $input-label
        font-weight: 500
  .content-action
    padding-top: 20px
    display: flex
    justify-content: start
    .content-action-reply
      width: 24.69px
      height: 24.69px
      margin-right: 40%
      cursor: pointer
    .content-action-liked
      width: 25.12px
      height: 23.64px
      cursor: pointer
</style>