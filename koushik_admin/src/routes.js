/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Education from "views/examples/Education";
import Experience from "views/examples/Experience";
import Project from "views/examples/Project";
import Skill from "views/examples/Skill";
import UserInfo from "views/examples/UserInfo";
import Language from "views/examples/Language";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/userinfo",
    name: "User Information",
    icon: "ni ni-single-02 text-yellow",
    component: <UserInfo />,
    layout: "/admin",
  },
  {
    path: "/education",
    name: "User Education",
    icon: "ni ni-single-02 text-yellow",
    component: <Education />,
    layout: "/admin",
  },
  {
    path: "/experience",
    name: "User Experience",
    icon: "ni ni-single-02 text-yellow",
    component: <Experience />,
    layout: "/admin",
  },
  {
    path: "/project",
    name: "User Projects",
    icon: "ni ni-single-02 text-yellow",
    component: <Project />,
    layout: "/admin",
  },
  {
    path: "/Skill",
    name: "User Skill",
    icon: "ni ni-single-02 text-yellow",
    component: <Skill />,
    layout: "/admin",
  },
  {
    path: "/Language-Skill",
    name: "Language-Skill",
    icon: "ni ni-single-02 text-yellow",
    component: <Language />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
