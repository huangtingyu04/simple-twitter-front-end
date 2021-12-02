<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link
          :to="{ name: 'user-followers', params: 1 }"
          class="nav-link"
          >跟隨者</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'user-followings', params: 1 }"
          class="nav-link"
          >正在跟隨</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FollowNavPills',
}
</script>

<style lang="sass" scoped>
@import '../styles/_navpills'
</style>