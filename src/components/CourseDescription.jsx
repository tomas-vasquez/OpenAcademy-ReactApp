import React from "react";
import { Card, CardBody, Button } from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

import moment from "moment";
import "moment/min/locales";

class CourseDescription extends React.Component {
  constructor(props) {
    super(props);
    moment.locale("es");
  }

  render() {
    let course = this.props.course;
    let description = this.props.description;
    let itemIndex = this.props.itemIndex;
    let proviusItem = this.props.proviusItem;
    let currentItem = this.props.currentItem;
    let nextItem = this.props.nextItem;

    return (
      <div className="mb-5">
        <Card style={{ marginTop: -150 }} className="mb-4 border-0 bg-black">
          <CardBody className="p-0 p-md-2">
            <div className="video-container shadow">
              <video
                controls={true}
                src={currentItem.item_video_url}
                width="720"
                height="420"
                autoPlay
              />
            </div>
          </CardBody>
        </Card>

        <h3 className="text-black">
          {itemIndex +
            ".- " +
            (
              currentItem.item_title.charAt(0).toUpperCase() +
              currentItem.item_title.slice(1, currentItem.item_title.length)
            ).replace(/_/g, " ")}
        </h3>
        <p className="mb-4">
          <strong className="text-black mr-3">Actualizado: </strong>
          {moment(currentItem.created_at, "ISO").fromNow()}
        </p>

        <div className="p-2 py-3">
          {description !== undefined ? parser(description) : null}
        </div>

        <div className="text-center">
          <Button
            tag={Link}
            replace
            to={
              "/" +
              course.course_short_link +
              "/" +
              (proviusItem ? proviusItem.item_title.replace(/ /g, "_") : "")
            }
            className={classnames(
              {
                "disabled shadow-none": proviusItem === undefined,
              },
              "btn-icon mr-2"
            )}
            color="primary"
          >
            {proviusItem ? proviusItem.item_title.replace(/ /g, "_") : ""}{" "}
            <i className="fa fa-step-backward"></i>
          </Button>

          <Button
            tag={Link}
            replace
            to={
              "/" +
              course.course_short_link +
              "/" +
              (nextItem ? nextItem.item_title.replace(/ /g, "_") : "")
            }
            className={classnames(
              {
                "disabled shadow-none": nextItem === undefined,
              },
              "btn-icon ml-2"
            )}
            color="primary"
          >
            {nextItem ? nextItem.item_title.replace(/ /g, "_") : ""}{" "}
            <i className="fa fa-step-forward"></i>
          </Button>
        </div>
      </div>
    );
  }
}

export default CourseDescription;
