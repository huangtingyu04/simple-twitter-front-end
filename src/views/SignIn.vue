<template>
  <div class="form-signin">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <div class="main-title">登入 Alphitter</div>
    <form @submit.prevent.stop="handleSubmit">
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
      <button type="submit" class="btn-main">登入</button>
      <div class="link-group">
        <router-link class="btn-blue" to="/signup">註冊 Alphitter</router-link>
        ·
        <router-link class="btn-blue" to="/admin/signin">後台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      console.log('data', data)
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
