<template>
  <div>
    <AdminNavbar />
    <div class="wide-container">
      <div class="main">
        <AdminUserCards />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminUserCards from "./../components/AdminUserCards";

export default {
  components: {
    AdminNavbar,
    AdminUserCards,
  },
};
</script>
