<template>
  <div class="card-users-container">
    <div class="main-title">使用者列表</div>
    <div class="card-box">
      <div class="card-item" v-for="user in users" :key="user.id">
        <div class="card-img-content">
          <div
            class="img-cover"
            :style="{ 'background-image': 'url(' + user.imgCover + ')' }"
          ></div>
          <div class="avatar">
            <img :src="user.image" />
          </div>
        </div>
        <div class="card-user-name">{{ user.name }}</div>
        <div class="card-account">@{{ user.account }}</div>
        <div class="record-box">
          <div class="reply record-item">
            <img src="../../public/images/icon_message.png" />
            <span class="num">{{ user.tweetNum | formatNum }}</span>
          </div>
          <div class="like record-item">
            <img src="../../public/images/icon_like.png" />
            <span class="num">{{ user.likeNum | formatNum }}</span>
          </div>
        </div>
        <div class="follow-box">
          <div class="following follow-item">
            <span class="num">{{ user.following }} </span>個跟隨中
          </div>
          <div class="following follow-item">
            <span class="num">{{ user.followed }} </span>位跟隨者
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  users: [
    {
      id: 1,
      name: "John Doe",
      account: "heyjohn",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      imgCover:
        "https://media.istockphoto.com/photos/aerial-view-of-greenhouses-picture-id1278406333?b=1&k=20&m=1278406333&s=170667a&w=0&h=q9aWfW5UK95iNd6P0J0MAgcb2zB9_Om2K1PWuhlL77s=",
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      tweetNum: 1500,
      likeNum: 1500,
      following: 34,
      followed: 59,
    },
    {
      id: 2,
      name: "Mary Jane",
      account: "heymary",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      imgCover:
        "https://media.istockphoto.com/photos/aerial-view-of-greenhouses-picture-id1278406333?b=1&k=20&m=1278406333&s=170667a&w=0&h=q9aWfW5UK95iNd6P0J0MAgcb2zB9_Om2K1PWuhlL77s=",
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      tweetNum: 2500,
      likeNum: 1400,
      following: 54,
      followed: 10,
    },
  ],
};
export default {
  name: "AdminUserCards",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
  },
  created() {
    this.fetchUsers();
  },
  filters: {
    formatNum(num) {
      if (num < 1e3) return num;
      if (num >= 1e3) return +(num / 1e3).toFixed(1) + "K";
    },
  },
};
</script>
<style lang="sass" scoped>
@import '../styles/adminUsers'
</style>1