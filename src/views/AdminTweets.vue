<template>
  <div>
    <AdminNavbar />
    <div class="wide-container">
      <div class="main">
        <AdminTweetItems />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminTweetItems from "./../components/AdminTweetItems";

export default {
  components: {
    AdminNavbar,
    AdminTweetItems,
  },
};
</script>