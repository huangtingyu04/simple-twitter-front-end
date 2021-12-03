<template>
  <div class="modal fade" id="tweet-reply-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../../public/images/icon_close.png" alt="" class="modal-close" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="modal-body-post">
            <div class="modal-body-post-head">
              <img :src="tweetItem.User? tweetItem.User.image: ''" alt="" class="modal-body-post-head-icon" />
              <div class="modal-body-post-head-connect"></div>
            </div>
            <div class="modal-body-post-body">
              <div class="modal-body-post-body-head">
                <div class="modal-body-post-body-head-name">{{tweetItem.User?tweetItem.User.name: '匿名'}}</div>
                <div class="modal-body-post-body-head-account">@{{tweetItem.User ? tweetItem.User.account: '匿名'}}</div>
                <span> · </span>
                <div class="modal-body-post-body-head-time">{{tweetItem.createdAt}}</div>
              </div>
              <div class="modal-body-post-body-content">{{tweetItem.text}}</div>
              <div class="modal-body-post-body-foot">
                <div class="modal-body-post-body-foot-reply">
                  回覆給
                  <span class="modal-body-post-body-foot-account">@{{tweetItem.User ? tweetItem.User.account: '匿名'}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body-tweet">
            <img :src="currentUser.image" alt="" class="modal-body-tweet-icon">
            <form action="" class="modal-body-post-body">
              <textarea
                name="tweet"
                id="tweet"
                cols="30"
                rows="10"
                placeholder="推你的回覆"
              ></textarea>
              <button
                class="btn-tweet"
              >
                推文
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: "1",
    name: "Apple",
    account: "apple",
    email: "apple@example.com",
    password: "12345678",
    image: "https://i.imgur.com/RGxqLdu.png",
  },
};

export default {
  name: "TweetReplyModal",
  props: {
    tweetItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentUser: {}
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.currentUser = dummyUser.currentUser
    }
  }
};
</script>

<style lang="sass" scoped>
  @import "../styles/_modal"
</style>