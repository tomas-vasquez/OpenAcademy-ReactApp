import React from "react";
import _ from "lodash";

import { connect } from "react-redux";
// core components
import Navbar from "components/Navbars/Navbar";
import CardsFooter from "components/Footers/CardsFooter";

import CardAuthor from "components/CardAuthor";
import Controller_Academy from "_controllers/Academy";
import DB from "helpers/db";
import Controller_Admin from "_controllers";
import CourseMap from "components/Course/CourseMap";
import Header from "components/Headers/Header";
import Comments from "components/Course/comments";
import ErrorAllCourses from "components/errors/ErrorAllCourse";
import { Container, Col, Row } from "reactstrap";

import PHCourse from "components/Loaders/PHCourse";
import CourseVideo from "views/CourseVideo";
import ItemsJumperButtons from "components/Course/ItemsJumperButtons";

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

  loadData = () => {
    let courseInUrl = document.baseURI.split("/")[3];

    let loadItems = () => {
      if (this.props.academy.items[courseInUrl] === undefined) {
        this.academy.loadItems(courseInUrl, (response, error) => {
          this.setState({ items: response.items, error: error });
        });
      } else {
        this.setState({ items: this.props.academy.items[courseInUrl] });
      }
    };

    if (this.state.courses === null) {
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
        this.controlleradmin.initApp(this, () => this.forceUpdate());
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
    let aux = this.state.items.find((item) => {
      return item.item_title === targetItem.replace(/_/g, " ");
    });
    if (aux === undefined) {
      this.db.set("lastItem>" + courseInUrl, this.state.items[0].item_title);
      return this.state.items[0].item_title;
    } else {
      return targetItem.replace(/_/g, " ");
    }
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
      //calculamos el currentItem y demás
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

    return (
      <>
        <div className="site-wrap">
          <Navbar />
          {this.state.error === null ? (
            this.state.items !== undefined && currentItem !== null ? (
              <>
                <Header
                  title={course.course_title}
                  subTitle={
                    _.upperFirst(currentItem.item_title) +
                    " (" +
                    itemIndex +
                    "/" +
                    this.state.items.length +
                    ")"
                  }
                />

                <Container style={{ marginTop: -100 }}>
                  <Row>
                    <Col lg="8" className="mb-5 pl-lg-4">
                      <CourseVideo
                        currentItem={currentItem}
                        itemIndex={itemIndex}
                      />
                      <ItemsJumperButtons
                        course={course}
                        proviusItem={proviusItem}
                        nextItem={nextItem}
                      />
                      <Comments
                        target_id={"item-" + course.id + "-" + currentItem.id}
                      />
                    </Col>
                    <Col lg="4" className="">
                      <CourseMap
                        items={this.state.items}
                        course_title={course ? course.course_short_link : ""}
                        currentItem={currentItem}
                      />
                      <CardAuthor author={author} />
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
