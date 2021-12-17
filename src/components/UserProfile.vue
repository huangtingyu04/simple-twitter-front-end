<template>
  <div class="profile">
    <div class="top">
      <img
        src="../../public/images/icon_back.png"
        alt=""
        class="top-back"
        @click="$router.back()"
      />
      <div class="top-title">
        <div class="top-title-name">{{ user.name }}</div>
        <div class="top-title-tweet">
          {{ user.tweetsCount }}<span class="top-title-tweet-count"> 推文</span>
        </div>
      </div>
    </div>
    <div class="user">
      <img :src="user.cover | emptyImage" alt="" class="user-bg" />
      <div class="user-header">
        <div class="user-header-container">
          <img
            :src="user.avatar | emptyImage"
            alt=""
            class="user-header-container-photo"
          />
        </div>
        <div class="user-header-edit">
          <img
            src="../../public/images/btn_messege.png"
            alt=""
            class="user-header-edit-message"
            v-show="currentUser.id !== user.id"
          />
          <img
            src="../../public/images/btn_noti.png"
            alt=""
            class="user-header-edit-notice"
            v-show="currentUser.id !== user.id"
          />
          <button
            v-if="!user.isFollower"
            class="user-header-edit-follow"
            v-show="currentUser.id !== user.id"
            @click.stop.prevent="addFollow(user.id)"
          >
            跟隨
          </button>
          <button
            v-else
            class="user-header-edit-unfollow"
            v-show="currentUser.id !== user.id"
            @click.stop.prevent="deleteFollow(user.id)"
          >
            正在跟隨
          </button>

          <button
            class="user-header-edit-edit"
            data-bs-toggle="modal"
            data-bs-target="#user-edit-modal"
            v-show="currentUser.id === user.id"
          >
            編輯個人資料
          </button>
        </div>
      </div>
      <div class="user-title">
        <div class="user-title-name">{{ user.name }}</div>
        <div class="user-title-account">@{{ user.account }}</div>
      </div>
      <div class="user-info">
        <div class="user-info-content">
          {{ user.introduction }}
        </div>
        <div class="user-info-feat">
          <router-link
            :to="{ name: 'user-followings', params: 1 }"
            class="user-info-feat-following"
          >
            {{ user.FollowingsCount }} 個<span class="user-info-feat-unit"
              >跟隨中</span
            >
          </router-link>
          <router-link
            :to="{ name: 'user-followers', params: 1 }"
            class="user-info-feat-follower"
          >
            {{ user.FollowersCount }} 位<span class="user-info-feat-unit"
              >跟隨者</span
            >
          </router-link>
        </div>
      </div>
      <div class="user-navPill">
        <UserNavPills :user-id="user.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import usersAPI from "../apis/users";
import { errorToast } from "../utils/toast";
import { eventBus } from "../utils/eventbus";

import UserNavPills from "../components/UserNavPills.vue";
export default {
  name: "UserProfile",
  mixins: [emptyImageFilter],
  components: {
    UserNavPills,
  },
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.initialUser,
        ...newValue,
      };
    },
  },
  created() {
    this.fetchUser();
    this.updateProfile();
  },
  methods: {
    fetchUser() {
      this.user = this.initialUser;
    },
    async addFollow(userId) {
      try {
        const id = { id: userId };
        const response = await usersAPI.addFollow({ id });
        if(response.data.status !== 'success') {
          throw new Error
        }
        this.$emit("refresh");
        eventBus.$emit("refresh");
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法追蹤此使用者",
        });
      }
    },
    async deleteFollow(userId) {
      try {
        const response = await usersAPI.deleteFollow({ userId });
        if(response.data.status !== 'success') {
          throw new Error
        }
        this.$emit("refresh");
        eventBus.$emit("refresh");
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取消追蹤此使用者",
        });
      }
    },
    updateProfile() {
      eventBus.$on("update-profile", (payload) => {
        const { name, introduction, avatar, cover } = payload;
        this.user.name = name;
        this.user.introduction = introduction;
        this.user.avatar = avatar;
        this.user.cover = cover;
      });
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="sass" scoped>
.top
  padding: 6px 19px 6px 19px
  height: 55px
  display: flex
  align-items: center
  border-bottom: 1px solid $input-border
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
        background: $light
        +breakpoint(zone-nb)
          width: 120px
          height: 120px
    .user-header-edit
      margin-top: 86px
      display: flex
      font-size: 15px
      font-weight: 700
      img
        width: 35px
        height: 35px
        object-fit: cover
        cursor: pointer
        margin-right: 5%
        +breakpoint(zone-nb)
          width: 30px
          height: 30px
          margin-right: 3%
      .user-header-edit-follow
        width: 60px
        height: 35px
        color: $mainColor
        background: $light
        border: 1px solid $mainColor
        border-radius: 100px
        +breakpoint(zone-nb)
          font-size: 10px
          width: 55px
          height: 30px
      .user-header-edit-unfollow
        width: 90px
        height: 35px
        color: $light
        background: $mainColor
        border: 1px solid $mainColor
        border-radius: 100px
        +breakpoint(zone-nb)
          font-size: 10px
          width: 75px
          height: 30px
      .user-header-edit-edit
        width: 120px
        height: 35px
        background: $light
        color: $mainColor
        border: 1px solid $mainColor
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