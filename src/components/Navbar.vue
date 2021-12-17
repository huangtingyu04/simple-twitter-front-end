<template>
  <nav class="navbox">
    <div to="/tweets" class="logo">
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
        <router-link to="/public" class="link">
          <img class="img" src="../../public/images/message.png" />
          <img
            class="img-hover"
            src="../../public/images/message_hover.png"
          />
          <span>公開聊天室</span>
        </router-link>
      </li>
      <li>
        <router-link to="/private" class="link">
          <img class="img" src="../../public/images/message.png" />
          <img
            class="img-hover"
            src="../../public/images/message_hover.png"
          />
          <span>私人訊息</span>
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
      <button @click="logout" class="link">
        <img class="img" src="../../public/images/icon_logout.png" />
        <img
          class="img-hover"
          src="../../public/images/icon_logout_hover.png"
        />
        登出
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped lang="sass">
@import '../styles/navbar'
</style>

