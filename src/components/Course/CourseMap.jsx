import React from "react";

import classnames from "classnames";
import { NavLink } from "react-router-dom";

import { Card, CardBody, CardHeader, CardTitle, Nav } from "reactstrap";

var _ = require("lodash");

const CourseMap = ({ items, currentItem, course_title }) => {
  return (
    <Card className="mb-4 shadow">
      <CardHeader>
        <CardTitle tag="h5" className="m-0">
          <i className="fa fa-book mr-3" />
          Temario:
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Nav>
          {items !== undefined && currentItem !== null
            ? items.map((item, key) => (
                <li key={key}>
                  <NavLink
                    to={
                      "/" +
                      course_title +
                      "/" +
                      item.item_title.replace(/ /g, "_")
                    }
                    className="nav-link text-muted"
                  >
                    <i
                      className={classnames("fa fa-arrow-right", {
                        "d-none": currentItem.item_title !== item.item_title,
                      })}
                      style={{ position: "absolute", margin: " 8px -10px" }}
                    />
                    <i className="fa fa-book mr-2 ml-4" />
                    <span>{_.upperFirst(item.item_title)}</span>
                  </NavLink>
                </li>
              ))
            : null}
        </Nav>
      </CardBody>
    </Card>
  );
};

export default CourseMap;
