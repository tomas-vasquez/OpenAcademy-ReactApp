import React from "react";

import {
  Carousel,
  CarouselItem,
} from "reactstrap";

class CourseSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      animating: false,
    };
  }

  next = () => {
    let courses = this.props.courses;
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === courses.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  provius = () => {
    let courses = this.props.courses;
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? courses.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  gotoIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  slides = () => {
    return this.props.courses.map(() => (
      <CarouselItem>
        
        
      </CarouselItem>
    ));
  };

  render() {
    return (
      <>
        <div className="site-section courses-title" id="courses-section">
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div
                className="col-lg-7 text-center"
                data-aos="fade-up"
                data-aos-delay=""
              >
                <h2 className="section-title">Courses</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className="site-section courses-entry-wrap"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="container">
            <div className="row">
              <div className="col-12 nonloop-block-14">
                {this.props.courses ? (
                  <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    provius={this.provius}
                    rows={2}
                  >
                    {this.slides()}
                  </Carousel>
                ) : null}
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-7 text-center">
                <button
                  className="customPrevBtn btn btn-primary m-1"
                  onClick={this.provius}
                >
                  Anterior
                </button>
                <button
                  className="customNextBtn btn btn-primary m-1"
                  onClick={this.next}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CourseSlider;
