<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile />
        <TweetItems />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import UserProfile from '../components/UserProfile.vue'
import TweetItems from '../components/TweetItems.vue'
import PopularUsersCard from './../components/PopularUsersCard'

export default {
  name: 'User',
  components: {
    Navbar,
    UserProfile,
    TweetItems,
    PopularUsersCard
  }
}
</script>