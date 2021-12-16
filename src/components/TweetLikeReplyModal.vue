<template>
  <div class="modal fade" id="tweet-reply-modal" aria-hidden="true">
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
          <div class="modal-body-post">
            <div class="modal-body-post-head">
              <img
                :src="tweetItem.Tweet.User ? tweetItem.Tweet.User.avatar : '' | emptyImage"
                alt=""
                class="modal-body-post-head-icon"
              />
              <div class="modal-body-post-head-connect"></div>
            </div>
            <div class="modal-body-post-body">
              <div class="modal-body-post-body-head">
                <div class="modal-body-post-body-head-name">
                  {{ tweetItem.Tweet.User ? tweetItem.Tweet.User.name : "" }}
                </div>
                <div class="modal-body-post-body-head-account">
                  @{{ tweetItem.Tweet.User ? tweetItem.Tweet.User.account : "" }}
                </div>
                <span> · </span>
                <div class="modal-body-post-body-head-time">
                  {{ tweetItem.createdAt | fromNow }}
                </div>
              </div>
              <div class="modal-body-post-body-content">
                {{ tweetItem.Tweet.description }}
              </div>
              <div class="modal-body-post-body-foot">
                <div class="modal-body-post-body-foot-reply">
                  回覆給
                  <span class="modal-body-post-body-foot-account"
                    >@{{ tweetItem.Tweet.User ? tweetItem.Tweet.User.account : "" }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body-tweet">
            <img
              :src="currentUser.avatar | emptyImage"
              alt=""
              class="modal-body-tweet-icon"
            />
            <form
              action=""
              @submit.stop.prevent="createNewReply(tweetItem.TweetId)"
              class="modal-body-tweet-form"
            >
              <textarea
                name="tweet"
                v-model="newReply"
                id="tweet"
                cols="30"
                rows="10"
                placeholder="推你的回覆"
              ></textarea>
              <div class="addReply-form">
                <p class="addReply-limit" v-show="newReply.length > 140">
                  字數不可超過140字
                </p>
                <p class="addReply-empty" v-show="checkEmptyInput">
                  內容不可空白
                </p>
                <button
                  class="btn-tweet"
                  :data-bs-dismiss="submitOK"
                  :disabled="newReply.length > 140 || isProcessing"
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
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";
import tweetsAPI from "../apis/tweets";
import { successToast, errorToast } from "../utils/toast";
import { mapState } from "vuex";

export default {
  name: "TweetLikeReplyModal",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    tweetItem: {
      type: Object, 
      required: true,
    },
  },
  watch: {
    tweetItem(newValue) {
      this.tweet = {
        ...this.tweetItem,
        ...newValue
      }
    }
  },
  data() {
    return {
      tweet: {},
      newReply: "",
      checkEmptyInput: false,
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    submitOK() {
      if (!this.newReply) {
        return "";
      } else {
        return "modal";
      }
    },
  },
  methods: {
    async createNewReply(tweetId) {
      try {
        if (!this.newReply.trim()) {
          this.checkEmptyInput = true;
          return;
        }
        this.isProcessing = true;
        const { data } = await tweetsAPI.reply({tweetId, 
          comment: this.newReply,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$emit("refresh");
        successToast.fire({
          title: "已成功回復推文",
        });
        this.newReply = "";
        this.checkEmptyInput = false;
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        errorToast.fire({
          title: `無法回復推文-${error.message}`,
        });
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
        self.newReply = "";
      }
    });
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/_modal"
</style>