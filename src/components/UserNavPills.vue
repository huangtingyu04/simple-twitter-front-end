<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link class="nav-link" to="/user/tweets">推文</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/user/replies"
          >推文與回覆</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/user/likes">喜歡的內容</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserNavPills",
};
</script>

<style lang="sass" scoped>
@import '../styles/_navpills'
</style>