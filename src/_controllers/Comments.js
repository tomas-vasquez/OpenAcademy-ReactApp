import Logger from "helpers/Logger";
import store from "store";
import { setComments, addComment } from "store/comments_store/actions";

import Model_Comments from "_models/Comments";
import Controller_admin from "_controllers";

import { getLastTimeMark, mergeComments } from "helpers/utils";

import Dexie from "dexie";

class Controller_Comments extends Controller_admin {
  constructor() {
    super();
    this.comments = new Model_Comments();
    this.log = new Logger("Controller_Comments", "background:blue;color:white");
    this.db = new Dexie("comments");
    this.db.version(1).stores({
      comments: "item_id,data,lastMarkTime",
    });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  loadComments(item_id, _callback) {
    this.log.msg("cargando comentarios...");

    this.db.open().then(() => {
      //sacamos lo que tenemos en la base de datos
      this.db.comments.get(item_id).then((commentsInDb) => {
        let lastUpdate =
          commentsInDb !== undefined ? commentsInDb.lastUpdate : 0; //ultima vez que actualizamos los datos locales
        try {
          this.comments.loadComments(
            item_id,
            lastUpdate,
            (response) => {
              var data;
              if (commentsInDb === undefined) {
                data = {
                  item_id, //primary key
                  comments: response.data.comments,
                  lastUpdate: getLastTimeMark(
                    response.data.comments,
                    "comment_updated_at"
                  ),
                };
                this.db.comments.add(data);
              } else {
                data = {
                  item_id, //primary key
                  comments: mergeComments(
                    commentsInDb.comments,
                    response.data.comments
                  ),
                  lastUpdate: getLastTimeMark(
                    response.data.comments,
                    "comment_updated_at"
                  ),
                };
                this.db.comments.update(item_id, data);
              }

              store.dispatch(setComments(item_id, data));
              store.log();

              _callback(data, null);

              this.log.msg("cargandos api:", response.data.comments);
              this.log.msg("cargandos idb:", commentsInDb);
              this.log.msg("cargando comentarios... Listo :D");
            },
            (error) => {
              _callback(null, error);
            }
          );
        } catch (error) {
          console.error(error);
          _callback(null, error);
        }
      });
    });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  postComment(item_id, content, reply_id, _callBack) {
    this.log.msg("publicando comentario...");

    this.comments.postComment(
      item_id,
      content,
      reply_id,
      (response) => {
        let comment = {
          pic_url: store.getState().userData.pic_url,
          name: store.getState().userData.name,
          flag: store.getState().userData.flag,
          ...response.data,
        };

        store.dispatch(addComment(item_id, comment));
        store.log();

        //boramos el text-area
        document.getElementById("comment-box").value = "";

        this.log.msg("publicando comentario... LISTO :D");
        _callBack(response.data, null);
      },
      (error) => {
        _callBack(null, error);
        this.errorsHandler(error, () => {
          console.error(error);
          this.postComment(item_id, content, reply_id, _callBack);
        });
      }
    );
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  backupComments(item_id) {
    let aux = store.getState().comments[item_id];

    if (aux !== undefined) {
      this.db.open().then(() => {
        let dat = {
          item_id, //primary key
          data: aux.data,
          lastUpdate: aux.lastUpdate,
        };
        this.db.comments.update(item_id, dat);
      });
    }
  }
}

export default Controller_Comments;
