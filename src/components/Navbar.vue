<template>
  <nav class="navbox">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <ul>
      <li>
        <a href="javascript:;" class="link">
          <img class="img" src="../../public/images/icon_index.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_index_hover.png"
          />
          <span>首頁</span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="link">
          <img class="img" src="../../public/images/icon_user.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_user_hover.png"
          />
          <span>個人資料</span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="link">
          <img class="img" src="../../public/images/icon_setting.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_setting_hover.png"
          />
          <span>設定</span>
        </a>
      </li>
    </ul>
    <button
      type="button"
      class="tweet-btn"
      data-bs-toggle="modal"
      data-bs-target="#tweet-modal"
    >
      推文
    </button>
    <div class="logout">
      <a href="javascript:;" class="link">
        <img class="img" src="../../public/images/icon_logout.png" />
        <img class="img-hover" src="../../public/images/icon_logout.png" />
        登出
      </a>
    </div>
    <TweetModal :modal-append-to-body="false"/>
  </nav>
</template>

<script>
import TweetModal from "../components/TweetModal.vue";
export default {
  name: "Navbar",
  components: {
    TweetModal,
  },
};
</script>

<style scoped lang="sass">
@import '../styles/navbar'
</style>

