<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tweet-modal">
      TweetModal
    </button>
    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#tweet-reply-modal">
      TweetReplyModal
    </button>
    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#user-edit-modal">
      UserEditModal
    </button>
    <TweetModal />
    <TweetReplyModal />
    <UserEditModal />
  </div>
</template>
<script>
import TweetModal from '../components/TweetModal.vue'
import TweetReplyModal from '../components/TweetReplyModal.vue'
import UserEditModal from '../components/UserEditModal.vue'
export default {
  name: 'About',
  components: {
    TweetModal, TweetReplyModal, UserEditModal
  }
}
</script>


