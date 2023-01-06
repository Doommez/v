<template>
  <div
    v-if="loader"
    class="overlays"
  >
    <v-progress-circular
      indeterminate
      class="overlays__loader"
    />
  </div>
</template>

<script setup>
  import {useLoader} from '../composables/useLoader';

  const {loader} = useLoader();
</script>

<style lang="scss" scoped>
  @use '../styles/utils/variables';

  .overlays {
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    position: fixed;
    background-color: variables.$grey-mid-lite;
    opacity: 50%;
    &__loader {
      color: variables.$green;
      width: 150px;
      height: 150px;
      position: absolute;
      top: 20%;
      left: 40%;
    }
  }

</style>
