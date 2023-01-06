<template>
  <v-snackbar
    v-model="isOpenSnackbar"
    :timeout="timeout"
    :color="theme"
    class="alert"
    variant="outlined"
  >
    <slot>
      <div class="alert__content content">
        <div
          class="content__icon"
          :class="classIcon"
        >
          <slot name="icon">
            <div>
              <span v-if="isSuccess">
                &#128077;
              </span>
              <span v-else>
                &#128546;
              </span>
            </div>
          </slot>
        </div>
        <slot name="text">
          <div
            v-if="isSuccess"
            class="content__body"
          >
            Изменения успешно сохранены!
          </div>
          <div
            v-else
            class="content__body"
          >
            Что-то пошло не так
          </div>
        </slot>
      </div>
    </slot>
  </v-snackbar>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    isOpenAlert: {
      type: Boolean,
      required: true,
    },
    isSuccess: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: [Number, String],
      default: 1000,
    },
  });

  const emits = defineEmits([
    'update:isOpenSnackbar',
  ]);

  const isOpenSnackbar = computed({
    get() {
      return props.isOpenAlert;
    },
    set(value) {
      emits('update:isOpenSnackbar', value);
    },
  });

  const theme = computed(() => (props.isSuccess ? 'success' : 'error'));

  const classIcon = computed(() => {
    if (!props.isSuccess) {
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
