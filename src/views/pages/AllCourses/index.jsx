import React from "react";
import { connect } from "react-redux";
import Controller_Academy from "fetchers/Academy";

import Header from "views/components/Headers/Header";
import ErrorAllCourses from "views/components/errors/ErrorAllCourse";
import MySlider from "./Slider";
import AllCourses from "./AllCourses";

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
        <MySlider courses={courses} authors={authors} />
        <AllCourses courses={courses} authors={authors} />
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
