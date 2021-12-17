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
            <img
              :src="currentUser.avatar | emptyImage"
              alt=""
              class="modal-body-tweet-icon"
            />
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
                  :disabled="newTweet.length > 140 || isProcessing"
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
import tweetsAPI from "../apis/tweets";
import { successToast, errorToast } from "../utils/toast";
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  name: "TweetModal",
  mixins: [emptyImageFilter],
  data() {
    return {
      newTweet: "",
      checkEmptyInput: false,
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    submitOK() {
      if (!this.newTweet) {
        return "";
      } else {
        return "modal";
      }
    },
  },
  mounted() {
    let self = this;
    document.addEventListener("click", function (event) {
      if (
        event.target.matches(".modal") ||
        event.target.matches(".modal-close")
      ) {
        self.newTweet = "";
      }
    });
  },
  methods: {
    async createNewTweet() {
      try {
        if (!this.newTweet) {
          this.checkEmptyInput = true;
          return;
        }
        this.isProcessing = true;
        const { data } = await tweetsAPI.create({ description: this.newTweet });
        if(data.status !== 'success') {
          throw new Error
        }
        this.$emit("refresh")
        successToast.fire({
          title: "已成功新增推文",
        });
        this.newTweet = "";
        this.checkEmptyInput = false;
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        errorToast.fire({
          title: `無法新增推文-${error.message}`,
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_modal'
</style>