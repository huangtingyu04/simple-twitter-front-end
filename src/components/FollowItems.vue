<template>
  <div class="follow">
    <img :src="follower.image | emptyImage" class="follow-icon">
    <div class="follow-content">
      <div class="follow-content-head">
        <div class="follow-content-head-title">
          <div class="follow-content-head-title-name">{{ follower.name }}</div>
          <div class="follow-content-head-title-account">@{{ follower.account }}</div>
        </div>
        <button class="isfollow" v-if="!follower.isFollowing" @click.prevent.stop="addFollowing(follower.id)">跟隨</button>
        <button class="unfollow" v-else @click.prevent.stop="deleteFollowing(follower.id)">正在跟隨</button>
      </div>
      <div class="follow-content-body">{{ follower.text }}</div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '../utils/mixins'

export default {
  name: 'FollowItems',
  mixins: [ emptyImageFilter ],
  props: {
    initialFollower: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      follower: this.initialFollower
    }
  },
  methods: {
    addFollowing(followerId) {
      console.log(followerId)
      this.follower = {
        ...this.follower,
        isFollowing: true
      }
    },
    deleteFollowing(followerId) {
      console.log(followerId)
      this.follower = {
        ...this.follower,
        isFollowing: false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.follow
  padding: 13px 15px 13px 15px
  border-bottom: 1px solid $input-border
  display: flex
  .follow-icon
    width: 50px
    height: 50px
    border-radius: 50%
    object-fit: cover
    margin-right: 10px
  .follow-content
    flex: 1
    .follow-content-head
      display: flex
      justify-content: space-between
      .follow-content-head-title
        .follow-content-head-title-name
          font-size: 15px
          font-weight: 700
          color: $text-content
        .follow-content-head-title-account
          font-size: 14px
          font-weight: 500
          color: $input-label
      button
        font-size: 15px
        height: 25px
        border-radius: 100px
      .unfollow
        width: 90px
        color: $light
        border: none
        background: $mainColor
      .isfollow
        width: 60px
        color: $mainColor
        background: $light
        border: 1px solid $mainColor
    .follow-content-body
      padding-top: 5px
      font-size: 15px
      font-weight: 500    
</style>