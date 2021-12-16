<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <div class="chat">
          <div class="chat-top">
            <div class="chat-top-title">訊息</div>
            <img
              src="../../public/images/icon_newMessege.png"
              alt=""
              class="chat-top-icon"
            />
          </div>
          <div class="chat-container" >
            <div class="chat-item" v-for="user in users" :key="user.id">
              <img
                src="../../public/images/Logo.png"
                alt="user-avatar"
                class="chat-item-avatar"
              />
              <div class="chat-item-body">
                <div class="chat-item-top">
                  <div class="chat-item-name">Apple</div>
                  <div class="chat-item-account">@apple</div>
                  <div class="chat-item-created">5秒</div>
                </div>
                <div class="chat-item-message">
                  Nulla Lorem mollit cupidatat irure....
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrivateChatRoom />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PrivateChatRoom from "../components/PrivateChatRoom.vue";
export default {
  name: "PrivateChat",
  components: {
    Navbar,
    PrivateChatRoom,
  },
  data() {
    return {
      users: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/chat'
</style>