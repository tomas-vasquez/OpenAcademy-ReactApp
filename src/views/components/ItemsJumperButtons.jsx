import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const ItemsJumperButtons = ({ proviusItem, nextItem }) => {
  let courseInUrl = document.baseURI.split("/")[3];

  return (
    <div className="d-flex">
      {proviusItem ? (
        <Button
          tag={Link}
          to={
            "/" + courseInUrl + "/" + proviusItem.item_title.replace(/ /g, "_")
          }
        >
          <i className="fa fa-arrow-left mr-2" />
          {proviusItem.item_title}
        </Button>
      ) : null}
      {nextItem ? (
        <Button
          className="ml-auto"
          tag={Link}
          to={"/" + courseInUrl + "/" + nextItem.item_title.replace(/ /g, "_")}
        >
          {nextItem.item_title}
          <i className="fa fa-arrow-right ml-2" />
        </Button>
      ) : null}
    </div>
  );
};

export default ItemsJumperButtons;
