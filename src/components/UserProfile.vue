<template>
  <div class="profile">
    <div class="top">
      <img src="../../public/images/icon_back.png" alt="" class="top-back" @click="$router.back()">
      <div class="top-title">
        <div class="top-title-name">John Doe</div>
        <div class="top-title-tweet">25<span class="top-title-tweet-count">推文</span></div>
      </div>
    </div>
    <div class="user">
      <img src="https://i.imgur.com/ifqzNgs.png" alt="" class="user-bg" />
      <div class="user-header">
        <div class="user-header-container">
          <img src="https://i.imgur.com/RGxqLdu.png" alt="" class="user-header-container-photo" />
        </div>
        <div class="user-header-edit">
          <button
            class="btn-edit"
            data-bs-toggle="modal"
            data-bs-target="#user-edit-modal"
          >
            編輯個人資料
          </button>
        </div>
      </div>
      <div class="user-title">
        <div class="user-title-name">John Doe</div>
        <div class="user-title-account">@heyjohn</div>
      </div>
      <div class="user-info">
        <div class="user-info-content">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
        <div class="user-info-feat">
          <router-link :to="{name: 'user-followings', params: 1}" class="user-info-feat-following">
            34 個<span class="user-info-feat-unit"
              >跟隨中</span
            >
          </router-link>
          <router-link :to="{name: 'user-followers', params: 1}"  class="user-info-feat-follower">
            59 位<span class="user-info-feat-unit"
              >跟隨者</span
            >
          </router-link>
        </div>
      </div>
      <div class="user-navPill">
        <UserNavPills />
      </div>
    </div>
    <UserEditModal />
  </div>
</template>

<script>
import UserEditModal from '../components/UserEditModal.vue'
import UserNavPills from '../components/UserNavPills.vue'
export default {
  name: "UserProfile",
  components: {
    UserEditModal,
    UserNavPills
  }
};
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
.user
  position: relative
  border-bottom: 1px solid $input-border
  .user-bg
    position: absolute
    width: 100%
    top: 0
    left: 0
    height: 200px
    object-fit: cover
    z-index: 0
  .user-header
    position: relative
    z-index: 1
    padding: 124px 15px 0 15px
    display: flex
    justify-content: space-between
    .user-header-container
      width: 140px
      height: 140px
      .user-header-container-photo
        width: 140px
        height: 140px
        border-radius: 50%
        border: 4px solid $light
        object-fit: cover
        +breakpoint(zone-nb)
          width: 120px
          height: 120px
    button
      margin-top: 86px
      width: 120px
      height: 35px
      background: $light
      color: $mainColor
      border: 1px solid $mainColor
      font-size: 15px
      font-weight: 700
      border-radius: 100px
      +breakpoint(zone-nb)
        font-size: 10px
        width: 100px
        height: 30px
  .user-title
    padding: 5px 15px 0 15px
    .user-title-name
      font-size: 19px
      font-weight: 700
      color: $text-content
    .user-title-account
      font-size: 13px
      color: $input-label
  .user-info
    padding: 10px 15px 0 15px
    .user-info-content
      font-size: 13px
    .user-info-feat
      padding-top: 10px
      display: flex
      font-size: 14px
      .user-info-feat-following
        text-decoration: none
        color: $text-content
        font-weight: 500
        margin-right: 5%
      .user-info-feat-follower
        text-decoration: none
        color: $text-content
        font-weight: 500
      .user-info-feat-unit
        color: $input-label
        font-weight: 400
</style>