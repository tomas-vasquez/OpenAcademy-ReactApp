//helpers
import Alerts from "helpers/Alerts";
import DB from "helpers/db";

//store
import store from "store";
import { replace } from "connected-react-router/lib/actions";

//config
import { myRoutes } from "config";
import { reset } from "store/app_store/actions";

class Controller_admin {
  constructor() {
    this.alerts = new Alerts();
    this.db = new DB();
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  clearData = () => {
    store.dispatch(replace(myRoutes.login));
    store.dispatch(reset());

    new DB().clear();
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  errorsHandler = (error, retryHandler, isStrict) => {
    console.error("%c Error > %c", "background:red; color:white", "", error);

    if (error.isAxiosError) {
      if (error.response) {
        if (error.response.status === 422) {
          // Object.entries(error.response.data).forEach((error) => {
          //   error[1].forEach((msg) => {
          switch (error.response.data.msg) {
            case "error-incorrect-password":
              return this.alerts.showAlert(
                "Revise la contrasena ingresado...",
                "Contrasena incorrecta!",
                true,
                (e) => {
                  document.getElementById("input-password").focus();
                }
              );

            case "error-unexist-email":
              return this.alerts.showAlert(
                "Revise el correo electrónico ingresado...",
                "Correo electrónico no encontrado!",
                true,
                (e) => {
                  document.getElementById("input-email").focus();
                }
              );

            case "error-already-exist-email":
              return this.alerts.showAlert(
                "Ingrese otro correo...",
                "Correo electrónico ya registrado!",
                true,
                (e) => {
                  document.getElementById("input-email").focus();
                }
              );

            case "error-already-exist-username":
              return this.alerts.showAlert(
                "Ingrese otro nombre...",
                "nombre de cuenta ya registrado!",
                true,
                (e) => {
                  document.getElementById("input-username").focus();
                }
              );

            default:
              return this.alerts.showAlert("Revise los datos ingresados");
          }
          // });

          // return this.alerts.showAlert("Revise los datos ingresados :P");
          // });
        } else if (error.response.status === 406) {
          return this.alerts.showWarning("Contraseña incorrecta");
        } else if (error.response.status === 401) {
          return this.alerts.showWarning(
            "Deve volver a iniciar sesión",
            "Ups... Su sesión caducó",
            true,
            () => {
              this.clearData();
            }
          );
        } else {
          return this.alerts.showErrorUnknow(retryHandler, isStrict);
        }
      } else {
        return this.alerts.showErrorConexion(retryHandler, isStrict);
      }
    } else {
      return this.alerts.showErrorUnknow(retryHandler, isStrict);
    }
  };
}

export default Controller_admin;
