<template>
  <Spinner v-if="isLoading" />
  <div v-else class="card-users-container">
    <div class="main-title">使用者列表</div>
    <div class="card-box">
      <div class="card-item" v-for="user in users" :key="user.id">
        <div class="card-img-content">
          <!-- <div
            class="img-cover"
            :style="{ backgroundImage: 'url(' + '/images/bg.jpg' | webp + ')' }"
          ></div> -->
          <div
            class="img-cover"
            :style="{
              'background-image': 'url(' + user.cover + ')',
            }"
          ></div>
          <div class="avatar">
            <img :src="user.avatar | emptyImage" />
          </div>
        </div>
        <div class="card-user-name">{{ user.name }}</div>
        <div class="card-account">@{{ user.account }}</div>
        <div class="record-box">
          <div class="reply record-item">
            <img src="../../public/images/icon_message.png" />
            <span class="num">{{ user.Tweets.length | formatNum }}</span>
          </div>
          <div class="like record-item">
            <img src="../../public/images/icon_like.png" />
            <span class="num">{{ user.Likes.length | formatNum }}</span>
          </div>
        </div>
        <div class="follow-box">
          <div class="following follow-item">
            <span class="num">{{ user.Followings.length }} </span>個跟隨中
          </div>
          <div class="following follow-item">
            <span class="num">{{ user.Followers.length }} </span>位跟隨者
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import adminAPI from "../apis/admin";
import { errorToast } from "../utils/toast";
import Spinner from "./../components/Spinner";

export default {
  name: "AdminUserCards",
  mixins: [emptyImageFilter],
  components: {
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.users.get();
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = data.users;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        errorToast.fire({
          title: "無法取得使用者，請稍後再試",
        });
      }
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