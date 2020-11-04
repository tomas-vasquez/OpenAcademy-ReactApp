export const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://openacademy-api.herokuapp.com";

export const apiUrl = serverUrl + "";
export const apiLoginUrl = serverUrl + "/login";
export const apiSignupUrl = serverUrl + "/signup";

export const courseItemsDescriptionsUrl = serverUrl + "/academy/descriptions/";
export const flagsUrl = serverUrl + "/storage/flags";
export const testsUrl = serverUrl + "/academy/tests";

export const myRoutes = {
  home: "/",
  profile: "/miperfil",
  courses: "/cursos",
  login: "/acceso",
  register: "/singup",
};
