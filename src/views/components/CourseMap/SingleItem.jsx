import classnames from "classnames";
import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const isLock = (userData, item) => {
  if (!item.item_need_keys) return false;
  if (!userData.keys) return true;

  let keys = 0;
  item.item_need_keys.forEach((user_key) => {
    item.item_need_keys.forEach((item_key) => {
      if (user_key === item_key) keys = keys + 1;
    });
  });

  return item.item_need_keys.length === keys;
};

const SingleItem = ({ index, item, currentItem, ...props }) => {
  let courseInUrl = document.baseURI.split("/")[3];

  return (
    <li className="w-100">
      <NavLink
        to={"/" + courseInUrl + "/" + item.item_title.replace(/ /g, "_")}
        className="nav-link text-muted"
      >
        <i
          className={classnames("fa fa-arrow-right", {
            "d-none": currentItem.item_title !== item.item_title,
          })}
          style={{ position: "absolute", margin: " 8px -10px" }}
        />
        {isLock(props.userData, item) ? (
          <i className="fa fa-lock mr-2 ml-4" />
        ) : item.item_type === "video" ? (
          <i className="fa fa-film mr-2 ml-4" />
        ) : item.item_type === "test" ? (
          <i className="fa fa-key mr-2 ml-4" />
        ) : null}

        <span>{_.upperFirst(item.item_title)}</span>
      </NavLink>
    </li>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  academy: state.academy,
});

export default connect(mapStateToProps)(SingleItem);
