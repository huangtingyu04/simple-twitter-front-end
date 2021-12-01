<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <div class="form-setting">
          <div class="main-title">帳戶設定</div>
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
            <a href="javascript:;" class="btn-main">儲存</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/forms'
@import '../styles/formSign'
</style>
