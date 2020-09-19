import React from "react";
import { Container, Row, Col } from "reactstrap";
import PHItemDescription from "./PHItemDescription";

class PHCourse extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: -100 }}>
        <Row>
          <Col lg="9" className="mb-5 pl-lg-4">
            <div className="ph-item p-0 mb-3">
              <div className="ph-col-12 p-0">
                <div className="ph-picture" />
                <div className="ph-row px-3">
                  <div className="ph-col-4" />
                  <div className="ph-col-8 empty" />
                  <div className="ph-col-12" />
                </div>
              </div>
            </div>
            <PHItemDescription />
          </Col>
          <Col lg="3" className="p-0">
            <div className="ph-item p-0 mb-3">
              <div className="ph-col-12 p-0">
                <div className="ph-picture" />
                <div className="ph-row px-3">
                  <div className="ph-col-4" />
                  <div className="ph-col-8 empty" />
                  <div className="ph-col-12" />
                </div>
              </div>

              <div className="ph-col-2">
                <div className="ph-avatar" />
              </div>

              <div>
                <div className="ph-row">
                  <div className="ph-col-12" />
                  <div className="ph-col-2" />
                  <div className="ph-col-10 empty" />
                  <div className="ph-col-8 big" />
                  <div className="ph-col-4 big empty" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default PHCourse;
