import React from "react";

import { connect } from "react-redux";
import { subscribeToAutoRefresher } from "store/app_store/actions";

import moment from "moment";
import "moment/min/locales";

import Controller_Comments from "_controllers/Comments";
import { storageUrl } from "config";
import { Button, Collapse, Row, Col } from "reactstrap";
import { flagsUrl } from "config";
import Comment from "./Comment";

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
          <h3 className="mb-4">
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
            <div>
              {this.state.commentReply !== null ? (
                <>
                  <small className="h6 font-weight-400 text-muted mb-2">
                    <i className="fa fa-reply ml-2 mr-1"></i> respondiendo a{" "}
                    {this.state.commentReply.name.split(" ")[0]}:
                  </small>

                  <div class="comments-container mt-0">
                    <ul id="comments-list" class="comments-list mt-2">
                      <li>
                        <Row>
                          <Col xs="auto">
                            {/* <!-- Avatar --> */}
                            <div class="comment-avatar mr-3">
                              {this.state.commentReply.pic_url !== null ? (
                                <img
                                  src={
                                    storageUrl + this.state.commentReply.pic_url
                                  }
                                  alt={userData.name}
                                />
                              ) : (
                                <img
                                  alt={userData.name}
                                  src={require("assets/img/noPic.jpg")}
                                />
                              )}
                            </div>
                          </Col>
                          <Col>
                            {/* <!-- Contenedor del Comentario --> */}
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name">{userData.name}</h6>
                                <span style={{ lineHeight: "13px" }}>
                                  {moment(
                                    this.state.commentReply.comment_created_at,
                                    "UNIX"
                                  ).fromNow()}
                                </span>
                              </div>
                              <div class="comment-content">
                                {this.state.commentReply.comment_content
                                  .length < 100 ? (
                                  <p>
                                    {this.state.commentReply.comment_content}
                                  </p>
                                ) : (
                                  <p>
                                    {this.state.commentReply.comment_content.substring(
                                      0,
                                      100
                                    )}
                                    ...
                                  </p>
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div style={{ height: "100px" }} />
              )}
            </div>
          </Collapse>
          <form id="form-comments p-0" onSubmit={this.handleSubmitComment}>
            <textarea
              name="content"
              minLength={4}
              onChange={this.commentBoxChangedHandler}
              id="comment-box"
              defaultValue=""
              disabled={this.state.isSendingComment}
              className="form-control my-3"
              placeholder={
                this.state.commentReply === null
                  ? "Escribe aquí tu comentario o pregunta"
                  : "Escribe aquí tu respuesta al comentario de arriba"
              }
              rows="3"
            />

            <div className="form-group">
              <input
                id="buttom-submit"
                type="submit"
                value="Postear pregunta"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
        <div>
          <div class="comments-container">
            <ul id="comments-list" class="comments-list">
              {
                //que si no se ha seleccionado ahún
                targetId !== null ? (
                  //que si no se han cargado ahún
                  comments[targetId] !== undefined ? (
                    //que si no se tiene comentarios
                    comments[targetId].data.length !== 0 ? (
                      this.sortComments(comments[targetId].data)
                        .slice(0, this.state.maxCommentsShowing)
                        .map((comment) => (
                          <Comment
                            key={comment.id}
                            comment={comment}
                            replyComment={
                              comment.comment_reply_id !== null
                                ? comments[targetId].data.find((elem) => {
                                    return elem.id === comment.comment_reply_id;
                                  })
                                : null
                            }
                            handleClickReplyComments={
                              this.handleClickReplyComments
                            }
                          />
                        ))
                    ) : (
                      <div className="text-center">
                        <p>Sin comentarios</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center">
                      <p>Cargando...</p>
                    </div>
                  )
                ) : (
                  <div className="text-center">
                    <p>No se ha seleccionado ningún video</p>
                  </div>
                )
              }
            </ul>
            {/* <!-- END comment-list --> */}
          </div>
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
