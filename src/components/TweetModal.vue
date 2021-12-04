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
            <img :src="currentUser.image" alt="" class="modal-body-tweet-icon">
            <form
              action=""
              class="modal-body-tweet-form"
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
              <div class="addReply-form">
                <p class="addReply-limit" v-show="newTweet.length > 140">
                  字數不可超過140字
                </p>
                <p class="addReply-empty" v-show="checkEmptyInput">
                  內容不可空白
                </p>
                <button
                  class="btn-addTweet"
                  type="submit"
                  :data-bs-dismiss="submitOK" 
                  :disabled="newTweet.length > 140"
                >
                  推文
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

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
        tweetId: uuidv4(),
        text: this.newTweet,
        User: this.currentUser
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