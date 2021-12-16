<template>
  <div class="replies">
    <div class="reply">
      <router-link :to="{ name: 'user-tweet', params: { id: reply.id } }">
        <img
          :src="reply.avatar | emptyImage"
          alt=""
          class="reply-icon" 
        />
      </router-link>
      <div class="reply-content">
        <div class="reply-content-title">
          <router-link 
            :to="{ name: 'user-tweet', params: { id: reply.id } }"
            class="reply-content-title-name">
            {{ reply.name}}
          </router-link>
          <router-link 
            :to="{ name: 'user-tweet', params: { id: reply.id } }"
            class="reply-content-title-account">
            @{{ reply.account }}<span>・</span>
          </router-link>
          <div class="reply-content-title-time">
            {{ reply.createdAt | fromNow }}
          </div>
        </div>
        <div class="reply-content-target">
          回覆
          <span class="reply-content-target-account">@{{ reply.tweetAccount}}</span>
        </div>
        <div class="reply-content-comment">{{ reply.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";

export default {
  name: 'UserReplyItems',
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialReply: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reply: {}
    }
  },
  watch: {
    initialReply() {
      this.fetchReply()
    }
  },
  created() {
    this.fetchReply()
  },
  methods: {
    fetchReply() {
      const { Tweet, User, comment, createdAt } = this.initialReply
      this.reply = {
        id: User ? User.id: 0,
        name: User ? User.name: '',
        account: User ? User.account: '',
        avatar: User ? User.avatar: '',
        createdAt,
        comment,
        tweetAccount: Tweet ? (Tweet.User? Tweet.User.account: ''): ''
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.reply
  padding: 15px
  display: flex
  border-bottom: 1px solid $input-border
  .reply-icon
    width: 50px
    height: 50px
    border-radius: 50%
    object-fit: cover
  .reply-content
    flex: 1
    margin-left: 10px
    font-size: 15px
    .reply-content-title
      display: flex
      .reply-content-title-name
        text-decoration: none
        color: $text-content
        font-weight: 700
        margin-right: 5px
      .reply-content-title-account, .reply-content-title-time
        text-decoration: none
        color: $input-label
        font-weight: 500
    .reply-content-target
      margin-top: 4px
      color: $input-label
      .reply-content-target-account
        color: $mainColor
    .reply-content-comment
      margin-top: 5px
      color: $text-content
</style>