<template>
  <nav class="navbox">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <ul>
      <li>
        <router-link to="/tweets" class="link">
          <img class="img" src="../../public/images/icon_index.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_index_hover.png"
          />
          <span>首頁</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'user-tweet', params: { id: currentUser.id } }"
          class="link"
        >
          <img class="img" src="../../public/images/icon_user.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_user_hover.png"
          />
          <span>個人資料</span>
        </router-link>
      </li>
      <li>
        <router-link
          class="link"
          :to="{ name: 'user-setting', params: { id: currentUser.id } }"
        >
          <img class="img" src="../../public/images/icon_setting.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_setting_hover.png"
          />
          <span>設定</span>
        </router-link>
      </li>
    </ul>
    <button
      type="button"
      class="tweet-btn"
      data-bs-toggle="modal"
      data-bs-target="#tweet-modal"
    >
      推文
    </button>
    <div class="logout">
      <router-link to="/signin" class="link">
        <img class="img" src="../../public/images/icon_logout.png" />
        <img
          class="img-hover"
          src="../../public/images/icon_logout_hover.png"
          @click="logout"
        />
        登出
      </router-link>
    </div>
    
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Navbar",
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    // fetchUser() {
    //   this.currentUser = {
    //     ...this.currentUser,
    //     ...dummyUser.currentUser,
    //   };
    //   this.isAuthenticated = dummyUser.isAuthenticated;
    // },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    }
  },
};
</script>

<style scoped lang="sass">
@import '../styles/navbar'
</style>

