import axios from "axios";
import { apiUrl } from "config";
import DB from "helpers/db";
import { courseItemsDescriptionsUrl } from "config";
import { testsUrl } from "config";

class Model_Academy {
  constructor() {
    this.db = new DB();
  }

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

  /* =========================================================
   *
   * ========================================================= */

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

  /* =========================================================
   *
   * ========================================================= */

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

  /* =========================================================
   *
   * ========================================================= */

  loadTest(testId, _success, _error) {
    axios({
      method: "get",
      url: testsUrl + "/" + testId,
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }

  /* =========================================================
   *
   * ========================================================= */

  qualify(test, answers, _success, _error) {
    axios({
      method: "post",
      url: testsUrl + "/" + test._id,
      data: { answers },
      headers: {
        "Content-Type": "application/json",
        "api-token": this.db.get("api-token"),
      },
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
