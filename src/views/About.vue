<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tweet-modal">
      TweetModal
    </button>
    <TweetModal />
  </div>
</template>

<script>
import TweetModal from '../components/TweetModal.vue'
export default {
  name: 'About',
  components: {
    TweetModal
  }
}
</script>


