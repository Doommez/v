import {useOfficeStore} from '../composables/useOfficeStore';

const {dataOffice, idBack} = useOfficeStore();
export default {
  // getOffices() {
  //   return apiHelpers.httpRequest('/offices', {}, 'get');
  // },
  // addOffice(data) {
  //   return apiHelpers.httpRequest('/office', data, 'post');
  // },
  // updateOffice(data, id) {
  //     return apiHelpers.httpRequest(`/office/${id}`, data, 'put');
  //   },
  // deleteOffice(id) {
  //     return apiHelpers.httpRequest(`/office/${id}`, {}, 'delete');
  //   },
  // getOffice(id) {
  //     return apiHelpers.httpRequest(`/office/${id}`, {}, 'get');
  //   }
  readOffices() {
    return new Promise((resolve) => {
      resolve(dataOffice.value);
    });
  },

  createOffice(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        idBack.value += 1;
        const newDataOffice = {
          ...data,
          floors: [],
          id: idBack.value,
        };
        dataOffice.value.push(newDataOffice);
        resolve(data);
      }, 1000);
    });
  },

  deleteOffice(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOffice = dataOffice.value.findIndex((office) => office.id === Number(id));
        dataOffice.value.splice(indexOffice, 1);
        resolve(id);
      }, 500);
    });
  },

  updateOffice(data) {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOffice = dataOffice.value.findIndex((office) => office.id === Number(data.id));
        const newOffice = {
          ...dataOffice.value[indexOffice],
          ...data,
        };
        dataOffice.value.splice(indexOffice, 1, newOffice);
        resolve(data);
      }, 1000);
    });
  },

  readOffice(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOffice = dataOffice.value.findIndex((office) => office.id === Number(id));
        resolve(dataOffice.value[indexOffice]);
      }, 1000);
    });
  },
};
