<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <div class="chat">
          <div class="chat-top">
            <div class="chat-top-title">上線使用者 ()</div>
          </div>
          <div class="chat-container">
            <div class="chat-user" v-for="user in users" :key="user.id">
              <img
                src="../../public/images/Logo.png"
                alt="user-avatar"
                class="chat-user-avatar"
              />
              <router-link to="/users/2" class="chat-user-name"
                >Apple</router-link
              >
              <router-link to="/users/2" class="chat-user-account"
                ><span class="symbol">@</span>apple</router-link
              >
            </div>
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
  data() {
    return {
      users: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/chat'
</style>