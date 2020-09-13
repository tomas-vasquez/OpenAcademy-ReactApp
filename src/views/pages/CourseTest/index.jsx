import React from "react";

import { connect } from "react-redux";

import { Card, CardBody } from "reactstrap";
import PHCourseDescription from "views/components/Loaders/PHCourseDescription";
import Controller_Academy from "fetchers/Academy";
import Test from "./Test";

class CourseTest extends React.Component {
  constructor() {
    super();
    this.state = { treeTest: null };
    this.academy = new Controller_Academy();
  }

  loadData = () => {
    if (!this.props.academy.tests[this.props.currentItem.item_content_url]) {
      this.academy.loadTest(
        this.props.currentItem.item_content_url,
        (response, error) => {
          this.setState({
            treeTest: response,
            error: error,
          });
        }
      );
    } else {
      this.setState({
        treeTest: this.props.academy.tests[
          this.props.currentItem.item_content_url
        ],
      });
    }
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <>
        <Card className="mb-4 shadow">
          {this.state.treeTest ? (
            <>
              <Test
                tree={{
                  ...this.props.currentItem,
                  ...this.state.treeTest,
                }}
              />
            </>
          ) : (
            <CardBody>
              <PHCourseDescription />
            </CardBody>
          )}
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(CourseTest);
