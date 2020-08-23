import React from "react";

import parser from "html-react-parser";
import ProgressSteps from "./ProgressSteps";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  CardFooter,
} from "reactstrap";

const SingleQuestion = ({
  test,
  currentQuestion,
  time,
  handlerAnswerQuestion,
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle tag="h5" className="m-0">
          <div className="d-flex">
            <span>
              <i className="fa fa-pencil mr-3" />
              {test.item_title}
            </span>
            <span className="ml-auto">quedan {time} min.</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <ProgressSteps
          questions={test.questions}
          currentQuestion={currentQuestion}
        />

        <div className="px-3">
          <div
            className="mb-4"
            style={{
              borderLeft: "4px solid rgb(0 0 0 / 30%)",
              paddingLeft: 7,
            }}
          >
            {parser(test.questions[currentQuestion].content)}
          </div>

          {test.questions[currentQuestion].multiple ? (
            <>
              <form id="multi" className="mb-4 multi">
                {test.questions[currentQuestion].options.map((option, key) => (
                  <div
                    key={key}
                    className="custom-control custom-checkbox mb-2"
                  >
                    <input
                      className="custom-control-input"
                      defaultValue="off"
                      id={"question-" + key}
                      type="checkbox"
                      onChange={(e) => {
                        let aux = [];
                        for (
                          let i = 0;
                          i < document.getElementById("multi").length;
                          i++
                        ) {
                          aux[i] = document.getElementById("multi")[i].checked;
                        }
                        handlerAnswerQuestion(aux);
                      }}
                    />
                    <label
                      className="custom-control-label d-inline"
                      htmlFor={"question-" + key}
                      style={{ cursor: "pointer" }}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </form>

              <p className="m-0">
                <strong className="text-danger">*</strong> puedes seleccionar
                más de una opción.
              </p>
            </>
          ) : (
            <>
              {test.questions[currentQuestion].options.map((option, key) => (
                <div key={key} className="custom-control custom-radio mb-2">
                  <input
                    name="custom-radio-1"
                    className="custom-control-input"
                    id={"customRadio" + key}
                    type="radio"
                    onChange={() => {
                      handlerAnswerQuestion(key);
                    }}
                  />
                  <label
                    className="custom-control-label  d-inline"
                    htmlFor={"customRadio" + key}
                    style={{ cursor: "pointer" }}
                  >
                    {option}
                  </label>
                </div>
              ))}
              <p className="m-0">
                <strong className="text-danger">*</strong> elije una opción.
              </p>
            </>
          )}
        </div>
      </CardBody>
    </>
  );
};

export default SingleQuestion;
