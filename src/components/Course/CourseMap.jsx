import React from "react";

import classnames from "classnames";
import { NavLink } from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  Col,
  Row,
  Container,
} from "reactstrap";

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
            ? items.map((item, key) =>
                item.item_type !== "separator" ? (
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
                      {item.item_type === "video" ? (
                        <i className="fa fa-book mr-2 ml-4" />
                      ) : null}
                      {item.item_type === "test" ? (
                        <i className="fa fa-pencil mr-2 ml-4" />
                      ) : null}
                      <span>{_.upperFirst(item.item_title)}</span>
                    </NavLink>
                  </li>
                ) : (
                  <NavItem
                    key={key}
                    className="px-2 text-muted"
                    style={{ width: "100%" }}
                  >
                    <Container>
                      <Row>
                        <Col xs="auto" className="p-0 pl-4">
                          <strong>{_.upperFirst(item.item_title)}</strong>
                        </Col>
                        <Col className="p-0 pl-2">
                          <hr className="" />
                        </Col>
                      </Row>
                    </Container>
                  </NavItem>
                )
              )
            : null}
        </Nav>
      </CardBody>
    </Card>
  );
};

export default CourseMap;
