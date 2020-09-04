import React from "react";
import ProgressSteps from "./ProgressSteps";
import { CardBody, CardHeader, CardTitle } from "reactstrap";
import IconSuccess from "./IconSuccess";
import Controller_Academy from "_controllers/Academy";

class Check extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.academy = new Controller_Academy();
  }

  qualify() {
    let test = this.props.test;
    let answers = this.props.answers;

    this.academy.qualify(test, answers, (result) => {});
  }

  componentDidMount() {
    this.qualify();
  }

  render() {
    let test = this.props.test;
    let questions = this.props.questions;
    let answers = this.props.answers;

    return (
      <>
        <CardHeader>
          <CardTitle tag="h5" className="m-0">
            <i className="fa fa-pencil mr-3" />
            {test.item_title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <ProgressSteps questions={questions} currentQuestion={1000} />

          <IconSuccess role={"success"} />
          <IconSuccess role={"error"} />

          <div className="d-flex">{JSON.stringify(answers)}</div>
        </CardBody>
      </>
    );
  }
}

export default Check;
