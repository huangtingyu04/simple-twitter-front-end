<template>
  <div class="modal fade" id="tweet-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div
            class="modal-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >X</div>
        </div>
        <div class="modal-body">
          <div class="modal-body-tweet">
            <div class="modal-body-tweet-icon"></div>
            <form action="" class="modal-body-post-body">
              <textarea
                name="tweet"
                id="tweet"
                cols="30"
                rows="10"
                placeholder="有什麼新鮮事?"
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
  name: 'TweetModal'
}
</script>

<style lang="sass" scoped>
@import '../styles/_modal'
</style>