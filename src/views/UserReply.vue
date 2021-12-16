<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <Spinner v-show="isLoading"/>
      <div class="main" v-show="!isLoading">
        <UserProfile
          :current-user="currentUser"
          :initial-user="user"
          @refresh="refresh"
        />
        <div v-if="replies.length === 0" class="empty">
          使用者沒有任何推文回復
        </div>
        <UserReplyItems
          v-for="reply in replies"
          :key="reply.id"
          :initial-reply="reply"
        />
        <UserEditModal 
          :current-user="currentUser"
          @refresh="refresh" />
        <TweetModal :current-user="currentUser" @refresh="refresh" />
      </div>
      <PopularUsersCard @refresh="refresh" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { errorToast } from "../utils/toast";

import Navbar from "./../components/Navbar";
import UserProfile from "../components/UserProfile.vue";
import UserReplyItems from "../components/UserReplyItems.vue";
import UserEditModal from "../components/UserEditModal.vue";
import TweetModal from "../components/TweetModal.vue";
import Spinner from '../components/Spinner.vue'
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "UserReply",
  components: {
    Navbar,
    UserProfile,
    UserReplyItems,
    UserEditModal,
    TweetModal,
    Spinner,
    PopularUsersCard,
  },
  data() {
    return {
      user: {},
      tweetsCount: 0,
      replies: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser({ userId });
    this.fetchReplies({ userId });
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser({ userId });
    this.fetchReplies({ userId });
    next();
  },
  methods: {
    async fetchReplies({ userId }) {
      try {
        const response = await usersAPI.getUserReplies({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        this.replies = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取得使用者回覆",
        });
      }
    },
    async fetchUser({ userId }) {
      try {
        const response = await usersAPI.getUser({ userId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error();
        }
        this.user = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    userUpdate(payload) {
      const { name, introduction, avatar, cover } = payload;
      this.user.name = name;
      this.user.introduction = introduction;
      this.user.avatar = avatar;
      this.user.cover = cover;
    },
    refresh() {
      const { id: userId } = this.$route.params;
      this.fetchUser({ userId });
      this.fetchReplies({ userId });
    },
  },
};
</script>

<style lang="sass" scoped>
.empty
  margin: 20px 
  font-size: 17px
  color: $input-label
</style>