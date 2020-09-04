import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

// core components
import Header from "components/Headers/Header";
import Navbar from "components/Navbars/Navbar";
import CardsFooter from "components/Footers/CardsFooter";
import { Container, Col, Row } from "reactstrap";

import CardAuthor from "components/CardAuthor";
import CourseMap from "components/Course/CourseMap";
// import Comments from "components/Course/comments";
import ErrorAllCourses from "components/errors/ErrorAllCourse";
import ItemsJumperButtons from "components/Course/ItemsJumperButtons";
import PHCourse from "components/Loaders/PHCourse";

import CourseVideo from "views/CourseVideo";
import CourseTest from "views/CourseTest";

import Controller_Academy from "_controllers/Academy";
import { getCurrentItem, loadUserData, loadItems } from "helpers/academyUtils";

class Landing extends React.Component {
  ////
  constructor(props) {
    super(props);
    let courseInUrl = document.baseURI.split("/")[3];
    this.academy = new Controller_Academy();

    this.state = {
      courses: props.academy.courses,
      authors: props.academy.authors,
      items: props.academy.items[courseInUrl],
      error: null,
    };
  }

  loadData = () => {
    if (!this.state.courses) {
      this.academy.loadCourses((response, error) => {
        if (error === null) {
          this.setState({
            courses: response.courses,
            authors: response.authors,
            error: error,
          });
          loadItems((error, items) => {
            this.setState({ error: error, items: items });
          });
        } else {
          this.setState({
            error: error,
          });
        }
      });
    } else {
      loadItems((error, items) => {
        this.setState({ error: error, items: items });
      });
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

  componentDidMount() {
    this.loadData();
    loadUserData(() => {
      this.forceUpdate();
    });
  }

  componentDidUpdate() {
    loadUserData(() => {
      this.forceUpdate();
    });
  }

  render() {
    let courseInUrl = document.baseURI.split("/")[3];

    let course = null;

    if (this.state.courses) {
      course = this.state.courses.find((course) => {
        return course.course_short_link === courseInUrl;
      });
    }

    let { proviusItem, currentItem, nextItem, itemIndex } = getCurrentItem(
      this.state.items
    );

    return (
      <>
        <div className="site-wrap">
          <Navbar />
          {this.state.error === null ? (
            currentItem ? (
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
                        proviusItem={proviusItem}
                        nextItem={nextItem}
                      />
                    </Col>
                    <Col lg="4" className="">
                      <CardAuthor currentItem={currentItem} />
                      <CourseMap
                        items={this.state.items}
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
