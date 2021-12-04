<template>
  <div class="modal fade" id="tweet-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img
            src="../../public/images/icon_close.png"
            alt=""
            class="modal-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="modal-body-tweet">
            <div class="modal-body-tweet-icon"></div>
            <form
              action=""
              class="modal-body-post-body"
              @submit.stop.prevent="createNewTweet(currentUser.id)"
            >
              <textarea
                name="tweet"
                v-model="newTweet"
                id="tweet"
                cols="30"
                rows="10"
                placeholder="有什麼新鮮事?"
              ></textarea>
              <button
                class="btn-tweet"
                :data-bs-dismiss="submitOK"
                :disabled="newTweet.length > 140"
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
export default {
  name: "TweetModal",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTweet: "",
      checkEmptyInput: false,
    };
  },
  computed: {
    submitOK() {
      if (!this.newTweet) {
        return "";
      } else {
        return "modal";
      }
    },
  },
  methods: {
    createNewTweet(id) {
      console.log(id);
      if (!this.newTweet) {
        this.checkEmptyInput = true;
        return;
      }
      this.$emit("create-new-tweet", {
        tweetId: id,
        text: this.newTweet,
      });
      this.newTweet = "";
      this.checkEmptyInput = false;
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_modal'
</style>