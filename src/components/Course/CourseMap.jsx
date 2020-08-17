import React from "react";

import { NavLink } from "react-router-dom";

import { Card, CardBody } from "reactstrap";

class CourseMap extends React.Component {

    activeRoute(routeName) {
    let currentItem = this.props.currentItem;
    return currentItem.item_title === routeName ? "active" : "";
  }

  render() {
    let items = this.props.items;
    let currentItem = this.props.currentItem;
    let course_title = this.props.course_title;

    return (
      <Card>
        <CardBody>
          <ul>
            {items !== undefined && currentItem !== null
              ? items.map((item, key) => (
                  <li className={this.activeRoute(item.item_title)} key={key}>
                    <NavLink
                      to={
                        "/" +
                        course_title +
                        "/" +
                        item.item_title.replace(/ /g, "_")
                      }
                      className="nav-link"
                      activeClassName="active"
                      onClick={this.props.toggleSidebar}
                    >
                      <i className="fa fa-book mr-2" />
                      <span>{item.item_title}</span>
                    </NavLink>
                  </li>
                ))
              : null}
          </ul>
        </CardBody>
      </Card>
    );
  }
}

export default CourseMap;
