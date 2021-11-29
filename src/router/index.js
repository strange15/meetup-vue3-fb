import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: () =>
      import(/* webpackChunkName: "meetups" */ "../views/meetups.vue"),
  },
  {
    path: "/meetup/new",
    name: "Organize",
    component: () =>
      import(/* webpackChunkName: "organize" */ "../views/organize.vue"),
  },
  // {
  //   path: '/meetups/:id',
  //   name: 'Meetup',
  //   props: true,
  //   component: Meetup
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
