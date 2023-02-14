import Vue from "vue";
import VueRouter from "vue-router";

import { checkToken } from "../utils/user";
import { Notification } from "element-ui";

Vue.use(VueRouter);

import Login from "../views/login/login.vue";
import Home from "../views/home/home.vue";
import Manicure from "../views/manicure/manicure.vue";
import ManicureHistory from "../views/manicure/history.vue";
import Card from "../views/card/card.vue";
import CardHistory from "../views/card/history.vue";
import User from "../views/user/user.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/manicure",
    name: "Manicure",
    component: Manicure,
  },
  {
    path: "/manicure/history",
    name: "ManicureHistory",
    component: ManicureHistory,
  },
  {
    path: "/card",
    name: "Card",
    component: Card,
  },
  {
    path: "/card/history",
    name: "CardHistory",
    component: CardHistory,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path != "/login" && !checkToken()) {
    Notification.error({
      title: "登录状态已失效",
      message: "登录状态已失效，请重新登录!",
    });
    next("/login");
  } else {
    next();
  }
});

export default router;
