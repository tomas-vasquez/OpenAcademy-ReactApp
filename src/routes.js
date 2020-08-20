import Home from "views/Home";
import { myRoutes } from "config";

import Courses from "views/AllCourses";
import Auth from "views/Auth";
import UserProfile from "views/UserProfile";

var routes = [
  {
    path: myRoutes.login,
    name: "Registro de usuarios",
    component: Auth,
  },
  {
    path: myRoutes.register,
    name: "Registro de usuarios",
    component: Auth,
  },
  /////////////////////////////////////
  {
    path: myRoutes.home,
    name: "Inicio",
    component: Home,
  },
  {
    path: "/@:user_name",
    name: "Tu perfil",
    component: UserProfile,
  },
  {
    path: myRoutes.courses,
    name: "Cursos",
    component: Courses,
  },
];
export default routes;
