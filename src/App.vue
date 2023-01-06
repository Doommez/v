<template>
  <div class="app">
    <the-navbar class="app__navbar" />
    <the-header class="app__header" />
    <div class="app__main">
      <router-view />
    </div>
    <base-alert />
  </div>
</template>

<script setup>
  import TheNavbar from './components/TheNavbar.vue';
  import TheHeader from './components/TheHeader.vue';
  import BaseAlert from './components/BaseAlert.vue';
</script>

<style lang="scss" scoped>
  .app {
    display: grid;
    grid-template-columns: 92px 1fr;
    grid-template-rows: 90px 1fr;
    height: 100%;

    &__navbar {
      z-index: 1000;
      grid-column: 1/2;
    }

    &__header {
      grid-column: 2/3;
      grid-row: 1/2;
      z-index: 900;
    }

    &__main {
      grid-column: 2/3;
      grid-row: 2/3;
      height: 100vh;
    }
  }
</style>
