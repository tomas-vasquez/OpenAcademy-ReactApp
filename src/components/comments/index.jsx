import React from "react";

import { connect } from "react-redux";
import { subscribeToAutoRefresher } from "store/app_store/actions";
import Controller_Comments from "_controllers/Comments";

class Comments extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: props.comments[props.targetId],
      targetId: props.targetId,
    };
    this.comments = new Controller_Comments();
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    if (this.state.comments === undefined) {
      this.comments.loadComments(this.targetId, (comments) => {
        this.setState({ comments: [] });
      });
    }
  };

  render() {
    return <p>{JSON.stringify(this.state.comments)}</p>;
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
  userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
  subscribeToAutoRefresher: (name, priority, mycallback) =>
    dispatch(subscribeToAutoRefresher(name, priority, mycallback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
