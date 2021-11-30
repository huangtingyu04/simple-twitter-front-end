<template>
  <div class="modal fade" id="tweet-reply-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-close" data-bs-dismiss="modal" aria-label="Close">
            X
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-body-post">
            <div class="modal-body-post-head">
              <img src="" alt="" class="modal-body-post-head-icon" />
              <div class="modal-body-post-head-connect"></div>
            </div>
            <div class="modal-body-post-body">
              <div class="modal-body-post-body-head">
                <div class="modal-body-post-body-head-name">Apple</div>
                <div class="modal-body-post-body-head-account">@apple</div>
                <span> · </span>
                <div class="modal-body-post-body-head-time">3小時</div>
              </div>
              <div class="modal-body-post-body-content">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</div>
              <div class="modal-body-post-body-foot">
                <div class="modal-body-post-body-foot-reply">
                  回覆給
                  <span class="modal-body-post-body-foot-account">@apple</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body-tweet">
            <div class="modal-body-tweet-icon"></div>
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
export default {
  name: "TweetReplyModal",
};
</script>

<style lang="sass" scoped>
@import "../styles/_modal"
</style>