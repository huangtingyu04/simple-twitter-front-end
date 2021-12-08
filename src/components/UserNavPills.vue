<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'user-tweet', params: { id: userId } }">推文</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'user-reply', params: { id: userId } }"
          >推文與回覆</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link"  :to="{ name: 'user-like', params: { id: userId } }">喜歡的內容</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserNavPills",
  props: {
    userId: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_navpills'
</style>