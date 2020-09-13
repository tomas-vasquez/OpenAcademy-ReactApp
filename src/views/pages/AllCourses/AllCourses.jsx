import React from "react";
import { Container, Row, Col } from "reactstrap";
import CardCourse from "views/components/CardCourse";
import PHCardCourse from "views/components/Loaders/PHCardCourse";

export default function AllCourses({ courses, authors }) {
  return (
    <Container className="mt-5">
      <h5 className="mb-4">
        Todos los cursos...
        <i className="fa fa-book text-primary mr-1" />
        <i className="fa fa-book text-primary mr-1" />
        <i className="fa fa-book text-primary mr-1" />
      </h5>
      <Row>
        {courses !== null
          ? courses.map((_course, key) => (
              <Col key={key} xs="12" sm="6" md="6" lg="3">
                <CardCourse
                  course={_course}
                  author={authors.find((author) => {
                    return author._id === _course.course_author_id;
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
  );
}
