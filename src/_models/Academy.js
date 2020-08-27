import axios from "axios";
import { serverUrl } from "config";
import { apiUrl } from "config";
import DB from "helpers/db";
import { courseItemsDescriptionsUrl } from "config";

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
    axios({
      method: "get",
      url: apiUrl + "/academy/items/" + currentCourse,
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
    axios({
      method: "get",
      url: courseItemsDescriptionsUrl + currentCourse,
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

  loadTest(currentTest, _success, _error) {
    axios({
      method: "get",
      url: serverUrl + "/storage/academy/tests/" + currentTest,
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
