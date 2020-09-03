import React from "react";
import _ from "lodash";

import { connect } from "react-redux";
// core components
import Navbar from "components/Navbars/Navbar";
import CardsFooter from "components/Footers/CardsFooter";

import CardAuthor from "components/CardAuthor";
import Controller_Academy from "_controllers/Academy";
import DB from "helpers/db";
import Controller_Profile from "_controllers/Profile";
import CourseMap from "components/Course/CourseMap";
import Header from "components/Headers/Header";
// import Comments from "components/Course/comments";
import ErrorAllCourses from "components/errors/ErrorAllCourse";
import { Container, Col, Row } from "reactstrap";

import PHCourse from "components/Loaders/PHCourse";
import CourseVideo from "views/CourseVideo";
import ItemsJumperButtons from "components/Course/ItemsJumperButtons";
import CourseTest from "views/CouseTest";

class Landing extends React.Component {
  ////
  constructor(props) {
    super(props);
    let courseInUrl = document.baseURI.split("/")[3];

    this.academy = new Controller_Academy();
    this.db = new DB();
    this.profile = new Controller_Profile();

    this.state = {
      courses: props.academy.courses,
      authors: props.academy.authors,
      items: props.academy.items[courseInUrl],
      error: null,
    };
  }

  loadData = () => {
    let courseInUrl = document.baseURI.split("/")[3];

    let loadItems = () => {
      if (!this.props.academy.items[courseInUrl]) {
        this.academy.loadItems(courseInUrl, (response, error) => {
          // console.log(response);
          if (response.items) {
            this.setState({ items: response.items, error: error });
          } else {
            this.setState({ error: error });
          }
        });
      } else {
        this.setState({ items: this.props.academy.items[courseInUrl] });
      }
    };

    if (!this.state.courses) {
      this.academy.loadCourses((response, error) => {
        if (error === null) {
          this.setState({
            courses: response.courses,
            authors: response.authors,
            error: error,
          });
          loadItems();
        } else {
          this.setState({
            error: error,
          });
        }
      });
    } else {
      loadItems();
    }
  };

  reloadData = () => {
    this.setState({
      courses: this.props.academy.courses,
      authors: this.props.academy.authors,
      items: undefined,
      error: null,
    });

    this.loadData();
  };

  loadUserData() {
    if (this.props.userData === null) {
      if (this.db.get("api-token")) {
        this.profile.getUserData(() => {
          this.forceUpdate();
        });
      }
    }
  }

  componentDidMount() {
    this.loadData();
    this.loadUserData();
  }

  componentDidUpdate() {
    this.loadUserData();
  }

  getCurrentTitle = () => {
    let courseInUrl = document.baseURI.split("/")[3];
    let item_title = document.baseURI.split("/")[4];
    let classes = this.sortItems(this.state.items).filter(
      (item) => item.item_type !== "separator"
    );

    let targetItem = null;

    if (item_title !== undefined) {
      targetItem = item_title;
      this.db.set("lastItem>" + courseInUrl, item_title);
    } else {
      let indb = this.db.get("lastItem>" + courseInUrl);
      if (indb === undefined) {
        targetItem = classes[0].item_title;
        this.db.set("lastItem>" + courseInUrl, targetItem);
      } else {
        targetItem = indb;
      }
    }
    let aux = classes.find((item) => {
      return item.item_title === targetItem.replace(/_/g, " ");
    });
    if (aux === undefined) {
      this.db.set("lastItem>" + courseInUrl, classes[0].item_title);
      return classes[0].item_title;
    } else {
      return targetItem.replace(/_/g, " ");
    }
  };

  sortItems(array) {
    var aux = array;

    for (let y = 0; y <= array.length - 2; y++) {
      for (let i = 0; i <= array.length - 2; i++) {
        if (array[i].item_sort > array[i + 1].item_sort) {
          aux = array[i];
          array[i] = array[i + 1];
          array[i + 1] = aux;
        }
      }
    }
    return array;
  }

  render() {
    let courseInUrl = document.baseURI.split("/")[3];

    let course = null;
    if (this.state.courses) {
      course = this.state.courses.find((course) => {
        return course.course_short_link === courseInUrl;
      });
    }

    let classes = null;

    let nextItem = null;
    let currentItem = null;
    let proviusItem = null;
    let itemIndex = 0;
    let author = null;

    if (this.state.items && this.state.courses) {
      classes = this.sortItems(this.state.items).filter(
        (item) => item.item_type !== "separator"
      );

      //calculamos el currentItem y demás
      classes.forEach((item, key) => {
        if (item.item_title === this.getCurrentTitle()) {
          proviusItem = classes[key - 1];
          currentItem = item;
          nextItem = classes[key + 1];
          itemIndex = key + 1;
        }

        author = this.state.authors.find((author) => {
          return author._id === item.item_author_id;
        });
      });
    }

    return (
      <>
        <div className="site-wrap">
          <Navbar />
          {this.state.error === null ? (
            this.state.items && currentItem ? (
              <>
                <Header
                  title={course.course_title}
                  subTitle={
                    _.upperFirst(currentItem.item_title) +
                    " (" +
                    itemIndex +
                    "/" +
                    this.state.items.filter(
                      (item) => item.item_type !== "separator"
                    ).length +
                    ")"
                  }
                />

                <Container style={{ marginTop: -100 }}>
                  <Row>
                    <Col lg="8" className="mb-5 pl-lg-4">
                      {currentItem.item_type === "video" ? (
                        <CourseVideo
                          currentItem={currentItem}
                          itemIndex={itemIndex}
                        />
                      ) : null}
                      {currentItem.item_type === "test" ? (
                        <CourseTest
                          currentItem={currentItem}
                          itemIndex={itemIndex}
                        />
                      ) : null}
                      <ItemsJumperButtons
                        course={course}
                        proviusItem={proviusItem}
                        nextItem={nextItem}
                      />
                      {/* {currentItem.item_type === "video" ? (
                        // <Comments
                        //   target_id={
                        //     "item-" + course._id + "-" + currentItem._id
                        //   }
                        // />
                      ) : null} */}
                    </Col>
                    <Col lg="4" className="">
                      {author ? <CardAuthor author={author} /> : null}
                      <CourseMap
                        items={this.state.items}
                        course_title={course ? course.course_short_link : ""}
                        currentItem={currentItem}
                      />
                    </Col>
                  </Row>
                </Container>
              </>
            ) : (
              <>
                <Header
                  title={"Cargando curso..."}
                  subTitle="espere por favor..."
                />
                <PHCourse />
              </>
            )
          ) : (
            <ErrorAllCourses error={this.state.error} reload={this.reload} />
          )}

          <CardsFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  academy: state.academy,
});

export default connect(mapStateToProps)(Landing);
