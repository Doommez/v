import {useOfficeStore} from '../composables/useOfficeStore';

const {dataOffice, idBack} = useOfficeStore();

const getValuesForRooms = () => {
  const pathArray = window.location.pathname.split('/');
  const pathIndexOffice = pathArray.findIndex((path) => path === 'office') + 1;
  const pathIndexFloor = pathArray.findIndex((path) => path === 'floor') + 1;
  const officeId = Number(pathArray[pathIndexOffice]);
  const floorId = Number(pathArray[pathIndexFloor]);
  const indexOffice = dataOffice.value.findIndex((office) => Number(officeId) === office.id);
  const indexFloor = dataOffice.value[indexOffice].floors.findIndex((floor) => Number(floorId) === floor.id);
  return {
    officeId,
    floorId,
    indexOffice,
    indexFloor,
  };
};
export default {
  // readRooms() {
  //   return apiHelpers.httpRequest(`/rooms`, {}, 'get');
  // },
  // createRoom(data) {
  //   return apiHelpers.httpRequest('/rooms', data, 'post');
  // },
  // updateRoom(data) {
  //     return apiHelpers.httpRequest(`/room/${data.roomId}`, data, 'put');
  //   },
  // deleteRoom(roomId) {
  //     return apiHelpers.httpRequest(`/room/${roomId}`, {}, 'delete');
  //   },
  // readRoom(roomId) {
  //     return apiHelpers.httpRequest(`/room/${roomId}/`, {}, 'get');
  //   }

  readRooms() {
    const {indexOffice, indexFloor} = getValuesForRooms();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataOffice.value[indexOffice].floors[indexFloor].rooms);
      }, 1000);
    });
  },

  createRoom(data) {
    const {indexOffice, indexFloor} = getValuesForRooms();
    return new Promise((resolve) => {
      setTimeout(() => {
        idBack.value += 1;
        const newDataRoom = {
          ...data,
          id: idBack.value,
          rooms: [],
        };
        dataOffice.value[indexOffice].floors[indexFloor].rooms.push(newDataRoom);
        resolve(newDataRoom);
      }, 1000);
    });
  },

  deleteRoom(roomId) {
    const {indexOffice, indexFloor} = getValuesForRooms();
    return new Promise((resolve) => {
      setTimeout(() => {
        const roomIndex = dataOffice.value[indexOffice].floors[indexFloor].rooms.findIndex((room) => room.id === Number(roomId));
        dataOffice.value[indexOffice].floors[indexFloor].rooms.splice(roomIndex, 1);
        resolve(roomId);
      }, 500);
    });
  },

  updateRoom(data) {
    return new Promise((resolve) => {
      const {indexOffice, indexFloor} = getValuesForRooms();
      setTimeout(() => {
        const indexRoom = dataOffice.value[indexOffice].floors[indexFloor].rooms.findIndex((room) => Number(room.id) === Number(data.id));
        const newFloor = {
          ...dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom],
          ...data,
        };
        dataOffice.value[indexOffice].floors[indexFloor].rooms.splice(indexFloor, 1, newFloor);
        resolve(data);
      }, 1000);
    });
  },

  readRoom(roomId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const {indexOffice, indexFloor} = getValuesForRooms();
        const indexRoom = dataOffice.value[indexOffice].floors[indexFloor].rooms.findIndex((room) => Number(room.id) === Number(roomId));
        resolve(dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom]);
      }, 1000);
    });
  },
};
