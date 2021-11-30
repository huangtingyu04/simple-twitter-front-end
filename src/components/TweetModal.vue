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
@import "../styles/_variables"
.modal
    border-radius: 14px
    &-header
      height: 54px
    &-body
      height: 245px
      padding: 15px
      &-post
        display: flex
        height: 100%
        &-icon
          width: 50px
          height: 50px
          border-radius: 50%
          background: $input-label
          margin-right: 10px
        form 
          flex: 1
          padding-top: 12px
          position: relative
          textarea 
            width: 100%
            height: 100%
            border: none
            resize: none
            outline: none
          button
            position: absolute
            bottom: 0
            right: 0
            width: 66px
            height: 38px
            border: none
            border-radius: 100px
            background: $mainColor
            color: $light
            font-size: 18px
</style>