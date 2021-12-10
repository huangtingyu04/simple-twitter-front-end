<template>
  <div>
    <Navbar />
    <div class="wide-container">Public</div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'PublicChat',
  components: {
    Navbar,
  }
}
</script>