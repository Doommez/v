<template>
  <base-dialog
    v-model:is-dialog-open="isOpen"
    class="delete-modal"
    @confirm="confirm"
  >
    <slot>
      <div class="delete-modal__text">
        <slot name="modalText">
          Вы действительно хотите удалить?
        </slot>
      </div>
    </slot>
  </base-dialog>
</template>

<script setup>
  import {computed} from 'vue';
  import BaseDialog from './BaseDialog.vue';

  const props = defineProps({
    isShownDeleteModal: {
      type: Boolean,
      required: true,
    },
  });

  const emits = defineEmits([
    'initDelete', 'update:isShownDeleteModal',
  ]);

  const isOpen = computed({
    get() {
      return props.isShownDeleteModal;
    },
    set(value) {
      emits('update:isShownDeleteModal', value);
    },
  });

  const confirm = () => {
    emits('initDelete');
  };
</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/mixins';

  .delete-modal {
    &__text {
      @include mixins.font-h2-bold;
      text-align: center;
      margin: 10px;
      padding: 10px;
    }
  }
</style>
