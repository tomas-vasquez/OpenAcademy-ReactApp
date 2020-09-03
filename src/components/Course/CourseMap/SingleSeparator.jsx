import { CardHeader, CardTitle } from "reactstrap";
import React from "react";
import _ from "lodash";

const SingleSeparator = ({ title, active, onClick }) => (
  <CardHeader
    className="border-top w-100 p-1"
    style={{
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <CardTitle tag="h5" className="my-2 mx-3 d-flex">
      <span>{_.upperFirst(title)}</span>
      <span className="ml-auto">
        {active ? (
          <i className="fa fa-minus text-align-right" />
        ) : (
          <i className="fa fa-plus" />
        )}
      </span>
    </CardTitle>
  </CardHeader>
);

export default SingleSeparator;
