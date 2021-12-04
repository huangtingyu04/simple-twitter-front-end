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
          :to="{ name: 'user', params: { id: currentUser.id } }"
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
        />
        登出
      </router-link>
    </div>
    <TweetModal :current-user="currentUser" />
  </nav>
</template>

<script>
import TweetModal from "../components/TweetModal.vue";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "John Doe",
    account: "JohnDoe",
    email: "John@example.com",
    password: "12345678",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  isAuthenticated: true,
};

export default {
  name: "Navbar",
  components: {
    TweetModal,
  },
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        account: "",
        email: "",
        password: "",
        image: "",
      },
      isAuthenticated: false,
    };
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style scoped lang="sass">
@import '../styles/navbar'
</style>

