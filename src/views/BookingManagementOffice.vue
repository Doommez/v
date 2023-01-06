<template>
  <div class="booking-management-office">
    <div class="booking-management-office__content content">
      <base-block class="content__header header">
        <div class="header__title title">
          <div class="title__page">
            Оффис
          </div>
          <div class="title__office-name">
            {{ office.title }}
          </div>
        </div>
        <div class="header__location location">
          <div class="location__address">
            Адрес:
          </div>
          <div class="location__place">
            {{ office.location }}
          </div>
        </div>
        <div class="header__action action">
          <base-button
            class="action__button"
            @click="toggleOfficeRefactorDialog(true)"
          >
            Редактировать
          </base-button>
        </div>
      </base-block>
      <div class="content__divider">
        <v-divider />
      </div>
      <base-block class="content__body body">
        <booking-management-card
          v-for="floor in floors"
          :key="floor.id"
          class="body__card"
          @edit-card="openFloor(floor.id)"
          @delete-card="initDeleteFloor(floor)"
        >
          <template #title>
            {{ office.title }}
          </template>
          <template #subtitle>
            этаж: {{ floor.number }}
          </template>
          <template #default>
            <div class="rooms">
              Номера комнат:
              <div
                v-for="room in floor.rooms"
                :key="room.id"
                class="rooms__room"
              >
                {{ room.number }}
              </div>
            </div>
          </template>
        </booking-management-card>
      </base-block>
      <base-block class="content__action">
        <base-button @click="toggleDialogCreateFloor(true)">
          Добавить этаж
        </base-button>
      </base-block>
    </div>
    <booking-management-office-editor
      v-if="isOpenDialogOfficeRefactor"
      v-model:is-open-refactor-dialog="isOpenDialogOfficeRefactor"
      :office-props="office"
      @update="launchOfficeUpdate"
    />
    <booking-management-floor-create
      v-if="isOpenDialogCreateFloor"
      v-model:is-open="isOpenDialogCreateFloor"
      @create="launchCreateFloor"
    />
    <booking-management-delete-modal
      v-model:is-shown-delete-modal="isShownDeleteModalFloor"
      :target="target"
      @init-delete="launchDeleteFloor(target)"
    />
  </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue';
  import {useRoute, useRouter} from 'vue-router';
  import {useTarget} from '../composables/useTarget';
  import apiOffice from '../api/apiOffice';
  import apiFloor from '../api/apiFloor';
  import BaseButton from '../components/BaseButton.vue';
  import BaseBlock from '../components/BaseBlock';
  import BookingManagementOfficeEditor from '../components/BookingManagementOfficeEditor.vue';
  import BookingManagementDeleteModal from '../components/BookingManagementDeleteModal.vue';
  import BookingManagementCard from '../components/BookingManagementCard.vue';
  import BookingManagementFloorCreate from '../components/BookingManagementFloorCreate.vue';
  import {useAlert} from '../composables/useAlert';

  const route = useRoute();
  const router = useRouter();
  const {target, setTarget, clearTarget} = useTarget();
  const {showAlert, setDataAlert} = useAlert();


  // GET OFFICE
  const office = ref({});

  const getOffice = async () => {
    office.value = await apiOffice.readOffice(route.params.officeId);
  };

  // EDIT OFFICE
  const isOpenDialogOfficeRefactor = ref(false);

  const toggleOfficeRefactorDialog = (isOpen = false) => {
    isOpenDialogOfficeRefactor.value = isOpen;
  };

  const updateOffice = async (data) => {
    await apiOffice.updateOffice(data);
  };

  const launchOfficeUpdate = async (data) => {
    await updateOffice(data);
    await getOffice();
    toggleOfficeRefactorDialog();
  };

  // GET FLOOR
  const floors = ref({});

  const getFloors = async () => {
    floors.value = await apiFloor.readFloors();
  };

  // OPEN FLOOR
  const openFloor = (id) => {
    router.push({
      name: 'floor',
      params: {
        officeId: route.params.officeId,
        floorId: id,
      },
    });
  };

  // DELETE FLOOR
  const isShownDeleteModalFloor = ref(false);

  const deleteFloor = async (id) => {
    await apiFloor.deleteFloor(id);
  };

  const toggleDeleteModalFloor = (isOpen = !isShownDeleteModalFloor.value) => {
    isShownDeleteModalFloor.value = isOpen;
    if (!isOpen) {
      clearTarget();
    }
  };

  const initDeleteFloor = (floor) => {
    setTarget(floor);
    toggleDeleteModalFloor(true);
  };

  const launchDeleteFloor = async (target) => {
    toggleDeleteModalFloor();
    await deleteFloor(target.id);
    await getOffice();
    showAlert();
  };

  // CREATE FLOOR
  const isOpenDialogCreateFloor = ref(false);

  const toggleDialogCreateFloor = (isOpen = !isOpenDialogCreateFloor.value) => {
    isOpenDialogCreateFloor.value = isOpen;
  };

  const createFloor = async (data) => {
    await apiFloor.createFloor(data);
  };

  const launchCreateFloor = async (data) => {
    await createFloor(data);
    toggleDialogCreateFloor();
    setDataAlert({
      isSuccess: false,
      textMessage: 'aaaa',
      timeout: 2000,
    });
    showAlert();
  };

  onMounted(async () => {
    await getOffice();
    await getFloors();
  });
</script>

<style lang="scss" scoped>
  @use '../styles/utils/mixins';
  @use '../styles/utils/variables';

  .booking-management-office {
    background-color: variables.$grey-lighter;
    height: 100%;
  }

  .content {
    display: grid;
    grid-template-rows: 220px 90px 1fr  150px;
    min-height: 500px;
    align-content: center;

    &__divider {
      padding: 40px 0;
    }

    &__body {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-items: center;
      align-items: center;
    }

    &__action {
      text-align: end;
    }
  }

  .header {
    &__title {
      grid-row: 1/2;
      grid-column: 1/3;
    }

    &__action {
      text-align: end;
    }
  }

  .title {
    &__page {
      @include mixins.text-lg-regular;
      text-align: center;
    }

    &__office-name {
      @include mixins.font-h1-bold;
      text-align: center;
    }
  }

  .location {
    &__address {
      @include mixins.text-lg-regular;
      color: variables.$grey-mid;
    }

    &__place {
      @include mixins.font-h3-semi-bold
    }
  }

  .body {
    &__card {
      width: 310px;
      min-height: 250px;
    }

  }

  .office-editor {
    &__title {
      @include mixins.text-sm-bold;
      color: variables.$grey-mid;
      margin: 12px 0;
      text-transform: uppercase;
    }
  }

  .rooms {
    display: flex;
    flex-wrap: wrap;

    &__room {
      margin: 0 5px;
    }
  }
</style>
