<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <AdminTweetItems />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import AdminTweetItems from "./../components/AdminTweetItems";

export default {
  components: {
    Navbar,
    AdminTweetItems,
  },
};
</script>