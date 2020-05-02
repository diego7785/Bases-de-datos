import IndexW from "views/IndexW.js";
import IndexC from "views/IndexC.js";
import ProfileW from "views/examples/ProfileW.js";
import ProfileC from "views/examples/ProfileC.js";
import RegisterWorker from "views/examples/RegisterWorker.js";
import RegisterWorker1 from "views/examples/RegisterWorker1.js";
import RegisterWorker2 from "views/examples/RegisterWorker2.js";
import LoginAsUser from "views/examples/LoginAsUser.js";
import RegisterAs from "views/examples/RegisterAs.js";
import RegisterUser from "views/examples/RegisterUser.js";
import LoginAs from "views/examples/LoginAs.js";
import LoginAsWorker from "views/examples/LoginAsWorker.js";
import RegisterUser1 from "views/examples/RegisterUser1.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    component: IndexW,
    layout: "/worker"
  },
  {
    path: "/index",
    name: "Dashboard",
    component: IndexC,
    layout: "/client"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    component: ProfileW,
    layout: "/worker"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    component: ProfileC,
    layout: "/client"
  },
  {
    path: "/loginasuser",
    name: "Login As User",
    component: LoginAsUser,
    layout: "/auth"
  },
  {
    path: "/registerworker",
    name: "Register Worker",
    component: RegisterWorker,
    layout: "/auth"
  },
  {
    path: "/registerworker1",
    name: "Register Worker Labs and Pics",
    component: RegisterWorker1,
    layout: "/auth"
  },
  {
    path: "/registerworker2",
    name: "Register Worker Payment Method",
    component: RegisterWorker2,
    layout: "/auth"
  },
  {
    path: "/registeras",
    name: "Register As",
    component: RegisterAs,
    layout: "/auth"
  },
  {
    path: "/registeruser",
    name: "Register User",
    component: RegisterUser,
    layout: "/auth"
  },
  {
    path: "/loginas",
    name: "Login As",
    component: LoginAs,
    layout: "/auth"
  },
  {
    path: "/loginasworker",
    name: "Login As Worker",
    component: LoginAsWorker,
    layout: "/auth"
  },
  {
    path: "/registeruser1",
    name: "Register As User 1",
    component: RegisterUser1,
    layout: "/auth"
  },
];
export default routes;
