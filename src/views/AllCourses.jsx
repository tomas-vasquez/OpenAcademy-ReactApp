import React from "react";

import { connect } from "react-redux";

import Controller_Academy from "_controllers/Academy";
import { Container, Row, Col, Card, CardHeader, CardTitle } from "reactstrap";
import CardCourse from "components/CardCourse";
import Header from "components/Headers/Header";
import PHCardCourse from "components/Loaders/PHCardCourse";

import Slider from "react-styled-carousel";
import ErrorAllCourses from "components/errors/ErrorAllCourse";

class AllCourse extends React.Component {
  constructor(props) {
    super();
    this.academy = new Controller_Academy();
    this.state = {
      courses: props.academy.courses,
      authors: props.academy.authors,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (this.props.academy.courses === null) {
      this.academy.loadCourses((response, error) => {
        this.setState({
          courses: response ? response.courses : null,
          authors: response ? response.authors : null,
          error: error,
        });
      });
    } else {
      this.setState({
        courses: this.props.academy.courses,
        authors: this.props.academy.authors,
      });
    }
  };

  reload = () => {
    this.setState({ courses: null, authors: null, error: null });
    this.loadData();
  };

  render() {
    // eslint-disable-next-line react/prop-types
    var courses = this.state.courses;
    var authors = this.state.authors;

    return !this.state.error ? (
      <>
        {courses === null ? (
          <Header title="Cargando..." subTitle="espere por favor..." />
        ) : (
          <Header
            title="Todos los cursos"
            subTitle={"Son " + courses.length + " cursos en total"}
          />
        )}
        <Container className="mt-0">
          <Card className="py-1px-0 mx-0 pb-3" style={{ marginTop: -100 }}>
            <CardHeader>
              <CardTitle tag="h2">
                Cursos más vistos...
                <i className="fa fa-fire text-danger mr-1" />
                <i className="fa fa-fire text-danger mr-1" />
                <i className="fa fa-fire text-danger mr-1" />
              </CardTitle>
            </CardHeader>
            <Slider
              autoSlide={3000}
              pauseOnMouseHover
              responsive={[
                { breakPoint: 1280, cardsToShow: 4 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
                { breakPoint: 760, cardsToShow: 3 },
                { breakPoint: 0, cardsToShow: 1 },
              ]}
              // DotsWrapper={styled.div`
              //   text-align: center;
              // `}
            >
              {courses !== null
                ? courses.map((_course, key) => (
                    <div className="p-2 mt-3" key={"a-" + key}>
                      <CardCourse
                        course={_course}
                        author={authors.find((author) => {
                          return author.user_id === _course.course_author_id;
                        })}
                      />
                    </div>
                  ))
                : ["", "", "", ""].map((value, key) => (
                    <div key={"b-" + key} className="p-2 mt-3">
                      <PHCardCourse />
                    </div>
                  ))}
            </Slider>
          </Card>
        </Container>

        <Container className="mt-5">
          <h2 className="mb-5">
            Todos los cursos...
            <i className="fa fa-book text-primary mr-1" />
            <i className="fa fa-book text-primary mr-1" />
            <i className="fa fa-book text-primary mr-1" />
          </h2>
          <Row>
            {courses !== null
              ? courses.map((_course, key) => (
                  <Col key={key} xs="12" sm="6" md="6" lg="3">
                    <CardCourse
                      course={_course}
                      author={this.state.authors.find((author) => {
                        return author.user_id === _course.course_author_id;
                      })}
                    />
                  </Col>
                ))
              : ["", "", "", ""].map((value, key) => (
                  <Col key={key} xs="12" sm="6" md="6" lg="3">
                    <PHCardCourse />
                  </Col>
                ))}
          </Row>
        </Container>
      </>
    ) : (
      <ErrorAllCourses error={this.state.error} reload={this.reload} />
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(AllCourse);
