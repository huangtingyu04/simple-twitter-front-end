<template>
  <div class="form-signup">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <div class="main-title">建立你的帳號</div>
    <form action="">
      <div class="input-field">
        <label for="account">帳號</label>
        <input type="text" id="account" placeholder="@wonderman" />
      </div>
      <div class="input-field">
        <label for="name">名稱</label>
        <input type="text" id="name" placeholder="John Doe" />
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input type="text" id="email" placeholder="JohnDoe@gmail.com" />
      </div>
      <div class="input-field">
        <label for="password">密碼</label>
        <input type="text" id="password" />
      </div>
      <div class="input-field">
        <label for="passwordConfirmed">密碼確認</label>
        <input type="text" id="passwordConfirmed" />
      </div>
      <div class="input-field input-alert">
        <label for="passwordConfirmed1">密碼錯誤</label>
        <input type="text" id="passwordConfirmed1" />
        <div class="alert">
          <div class="alert-text">字數超出上限!</div>
          <div class="alert-limit">8/50</div>
        </div>
      </div>
      <a href="javascript:;" class="btn-main">註冊</a>
      <a href="javascript:;" class="btn-blue">取消</a>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
