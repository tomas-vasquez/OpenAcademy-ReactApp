import React from "react";

import moment from "moment";
import "moment/min/locales";

// reactstrap components
import { Card, CardBody, CardImg, Media } from "reactstrap";

import { storageUrl } from "config";
import { Link } from "react-router-dom";

class CardCourse extends React.Component {
  constructor() {
    super();
    moment.locale("es");
  }

  formatDate(date) {
    let unix = new Date(date).getTime() / 1000;
    return moment(unix, "UNIX").fromNow();
  }

  render() {
    let course = this.props.course;
    let author = this.props.author;
    return (
      <Link
        replace
        to={"/" + course.course_short_link}
        className="text-default"
      >
        <Card className="border-1 course">
          <CardBody className="p-0">
            <div className="h-50 align-self-stretch">
              <figure className=" m-0">
                <CardImg
                  src={storageUrl + "academy/pics" + course.course_pic_url}
                ></CardImg>
              </figure>
              <div className="course-inner-text py-4 px-4">
                <span className="course-price">$99</span>
                <div className="meta text-muted mr-2">
                  <i className="fa fa-clock mr-2" />
                  {this.formatDate(course.created_at)}
                </div>
                <h3 className="text-primary">{course.course_title}</h3>
                <p className="text-muted">{course.course_description}</p>
              </div>
              <div className="d-flex border-top stats">
                <div className="py-3 px-4">
                  <Media>
                    <Media left>
                      <img
                        alt="..."
                        style={{ height: 30, width: 30 }}
                        className="avatar rounded-circle m-0"
                        src={storageUrl + author.pic_url}
                      />
                    </Media>
                    <Media body className="pl-2 my-auto">
                      <Media className="mb-0 text-muted">{author.name}</Media>
                    </Media>
                  </Media>
                </div>
                <div className="py-3 px-4 w-25 ml-auto border-left">
                  <span className="icon-chat"></span> 2
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
