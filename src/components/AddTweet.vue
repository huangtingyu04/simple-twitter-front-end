<template>
  <div>
    <div class="top">首頁</div>
    <div class="addTweet">
      <img :src="currentUser.avatar | emptyImage" alt="" class="addTweet-icon" />
      <form action="" class="addTweet-form" @submit.stop.prevent="createNewTweet">
        <textarea
          name="tweet"
          v-model="newTweet"
          id="tweet"
          cols="30"
          rows="10"
          placeholder="有什麼新鮮事?"
        ></textarea>
        <div class="addTweet-foot">
          <p class="addTweet-limit" v-show="newTweet.length > 140">字數不可超過140字</p>
          <p class="addTweet-empty" v-show="checkEmptyInput">內容不可空白</p>
          <button class="btn-addTweet" type="submit" :disabled="newTweet.length > 140">推文</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { emptyImageFilter } from '../utils/mixins'
export default {
  name: "AddTweet",
  mixins: [ emptyImageFilter ],
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTweet: '',
      isProcessing: false,
      checkEmptyInput: false,
    }
  },
  methods: {
    createNewTweet() {
      if(!this.newTweet) {
        this.checkEmptyInput = true
        return
      }
      this.$emit("create-new-tweet", {
        tweetId: uuidv4(),
        text: this.newTweet,
        User: this.currentUser
      })
      this.newTweet = ''
      this.checkEmptyInput = false
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/global'

.top
  height: 55px
  padding: 13px 20px 14px 20px
  font-size: 18px
  font-weight: 700
  color: $text-content
  border-bottom: 1px solid $input-border

.addTweet
  width: 100%
  height: 250px
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
    .addTweet-foot
      position: absolute
      bottom: 0
      right: 0
      display: flex
      align-content: center
      font-size: 15px
      font-weight: 500
      color: $input-alert
      .addTweet-limit, .addTweet-empty
        margin: auto 20px
      button
        width: 66px
        height: 38px
        border: none
        border-radius: 100px
        background: $mainColor
        color: $light
        font-size: 18px
        &:disabled
          opacity: 60%
</style>