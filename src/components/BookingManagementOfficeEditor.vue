<template>
  <booking-management-office-form
    v-model:is-open="isOpen"
    v-model:office="office"
    prop-title="Редактирование Офиса"
    @close="closeDialogRefactor"
    @confirm="update"
  />
</template>

<script setup>
  import {
    computed, ref, watch,
  } from 'vue';
  import BookingManagementOfficeForm from './BookingManagementOfficeForm.vue';

  const props = defineProps({
    isOpenRefactorDialog: {
      type: Boolean,
      required: true,
    },
    officeProps: {
      type: Object,
      required: true,
    },
  });

  const emits = defineEmits([
    'update:isOpenRefactorDialog',
    'closeDialogRefactor',
    'update',
  ]);

  const isOpen = computed({
    get() {
      return props.isOpenRefactorDialog;
    },
    set(value) {
      emits('update:isOpenRefactorDialog', value);
    },
  });

  const office = ref({});

  const closeDialogRefactor = () => {
    emits('closeDialogRefactor');
    isOpen.value = false;
  };

  watch(
    () => props.officeProps,
    (value) => {
      office.value = JSON.parse(JSON.stringify(value));
    },
    {
      immediate: true,
    },
  );

  const update = async () => {
    emits('update', office.value);
  };
</script>

<style lang="scss" scoped>

</style>
