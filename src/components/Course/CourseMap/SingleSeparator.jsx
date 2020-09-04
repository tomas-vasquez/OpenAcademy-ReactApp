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
    <CardTitle tag="h5" className="my-2 mx-2" style={{ transition: 1000 }}>
      <span className="mx-1">
        {active ? <i className="fa fa-minus" /> : <i className="fa fa-plus" />}
      </span>{" "}
      <span className="ml-2">{_.upperFirst(title)}</span>
    </CardTitle>
  </CardHeader>
);

export default SingleSeparator;
