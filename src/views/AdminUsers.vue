<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <AdminUserCards />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import AdminUserCards from "./../components/AdminUserCards";

export default {
  name: "Tweets",
  components: {
    Navbar,
    AdminUserCards,
  },
};
</script>
