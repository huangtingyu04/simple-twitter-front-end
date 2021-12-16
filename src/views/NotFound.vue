// ./src/views/NotFound.vue
<template>
  <div>
    <div id="background"></div>
    <div class="top">
      <h1>404</h1>
      <h3>page not found</h3>
    </div>
    <div class="container"></div>
    <div class="bottom">
      <div class="buttons">
        <button class="btn" @click="$router.back()">Back</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@import '../styles/notfound'
</style>