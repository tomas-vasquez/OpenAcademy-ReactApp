import React from "react";
import { connect } from "react-redux";

import moment from "moment";
import "moment/min/locales";

import { storageUrl } from "config";

// reactstrap components
import { Collapse, Row, Col, Button } from "reactstrap";
import InternalListComments from "./InternalListComments";

class SingleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: !props.animating,
    };
    moment.locale("es");
  }

  componentDidMount() {
    if (!this.props.collapse) {
      this.setState({ collapse: true });
    }
  }

  render() {
    let comment = this.props.comment;

    return (
      <li className="mb-3">
        <Collapse isOpen={this.state.collapse}>
          <div className="comment-main-level">
            <Row>
              <Col xs="auto" className={this.props.isLast ? "bg-white" : null}>
                <div className="comment-avatar mr-3">
                  {comment.pic_url !== null && comment.pic_url !== undefined ? (
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
                <div className="comment-box border-1 mt-1">
                  <div className="comment-head">
                    <h6 className="comment-name">
                      {comment.name ? comment.name : "Anonimo"}
                    </h6>
                    <span style={{ lineHeight: "13px" }}>
                      {moment(comment.comment_created_at, "UNIX").fromNow()}
                    </span>
                  </div>
                  <div className="comment-content">
                    {comment.comment_content}
                  </div>
                  {!this.props.hideButtons ? (
                    <div>
                      <Button
                        className="p-1 m-2"
                        color="light"
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.handlerSetReplyComment(comment);
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
                        <i className="fa fa-heart mr-2" />
                        Me gustó
                      </Button>
                    </div>
                  ) : null}
                </div>
                {this.props.replys ? (
                  <div
                    className="d-flex"
                    style={{
                      width: "inherit",
                    }}
                  >
                    <InternalListComments
                      parentComment={comment}
                      replys={this.props.replys}
                      handlerSetReplyComment={this.props.handlerSetReplyComment}
                    />
                  </div>
                ) : null}
              </Col>
            </Row>
          </div>
          {/* replys */}
        </Collapse>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(SingleComment);
