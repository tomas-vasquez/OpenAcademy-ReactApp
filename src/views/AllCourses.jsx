import React from "react";

import { connect } from "react-redux";

import CourseSlider from "components/CourseSlider";
import Controller_Academy from "_controllers/Academy";
import { Container, Row, Col } from "reactstrap";
import CardCourse from "components/CardCourse";

class AllCourse extends React.Component {
  constructor() {
    super();
    this.academy = new Controller_Academy();
  }

  componentDidMount() {
    if (this.props.academy.courses[0] === undefined) {
      this.academy.loadCourses(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
    var courses = this.props.academy.courses;

    if (courses[0] !== undefined) {
      return (
        <>
          <CourseSlider courses={courses} />
          <Container fluid>
            <Row>
              {courses.map((_course, key) => (
                <Col key={key} xs="12" sm="6" md="6" lg="3">
                  <CardCourse
                    course={_course}
                    author={this.props.academy.authors.find((author) => {
                      return author.user_id === _course.course_author_id;
                    })}
                  />
                </Col>
              ))}
              {/* {this.renderCourses(courses[0])} */}
            </Row>
          </Container>
        </>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(AllCourse);
