import Controller_admin from ".././_controllers";
import Model_Users from "_models/Users";

import store from "store";
import Alerts from "helpers/Alerts";

import { replaceUsers } from "store/users_store/actions";

class Controller_Users extends Controller_admin {
  constructor() {
    super();
    this.users = new Model_Users();
    this.alerts = new Alerts();
  }

  /*!
    =========================================================
    * 
    =========================================================
    */

  register = (form, _callback) => {
    this.alerts.showLoading();

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
        if (form[index].name === "accept_the_terms") {
          data[form[index].name] = form[index].checked;
        }
      }
    }

    if (data.accept_the_terms) {
      data.accept_the_terms = undefined;

      this.users.register(
        data,
        (response) => {
          this.alerts.showSuccess("Espere...", "Perfecto!!!");
          this.db.set("api-token", response.data.api_token);

          if (_callback !== undefined) _callback();
        },
        (error) =>
          this.errorsHandler(error, () => this.register(form, _callback))
      );
    } else {
      return this.alerts.showAlert(
        "No aceptó nuestros términos y condiciones de uso",
        "Espere...",
        true,
        (e) => {
          document.getElementById("customCheckRegister").focus();
        }
      );
    }
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  login = (form, _callback) => {
    this.alerts.showLoading();

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
        if (form[index].name === "remember_token")
          data[form[index].name] = form[index].checked;
      }
    }

    this.users.login(
      data,
      (response) => {
        this.alerts.showSuccess("Espere...", "Perfecto!!!");

        this.db.set("api-token", response.data.api_token);

        if (_callback !== undefined) _callback();
      },
      (error) => this.errorsHandler(error, () => this.login(form, _callback))
    );
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  logout = () => {
    this.alerts.showConfirm("esta seguro?", "Cerrando sesión", true, () => {
      this.unsafeLogout();
    });
  };

  unsafeLogout = () => {
    this.alerts.showLoading();

    this.users.logout(
      () => {
        this.alerts.showSuccess("Hasta luego...", "Sesión cerrada ");
        this.clearData();
      },
      (error) => this.errorsHandler(error, () => this.unsafeLogout())
    );
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  get_user_data = (id, _callback) => {
    this.users.get_user_data(
      id,
      (response) => {
        let userData = store.getState().users.map((user) => {
          if (user.id === id) {
            return (user.profile = response.data.data);
          }
          return user;
        });

        store.dispatch(replaceUsers(userData));

        if (_callback !== undefined) _callback();
      },
      (error) =>
        this.errorsHandler(error, () => this.get_user_data(id, _callback))
    );
  };
}

export default Controller_Users;
