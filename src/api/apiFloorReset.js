import {useOfficeStore} from '../composables/useOfficeStore';

const {dataOffice, idBack} = useOfficeStore();

const getOfficeId = () => {
  const pathArray = window.location.pathname.split('/');
  const pathIndexOffice = pathArray.findIndex((path) => path === 'office') + 1;
  return Number(pathArray[pathIndexOffice]);
};
export default {
  // readFloors() {
  //   return apiHelpers.httpRequest(`/floors`, {}, 'get');
  // },
  // createFloor(data) {
  //   return apiHelpers.httpRequest('/floors', data, 'post');
  // },
  // updateFloor(data) {
  //     return apiHelpers.httpRequest(`/floor/${data.floorId}`, data, 'put');
  //   },
  // deleteFloor(floorId) {
  //     return apiHelpers.httpRequest(`/floor/${floorId}`, {}, 'delete');
  //   },
  // getFloor(floorId) {
  //     return apiHelpers.httpRequest(`/floor/${floorId}/`, {}, 'get');
  //   }

  readFloors() {
    const officeId = getOfficeId();
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOffice = dataOffice.value.findIndex((office) => Number(officeId) === office.id);
        resolve(dataOffice.value[indexOffice].floors);
      }, 1000);
    });
  },

  createFloor(data) {
    const officeId = getOfficeId();
    return new Promise((resolve) => {
      setTimeout(() => {
        idBack.value += 1;
        const newDataFloor = {
          floorNumber: data.floor,
          floorId: idBack.value,
          rooms: [],
        };
        const indexOffice = dataOffice.value.findIndex((office) => Number(officeId) === office.id);
        dataOffice.value[indexOffice].floors.push(newDataFloor);
        resolve(newDataFloor);
      }, 1000);
    });
  },

  deleteFloor(floorId) {
    const officeId = getOfficeId();
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOffice = dataOffice.value.findIndex((office) => Number(officeId) === office.id);
        const floorIndex = dataOffice.value[indexOffice].floors.findIndex((floor) => floor.floor === Number(floorId));
        dataOffice.value[indexOffice].floors.splice(floorIndex, 1);
        resolve(floorId);
      }, 500);
    });
  },

  updateFloor(data) {
    return new Promise((resolve) => {
      const officeId = getOfficeId();
      setTimeout(() => {
        const indexOffice = dataOffice.value.findIndex((office) => office.id === Number(officeId));
        const indexFloor = dataOffice.value[indexOffice].floors.findIndex((floor) => Number(floor.floorId) === Number(data.floorId));
        const newFloor = {
          ...dataOffice.value[indexOffice].floors[indexFloor],
          ...data,
        };
        dataOffice.value[indexOffice].floors.splice(indexFloor, 1, newFloor);
        resolve(data);
      }, 1000);
    });
  },

  readFloor(floorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const officeId = getOfficeId();
        const officeIndex = dataOffice.value.findIndex((office) => Number(office.id) === Number(officeId));
        const floorIndex = dataOffice.value[officeIndex].floors.findIndex((floor) => Number(floor.id) === Number(floorId));
        resolve(dataOffice.value[officeIndex].floors[floorIndex]);
      }, 1000);
    });
  },
};
