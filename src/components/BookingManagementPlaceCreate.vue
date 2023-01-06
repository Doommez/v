<template>
  <booking-management-place-form
    v-model:is-open="isOpen"
    v-model:place="place"
    prop-title="Создание места"
    @close="close"
    @confirm="create"
  />
</template>

<script setup>
  import {computed, ref} from 'vue';
  import BookingManagementPlaceForm from './BookingManagementPlaceForm.vue';

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  });

  const emits = defineEmits([
    'update:isOpen',
    'close',
    'create',
  ]);

  const place = ref({
    number: '',
    description: '',
  });

  const isOpen = computed({
    get() {
      return props.isOpen;
    },
    set(value) {
      emits('update:isOpen', value);
    },
  });

  const close = () => {
    emits('close');
    isOpen.value = false;
  };

  const create = () => {
    emits('create', place.value);
  };
</script>

<style lang="scss" scoped>

</style>

