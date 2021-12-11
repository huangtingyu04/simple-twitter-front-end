<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main"></div>
      <PublicChatRoom />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import PublicChatRoom from '../components/PublicChatRoom.vue'
export default {
  name: 'PublicChat',
  components: {
    Navbar,
    PublicChatRoom
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/chatRoom'
</style>