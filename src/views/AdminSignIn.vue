<template>
  <div class="form-signin">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <div class="main-title">後台登入</div>
    <form action="" @submit.prevent.stop="handleSubmit">
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required autofocus placeholder="email" v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">密碼</label>
        <input type="password" name="password" id="password" required placeholder="Password" v-model="password" />
      </div>
      <!-- <div class="input-field input-alert">
        <label for="passwordConfirmed1">密碼錯誤</label>
        <input type="text" id="passwordConfirmed1" />
        <div class="alert">
          <div class="alert-text">字數超出上限!</div>
          <div class="alert-limit">8/50</div>
        </div>
      </div> -->
      <button type="submit" class="btn-main" :disabled="isProcessing">登入</button>
      <div class="link-group">
        <router-link class="btn-blue" to="/signin">前台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization'
import { successToast, errorToast } from '../utils/toast'
export default {
  data () {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if(!this.email || !this.password) {
          errorToast.fire({
            title: '請填入email 或 password'
          })
          return
        }
        this.isProcessing = true
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })
        console.log(response)
        const {data, statusText} = response
        if(data.status !== 'success' || statusText !== 'OK') {
          throw new Error(data.message)
        }
        if(!data.user.role) {
          errorToast.fire({
            title: '請至前台登入',
          })
          this.$router.push('/signin')
          return
        }
        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);
        this.isProcessing = false
        successToast.fire({
          title: '已成功登入'
        })
        // 成功登入後轉址到後台首頁
        this.$router.push("/admin/tweets");
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        errorToast.fire({
          title: `無法登入--${error.message}`
        })
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
