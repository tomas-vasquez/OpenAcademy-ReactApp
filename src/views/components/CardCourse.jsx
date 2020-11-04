import React from "react";

import moment from "moment";
import "moment/min/locales";

// reactstrap components
import { Card, CardBody, CardImg, Media } from "reactstrap";

import { Link } from "react-router-dom";
import _ from "lodash";

class CardCourse extends React.Component {
  constructor() {
    super();
    moment.locale("es");
  }

  formatDate(date) {
    return moment(date, "ISO").fromNow();
  }

  render() {
    let course = this.props.course;
    let author = this.props.author;
    let pic_url;

    if (author.pic_url) {
      pic_url = author.pic_url;
    } else {
      pic_url = require("assets/img/noPic.jpg");
    }

    return (
      <Link
        replace
        to={"/" + course.course_short_link}
        className="text-default"
      >
        <Card className="border-1 course mb-4">
          <CardBody className="p-0">
            <div className="h-50 align-self-stretch">
              <figure className=" m-0">
                <CardImg src={course.course_pic_url}></CardImg>
              </figure>
              <div className="course-inner-text p-3">
                <span className="course-price">gratis!</span>
                <small className="meta text-muted">
                  {this.formatDate(course.created_at)}
                </small>

                <h3 className="text-primary">
                  {_.upperFirst(course.course_title)}
                </h3>
                <p className="text-muted mb-0">
                  {_.upperFirst(course.course_description)}
                </p>
              </div>
              <div className="d-flex border-top stats">
                <div className="py-3 px-4">
                  <Media>
                    <Media left>
                      <img
                        alt="..."
                        style={{ height: 30, width: 30 }}
                        className="avatar rounded-circle m-0"
                        src={pic_url}
                      />
                    </Media>
                    <Media body className="pl-2 my-auto">
                      <Media className="mb-0 text-muted">
                        {author.name ? author.name : `@${author.user_name}`}
                      </Media>
                    </Media>
                  </Media>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    );
  }
}

export default CardCourse;
