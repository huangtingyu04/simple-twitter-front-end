<template>
  <div class="follow">
    <img :src="follower.avatar | emptyImage" class="follow-icon" />
    <div class="follow-content">
      <div class="follow-content-head">
        <div class="follow-content-head-title">
          <router-link
            class="follow-content-head-title-name"
            :to="{ name: 'user-tweet', params: { id: follower.id } }"
            >{{ follower.name }}</router-link
          >
          <div class="follow-content-head-title-account">
            @{{ follower.account }}
          </div>
          <div class="follow-content-head-title-intro">
            {{ follower.introduction }}
          </div>
        </div>
        <button
          class="isfollow"
          v-if="!follower.isFollowing"
          v-show="!(follower.id === currentUser.id)"
          @click.prevent.stop="addFollow(follower.id)"
        >
          跟隨
        </button>
        <button
          class="unfollow"
          v-else
          v-show="!(follower.id === currentUser.id)"
          @click.prevent.stop="deleteFollow(follower.id)"
        >
          正在跟隨
        </button>
      </div>
      <div class="follow-content-body">{{ follower.introduction }}</div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";
import { eventBus } from "../utils/eventbus";
import usersAPI from "../apis/users";

export default {
  name: "FollowItems",
  mixins: [emptyImageFilter],
  props: {
    initialFollower: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      follower: {
        id: 0,
        name: "",
        account: "",
        avatar: "",
        introduction: "",
        isFollowing: false,
        Followers: [],
      },
      // isFollowing: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    initialFollower(newValue) {
      this.follower = {
        ...this.follower,
        ...newValue,
      };
    },
  },
  created() {
    this.fetchUser();
    this.popularAddFollow();
    this.popularDeleteFollow();
  },
  methods: {
    fetchUser() {
      const { id, name, account, avatar, introduction, Followers } =
        this.initialFollower;
      this.follower = {
        id,
        name,
        account,
        avatar,
        introduction,
        Followers,
      };

      if (Followers === []) {
        this.follower.isFollowing = false;
      } else {
        Followers.find((follower) => {
          if (follower.id === this.currentUser.id) {
            return (this.follower.isFollowing = true);
          } else {
            this.follower.isFollowing = false;
          }
        });
      }
    },
    async addFollow(userId) {
      try {
        this.follower.isFollowing = true;
        const { data } = await usersAPI.addFollow({ userId });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      eventBus.$emit("add-follow-pop", userId);
      this.$router.go(0);

    },
    async deleteFollow(userId) {
      try {
        this.follower.isFollowing = false;
        const { data } = await usersAPI.deleteFollow({ userId });
        console.log(data);
        console.log(userId);
      } catch (error) {
        console.log(error);
      }
      eventBus.$emit("delete-follow-pop", userId);
      this.$router.go(0);

    },
    popularAddFollow() {
      eventBus.$on("add-follow-pop", (userId) => {
        if (this.follower.id === userId) {
          return (this.isFollowing = true);
        } else return;
      });
    },
    popularDeleteFollow() {
      eventBus.$on("delete-follow-pop", (userId) => {
        if (this.follower.id === userId) {
          return (this.isFollowing = false);
        } else return;
      });
    },
  },
};
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
          text-decoration: none
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