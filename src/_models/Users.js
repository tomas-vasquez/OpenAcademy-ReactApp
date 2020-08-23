import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";

class Model_User {
  constructor() {
    this.db = new DB();
    this.axios = axios;
  }

  /*
   *---------------------------------------------------------------
   * registro de usuarios
   *---------------------------------------------------------------
   */

  register = (data, _success, _error) => {
    // sacamos el "parent" de la url
    let url = document.location.href;
    let parent = url.split("/")[url.split("/").length - 1];

    if (parent.startsWith("@")) {
      parent = parent.slice(1);
    } else {
      parent = "founders";
    }

    data.parent_user_name = parent;

    this.axios({
      method: "post",
      url: apiUrl + "/user/register",
      headers: {
        "Content-Type": "aplication/json",
      },
      data: data,
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /*
   *---------------------------------------------------------------
   * logeo de usuarios
   *---------------------------------------------------------------
   */

  login = (data, _success, _error) => {
    this.axios({
      method: "post",
      url: apiUrl + "/user/login",
      headers: {
        "Content-Type": "aplication/json",
      },
      data: data,
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  logout = (_success, _error) => {
    this.axios({
      method: "get",
      url: apiUrl + "/user/logout",
      headers: {
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  get_user_data = ($id, _success, _error) => {
    this.axios({
      method: "get",
      url: apiUrl + "/user_data/" + $id,
      headers: {
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  };
}

export default Model_User;
