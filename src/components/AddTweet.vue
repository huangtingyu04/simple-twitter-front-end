<template>
  <div>
    <div class="top">首頁</div>
    <div class="addTweet">
      <img :src="currentUser.image" alt="" class="addTweet-icon" />
      <form action="" class="addTweet-form" @submit.stop.prevent="createNewTweet">
        <textarea
          name="tweet"
          v-model="newTweet"
          id="tweet"
          cols="30"
          rows="10"
          placeholder="有什麼新鮮事?"
        ></textarea>
        <button class="btn-addTweet">推文</button>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: "AddTweet",
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTweet: ''
    }
  },
  methods: {
    createNewTweet() {
      this.$emit("create-new-tweet", {
        tweetId: uuidv4(),
        text: this.newTweet,
        User: this.currentUser
      })
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/global'

.top
  height: 55px
  padding: 15px
  font-size: 18px
  font-weight: 700
  color: $text-content
  border-bottom: 1px solid $input-border

.addTweet
  width: 100%
  height: 130px
  padding: 10px 15px 10px 15px
  border-bottom: 1px solid $input-border
  display: flex
  .addTweet-icon
    width: 50px
    height: 50px
    border-radius: 50%
    object-fit: cover
  .addTweet-form
    flex: 1
    margin-left: 10px
    padding-top: 10px
    position: relative
    textarea
      border: none
      outline: none
      resize: none
      width: 100%
      height: 100%
      font-size: 18px
      font-weight: 500
      color: $input-holder
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