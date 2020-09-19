import classnames from "classnames";
import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// const isLock = (userData, item) => {
//   if (!item.item_need_keys) return false;
//   if (!userData.keys) return true;

//   let keys = 0;
//   item.item_need_keys.forEach((user_key) => {
//     item.item_need_keys.forEach((item_key) => {
//       if (user_key === item_key) keys = keys + 1;
//     });
//   });

//   return item.item_need_keys.length === keys;
// };

const SingleItem = ({ index, item, currentItem, ...props }) => {
  let courseInUrl = document.baseURI.split("/")[3];

  return (
    <li className="w-100">
      <NavLink
        to={"/" + courseInUrl + "/" + item.item_title.replace(/ /g, "_")}
        className="nav-link text-muted border-bottom"
        style={{
          backgroundColor:
            currentItem.item_title === item.item_title ? "#e6f2f5" : "white",
        }}
      >
        <p className="m-0">
          <i
            className={classnames("fa fa-play mr-2", {
              "d-none": currentItem.item_title !== item.item_title,
            })}
          />
          {`${index + 1}. ${_.upperFirst(item.item_title)}`}
        </p>
        <small>
          {item.item_type === "video" ? (
            <>video</>
          ) : item.item_type === "test" ? (
            <>
              <i className="fa fa-pencil mr-2" />
              examen
            </>
          ) : null}
        </small>
      </NavLink>
    </li>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  academy: state.academy,
});

export default connect(mapStateToProps)(SingleItem);
