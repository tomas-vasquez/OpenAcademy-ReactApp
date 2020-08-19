import React from "react";

import { connect } from "react-redux";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

import CardAuthor from "components/CardAuthor";
import Controller_Academy from "_controllers/Academy";
import DB from "helpers/db";
import Controller_Admin from "_controllers";
import CourseMap from "components/Course/CourseMap";
import CourseVideo from "views/CourseVideo";
import Header from "components/Headers/Header";
import Comments from "components/Course/comments";
import ErrorAllCourses from "components/errors/ErrorAllCourse";

class Landing extends React.Component {
  ////
  constructor(props) {
    super(props);
    let courseInUrl = document.baseURI.split("/")[3];

    this.academy = new Controller_Academy();
    this.db = new DB();
    this.controlleradmin = new Controller_Admin();
    this.state = {
      courses: props.academy.courses,
      authors: props.academy.authors,
      items: props.academy.items[courseInUrl],
      error: null,
    };
  }

  componentDidMount() {
    let courseInUrl = document.baseURI.split("/")[3];

    if (this.state.courses === null) {
      this.academy.loadCourses((response, error) => {
        if (error === null) {
          this.setState({
            courses: response.courses,
            authors: response.authors,
            error: error,
          });
          if (this.state.items === undefined) {
            this.academy.loadItems(courseInUrl, (response, error) => {
              this.setState({ items: response.items, error: error });
            });
          }
        } else {
          this.setState({
            error: error,
          });
        }
      });
    }
  }

  getCurrentTitle = () => {
    let courseInUrl = document.baseURI.split("/")[3];
    let item_title = document.baseURI.split("/")[4];

    let targetItem = null;

    if (item_title !== undefined) {
      targetItem = item_title;
      this.db.set("lastItem>" + courseInUrl, item_title);
    } else {
      let indb = this.db.get("lastItem>" + courseInUrl);
      if (indb === undefined) {
        targetItem = this.state.items[0].item_title;
        this.db.set("lastItem>" + courseInUrl, targetItem);
      } else {
        targetItem = indb;
      }
    }
    return targetItem.replace(/_/g, " ");
  };

  render() {
    let courseInUrl = document.baseURI.split("/")[3];

    let course = null;
    if (this.state.courses !== null) {
      course = this.state.courses.find((course) => {
        return course.course_short_link === courseInUrl;
      });
    }

    let nextItem = null;
    let currentItem = null;
    let proviusItem = null;
    let itemIndex = 0;
    let author = null;

    if (this.state.items !== undefined && this.state.courses !== null) {
      //calculamos el currentItem
      this.state.items.forEach((item, key) => {
        if (item.item_title === this.getCurrentTitle()) {
          proviusItem = this.state.items[key - 1];
          currentItem = item;
          nextItem = this.state.items[key + 1];
          itemIndex = key + 1;
        }
        author = this.state.authors.find((author) => {
          return author.user_id === item.item_author_id;
        });
      });
    }

    if (this.state.error === null) {
      return (
        <>
          <div className="site-wrap">
            <DemoNavbar />
            {this.state.items === null || currentItem === null ? (
              <Header title="cargando..." />
            ) : (
              <>
                <Header title={currentItem.item_title} />
                <div className="site-section pb-4">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-9 mb-5">
                        <CourseVideo
                          currentItem={currentItem}
                          itemIndex={itemIndex}
                        />
                        <Comments
                          target_id={"item-" + course.id + "-" + currentItem.id}
                        />
                      </div>
                      <div className="col-lg-3 p-0">
                        <CardAuthor author={author} />
                        <CourseMap
                          items={this.state.items}
                          course_title={course ? course.course_short_link : ""}
                          currentItem={currentItem}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <CardsFooter />
          </div>
        </>
      );
    } else {
      return <ErrorAllCourses error={this.state.error} />;
    }
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(Landing);
