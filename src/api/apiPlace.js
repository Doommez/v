import {useOfficeStore} from '../composables/useOfficeStore';

const {dataOffice, idBack} = useOfficeStore();

const getValuesForPlaces = () => {
  const pathArray = window.location.pathname.split('/');
  const pathIndexOffice = pathArray.findIndex((path) => path === 'office') + 1;
  const pathIndexFloor = pathArray.findIndex((path) => path === 'floor') + 1;
  const pathIndexRoom = pathArray.findIndex((path) => path === 'room') + 1;
  const officeId = Number(pathArray[pathIndexOffice]);
  const floorId = Number(pathArray[pathIndexFloor]);
  const roomId = Number(pathArray[pathIndexRoom]);
  const indexOffice = dataOffice.value.findIndex((office) => Number(officeId) === office.id);
  const indexFloor = dataOffice.value[indexOffice].floors.findIndex((floor) => Number(floorId) === floor.id);
  const indexRoom = dataOffice.value[indexOffice].floors[indexFloor].rooms.findIndex((room) => Number(roomId) === room.id);
  return {
    officeId,
    floorId,
    indexOffice,
    indexFloor,
    indexRoom,
  };
};
export default {
  // readPlaces() {
  //   return apiHelpers.httpRequest(`/places`, {}, 'get');
  // },
  // createPlace(data) {
  //   return apiHelpers.httpRequest('/places', data, 'post');
  // },
  // updatePlace(data) {
  //     return apiHelpers.httpRequest(`/place/${data.placeId}`, data, 'put');
  //   },
  // deletePlace(placeId) {
  //     return apiHelpers.httpRequest(`/place/${placeId}`, {}, 'delete');
  //   },
  // readPlace(placeId) {
  //     return apiHelpers.httpRequest(`/Place/${placeId}/`, {}, 'get');
  //   }

  readPlaces() {
    const {indexOffice, indexFloor, indexRoom} = getValuesForPlaces();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places);
      }, 1000);
    });
  },

  createPlace(data) {
    const {indexOffice, indexFloor, indexRoom} = getValuesForPlaces();
    return new Promise((resolve) => {
      setTimeout(() => {
        idBack.value += 1;
        const newDataPlace = {
          ...data,
          id: idBack.value,
          Places: [],
        };
        dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places.push(newDataPlace);
        resolve(newDataPlace);
      }, 1000);
    });
  },

  deletePlace(placeId) {
    const {indexOffice, indexFloor, indexRoom} = getValuesForPlaces();
    return new Promise((resolve) => {
      setTimeout(() => {
        const placeIndex = dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places.findIndex((place) => place.id === Number(placeId));
        dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places.splice(placeIndex, 1);
        resolve(placeId);
      }, 500);
    });
  },

  updatePlace(data) {
    return new Promise((resolve) => {
      const {indexOffice, indexFloor, indexRoom} = getValuesForPlaces();
      setTimeout(() => {
        const indexPlace = dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places.findIndex((place) => Number(place.id) === Number(data.id));
        const newFloor = {
          ...dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places[indexPlace],
          ...data,
        };
        dataOffice.value[indexOffice].floors[indexFloor].rooms[indexRoom].places.splice(indexPlace, 1, newFloor);
        resolve(data);
      }, 1000);
    });
  },

  readPlace(placeId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const {indexOffice, indexFloor} = getValuesForPlaces();
        const indexPlace = dataOffice.value[indexOffice].floors[indexFloor].places.findIndex((place) => Number(place.id) === Number(placeId));
        resolve(dataOffice.value[indexOffice].floors[indexFloor].places[indexPlace]);
      }, 1000);
    });
  },
};
