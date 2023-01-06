<template>
  <booking-management-office-form
    v-model:is-open="isOpen"
    :office="office"
    @close="closeDialogCreate"
    @confirm="create"
  />
</template>

<script setup>
  import {computed, ref} from 'vue';
  import BookingManagementOfficeForm from './BookingManagementOfficeForm.vue';

  const props = defineProps({
    isOpenCreateDialog: {
      type: Boolean,
      required: true,
    },
  });

  const emits = defineEmits([
    'update:isOpenCreateDialog',
    'closeDialogCreate',
    'create',
  ]);

  const office = ref({
    title: '',
    location: '',
  });

  const isOpen = computed({
    get() {
      return props.isOpenCreateDialog;
    },
    set(value) {
      emits('update:isOpenCreateDialog', value);
    },
  });

  const closeDialogCreate = () => {
    emits('closeDialogCreate');
    isOpen.value = false;
  };

  const create = async () => {
    emits('create', office.value);
  };
</script>

<style lang="scss" scoped>

</style>
