import React from "react";

// reactstrap components

import Error500 from "./Error500";
import ErrorConection from "./ErrorConection";

class ErrorAllCourses extends React.Component {
  componentDidMount = () => {
    console.error(
      "%c Error > %c",
      "background:red; color:white",
      "",
      this.props.error
    );
  };

  render() {
    let error = this.props.error;

    if (error.response) {
      return error.response.status === 500 ? (
        <Error500 reload={this.props.reload} />
      ) : null;
    } else {
      return <ErrorConection reload={this.props.reload} />;
    }
  }
}

export default ErrorAllCourses;
