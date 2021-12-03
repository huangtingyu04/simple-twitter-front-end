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
          <span>推文清單</span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="link">
          <img class="img" src="../../public/images/icon_user.png" />
          <img
            class="img-hover"
            src="../../public/images/icon_user_hover.png"
          />
          <span>使用者列表</span>
        </a>
      </li>
    </ul>
    <div class="logout">
      <a href="javascript:;" class="link">
        <img class="img" src="../../public/images/icon_logout.png" />
        <img class="img-hover" src="../../public/images/icon_logout.png" />
        登出
      </a>
    </div>
  </nav>
</template>


<style scoped lang="sass">
@import '../styles/navbar'
</style>
