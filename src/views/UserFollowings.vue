<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <!-- <UserFollow /> -->
        <div class="top">
          <img
            src="../../public/images/icon_back.png"
            alt=""
            class="top-back"
            @click="$router.back()"
          />
          <div class="top-title">
            <div class="top-title-name">{{ name }}</div>
            <div class="top-title-tweet">
              {{ tweetsNum }}<span class="top-title-tweet-count"> 推文</span>
            </div>
          </div>
        </div>
        <div class="user-follow">
          <FollowNavPills :userId="id" />
          <FollowItems
            v-for="follower in followers"
            :key="follower.id"
            :initial-follower="follower"
            @refresh="refresh"
          />
        </div>
      </div>
      <PopularUsersCard @refresh="refresh" />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import FollowNavPills from "../components/FollowNavPills.vue";
import FollowItems from "../components/FollowItems.vue";
import PopularUsersCard from "./../components/PopularUsersCard";

import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { errorToast } from "../utils/toast";

export default {
  name: "UserFollowings",
  components: {
    Navbar,
    FollowNavPills,
    FollowItems,
    PopularUsersCard,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  data() {
    return {
      id: -1,
      name: "",
      tweetsNum: 0,
      followers: [],
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchFollowings({ userId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchFollowings({ userId });
    next();
  },
  methods: {
    async fetchFollowings({ userId }) {
      try {
        const response = await usersAPI.getUser({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        const { id, name, Followings, tweetsCount } = data;
        this.id = id;
        this.name = name;
        this.followers = Followings;
        this.tweetsNum = tweetsCount;
      } catch (error) {
        errorToast.fire({
          title: "無法取得追蹤者資訊",
        });
      }
    },
    refresh() {
      const { id: userId } = this.$route.params;
      this.fetchFollowings({ userId });
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