import Alerts from "helpers/Alerts";
import DB from "helpers/db";

import store from "store";
import Model_Academy from "_models/Academy";
import Controller_admin from ".";
import {
  setCourses,
  setAuthors,
  setDescription,
} from "store/academy_store/actions";
import { setItems } from "store/academy_store/actions";

class Controller_Academy extends Controller_admin {
  constructor() {
    super();
    this.alerts = new Alerts();
    this.db = new DB();
    this.modelAcademy = new Model_Academy();
  }

  /*!
=========================================================
* 
=========================================================
*/

  loadCourses(_callback) {
    this.modelAcademy.loadCourses(
      (response) => {
        store.dispatch(setCourses(response.data.courses));
        store.dispatch(setAuthors(response.data.authors));

        _callback(response.data, null);
      },
      (error) => {
        _callback(null, error);
      }
    );
  }
  /*!
=========================================================
* 
=========================================================
*/

  loadItems(currentCourse, _callback) {
    this.modelAcademy.loadItems(
      currentCourse,
      (response) => {
        store.dispatch(setItems(currentCourse, response.data.items));

        _callback(response.data, null);
      },
      (error) => {
        _callback(null, error);
      }
    );
  }
  /*!
=========================================================
* 
=========================================================
*/

  loadDescription(currentDescription, _callback) {
    this.modelAcademy.loadDescription(
      currentDescription,
      (response) => {
        store.dispatch(setDescription(currentDescription, response.data));

        _callback(response.data, null);
      },
      (error) => {
        _callback(null, error);
      }
    );
  }
}

export default Controller_Academy;
