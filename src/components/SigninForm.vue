<template>
  <div class="form-signin">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <div class="main-title">登入 Alphitter</div>
    <form action="">
      <div class="input-field">
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div class="input-field">
        <label for="password">密碼</label>
        <input type="text" id="password" />
      </div>
      <div class="input-field input-alert">
        <label for="passwordConfirmed1">密碼錯誤</label>
        <input type="text" id="passwordConfirmed1" />
        <div class="alert">
          <div class="alert-text">字數超出上限!</div>
          <div class="alert-limit">8/50</div>
        </div>
      </div>
      <a href="javascript:;" class="btn-main">登入</a>
      <a href="javascript:;" class="btn-blue text-R">註冊 Alphitter·後台登入</a>
    </form>
  </div>
</template>

<script>
export default {
  name: "SigninForm",
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
