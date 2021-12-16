<template>
  <div class="form-signin">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <div class="main-title">登入 Alphitter</div>
    <form @submit.prevent.stop="handleSubmit">
      <div class="input-field">
        <label for="account">帳號</label>
        <input
          type="text"
          name="account"
          id="account"
          required
          autofocus
          placeholder="Account"
          v-model="account"
        />
        <span class="symbol">@</span>
      </div>
      <div class="input-field">
        <label for="password">密碼</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          v-model="password"
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
      <button type="submit" class="btn-main" :disabled="isProcessing">
        登入
      </button>
      <div class="link-group">
        <router-link class="btn-blue" to="/signup">註冊 Alphitter</router-link>
        ·
        <router-link class="btn-blue" to="/admin/signin">後台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { successToast, errorToast } from "../utils/toast";
export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          errorToast.fire({
            title: "account 或 password",
          });
          return;
        }
        this.isProcessing = true;
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        const { data, statusText } = response;
        if (data.status !== "success" || statusText !== "OK") {
          throw new Error(data.message);
        }
        if (data.user.role === "admin") {
          errorToast.fire({
            title: "請至後台登入",
          });
          this.$router.push("/admin/signin");
          return;
        }
        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 透過 setCurrentUser 把使用者資料存到 Vuex 的 state 中
        this.$store.commit("setCurrentUser", data.user);
        successToast.fire({
          title: "已成功登入",
        });
        // 成功登入後轉址到首頁
        this.$router.push("/tweets");
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: `無法登入-${error.message}`,
        });
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
