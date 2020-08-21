import React, { Fragment } from "react";

const ProgressSteps = ({ questions, currentQuestion }) => {
  return (
    <div className="d-flex">
      <ul className="swal2-progress-steps mx-auto" style={{ display: "flex" }}>
        {questions.map((question, key) => (
          <Fragment key={key}>
            {currentQuestion === key ? (
              <li className="swal2-progress-step swal2-active-progress-step">
                {key + 1}
              </li>
            ) : (
              <li className="swal2-progress-step">{key + 1}</li>
            )}
            <li className="swal2-progress-step-line"></li>
          </Fragment>
        ))}
        
        <li className="swal2-progress-step">
          <i className="fa fa-check"></i>
        </li>
      </ul>
    </div>
  );
};

export default ProgressSteps;
