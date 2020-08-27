import swal from "sweetalert2";

import Model_Profile from "_models/Profile";

import Alerts from "helpers/Alerts";
import Db from "helpers/db";

import store from "store";
import { setUserData } from "store/userData_store/actions";

import { userPicUrl } from "config";
import Controller_admin from ".";

import { cropToProfilePic } from "helpers/image";
import { replaceUsers } from "store/users_store/actions";

class Controller_Profile extends Controller_admin {
  constructor() {
    super();
    this.profile = new Model_Profile();
    this.alerts = new Alerts();
    this.db = new Db();
  }

  getProfile = (userName, _callback) => {
    this.profile.getProfile(
      userName,
      (response) => {
        _callback(response, null);
      },
      // (error) => this.errorsHandler(error, () => this.getProfile(userName, _callback), true)
      (error) => {
        _callback(null, error);
      }
    );
  };

  /* =========================================================
   *
   * ========================================================= */

  handleClickPic = (e) => {
    let picUrl = "";
    let pic_url = store.getState().userData.pic_url;
    let blob_pic_url = store.getState().userData.blob_pic_url;

    if (blob_pic_url !== undefined && blob_pic_url) {
      picUrl = blob_pic_url;
    } else {
      if (pic_url) {
        picUrl = userPicUrl + pic_url;
      } else {
        picUrl = require("assets/img/noPic.jpg");
      }
    }

    swal
      .fire({
        title: "Foto de perfil",
        imageUrl: picUrl,
        imageHeight: 180,
        imageWidth: 180,
        showCloseButton: true,
        showCancelButton: pic_url,
        buttonsStyling: false,
        confirmButtonText: '<i className="fa fa-pencil-alt"></i> cambiar',
        confirmButtonClass: "btn btn-primary",
        cancelButtonText: '<i className="fa fa-trash"></i> borrar',
        cancelButtonClass: "btn btn-danger",
        footer:
          "<small className='text-muted'>Importante: esta imagen es pública dentro del sistema de tloging</small>",
      })
      .then((result) => {
        if (result.value) {
          document.getElementById("input-pic").click();
        } else if (result.dismiss === "cancel") {
          this.deletePic();
        }
      });
  };

  /* =========================================================
   *
   * ========================================================= */

  handle_pic_selected(file) {
    //vemos si la imagen seleccionada es v{alida}

    cropToProfilePic(file, (blob) => {
      this.unsafeUploadPic(blob);
    });
  }

  unsafeUploadPic = (blob) => {
    this.alerts.showUploding(true, "subiendo...");

    this.profile.uploadPic(
      blob,
      (progressEvent) => {
        let percentage = progressEvent.loaded / (progressEvent.total / 100);
        this.alerts.setUplodingPercentage(percentage);
      },
      (response) => {
        this.alerts.showUploding(false);
        this.alerts.showSuccess("Foto de perfil actualizada");

        store.dispatch(
          setUserData({
            blob_pic_url: URL.createObjectURL(blob),
            pic_url: response.data,
          })
        );
      },
      (error) => this.errorsHandler(error, () => this.unsafeUploadPic(blob))
    );
  };

  deletePic = () => {
    swal
      .fire({
        showCloseButton: true,
        showCancelButton: true,
        buttonsStyling: false,
        icon: "question",
        title: "Eliminar foto de perfil",
        text: "Está seguro de eliminar su foto de perfil?",
        confirmButtonText: '<i className="fa fa-trash"></i> Sí, eliminar',
        confirmButtonClass: "btn btn-danger",
        cancelButtonText: "cancelar",
        cancelButtonClass: "btn btn-primary",
      })
      .then((result) => {
        if (result.value) {
          this.unsafeDeletePic();
        } else if (result.dismiss === "cancel") {
          this.handleClickPic();
        }
      });
  };

  unsafeDeletePic = () => {
    this.profile.deletePic(
      () => {
        this.alerts.showSuccess("Foto de perfil eliminada");

        store.dispatch(
          setUserData({
            blob_pic_url: undefined,
            pic_url: null,
          })
        );
      },
      (error) => this.errorsHandler(error, () => this.unsafeDeletePic())
    );
  };

  /* =========================================================
   *
   * ========================================================= */

  getUserData = (_callback) => {
    this.profile.getUserData(
      (response) => {
        store.dispatch(setUserData(response.user_data));
        _callback();
      },
      (error) => this.errorsHandler(error, () => this.getUserData(_callback))
    );
  };

  updateUserData = (form) => {
    this.alerts.showConfirm(
      "está seguro de continuar?",
      "Actualizando datos de su perfíl",
      true,
      () => {
        this.unsafeUpdateUserData(form);
      }
    );
  };

  unsafeUpdateUserData = (form) => {
    this.alerts.showLoading(true);

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
      }
    }

    this.profile.updateUserData(
      data,
      (response) => {
        this.alerts.showSuccess("Perfil actualizado");

        store.dispatch(setUserData(response.data));
      },
      (error) =>
        this.errorsHandler(error, () => this.unsafeUpdateUserData(form))
    );
  };
}

export default Controller_Profile;
