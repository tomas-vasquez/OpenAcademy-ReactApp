import React from "react";
// import _ from "lodash";
import { connect } from "react-redux";

// core components
import Header from "views/components/Headers/Header";
import CardsFooter from "views/components/Footers/CardsFooter";
import { Container, Col, Row } from "reactstrap";

import CourseMap from "views/components/CourseMap";
import ErrorAllCourses from "views/components/errors/ErrorAllCourse";
import PHCourse from "views/components/Loaders/PHCourse";

import CourseVideo from "views/pages/CourseVideo";
import CourseTest from "views/pages/CourseTest";

import Controller_Academy from "fetchers/Academy";
import { getCurrentItem, loadUserData, loadItems } from "helpers/academyUtils";
import ItemDescription from "views/pages/AllCourses/ItemDescription";
import NavbarCourse from "views/components/Navbars/NavbarCourse";

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
    let { currentItem, itemIndex } = getCurrentItem(this.state.items);
    return (
      <>
        <div className="site-wrap">
          {this.state.error === null ? (
            currentItem ? (
              <>
                <Container fluid>
                  <Row>
                    <Col lg="9" className="p-0 border-right">
                      <NavbarCourse />

                      {currentItem.item_type === "video" ? (
                        <CourseVideo
                          items={this.state.items}
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

                      <CardsFooter />
                    </Col>

                    <Col
                      lg="3"
                      className="p-0 d-none d-lg-block h-100"
                      style={{
                        overflowY: "scroll",
                        top: 0,
                        right: 0,
                        position: "fixed",
                        marginLeft: "auto",
                      }}
                    >
                      <CourseMap
                        items={this.state.items.sort(
                          (a, b) => a.item_sort - b.item_sort
                        )}
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
