<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <AddTweet />
        <TweetItems />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetItems from "./../components/TweetItems";
import PopularUsersCard from "./../components/PopularUsersCard";
import AddTweet from './../components/AddTweet.vue'

export default {
  name: "Tweets",
  components: {
    Navbar,
    AddTweet,
    TweetItems,
    PopularUsersCard,
  },
};
</script>



