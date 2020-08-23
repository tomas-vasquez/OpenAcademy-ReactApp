import React, { Fragment } from "react";
import ProgressSteps from "./ProgressSteps";
import { CardBody, CardHeader, CardTitle } from "reactstrap";
import IconSuccess from "./IconSuccess";

const Check = ({ test, questions, answers }) => {
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
};

export default Check;
