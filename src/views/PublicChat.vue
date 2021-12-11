<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <div class="chat">
          <div class="chat-top">
            <div class="chat-top-title">上線使用者 ()</div>
          </div>
          <div class="chat-user">
            <img 
              src="../../public/images/Logo.png"
              alt="user-avatar"
              class="chat-user-avatar">
            <router-link to="/users/2" class="chat-user-name">Apple</router-link>
            <router-link 
              to="/users/2" 
              class="chat-user-account"><span class="symbol">@</span>apple</router-link>
          </div>
        </div>
      </div>
      <PublicChatRoom />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PublicChatRoom from "../components/PublicChatRoom.vue";
export default {
  name: "PublicChat",
  components: {
    Navbar,
    PublicChatRoom,
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/chatRoom'
.chat
  .chat-top
    padding: 15px
    height: 55px
    border-bottom: 1px solid $input-border
    .chat-top-title
      font-size: 18px
      font-weight: 700
  .chat-user
    padding: 10px 15px
    display: flex
    justify-content: start
    align-items: center
    border-bottom: 1px solid $input-border
    font-size: 15px
    text-decoration: none
    .chat-user-avatar
      width: 50px
      height: 50px
      border-radius: 50%
      object-fit: cover
      margin-right: 10px
    .chat-user-name
      font-weight: 700
      margin-right: 5px
      text-decoration: none
      color: $text-content
    .chat-user-account
      color: $input-label
      text-decoration: none
</style>