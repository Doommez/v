import {createRouter, createWebHistory} from 'vue-router';
import MainPage from '../views/MainPage.vue';
import BookingManagement from '../views/BookingManagement.vue';
import BookingManagementOffice from '../views/BookingManagementOffice.vue';
import BookingManagementFloor from '../views/BookingManagementFloor.vue';
import BookingManagementRoom from '../views/BookingManagementRoom.vue';

const routes = [
  {
    path: '/',
    component: MainPage,
    name: 'home',
    meta: {
      isRequireLogin: false,
      titleShort: 'Главаная',
      title: 'Главная',
      isVisible: false,
    },
  },
  {
    path: '/booking',
    component: BookingManagement,
    name: 'booking',
    meta: {
      isRequireLogin: true,
      permission: ['readPage'],
      titleShort: 'букинг',
      icon: 'chair-rolling',
      title: 'Бронирование столов',
      isVisible: true,
    },
  },
  {
    path: '/office',
    component: BookingManagement,
    name: 'bookingManagement',
    meta: {
      isRequireLogin: true,
      permission: ['updateValue'],
      titleShort: 'мeнеджмент',
      icon: 'briefcase-edit-outline',
      title: 'Редактирование офисов',
      isVisible: true,
    },
  },
  {
    path: '/office/:officeId',
    component: BookingManagementOffice,
    name: 'office',
    meta: {
      isRequireLogin: true,
      permission: ['updateValue'],
      titleShort: 'Офис',
      icon: 'briefcase-edit-outline',
      title: 'Редактирование офиса',
    },
  },
  {
    path: '/office/:officeId/floor/:floorId',
    component: BookingManagementFloor,
    name: 'floor',
    meta: {
      isRequireLogin: true,
      permission: ['updateValue'],
      titleShort: 'Этаж',
      icon: 'briefcase-edit-outline',
      title: 'Редактирование этажа',
    },
  },
  {
    path: '/office/:officeId/floor/:floorId/room/:roomId',
    component: BookingManagementRoom,
    name: 'room',
    meta: {
      isRequireLogin: true,
      permission: ['updateValue'],
      titleShort: 'Комната',
      icon: 'briefcase-edit-outline',
      title: 'Редактирование комнаты',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
