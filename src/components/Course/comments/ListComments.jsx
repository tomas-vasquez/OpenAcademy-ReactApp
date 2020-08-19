import React from "react";
import SingleComment from "./SingleComment";

class ListComments extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 10,
    };
  }

  sortListComments(array) {
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

  render() {
    let comments = this.props.comments.filter((comment) => {
      return comment.comment_reply_id === null;
    });

    let replys = this.props.comments.filter((comment) => {
      return comment.comment_reply_id !== null;
    });

    return (
      <div className="comments-container">
        <ul id="comments-list" className="comments-list">
          {this.sortListComments(comments)
            .slice(0, this.state.quantity)
            .map((comment, key) => (
              <SingleComment
                animating={this.props.animating}
                key={comment.id}
                comment={comment}
                replys={replys}
                handlerSetReplyComment={this.props.handlerSetReplyComment}
                isLast={key === comments.length - 1}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default ListComments;
