<template>
  <div class="replies">
    <div class="reply" v-for="reply in replies" :key="reply.id">
      <router-link :to="{ name: 'user-tweet', params: { id: reply.User.id } }">
        <img
          :src="reply.User ? reply.User.avatar : '' | emptyImage"
          alt=""
          class="reply-icon"
        />
      </router-link>
      <div class="reply-content">
        <div class="reply-content-title">
          <router-link 
            :to="{ name: 'user-tweet', params: { id: reply.User.id } }"
            class="reply-content-title-name">
            {{ reply.User ? reply.User.name : "" }}
          </router-link>
          <router-link 
            :to="{ name: 'user-tweet', params: { id: reply.User.id } }"
            class="reply-content-title-account">
            @{{ reply.User ? reply.User.account : "" }}<span>・</span>
          </router-link>
          <div class="reply-content-title-time">
            {{ reply.createdAt | fromNow }}
          </div>
        </div>
        <div class="reply-content-target">
          回覆
          <span class="reply-content-target-account">@{{ tweetTarget }}</span>
        </div>
        <div class="reply-content-comment">{{ reply.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";

export default {
  name: "ReplyItems",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    replies: {
      type: Array,
      required: true,
    },
    tweetTarget: {
      type: String,
      required: true,
    }
  },
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