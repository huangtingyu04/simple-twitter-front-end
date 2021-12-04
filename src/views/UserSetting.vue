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
                id="account"
                placeholder="@wonderman"
                v-model="account"
              />
            </div>
            <div class="input-field">
              <label for="name">名稱</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                v-model="name"
              />
            </div>
            <div class="input-field">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="JohnDoe@gmail.com"
                v-model="email"
              />
            </div>
            <div class="input-field">
              <label for="password">密碼</label>
              <input type="password" id="password" v-model="password" />
            </div>
            <div class="input-field">
              <label for="passwordConfirmed">密碼確認</label>
              <input
                type="password"
                id="passwordConfirmed"
                v-model="password"
              />
            </div>
            <div class="input-field input-alert">
              <label for="passwordConfirmed1">密碼錯誤</label>
              <input type="text" id="passwordConfirmed1" />
              <div class="alert">
                <div class="alert-text">字數超出上限!</div>
                <div class="alert-limit">8/50</div>
              </div>
            </div>
            <button type="submit" class="btn-main">儲存</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "John Doe",
    account: "JohnDoe",
    email: "John@example.com",
    password: "12345678",
  },
};

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      id: -1,
      name: "",
      account: "",
      email: "",
      password: "",
    };
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      const { id, name, account, email, password } = dummyUser.currentUser;

      this.id = id;
      this.name = name;
      this.account = account;
      this.email = email;
      this.password = password;
    },
    handleSubmit() {
      const data = JSON.stringify({
        id: this.id,
        name: this.name,
        account: this.account,
        email: this.email,
        password: this.password,
      });
      console.log("data", data);
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
