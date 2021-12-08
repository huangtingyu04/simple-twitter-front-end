<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <div class="form-setting">
          <div class="main-title">帳戶設定</div>
          <form action="" @submit.prevent.stop="handleSubmit(currentUser.id)">
            <div class="input-field">
              <label for="account">帳號</label>
              <input
                type="text"
                id="account"
                placeholder="@wonderman"
                v-model="user.account"
              />
            </div>
            <div class="input-field">
              <label for="name">名稱</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                v-model="user.name"
              />
            </div>
            <div class="input-field">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="JohnDoe@gmail.com"
                v-model="user.email"
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
                id="checkPassword"
                v-model="checkPassword"
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
    <TweetModal :current-user="currentUser"/>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetModal from '../components/TweetModal.vue'
import { successToast, errorToast } from '../utils/toast'
import { mapState } from 'vuex'

export default {
  name: 'UserSetting',
  components: {
    Navbar,
    TweetModal
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        account: "",
        email: "",
        avatar: ''
      },
      password: '',
      checkPassword: ''
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      const { id, name, account, email, avatar } = this.currentUser;
      this.user = { 
        id, 
        name, 
        account, 
        email, 
        avatar }
    },
    handleSubmit() {
      if(!this.password || !this.checkPassword) {
        errorToast.fire({
          title: '請填寫密碼與密碼確認後送出'
        })
        return
      }
      if(this.password !== this.checkPassword) {
        errorToast.fire({
          title: '兩次密碼輸入不一致'
        })
        return
      }
      const data = JSON.stringify({
        id: this.id,
        name: this.name,
        account: this.account,
        email: this.email,
        password: this.password,
      });
      console.log("data", data);
      successToast.fire({
        title: '個人資訊儲存成功'
      })
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
