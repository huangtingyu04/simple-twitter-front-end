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
        <label for="passwordConfirmed">密碼確認</label>
        <input type="password" id="passwordConfirmed" name="passwordConfirmed" required v-model="passwordConfirmed" />
      </div>
      <!-- <div class="input-field input-alert">
        <label for="passwordConfirmed1">密碼錯誤</label>
        <input type="password" id="passwordConfirmed1" name="passwordConfirmed1" required />
        <div class="alert">
          <div class="alert-text">字數超出上限!</div>
          <div class="alert-limit">8/50</div>
        </div>
      </div> -->
    <button type="submit" class="btn-main">註冊</button>
      <div class="link-group j-c-c">
        <router-link class="btn-blue" to="/signin">取消</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
        account: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmed: ''
    }
  },
  methods: {
    handleSubmit () {
        const data = JSON.stringify({
            account: this.account,
            name: this.name,
            email: this.acemailcount,
            password: this.password,
            passwordConfirmed: this.passwordConfirmed
        })
        console.log(data)
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
