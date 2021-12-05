<template>
  <div class="form-signup">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <div class="main-title">建立你的帳號</div>
    <form @submit.prevent.stop="handleSubmit">
      <div class="input-field">
        <label for="account">帳號</label>
        <input type="text" id="account" name="account" required
          autofocus v-model="account" />
      </div>
      <div class="input-field">
        <label for="name">名稱</label>
        <input type="text" id="name" name="name" required v-model="name" />
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">密碼</label>
        <input type="password" id="password" name="password" required v-model="password" />
      </div>
      <div class="input-field">
        <label for="checkPassword">密碼確認</label>
        <input type="password" id="checkPassword" name="checkPassword" required v-model="checkPassword" />
      </div>
      <!-- <div class="input-field input-alert">
        <label for="passwordConfirmed1">密碼錯誤</label>
        <input type="password" id="passwordConfirmed1" name="passwordConfirmed1" required />
        <div class="alert">
          <div class="alert-text">字數超出上限!</div>
          <div class="alert-limit">8/50</div>
        </div>
      </div> -->
    <button type="submit" class="btn-main" :disabled="isProcessing">註冊</button>
      <div class="link-group j-c-c">
        <router-link class="btn-blue" to="/signin">取消</router-link>
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
        account: '',
        name: '',
        email: '',
        password: '',
        checkPassword: '',
        isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if(!this.name.trim() || !this.account.trim() || !this.email || !this.password || !this.checkPassword) {
          errorToast.fire({
            title: '尚有欄位未填寫'
          })
          return 
        }
        if(this.password !== this.checkPassword) {
          errorToast.fire({
            title: '兩次密碼輸入不一致'
          })
          return
        }
        this.isProcessing = true
        const response = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })
        const { data, statusText } = response
        if(data.status !== 'success' || statusText !== 'OK') {
          throw new Error(data.message)
        }
        successToast.fire({
          title: '註冊成功!'
        })
        this.isProcessing = false
        this.$router.push('/signin')
      } catch (error) {
        console.log(error)
        errorToast.fire({
          title: `無法註冊-${error.message}`
        })
        this.isProcessing = false
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
