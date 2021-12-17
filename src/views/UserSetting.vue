<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <div class="form-setting">
          <div class="main-title">帳戶設定</div>
          <form action="" @submit.prevent.stop="handleSubmit">
            <div class="input-field">
              <label for="account">帳號</label>
              <input
                type="text"
                name="account"
                id="account"
                v-model="user.account"
              />
              <span class="symbol">@</span>
            </div>
            <div class="input-field">
              <label for="name">名稱</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                v-model="user.name"
              />
            </div>
            <div class="input-field">
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="JohnDoe@gmail.com"
                v-model="user.email"
              />
            </div>
            <div class="input-field">
              <label for="password">密碼</label>
              <input
                type="password"
                id="password"
                name="password"
                v-model="user.password"
              />
            </div>
            <div class="input-field">
              <label for="passwordConfirmed">密碼確認</label>
              <input
                type="password"
                id="checkPassword"
                name="checkPassword"
                v-model="user.checkPassword"
              />
            </div>
            <!-- <div class="input-field input-alert">
              <label for="passwordConfirmed1">密碼錯誤</label>
              <input type="text" id="passwordConfirmed1" />
              <div class="alert">
                <div class="alert-text">字數超出上限!</div>
                <div class="alert-limit">8/50</div>
              </div>
            </div> -->
            <button type="submit" class="btn-main">儲存</button>
          </form>
        </div>
      </div>
    </div>
    <TweetModal :current-user="currentUser" />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetModal from "../components/TweetModal.vue";
import { successToast, errorToast } from "../utils/toast";
import { mapState } from "vuex";
import usersAPI from "../apis/users";

export default {
  name: "UserSetting",
  components: {
    Navbar,
    TweetModal,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        account: "",
        email: "",
        password: "",
        checkPassword: "",
        role: "user",
      },
      password: "",
      checkPassword: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    if (this.currentUser.id === -1) return;
    const { id } = this.$route.params;
    this.setUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.currentUser.id === -1) return;
    const { id } = to.params;
    this.setUser(id);
    next();
  },
  watch: {
    currentUser(user) {
      if (user.id === -1) return;
      const { id } = this.$route.params;
      this.setUser(id);
    },
  },
  methods: {
    setUser(userId) {
      const { id, name, email, account, role } = this.currentUser;

      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: "not-found" });
      }
      this.user = { id, name, email, account, role };
    },
    async handleSubmit() {
      try {
        if (!this.user.name || !this.user.account || !this.user.email) {
          errorToast.fire({
            title: "請填寫帳號/名稱/電子郵件後送出",
          });
          return;
        }
        if (!this.user.password || !this.user.checkPassword) {
          errorToast.fire({
            title: "請填寫密碼與密碼確認後送出",
          });
          return;
        }
        if (this.user.password !== this.user.checkPassword) {
          errorToast.fire({
            title: "兩次密碼輸入不一致",
          });
          return;
        }
        const userId = this.currentUser.id;
        const formData = {
          name: this.user.name,
          email: this.user.email,
          account: this.user.account,
          password: this.user.password,
          checkPassword: this.user.checkPassword,
        };
        const { data } = await usersAPI.update({
          userId,
          formData,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        successToast.fire({
          title: "已成功更新使用者資訊",
        });
        this.$router.push({ name: "user-tweet", params: { id: this.user.id } });
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法更新使用者資訊",
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
