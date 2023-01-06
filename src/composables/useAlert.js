import {ref, watch} from 'vue';

const dataAlert = ref({
  isSuccess: true,
  textMessage: 'Изменения успешно сохранены',
  timeout: 1000,
});

const isShownAlert = ref(false);
export const useAlert = (isSuccess = true) => {
  if (!isSuccess) {
    dataAlert.value = {
      ...dataAlert.value,
      isSuccess: false,
      textMessage: 'Что-то пощло не так...',
    };
  }
  const initialState = dataAlert.value;
  const setDataAlert = ({
    isSuccess, textMessage, timeout,
  }) => dataAlert.value = {
    ...dataAlert.value,
    isSuccess,
    textMessage,
    timeout,
  };

  const showAlert = () => {
    isShownAlert.value = true;
  };

  watch(isShownAlert, (value) => {
    if (!value) {
      setTimeout(() => {
        dataAlert.value = initialState;
      }, 500);
    }
  });

  return {
    dataAlert,
    isShownAlert,
    setDataAlert,
    showAlert,
  };
};
