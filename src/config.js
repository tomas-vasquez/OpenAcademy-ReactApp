export const serverUrl = process.env.SERVER_URL || "http://localhost:3001";

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
