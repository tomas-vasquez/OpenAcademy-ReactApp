// import Login from "views/forms/Login";
import Home from "views/Home";
import { myRoutes } from "config";

// import UserProfile from "views/UserProfile";
// import FormRegister from "views/forms/register";
import Courses from "views/AllCourses"
import Auth from "views/Auth";

// import AddContent from "views/AddContent";
// import ItemCustomizer from "views/ItemCustomizer";
var routes = [
  {
    path: myRoutes.login,
    name: "Registro de usuarios",
    icon: "tim-icons icon-chart-pie-36",
    component: Auth,
    layout: "admin",
  },
  {
    path: myRoutes.register,
    name: "Registro de usuarios",
    icon: "tim-icons icon-chart-pie-36",
    component: Auth,
    layout: "admin",
  },
  // {
  //   path: myRoutes.login,
  //   name: "iniciar Sesion",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Login,
  //   layout: "auth",
  // },
  /////////////////////////////////////
  {
    path: myRoutes.home,
    name: "Inicio",
    icon: "fa fa-home",
    component: Home,
    layout: "admin",
  },
  // {
  //   path: myRoutes.profile,
  //   name: "Tu perfil",
  //   icon: "fa fa-user-graduate",
  //   component: UserProfile,
  //   layout: "admin",
  // },
  {
    path: myRoutes.courses,
    name: "Cursos",
    icon: "fa fa-book",
    component: Courses,
    layout: "admin",
  },
  ////////////
  // {
  //   path: myRoutes.addContent,
  //   name: "Añadir Contenido...",
  //   icon: "fa fa-plus",
  //   component: AddContent,
  //   layout: "admin",
  // },
  // {
  //   path: myRoutes.editCourse,
  //   name: "Editar elemento...",
  //   icon: "fa fa-plus",
  //   component: ItemCustomizer,
  //   layout: "admin",
  // },
];
export default routes;
