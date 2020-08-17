import React from "react";

import { connect } from "react-redux";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

import HeaderCourse from "components/Headers/HeaderCourse.jsx";
import CardAuthor from "components/CardAuthor";
import CourseDescription from "components/CourseDescription";
import Comments from "components/Course/Comments";

import Controller_Academy from "_controllers/Academy";
import DB from "helpers/db";
import Controller_admin from "_controllers";
import Controller_AutoRefresh from "_controllers/AutoRefresh";
import CourseMap from "components/Course/CourseMap";

class Landing extends React.Component {
  nextItem = null;
  currentItem = null;
  proviusItem = null;
  itemIndex = 0;

  ////
  constructor(props) {
    super(props);
    this.academy = new Controller_Academy();
    this.db = new DB();
    this.controlleradmin = new Controller_admin();
    this.autoRefresher = new Controller_AutoRefresh();
  }

  componentDidMount() {
    let course_title = document.baseURI.split("/")[3];
    // //cargamos los datos principales
    if (!this.props.isBeenLoadedMainData) {
      // console.log("hola");
      this.controlleradmin.initApp(this);
    }

    if (this.props.academy.courses[0] === undefined) {
      this.academy.loadCourses(() => {
        if (this.props.academy.items[course_title] === undefined) {
          this.academy.loadItems(course_title, () => {
            this.forceUpdate();
            this.autoRefresher.updateSubscribers();
          });
        }
      });
    } else {
      if (this.props.academy.items[course_title] === undefined) {
        this.academy.loadItems(course_title, () => {
          this.forceUpdate();
          this.autoRefresher.updateSubscribers();
        });
      }
    }
  }

  getCurrent = (items) => {
    let course_title = document.baseURI.split("/")[3];
    let item_title = document.baseURI.split("/")[4];

    let targetItem = null;

    if (item_title !== undefined) {
      targetItem = item_title;
      this.db.set("lasvideo>" + course_title, item_title);
    } else {
      let indb = this.db.get("lasvideo>" + course_title);
      if (indb === undefined) {
        targetItem = items[0].item_title;
        this.db.set("lasvideo>" + course_title, targetItem);
      } else {
        targetItem = indb;
      }
    }
    return targetItem.replace(/_/g, " ");
  };

  render() {
    this.currentItem = null;
    let course = null;
    let course_title = document.baseURI.split("/")[3];
    let items = this.props.academy.items[course_title];
    let author = null;
    let description = "";
    //calculamos el currentItem
    if (items !== undefined && items !== null) {
      items.forEach((item, key) => {
        if (item.item_title === this.getCurrent(items)) {
          this.proviusItem = items[key - 1];
          this.currentItem = item;
          this.itemIndex = key + 1;
          this.nextItem = items[key + 1];
          author = this.props.academy.authors.find((author) => {
            return author.user_id === item.item_author_id;
          });
        }
      });

      course = this.props.academy.courses.find((course) => {
        return course.course_short_link === course_title;
      });

      description = this.props.academy.descriptions[
        this.currentItem.item_content_url
      ];
      if (description === undefined) {
        this.academy.loadDescription(this.currentItem.item_content_url, () => {
          this.forceUpdate();
        });
      }
    }
    return (
      <>
        <div className="site-wrap">
          <DemoNavbar course={course} />
          <HeaderCourse course={course} />
          <div className="site-section pb-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 mb-5">
                  {this.currentItem !== null ? (
                    <>
                      <CourseDescription
                        course={course}
                        description={description}
                        itemIndex={this.itemIndex}
                        proviusItem={this.proviusItem}
                        currentItem={this.currentItem}
                        nextItem={this.nextItem}
                      />
                      {this.currentItem !== null ? (
                        <Comments
                          targetId={
                            "item-" + course.id + "-" + this.currentItem.id
                          }
                        />
                      ) : null}
                    </>
                  ) : null}
                </div>
                <div className="col-lg-3 p-0">
                  <CardAuthor author={author} />

                  <CourseMap
                    items={items}
                    course_title={course ? course.course_short_link : ""}
                    currentItem={this.currentItem}
                  />
                </div>
              </div>
            </div>
          </div>

          <CardsFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(Landing);
