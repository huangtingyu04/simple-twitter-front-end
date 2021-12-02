<template>
  <div class="replies">
    <div class="reply">
      <img src="https://i.imgur.com/RGxqLdu.png" alt="" class="reply-icon">
      <div class="reply-content">
        <div class="reply-content-title">
          <div class="reply-content-title-name">Apple</div>
          <div class="reply-content-title-account">@apple<span>・</span></div>
          <div class="reply-content-title-time">13小時</div>
        </div>
        <div class="reply-content-target">回覆
          <span class="reply-content-target-account">@apple</span>
        </div>
        <div class="reply-content-comment">Goof hhh jot!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyItems',
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