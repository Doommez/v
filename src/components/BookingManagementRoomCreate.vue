<template>
  <booking-management-room-form
    v-model:is-open="isOpen"
    v-model:room="room"
    prop-title="Создание комнаты"
    @close="close"
    @confirm="create"
  />
</template>

<script setup>
  import {computed, ref} from 'vue';
  import BookingManagementRoomForm from './BookingManagementRoomForm.vue';

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

  const room = ref({
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
    emits('create', room.value);
  };
</script>

<style lang="scss" scoped>

</style>

