<template>
  <booking-management-floor-form
    v-model:is-open="isOpen"
    v-model:floor="floor"
    prop-title="Создание этажа"
    @close="close"
    @confirm="create"
  />
</template>

<script setup>
  import {computed, ref} from 'vue';
  import BookingManagementFloorForm from './BookingManagementFloorForm.vue';

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

  const floor = ref({
    number: '',
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
    emits('create', floor.value);
  };
</script>

<style lang="scss" scoped>

</style>
