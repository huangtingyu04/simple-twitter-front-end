<template>
  <div class="modal fade" id="tweet-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div
            class="modal-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></div>
        </div>
        <div class="modal-body">
          <div class="modal-body-post">
            <div class="modal-body-post-icon"></div>
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
                id="btn-tweet"
                data-bs-toggle="modal"
                data-bs-target="#main-post-tweet"
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