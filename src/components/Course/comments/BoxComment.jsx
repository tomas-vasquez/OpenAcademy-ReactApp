import React from "react";

import moment from "moment";
import "moment/min/locales";

import { connect } from "react-redux";
import Controller_Comments from "_controllers/Comments";
import { Collapse, Button } from "reactstrap";
import SingleComment from "./SingleComment";

class BoxComments extends React.Component {
  constructor() {
    super();
    moment.locale("es");
    this.state = {
      quantity: 10,
      isSendingComment: false,
    };
    this.comments = new Controller_Comments();
  }

  handleSubmitComment = (e) => {
    e.preventDefault();

    this.setState({ isSendingComment: true });

    let target_id = this.props.target_id;
    let content = document.getElementById("comment-box").value;
    let replyCommentId = this.props.replyComment
      ? this.props.replyComment.id
      : null;

    this.comments.postComment(
      target_id,
      content,
      replyCommentId,
      (response, error) => {
        if (error === null) {
          this.setState({ isSendingComment: false });
          this.props.handlerUnsetReplyComment();
          document.getElementById("comment-box").value = "";
        } else {
          this.setState({ isSendingComment: false });
        }
      }
    );
  };

  render() {
    return (
      <div className="comment-form-wrap pt-2">
        <h3 className="mb-4">Preguntas y respuestas</h3>

        <Collapse isOpen={this.props.replyComment !== null}>
          {/* {this.props.replyComment !== null ? ( */}
          <>
            <small className="h6 font-weight-400 text-muted mb-0">
              <i className="fa fa-reply ml-2 mr-1"></i> respondiendo a{" "}
              {/* {this.props.replyComment.name.split(" ")[0]}: */}
            </small>
            <div className="comments-container mt-1">
              <ul id="comments-list" className="comments-list mt-0">
                <SingleComment
                  isLast
                  comment={
                    this.props.replyComment !== null
                      ? this.props.replyComment
                      : {}
                  }
                  hideButtons
                />
              </ul>
            </div>
          </>
          {/* ) : null} */}

          <Button onClick={this.props.handlerUnsetReplyComment}>
            <i className="fa fa-times" />
          </Button>
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
              this.props.replyComment === null
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
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
});

export default connect(mapStateToProps)(BoxComments);
