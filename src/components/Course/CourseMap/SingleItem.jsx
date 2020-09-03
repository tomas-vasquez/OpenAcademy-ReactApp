import classnames from "classnames";
import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const SingleItem = ({ index, item, course_title, currentItem, ...props }) => (
  <li className="w-100">
    {/* {JSON.stringify(props)} */}
    <NavLink
      to={"/" + course_title + "/" + item.item_title.replace(/ /g, "_")}
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
);

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(SingleItem);
