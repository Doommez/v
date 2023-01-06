<template>
  <v-snackbar
    v-model="isShownAlert"
    :timeout="dataAlert.timeout"
    :color="theme"
    class="alert"
    variant="outlined"
  >
    <div class="alert__content content">
      <div
        class="content__icon"
        :class="rootClass"
      >
        <span v-if="dataAlert.isSuccess">
          &#128077;
        </span>
        <span v-else>
          &#128549;
        </span>
      </div>
      <div class="content__body">
        {{ dataAlert.textMessage }}
      </div>
    </div>
  </v-snackbar>
</template>

<script setup>
  import {computed} from 'vue';
  import {useAlert} from '../composables/useAlert';

  const {dataAlert, isShownAlert} = useAlert();

  const theme = computed(() => (dataAlert.value.isSuccess ? 'success' : 'error'));

  const rootClass = computed(() => {
    if (!dataAlert.value.isSuccess) {
      return 'content__icon_invalid';
    }
    return 'content__icon_success';
  });

</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/mixins';
  @use "src/styles/utils/variables";

  .alert {
    padding: 16px 20px;

    &__content {
      display: grid;
      grid-template-columns: 40px 1fr;
    }
  }

  .content {
    &__body {
      @include mixins.text-lg-bold;
    }

    &__icon {
      font-size: 16px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      justify-items: center;
      margin-right: 10px;

      &_invalid {
        background-color: variables.$red-lite;

        & + .content__body {
          color: variables.$red;
        }
      }

      &_success {
        background-color: variables.$green-lite;
      }
    }
  }
</style>
