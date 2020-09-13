import React from "react";
import styled from "styled-components";

import { Container, Card, CardHeader, CardTitle } from "reactstrap";
import CardCourse from "views/components/CardCourse";
import PHCardCourse from "views/components/Loaders/PHCardCourse";

import Slider from "react-styled-carousel";

export default function MySlider({ courses, authors }) {
  return (
    <Container className="mt-0">
      <Card className="py-1px-0 mx-0 pb-3" style={{ marginTop: -100 }}>
        <CardHeader>
          <CardTitle tag="h5" className="m-0">
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
          showArrows={false}
          DotsWrapper={styled.div`
            text-align: center;
          `}
        >
          {courses !== null
            ? courses.map((_course, key) => (
                <div className="p-2 mt-3" key={"a-" + key}>
                  <CardCourse
                    course={_course}
                    author={authors.find((author) => {
                      return author._id === _course.course_author_id;
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
  );
}
