import React from "react";
import { Collapse, CardBody, Nav } from "reactstrap";

const FrameCollapsable = ({ currentSection, elems, isOpen }) => (
  <Collapse isOpen={isOpen}>
    <CardBody className="py-1">
      <Nav type="vertical">{elems}</Nav>
    </CardBody>
  </Collapse>
);

export default FrameCollapsable;
