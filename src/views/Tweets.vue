<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <TweetItems />
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetItems from "./../components/TweetItems";
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "Tweets",
  components: {
    Navbar,
    TweetItems,
    PopularUsersCard,
  },
};
</script>



