<template>
  <nav class="navbox">
    <div class="logo">
      <img src="../../public/images/Logo.png" />
    </div>
    <ul>
      <li>
        <router-link to="/admin/tweets" class="link">
          <img class="img" src="../../public/images/icon_index.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_index_hover.png"
          />
          <span>推文清單</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/users" class="link">
          <img class="img" src="../../public/images/icon_user.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_user_hover.png"
          />
          <span>使用者列表</span>
        </router-link>
      </li>
    </ul>
    <div class="logout">
      <router-link to="/admin/signin" class="link">
        <img class="img" src="../../public/images/icon_logout.png" />
        <img
          class="img-hover"
          src="../../public/images/icon_logout_hover.png"
        />
        登出
      </router-link>
    </div>
  </nav>
</template>


<style scoped lang="sass">
@import '../styles/navbar'
</style>
