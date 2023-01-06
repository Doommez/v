<template>
  <base-dialog
    v-model:is-dialog-open="isOpen"
    :title="propTitle"
    @confirm="confirm"
    @cancel="close"
  >
    <v-form
      ref="form"
      class="form"
    >
      <div class="form__input input">
        <div class="input__title">
          Введите номер стола
        </div>
        <base-input
          v-model="place.number"
          class="input__field"
          :rules="rulesValidation"
        />
      </div>
    </v-form>
  </base-dialog>
</template>

<script setup>
  import {computed, ref} from 'vue';
  import BaseInput from './BaseInput.vue';
  import BaseDialog from './BaseDialog.vue';
  import {
    requiredField, onlyNumber, validateForm,
  } from '../helpers/validation';

  const props = defineProps({
    place: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    propTitle: {
      type: String,
      default: '',
    },
  });

  const emits = defineEmits([
    'update:place',
    'update:isOpen',
    'close',
    'confirm',
  ]);

  const isOpen = computed({
    get() {
      return props.isOpen;
    },
    set(value) {
      emits('update:isOpen', value);
    },
  });

  const place = computed({
    get() {
      return props.place;
    },
    set(value) {
      emits('update:place', value);
    },
  });

  const form = ref(null);

  const rulesValidation = [requiredField(), onlyNumber()];

  const confirm = async () => {
    if (await validateForm(form.value)) {
      emits('confirm');
    }
  };

  const close = () => {
    emits('close');
    isOpen.value = false;
  };
</script>

<style lang="scss" scoped>
  @use "src/styles/utils/mixins";
  @use "src/styles/utils/variables";

  .input{
    &__title{
      @include mixins.text-sm-bold;
      color: variables.$grey-mid;
      margin: 12px 0;
      text-transform: uppercase;
    }
  }

</style>
