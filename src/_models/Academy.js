import axios from "axios";
import { serverUrl } from "config";
import { apiUrl } from "config";
import DB from "helpers/db";

class Model_Academy {
  constructor() {
    this.db = new DB();
  }
  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  loadCourses(_success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "get",
      url: apiUrl + "/academy/courses",
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }
  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  loadItems(currentCourse, _success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "get",
      url: apiUrl + "/academy/get_items/" + currentCourse,
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }

  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  loadDescription(currentCourse, _success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "get",
      url: serverUrl + "/storage/academy/descriptions/" + currentCourse,
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }

  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  editCourse(data, _success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "post",
      url: apiUrl + "/academy",
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token"),
      },
      data: data,
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }
}

export default Model_Academy;
