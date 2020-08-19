import React from "react";

import { connect } from "react-redux";
import { subscribeToAutoRefresher } from "store/app_store/actions";
import Controller_Comments from "_controllers/Comments";
import ListComments from "./ListComments";
import PHListComments from "components/Loaders/PHListComments";
import BoxComments from "./BoxComment";

class Comments extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: props.comments[props.target_id],
      replyComment: null,
      target_id: props.target_id,
      animating: false,
    };
    this.comments = new Controller_Comments();
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    if (this.state.comments === undefined) {
      // alert(this.state.target_id);
      this.comments.loadComments(this.state.target_id, (response, error) => {
        console.log(response);
        this.setState({ comments: response.comments });
        this.setState({ animating: true });
      });
    }
  };

  updateGui = () => {
    this.forceUpdate();
  };

  handlerSetReplyComment = (comment) => {
    this.setState({ replyComment: comment });
    console.log(comment);
    document.getElementById("comment-box").focus();
  };

  handlerUnsetReplyComment = () => {
    this.setState({ replyComment: null });
  };

  updateGui = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <>
        <BoxComments
          replyComment={this.state.replyComment}
          handlerUnsetReplyComment={this.handlerUnsetReplyComment}
          handleAddComments={this.handleAddComments}
          target_id={this.state.target_id}
          updateGui={this.updateGui}
        />
        {this.state.comments !== undefined ? (
          <ListComments
            handlerSetReplyComment={this.handlerSetReplyComment}
            animating={this.state.animating}
            comments={this.state.comments}
          />
        ) : (
          <PHListComments />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
  userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
  subscribeToAutoRefresher: (name, priority, mycallback) => {
    dispatch(subscribeToAutoRefresher(name, priority, mycallback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
