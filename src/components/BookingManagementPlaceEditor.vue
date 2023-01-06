<template>
  <booking-management-place-form
    v-model:is-open="isOpen"
    v-model:place="place"
    prop-title="Редактирование места"
    @close="close"
    @confirm="update"
  />
</template>

<script setup>
  import {computed, ref, watch} from 'vue';
  import BookingManagementPlaceForm from './BookingManagementPlaceForm.vue';

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    place: {
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

  const place = ref({});

  const close = () => {
    emits('close');
    isOpen.value = false;
  };

  watch(
    () => props.place,
    (value) => {
      const propPlace = JSON.parse(JSON.stringify(value));
      place.value = {
        ...propPlace,
        number: String(propPlace.number),
      };
    },
    {
      immediate: true,
    },
  );

  const update = () => {
    emits('update', place.value);
  };
</script>

<style lang="scss" scoped>

</style>
