import React from "react";
import { connect } from "react-redux";

import moment from "moment";
import "moment/min/locales";

import SingleComment from "./SingleComment";
// import { reply } from "store/comments_store/actions";

class InternalListComments extends React.Component {
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
    let parentComment = this.props.parentComment;

    let replys = this.props.replys
      ? this.props.replys.filter((reply) => {
          return parentComment.id === reply.comment_reply_id;
        })
      : [];

    return replys.length !== 0 ? (
      <>
        <div className="replys comments-container">
          <ul className="comments-list">
            {replys.map((reply, key) => (
              <SingleComment
                animating={this.props.animating}
                key={reply.id}
                comment={reply}
                replys={this.props.replys}
                handlerSetReplyComment={this.props.handlerSetReplyComment}
                isLast={key === replys.length - 1}
              />
            ))}
          </ul>
        </div>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(InternalListComments);
