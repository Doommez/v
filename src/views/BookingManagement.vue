<template>
  <div class="booking-management">
    <div class="booking-management__content content">
      <div class="content__title">
        Доступные офисы:
      </div>
      <div class="content__card">
        <booking-management-card
          v-for="office in offices"
          :key="office.id"
          class="card"
          @delete-card="initDeleteOffice(office)"
          @edit-card="openOffice(office.id)"
        >
          <template #title>
            {{ office.title }}
          </template>
          <template #default>
            Адрес: {{ office.location }}
          </template>
        </booking-management-card>
      </div>
      <div class="content__action">
        <base-button
          class="content__action_add"
          @click="toggleCreateOfficeDialog(true)"
        >
          Добавить офис
        </base-button>
      </div>
    </div>
    <booking-management-office-create
      v-if="isOpenCreateOfficeDialog"
      v-model:is-open-create-dialog="isOpenCreateOfficeDialog"
      @create="launchCreationOffice"
    />
    <booking-management-delete-modal
      v-if="target"
      v-model:is-shown-delete-modal="isShownDeleteModal"
      :target="target"
      @init-delete="deleteOffice(target)"
    >
      <template #modalText>
        Вы уверены что хотите удалить {{ target.title }}?
      </template>
    </booking-management-delete-modal>
  </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue';
  import {useRouter} from 'vue-router';
  import {useTarget} from '../composables/useTarget';
  import apiOffice from '../api/apiOffice';
  import BookingManagementCard from '../components/BookingManagementCard.vue';
  import BaseButton from '../components/BaseButton.vue';
  import BookingManagementOfficeCreate from '../components/BookingManagementOfficeCreate.vue';
  import BookingManagementDeleteModal from '../components/BookingManagementDeleteModal.vue';

  const router = useRouter();
  const {target, setTarget, clearTarget} = useTarget();

  // GET OFFICES
  const offices = ref([]);

  const getOffices = async () => {
    offices.value = await apiOffice.readOffices();
  };

  onMounted(() => {
    getOffices();
  });

  // DELETE OFFICE
  const isShownDeleteModal = ref(false);

  const toggleDeleteModal = (isOpen = false) => {
    isShownDeleteModal.value = isOpen;
    if (!isOpen) {
      clearTarget();
    }
  };

  const deleteOffice = async (target) => {
    await apiOffice.deleteOffice(target.id);
    await getOffices();
    toggleDeleteModal();
  };

  const initDeleteOffice = async (office) => {
    setTarget(office);
    toggleDeleteModal(true);
  };

  // CREATE OFFICE
  const isOpenCreateOfficeDialog = ref(false);

  const toggleCreateOfficeDialog = (isOpen = false) => {
    isOpenCreateOfficeDialog.value = isOpen;
  };

  const createOffice = async (data) => {
    await apiOffice.createOffice(data);
  };

  const launchCreationOffice = async (data) => {
    await createOffice(data);
    await getOffices();
    toggleCreateOfficeDialog();
  };

  // OPEN OFFICE
  const openOffice = (id) => {
    router.push({
      name: 'office',
      params: {officeId: id},
    });
  };
</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use '../styles/utils/mixins' as mixins;

  .booking-management {
    background-color: variables.$grey-lighter;
    height: 100%;

    &__content {
      display: grid;
      border-radius: 10px;
    }
  }

  .content {
    margin: 0 32px;
    background-color: variables.$white;

    &__title {
      @include mixins.font-h2-bold;
      justify-self: center;
    }

    &__card {
      display: flex;
      flex-wrap: wrap;
      padding: 30px;
    }

    &__action {
      justify-self: end;
      margin: 40px;
    }
  }

  .card {
    margin: 20px;
    min-width: 350px;
  }
</style>
