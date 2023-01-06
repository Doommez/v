<template>
  <booking-management-room-form
    v-model:is-open="isOpen"
    v-model:room="room"
    prop-title="Редактирование комнаты"
    @close="close"
    @confirm="update"
  />
</template>

<script setup>
  import {computed, ref, watch} from 'vue';
  import BookingManagementRoomForm from './BookingManagementRoomForm.vue';

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    room: {
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

  const room = ref({});

  const close = () => {
    emits('close');
    isOpen.value = false;
  };

  watch(
    () => props.room,
    (value) => {
      const propRoom = JSON.parse(JSON.stringify(value));
      room.value = {
        ...propRoom,
        number: String(propRoom.number),
      };
    },
    {
      immediate: true,
    },
  );

  const update = () => {
    emits('update', room.value);
  };
</script>

<style lang="scss" scoped>

</style>
