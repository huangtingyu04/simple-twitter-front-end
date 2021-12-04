<template>
  <div>
    <div class="top">
      <img src="../../public/images/icon_back.png" alt="" class="top-back" @click="$router.back()">
      <div class="top-title">
        <div class="top-title-name">John Doe</div>
        <div class="top-title-tweet">25<span class="top-title-tweet-count">推文</span></div>
      </div>
    </div>
    <div class="user-follow">
      <FollowNavPills />
      <FollowItems />
    </div>
  </div>
</template>

<script>
import FollowNavPills from '../components/FollowNavPills.vue'
import FollowItems from '../components/FollowItems.vue'
export default {
  name: 'UserFollow',
  components: {
    FollowNavPills,
    FollowItems,
  }
}
</script>

<style lang="sass" scoped>
.top
  padding: 6px 19px 6px 19px
  height: 55px
  display: flex
  align-items: center
  .top-back
    width: 24px
    height: 24px
    object-fit: cover
    margin-right: 5%
    cursor: pointer
  .top-title
    .top-title-name
      font-size: 19px
      font-weight: 900
      color: $text-content
    .top-title-tweet
      font-size: 13px
      color: $input-label
  
</style>