<template>
  <div class="popular-container">
    <div class="popular-box">
      <div class="popular-title">Popular</div>
      <div class="popluar-item" v-for="user in popularUsers" :key="user.id">
        <div class="user-info">
          <div class="user-img">
            <img :src="user.image | emptyImage" />
          </div>
          <div class="user-content">
            <div class="name">{{ user.name }}</div>
            <router-link
              class="link"
              :to="{ name: 'user', params: { id: user.id } }"
            >
              @{{ user.account }}
            </router-link>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '../utils/mixins'

const dummyData = {
  popularUsers: [
    {
      id: 1,
      UserId: 1,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      name: "Pizza Hut",
      account: "pizzahut",
      image: "https://i.imgur.com/RnQRoJb.png",
      isFollowed: false,
    },
    {
      id: 2,
      UserId: 3,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      name: "McDonald's",
      account: "McDonalds",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      isFollowed: true,
    },
    {
      id: 3,
      UserId: 5,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      name: "McDonald's",
      account: "McDonalds",
      image: "https://i.imgur.com/RnQRoJb.png",
      isFollowed: true,
    },
  ],
};

export default {
  name: 'PopularUsersCards',
  mixins: [ emptyImageFilter ],
  data() {
    return {
      popularUsers: [],
    };
  },
  methods: {
    fetchPopularUsers() {
      this.popularUsers = dummyData.popularUsers;
    },
    addFollowing(id) {
      this.popularUsers = this.popularUsers.map((user) => {
        if (user.id !== id) {
          return user;
        } else {
          return {
            ...user,
            isFollowed: true,
          };
        }
      });
    },
    deleteFollowing(id) {
      this.popularUsers = this.popularUsers.map((user) => {
        if (user.id !== id) {
          return user;
        } else {
          return {
            ...user,
            isFollowed: false,
          };
        }
      });
    },
  },
  created() {
    this.fetchPopularUsers();
  },
};
</script>
<style lang="sass" scoped>
@import '../styles/popularUsers'
</style>