import React from "react";

import { connect } from "react-redux";
import { subscribeToAutoRefresher } from "store/app_store/actions";
import Controller_Comments from "fetchers/Comments";
import ListComments from "./ListComments";
import PHListComments from "views/components/Loaders/PHListComments";
import BoxComments from "./BoxComment";

class Comments extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: props.comments[props.target_id]
        ? props.comments[props.target_id]["comments"]
        : null,
      replyComment: null,
      target_id: props.target_id,
      animating: false,
    };
    this.comments = new Controller_Comments();
  }

  loadData = () => {
    if (this.props.comments[this.props.target_id] === undefined) {
      this.comments.loadComments(this.props.target_id, (response, error) => {
        this.setState({ comments: response.comments, error: error });
        this.setState({ animating: true });
      });
    } else {
      this.setState({
        comments: this.props.comments[this.props.target_id]["comments"],
      });
      this.setState({ animating: true });
    }
  };

  reloadData = () => {
    this.setState({
      comments: null,
      target_id: this.props.target_id,
      animating: false,
    });
    this.loadData();
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(e) {
    if (this.state.target_id !== this.props.target_id) {
      this.reloadData();
    }
  }

  updateGui = () => {
    this.forceUpdate();
  };

  handlerSetReplyComment = (comment) => {
    this.setState({ replyComment: comment });
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
        <h4 className="mt-4 border-top py-3 text-dark">
          <i className="fa fa-comments mr-2" />
          Preguntas y respuestas
        </h4>
        <BoxComments
          replyComment={this.state.replyComment}
          handlerUnsetReplyComment={this.handlerUnsetReplyComment}
          handleAddComments={this.handleAddComments}
          target_id={this.state.target_id}
          updateGui={this.updateGui}
        />
        {this.state.comments !== null ? (
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
