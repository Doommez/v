<template>
  <div class="booking-management-room">
    <div class="booking-management-room__content content">
      <base-block class="content__header header">
        <div class="header__page">
          Комната № {{ room.number }}
        </div>
        <div class="header__action">
          <base-button @click="toggleDialogEditorRoom(true)">
            Редактировать
          </base-button>
        </div>
      </base-block>
      <div class="content__divider">
        <v-divider />
      </div>
      <base-block class="content__body body">
        <booking-management-card
          v-for="place in places"
          :key="place.id"
          class="body__card"
          @edit-card="initUpdate(place)"
          @delete-card="initDeletePlace(place)"
        >
          <template #title>
            Номер рабочего места: {{ place.number }}
          </template>
          <template #default>
            {{ place.description }}
          </template>
        </booking-management-card>
      </base-block>
      <base-block class="content__action">
        <base-button @click="toggleDialogCreatePlace(true)">
          Добавить место
        </base-button>
      </base-block>
    </div>
    <booking-management-room-editor
      v-if="isShownDialogEditorRoom"
      v-model:is-open="isShownDialogEditorRoom"
      :room="room"
      @update="launchUpdateRoom"
    />
    <booking-management-delete-modal
      v-if="isShownDeleteModalPlace"
      v-model:is-shown-delete-modal="isShownDeleteModalPlace"
      @init-delete="startDeletingPlace(target)"
    />
    <booking-management-place-create
      v-if="isOpenDialogCreatePlace"
      v-model:is-open="isOpenDialogCreatePlace"
      @create="startCreatingPlace"
    />
    <booking-management-place-editor
      v-if="isShownDialogEditorPlace"
      v-model:is-open="isShownDialogEditorPlace"
      :place="target"
      @update="startUpdatingPlace"
    />
  </div>
</template>

<script setup>

  import {useRoute} from 'vue-router';
  import {onMounted, ref} from 'vue';
  import {useTarget} from '../composables/useTarget';
  import apiRoom from '../api/apiRoom';
  import apiPlace from '../api/apiPlace';
  import BaseButton from '../components/BaseButton.vue';
  import BaseBlock from '../components/BaseBlock';
  import BookingManagementRoomEditor from '../components/BookingManagementRoomEditor.vue';
  import BookingManagementCard from '../components/BookingManagementCard.vue';
  import BookingManagementPlaceCreate from '../components/BookingManagementPlaceCreate.vue';
  import BookingManagementPlaceEditor from '../components/BookingManagementPlaceEditor.vue';
  import BookingManagementDeleteModal from '../components/BookingManagementDeleteModal.vue';

  const route = useRoute();
  const {target, clearTarget, setTarget} = useTarget();

  // GET ROOM
  const room = ref({});

  const getRoom = async () => {
    room.value = await apiRoom.readRoom(route.params.roomId);
  };

  // EDIT ROOM
  const isShownDialogEditorRoom = ref(false);

  const toggleDialogEditorRoom = (isOpen = !isShownDialogEditorRoom.value) => {
    isShownDialogEditorRoom.value = isOpen;
  };

  const updateRoom = async (data) => {
    await apiRoom.updateRoom(data);
  };

  const launchUpdateRoom = async (data) => {
    toggleDialogEditorRoom();
    await updateRoom(data);
    await getRoom();
  };

  // GET PLACES
  const places = ref([]);

  const getPlaces = async () => {
    places.value = await apiPlace.readPlaces();
  };

  // DELETE PLACES
  const isShownDeleteModalPlace = ref(false);

  const deletePlace = async (id) => {
    await apiPlace.deletePlace(id);
  };

  const toggleDeleteModalPlace = (isOpen = !isShownDeleteModalPlace.value) => {
    isShownDeleteModalPlace.value = isOpen;
    if (!isOpen) {
      clearTarget();
    }
  };

  const initDeletePlace = (place) => {
    setTarget(place);
    toggleDeleteModalPlace();
  };

  const startDeletingPlace = async (place) => {
    toggleDeleteModalPlace();
    await deletePlace(place.id);
    await getPlaces();
  };

  // CREATE ROOM
  const isOpenDialogCreatePlace = ref(false);

  const toggleDialogCreatePlace = (isOpen = !isOpenDialogCreatePlace.value) => {
    isOpenDialogCreatePlace.value = isOpen;
  };

  const createPlace = async (data) => {
    await apiPlace.createPlace(data);
  };

  const startCreatingPlace = async (data) => {
    await createPlace(data);
    toggleDialogCreatePlace();
  };

  // EDIT ROOM
  const isShownDialogEditorPlace = ref(false);

  const toggleDialogEditorPlace = (isOpen = !isShownDialogEditorPlace.value) => {
    isShownDialogEditorPlace.value = isOpen;
    if (!isOpen) {
      clearTarget();
    }
  };

  const updatePlace = async (data) => {
    await apiPlace.updatePlace(data);
  };

  const initUpdate = (place) => {
    setTarget(place);
    toggleDialogEditorPlace();
  };

  const startUpdatingPlace = async (data) => {
    toggleDialogEditorPlace();
    await updatePlace(data);
    await getPlaces();
  };

  onMounted(async () => {
    await getRoom();
    await getPlaces();
  });
</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/mixins';
  @use 'src/styles/utils/variables';

  .booking-management-room {
    background-color: variables.$grey-lighter;
    height: 100%;
  }

  .content {
    display: grid;
    grid-template-rows: 150px 90px 1fr  150px;
    min-height: 500px;

    &__divider {
      padding: 40px 0;
    }

    &__body {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
    }

    &__action {
      text-align: end;
    }
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 200px;
    align-content: center;
    align-items: center;

    &__page {
      @include mixins.font-h1-bold;
      grid-column: 1/2;
      justify-self: center;
    }

    &__action {
      grid-column: 2/3;
    }
  }

  .body{
    &__card{
      width: 310px;
    }
  }
</style>
