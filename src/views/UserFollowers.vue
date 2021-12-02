<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserFollow />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import UserFollow from '../components/UserFollow.vue'
import PopularUsersCard from './../components/PopularUsersCard'

export default {
  name: 'UserFollowers',
  components: {
    Navbar,
    UserFollow,
    PopularUsersCard
  }
}
</script>