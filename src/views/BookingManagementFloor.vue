<template>
  <div class="booking-management-floor">
    <div class="booking-management-floor__content content">
      <base-block class="content__header header">
        <div class="header__page">
          Этаж № {{ floor.number }}
        </div>
        <div class="header__action">
          <base-button @click="toggleDialogEditorFloor(true)">
            Редактировать
          </base-button>
        </div>
      </base-block>
      <div class="content__divider">
        <v-divider />
      </div>
      <base-block class="content__body body">
        <booking-management-card
          v-for="room in rooms"
          :key="room.id"
          class="body__card"
          @edit-card="goToRoom(room.id)"
          @delete-card="initDeleteRoom(room)"
        >
          <template #title>
            Номер комнаты: {{ room.number }}
          </template>
          <template #default>
            <div class="room">
              Номера столов в комнате:
              <div
                v-for="place in room.places"
                :key="place.id"
                class="room__places"
              >
                {{ place.number }}
              </div>
            </div>
          </template>
        </booking-management-card>
      </base-block>
      <base-block class="content__action">
        <base-button @click="toggleDialogCreateRoom(true)">
          Добавить комнату
        </base-button>
      </base-block>
    </div>
    <booking-management-floor-editor
      v-if="isShownDialogEditorFloor"
      v-model:is-open="isShownDialogEditorFloor"
      :floor="floor"
      @update="launchUpdateFloor"
    />
    <booking-management-delete-modal
      v-if="isOpenDeleteModalRoom"
      v-model:is-shown-delete-modal="isOpenDeleteModalRoom"
      @init-delete="startDeletingRoom(target)"
    />
    <booking-management-room-create
      v-if="isOpenDialogCreateRoom"
      v-model:is-open="isOpenDialogCreateRoom"
      @create="launchCreateFloor"
    />
  </div>
</template>

<script setup>

  import {useRoute, useRouter} from 'vue-router';
  import {onMounted, ref} from 'vue';
  import {useTarget} from '../composables/useTarget';
  import apiFloor from '../api/apiFloor';
  import apiRoom from '../api/apiRoom';
  import BaseButton from '../components/BaseButton.vue';
  import BaseBlock from '../components/BaseBlock';
  import BookingManagementFloorEditor from '../components/BookingManagementFloorEditor.vue';
  import BookingManagementCard from '../components/BookingManagementCard.vue';
  import BookingManagementDeleteModal from '../components/BookingManagementDeleteModal.vue';
  import BookingManagementRoomCreate from '../components/BookingManagementRoomCreate.vue';

  const route = useRoute();
  const router = useRouter();
  const {target, setTarget, clearTarget} = useTarget();

  // GET FLOOR
  const floor = ref({});

  const getFloor = async () => {
    floor.value = await apiFloor.readFloor(route.params.floorId);
  };

  // EDIT FLOOR
  const isShownDialogEditorFloor = ref(false);

  const toggleDialogEditorFloor = (isOpen = !isShownDialogEditorFloor.value) => {
    isShownDialogEditorFloor.value = isOpen;
  };

  const updateFloor = async (data) => {
    await apiFloor.updateFloor(data);
  };

  const launchUpdateFloor = async (data) => {
    toggleDialogEditorFloor();
    await updateFloor(data);
    await getFloor();
  };

  // GET ROOMS
  const rooms = ref([]);

  const getRooms = async () => {
    rooms.value = await apiRoom.readRooms();
  };

  // OPEN ROOM
  const goToRoom = (roomId) => {
    router.push({
      name: 'room',
      params: {
        officeId: route.params.officeId,
        floorId: route.params.floorId,
        roomId,
      },
    });
  };

  // DELETE ROOM
  const isOpenDeleteModalRoom = ref(false);

  const deleteRoom = async (id) => {
    await apiRoom.deleteRoom(id);
  };

  const toggleDeleteModalRoom = (isOpen = !isOpenDeleteModalRoom.value) => {
    isOpenDeleteModalRoom.value = isOpen;
    if (!isOpen) {
      clearTarget();
    }
  };

  const initDeleteRoom = (room) => {
    setTarget(room);
    toggleDeleteModalRoom();
  };

  const startDeletingRoom = async (target) => {
    toggleDeleteModalRoom();
    await deleteRoom(target.id);
    await getRooms();
  };

  // CREATE ROOM
  const isOpenDialogCreateRoom = ref(false);

  const toggleDialogCreateRoom = (isOpen = !isOpenDialogCreateRoom.value) => {
    isOpenDialogCreateRoom.value = isOpen;
  };

  const createRoom = async (data) => {
    await apiRoom.createRoom(data);
  };

  const launchCreateFloor = async (data) => {
    await createRoom(data);
    toggleDialogCreateRoom();
  };

  onMounted(async () => {
    await getFloor();
    await getRooms();
  });
</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/mixins';
  @use 'src/styles/utils/variables';

  .booking-management-floor {
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

  .body {
    &__card {
      width: 310px;
    }
  }

  .room {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
</style>
