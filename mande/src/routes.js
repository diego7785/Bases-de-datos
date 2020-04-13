import IndexW from "views/IndexW.js";
import IndexC from "views/IndexC.js";
import ProfileW from "views/examples/ProfileW.js";
import ProfileC from "views/examples/ProfileC.js";
import RegisterWorker from "views/examples/RegisterWorker.js";
import RegisterWorker1 from "views/examples/RegisterWorker1.js";
import RegisterWorker2 from "views/examples/RegisterWorker2.js";
import LoginAsUser from "views/examples/LoginAsUser.js";
import RegisterAs from "views/examples/RegisterAs.js"
import RegisterUser from "views/examples/RegisterUser.js"
import LoginAs from "views/examples/LoginAs.js"
import LoginAsWorker from "views/examples/LoginAsWorker.js"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: IndexW,
    layout: "/worker"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: IndexC,
    layout: "/client"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: ProfileW,
    layout: "/worker"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: ProfileC,
    layout: "/client"
  },
  {
    path: "/loginasuser",
    name: "Login As User",
    icon: "ni ni-key-25 text-info",
    component: LoginAsUser,
    layout: "/auth"
  },
  {
    path: "/registerworker",
    name: "Register Worker",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterWorker,
    layout: "/auth"
  },
  {
    path: "/registerworker1",
    name: "Register Worker Labs and Pics",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterWorker1,
    layout: "/auth"
  },
  {
    path: "/registerworker2",
    name: "Register Worker Payment Method",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterWorker2,
    layout: "/auth"
  },
  {
    path: "/registeras",
    name: "Register As",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterAs,
    layout: "/auth"
  },
  {
    path: "/registeruser",
    name: "Register User",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterUser,
    layout: "/auth"
  },
  {
    path: "/loginas",
    name: "Login As",
    icon: "ni ni-circle-08 text-pink",
    component: LoginAs,
    layout: "/auth"
  },
  {
    path: "/loginasworker",
    name: "Login As Worker",
    icon: "ni ni-circle-08 text-pink",
    component: LoginAsWorker,
    layout: "/auth"
  },
];
export default routes;
