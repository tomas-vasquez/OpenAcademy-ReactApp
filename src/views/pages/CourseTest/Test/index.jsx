import React from "react";

import { connect } from "react-redux";

import SingleQuestion from "./SingleQuestion";
import Description from "./Description";
import { CardFooter, Button } from "reactstrap";
import Check from "./Check";

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      startTest: false,
      currentQuestion: 0,
      time: null,
      answers: {},
      finallyseTest: false,
    };
  }

  handlerStartTest = () => {
    this.setState({
      startTest: true,
      time: this.props.tree.time,
    });
    setInterval(() => {
      this.setState({ time: this.state.time - 1 });
    }, 60000);
  };

  handlerAnswerQuestion = (a) => {
    let questions = this.props.tree.questions;
    let aux = this.state.answers;
    aux[questions[this.state.currentQuestion].key] = a;
    this.setState({
      answers: aux,
    });
    console.log(this.state.answers);
  };

  render() {
    return this.state.startTest ? (
      this.state.finallyseTest ? (
        <Check
          test={this.props.tree}
          answers={this.state.answers}
          questions={this.props.tree.questions}
        />
      ) : (
        <>
          <SingleQuestion
            time={this.state.time}
            test={this.props.tree}
            currentQuestion={this.state.currentQuestion}
            handlerAnswerQuestion={this.handlerAnswerQuestion}
          />
          <CardFooter className="text-center">
            <Button
              color="primary"
              disabled={
                this.state.answers[
                  this.props.tree.questions[this.state.currentQuestion].key
                ] === undefined
              }
              onClick={() => {
                if (
                  this.props.tree.questions[this.state.currentQuestion + 1] ===
                  undefined
                ) {
                  this.setState({
                    finallyseTest: true,
                  });
                } else {
                  this.setState({
                    currentQuestion: this.state.currentQuestion + 1,
                  });
                }
              }}
            >
              Siguiente <i className="fa fa-arrow-right ml-2" />
            </Button>
          </CardFooter>
        </>
      )
    ) : (
      <Description
        test={this.props.tree}
        handlerStartTest={this.handlerStartTest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(Test);
