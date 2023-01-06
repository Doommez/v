<template>
  <booking-management-floor-form
    v-model:is-open="isOpen"
    v-model:floor="floor"
    prop-title="Редактирование этажа"
    @close="close"
    @confirm="update"
  />
</template>

<script setup>
  import {computed, ref, watch} from 'vue';
  import BookingManagementFloorForm from './BookingManagementFloorForm.vue';

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    floor: {
      type: Object,
      required: true,
    },
  });

  const emits = defineEmits([
    'update:isOpen',
    'close',
    'update',
  ]);

  const isOpen = computed({
    get() {
      return props.isOpen;
    },
    set(value) {
      emits('update:isOpen', value);
    },
  });

  const floor = ref({});

  const close = () => {
    emits('close');
    isOpen.value = false;
  };

  watch(
    () => props.floor,
    (value) => {
      const propFloor = JSON.parse(JSON.stringify(value));
      floor.value = {
        ...propFloor,
        number: String(propFloor.number),
      };
    },
    {
      immediate: true,
    },
  );

  const update = () => {
    emits('update', floor.value);
  };
</script>

<style lang="scss" scoped>

</style>
