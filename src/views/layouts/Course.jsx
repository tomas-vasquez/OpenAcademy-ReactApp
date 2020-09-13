import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

// core components
import Header from "views/components/Headers/Header";
import Navbar from "views/components/Navbars/Navbar";
import CardsFooter from "views/components/Footers/CardsFooter";
import { Container, Col, Row } from "reactstrap";

import CardAuthor from "views/components/CardAuthor";
import CourseMap from "views/components/CourseMap";
// import Comments from "views/components/comments";
import ErrorAllCourses from "views/components/errors/ErrorAllCourse";
import ItemsJumperButtons from "views/components/ItemsJumperButtons";
import PHCourse from "views/components/Loaders/PHCourse";

import CourseVideo from "views/pages/CourseVideo";
import CourseTest from "views/pages/CourseTest";

import Controller_Academy from "fetchers/Academy";
import { getCurrentItem, loadUserData, loadItems } from "helpers/academyUtils";
import CourseDescription from "views/pages/AllCourses/CourseDescription";

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

                {currentItem.item_type === "video" ? (
                  <CourseVideo
                    currentItem={currentItem}
                    itemIndex={itemIndex}
                  />
                ) : null}

                <Container>
                  <Row>
                    <Col lg="8" className="mb-5 pl-lg-4">
                      {currentItem.item_type === "test" ? (
                        <CourseTest
                          currentItem={currentItem}
                          itemIndex={itemIndex}
                        />
                      ) : null}

                      <CourseDescription
                        itemIndex={itemIndex}
                        currentItem={currentItem}
                      />
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
