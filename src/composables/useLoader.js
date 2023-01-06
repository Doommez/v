import {ref} from 'vue';

const loader = ref(false);
export const useLoader = () => {
  const initLoader = () => {
    loader.value = true;
  };
  const stopLoader = () => {
    loader.value = false;
  };
  return {
    loader,
    initLoader,
    stopLoader,
  };
};
