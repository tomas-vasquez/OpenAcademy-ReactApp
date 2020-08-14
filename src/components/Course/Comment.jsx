import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/min/locales";

import { storageUrl, flagsUrl } from "config";

// reactstrap components
import { Collapse, Row, Col, Button } from "reactstrap";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
    };
    moment.locale("es");
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ collapse1: true });
    }, 10);
    
  }

  /*!
  =========================================================
  * metodo render :D
  =========================================================
  */

  render() {
    let comment = this.props.comment;
    let replyComment = this.props.replyComment;

    let userData = this.props.userData;

    return (
     

        <li className="mt-4">
           <Collapse isOpen={this.state.collapse1}>
          <div class="comment-main-level">
            {/* <!-- Avatar --> */}

            <Row >
              <Col xs="auto">
                <div class="comment-avatar mr-3">
                  {comment.pic_url !== null ? (
                    <img
                      src={storageUrl + comment.pic_url}
                      alt={comment.name}
                    />
                  ) : (
                    <img
                      src={require("assets/img/noPic.jpg")}
                      alt={comment.name}
                    />
                  )}
                </div>
              </Col>
              <Col>
                {/* <!-- Contenedor del Comentario --> */}
                <div class="comment-box border-1 ">
                  <div class="comment-head">
                    <h6 class="comment-name">{userData.name}</h6>
                    <span style={{ lineHeight: "13px" }}>
                      {moment(comment.comment_created_at, "UNIX").fromNow()}
                    </span>
                  </div>
                  <div class="comment-content">{comment.comment_content}</div>
                  <p>
                    <Button
                      className="p-1 m-2"
                      color="light"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.handleClickReplyComments(e, comment);
                      }}
                    >
                      <i className="fa fa-reply mr-2" />
                      Responder
                    </Button>
                    <Button
                      className="p-1 m-2"
                      color="light"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.handleClickReplyComments(e, comment);
                      }}
                    >
                      <i class="fa fa-heart mr-2" />
                      Me gustó
                    </Button>
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* <!-- Respuestas de los comentarios --> */}
          {replyComment !== null && replyComment !== undefined ? (
            <ul class="comments-list reply-list">
              <li>
                <Row>
                  <Col xs="auto">
                    {/* <!-- Avatar --> */}
                    <div class="comment-avatar mr-3">
                      {replyComment.pic_url !== null ? (
                        <img
                          src={storageUrl + replyComment.pic_url}
                          alt={replyComment.name}
                        />
                      ) : (
                        <img
                          alt={replyComment.name}
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
                            replyComment.comment_created_at,
                            "UNIX"
                          ).fromNow()}
                        </span>
                        
                      </div>
                      <div class="comment-content">
                        {replyComment.comment_content.length < 150 ? (
                          <>{replyComment.comment_content}</>
                        ) : (
                          <>
                            {replyComment.comment_content.substring(0, 150)}...
                          </>
                        )}
                      </div>
                      <p>
                        <Button
                          className="p-1 m-2"
                          color="light"
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.handleClickReplyComments(e, comment);
                          }}
                        >
                          <i class="fa fa-heart mr-2" />
                          Me gustó
                        </Button>
                      </p>
                    </div>
                  </Col>
                </Row>
              </li>
            </ul>
          ) : null}
        </Collapse></li>
      
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {})(Comment);
