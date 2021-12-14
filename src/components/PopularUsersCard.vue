<template>
  <div class="popular-container">
    <div class="popular-box">
      <div class="popular-title">Popular</div>
      <div class="popluar-item" v-for="user in popularUsers" :key="user.id">
        <div class="user-info">
          <div class="user-img">
            <img :src="user.avatar | emptyImage" />
          </div>
          <div class="user-content">
            <div class="name">{{ user.name }}</div>
            <router-link
              class="link"
              :to="{ name: 'user-tweet', params: { id: user.id } }"
            >
              @{{ user.account }}
            </router-link>
          </div>
        </div>
        <template v-if="currentUser.id !== user.id">
          <button
            type="button"
            class="follow-btn"
            v-if="!user.isFollowed"
            @click.stop.prevent="addFollowing(user.id)"
          >
            跟隨
          </button>
          <button
            type="button"
            class="follow-btn active"
            v-else
            @click.stop.prevent="deleteFollowing(user.id)"
          >
            正在跟隨
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { errorToast } from "../utils/toast";
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "PopularUsersCards",
  mixins: [emptyImageFilter],
  data() {
    return {
      popularUsers: [],
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    this.fetchPopularUsers();
  },
  methods: {
    async fetchPopularUsers() {
      try {
        const response = await usersAPI.getPopularUsers();
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.popularUsers = data.users.filter(user => user.id !== this.currentUser.id);
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取得熱門使用者，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollow({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.popularUsers = this.popularUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: true,
            };
          }
        });
        this.$emit("toggle-follow")
      } catch (error) {
        errorToast.fire({
          title: "無法追蹤",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await usersAPI.deleteFollow({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.popularUsers = this.popularUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: false,
            };
          }
        });
        this.$emit("toggle-follow")
      } catch (error) {
        errorToast.fire({
          title: "無法取消追蹤",
        });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
@import '../styles/popularUsers'
</style>