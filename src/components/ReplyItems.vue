<template>
  <div class="replies">
    <div class="reply" v-for="reply in replies" :key="reply.id">
      <img :src="reply.User? reply.User.image: ''" alt="" class="reply-icon">
      <div class="reply-content">
        <div class="reply-content-title">
          <div class="reply-content-title-name">{{reply.User? reply.User.name: ''}}</div>
          <div class="reply-content-title-account">@{{reply.User? reply.User.account: ''}}<span>・</span></div>
          <div class="reply-content-title-time">{{reply.createdAt}}</div>
        </div>
        <div class="reply-content-target">回覆
          <span class="reply-content-target-account">@{{tweetTarget}}</span>
        </div>
        <div class="reply-content-comment">{{reply.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyItems',
  props: {
    replies: {
      type: Array,
      required: true,
    },
    tweetTarget: {
      type: String,
      required: true,
    },
  }
}
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
        color: $text-content
        font-weight: 700
      .reply-content-title-account, .reply-content-title-time
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