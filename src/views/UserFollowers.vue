<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main"></div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsersCard from './../components/PopularUsersCard'
export default {
  name: 'UserFollowers',
  components: {
    Navbar,
    PopularUsersCard
  }
}
</script>