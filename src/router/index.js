import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import AuthGuard from "./auth-guard";
import PathNotFound from "../views/notFound.vue";

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
    beforeEnter: AuthGuard,
  },
  {
    path: "/meetups/:id",
    name: "Meetup",
    component: () =>
      import(/* webpackChunkName: "meetup" */ "../views/meetup.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/signin.vue"),
  },
  { path: "/:pathMatch(.*)*", component: PathNotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
