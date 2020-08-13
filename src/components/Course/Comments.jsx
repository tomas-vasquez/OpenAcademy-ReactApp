import React from "react";

import { connect } from "react-redux";
import { subscribeToAutoRefresher } from "store/app_store/actions";

import moment from "moment";
import "moment/min/locales";

import Controller_Comments from "_controllers/Comments";
import { storageUrl } from "config";
import { Button, Collapse } from "reactstrap";
import { flagsUrl } from "config";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      count: 0,
      maxCommentsShowing: 10,
      commentReply: null,
      isSendingComment: false,
    };
    this.comments = new Controller_Comments();
    moment.locale("es");
  }

  lastItem_id = null;

  componentDidMount() {
    this.lastItem_id = this.props.targetId;
    this.switchToComments();
  }

  componentDidUpdate = () => {
    if (this.lastItem_id !== this.props.targetId) {
      //guardamos los comentarios en la db
      this.comments.backupComments(this.lastItem_id);
      //hacemos el cambio de comentarios a mostrar
      this.lastItem_id = this.props.targetId;
      this.switchToComments();
    }
  };

  // /*!
  // =========================================================
  // * ordena los comentarios que nos llegan
  // =========================================================
  // */

  sortComments(array) {
    var aux = array;

    for (let y = 0; y <= array.length - 2; y++) {
      for (let i = 0; i <= array.length - 2; i++) {
        if (array[i].comment_created_at < array[i + 1].comment_created_at) {
          aux = array[i];
          array[i] = array[i + 1];
          array[i + 1] = aux;
        }
      }
    }
    return array;
  }
  // /*!
  // =========================================================
  // * ordena los comentarios que nos llegan
  // =========================================================
  // */

  switchToComments = () => {
    let comments = this.props.comments;
    let targetId = this.props.targetId;

    if (targetId !== undefined) {
      if (comments[targetId] === undefined) {
        this.comments.loadComments(targetId, () => {
          comments = this.props.comments;
          this.setState({ maxCommentsShowing: 10 });

          if (this.state.collapse1) {
            this.props.subscribeToAutoRefresher(
              "comments?" + targetId + "?" + comments[targetId].lastUpdate,
              "HIGH_PRIORITY",
              this.updateGui
            );
          } else {
            this.props.subscribeToAutoRefresher(
              "comments?" + targetId + "?" + comments[targetId].lastUpdate,
              "MEDIUM_PRIORITY",
              this.updateGui
            );
          }
        });
      } else {
        if (this.state.collapse1) {
          this.props.subscribeToAutoRefresher(
            "comments?" +
              targetId +
              "?" +
              comments[targetId].comment_updated_at,
            "HIGH_PRIORITY",
            this.updateGui
          );
        } else {
          this.props.subscribeToAutoRefresher(
            "comments?" +
              targetId +
              "?" +
              comments[targetId].comment_updated_at,
            "MEDIUM_PRIORITY",
            this.updateGui
          );
        }
      }
    }
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  updateGui = () => {
    //console.log("forceUpdate de comments");
    // this.setState({ commentReply: null });
    this.forceUpdate();
  };

  /*!
  =========================================================
  * accion al presionar el boton de enviar comentario
  =========================================================
  */

  commentBoxChangedHandler = (e) => {
    e.preventDefault();
    var letras =
      "abcdefghijklmnñopqrstuvwxyzABCDEFGJHIJKLMNOPQRSTUVWXYZáéíóúÁÉÍÓÚ ¿?,.!¡;:+=-@#$%&*()_1234567890";

    const str = e.target.value;
    var aux = e.target.selectionStart;
    var newStr = "";

    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);

      if (letras.indexOf(String.fromCharCode(charCode)) !== -1) {
        newStr = newStr + String.fromCharCode(charCode);
      }
    }

    e.target.value = newStr;
    e.target.selectionStart = aux;
    e.target.selectionEnd = aux;

    //validamos la longitud del texto
    let lenght = e.target.value.trim().length;
    if (lenght < 4) {
      e.target.setCustomValidity(
        "Alarga el texto a 8 o mas carácteres (actualmente, usas " +
          lenght +
          " caracteres)"
      );
    } else {
      e.target.setCustomValidity("");
    }
    if (charCode === 10) document.getElementById("buttom-submit").click();
  };

  handleSubmitComment = (e) => {
    let targetId = this.props.targetId;

    e.preventDefault();
    const content = document.getElementById("comment-box").value;

    this.setState({ isSendingComment: true });

    let reply_id = null;
    if (this.state.commentReply !== null) {
      reply_id = this.state.commentReply.id;
    }

    this.comments.postComment(
      targetId,
      content,
      reply_id,
      () => {
        this.setState({ isSendingComment: false });
        document.getElementById("comment-box").value = "";
        this.setState({ commentReply: null });
      },
      () => {
        this.setState({ isSendingComment: false });
      }
    );
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  handleClickOpenComments = (e) => {
    let targetId = this.props.targetId;
    let comments = this.props.comments;

    this.setState({ commentReply: null });

    if (comments[targetId] !== undefined) {
      if (this.state.collapse1) {
        this.setState({ collapse1: false, maxCommentsShowing: 15 });
        // this.props.subscribeToAutoRefresher(
        //   "comments?" +
        //     targetId +
        //     "?" +
        //     comments[targetId].lastUpdate,
        //   "MEDIUM_PRIORITY",
        //   this.updateGui
        // );
      } else {
        this.setState({ collapse1: true });
        // this.props.subscribeToAutoRefresher(
        //   "comments?" +
        //     targetId +
        //     "?" +
        //     comments[targetId].lastUpdate,
        //   "HIGH_PRIORITY",
        //   this.updateGui
        // );
      }
    }
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  handleClickReplyComments = (e, comment) => {
    this.setState({ commentReply: comment });
    document.getElementById("comment-box").focus();
  };

  formatDate(date) {
    let unix = new Date(date).getTime() / 1000;
    return moment(unix, "UNIX").fromNow();
  }

  /*!
  =========================================================
  * metodo render :D
  =========================================================
  */
  render() {
    let userData = this.props.userData;
    let targetId = this.props.targetId;
    let comments = this.props.comments;

    let pic_url;

    if (userData.blob_pic_url !== undefined && userData.blob_pic_url !== null) {
      pic_url = userData.blob_pic_url;
    } else {
      if (userData.pic_url !== null) {
        pic_url = storageUrl + userData.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
    }

    return (
      <>
        <div className="comment-form-wrap pt-5">
          <h3 className="mb-5">
            Preguntas y respuestas{" "}
            {
              //que si no se han seleccionado ahún
              targetId !== null ? (
                //que si no se han cargado ahún
                comments[targetId] !== undefined ? (
                  "(" + comments[targetId].data.length + " en total)"
                ) : (
                  <div className="mx-auto lds-dual-ring-sm pt-0 mr-3" />
                )
              ) : null
            }
          </h3>
          <Collapse isOpen={this.state.commentReply !== null}>
            <div className="py-0 px-2">
              {this.state.commentReply !== null ? (
                <>
                  <small className="h6 font-weight-400 text-muted mt-0">
                    <i className="fa fa-reply ml-2 mr-1"></i> respondiendo a{" "}
                    {this.state.commentReply.name.split(" ")[0]}:
                  </small>
                  <div
                    className="shadow media align-items-center rounded"
                    style={{ borderLeft: "solid 4px " }}
                  >
                    <div className="media-body">
                      <div className="media align-items-center mb-0 bg-muted rounded py-1 m-0">
                        <div className="ml-2">
                          {this.state.commentReply.pic_url !== null ? (
                            <img
                              className="avatar avatar-md rounded-circle mr-3"
                              src={storageUrl + this.state.commentReply.pic_url}
                              alt={userData.name}
                            />
                          ) : (
                            <img
                              alt={userData.name}
                              className="avatar avatar-md rounded-circle mr-3"
                              src={require("assets/img/noPic.jpg")}
                            />
                          )}
                        </div>

                        <img
                          className="avatar-flag"
                          src={flagsUrl + this.state.commentReply.flag + ".png"}
                          alt={this.state.commentReply.flag}
                        />
                        <div className="media-body">
                          {this.state.commentReply.user_id === userData.id ? (
                            <>
                              <small className="h6 font-weight-400 text-muted mt-0">
                                Tú -{" "}
                                {this.formatDate(
                                  this.state.commentReply
                                    .comment_comment_created_at
                                )}
                              </small>
                              <br />
                            </>
                          ) : (
                            <>
                              <small className="h6 font-weight-400 text-muted mt-0">
                                {this.state.commentReply.name} -{" "}
                                {this.formatDate(
                                  this.state.commentReply
                                    .comment_comment_created_at
                                )}
                              </small>
                              <br />
                            </>
                          )}
                          {this.state.commentReply.comment_content.lenght <
                          100 ? (
                            <p className="h4 font-weight-500 mt-0">
                              {this.state.commentReply.comment_content}
                            </p>
                          ) : (
                            <p className="h4 font-weight-500 mt-0">
                              {this.state.commentReply.comment_content.substring(
                                0,
                                100
                              )}
                              ...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="btn-icon rounded-circle btn-neutral mr-2"
                        onClick={(e) => {
                          this.setState({ commentReply: null });
                        }}
                      >
                        <i className="fa fa-times" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ height: "100px" }} />
              )}
            </div>
          </Collapse>

          <textarea
            name=""
            id="message"
            cols="30"
            rows="3"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Postear pregunta"
            className="btn btn-primary"
          />
        </div>

        <div className="pt-5">
          <ul className="comment-list">
            <li className="comment">
              <div className="vcard bio">
                <img
                  src={require("assets/images/person_2.jpg")}
                  alt="Image placeholder"
                />
              </div>
              <div className="comment-body">
                <h3>Jean Doe</h3>
                <div className="meta">January 9, 2018 at 2:21pm</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur quidem laborum necessitatibus, ipsam impedit vitae
                  autem, eum officia, fugiat saepe enim sapiente iste iure! Quam
                  voluptas earum impedit necessitatibus, nihil?
                </p>
                <p>
                  <a href="/" className="reply">
                    <i className="fa fa-reply mr-2" />
                    Responder
                  </a>
                </p>
              </div>
            </li>
          </ul>
          {/* <!-- END comment-list --> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isBeenLoadedMainData: state.app.isBeenLoadedMainData,
  comments: state.comments,
  userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
  subscribeToAutoRefresher: (name, priority, mycallback) =>
    dispatch(subscribeToAutoRefresher(name, priority, mycallback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
