import React from "react";
import { Row, Col } from "reactstrap";

class PHCardCourse extends React.Component {
  render() {
    return (
      <div className="comments-container">
        <ul id="comments-list" className="comments-list">
          {["4", "8", "2", "6"].map((value, key) => (
            <li key={key} className="mt-4">
              <div className="comment-main-level">
                <Row>
                  <Col xs="auto" className={key === 3 ? "bg-white" : null}>
                    {/* <!-- Avatar --> */}
                    <div
                      className="comment-avatar shadow-0 mr-3"
                      style={{ boxShadow: "unset" }}
                    >
                      <div className="ph-item">
                        <div className="ph-avatar" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="comment-box mt-2">
                      <div className="comment-head">
                        <div className="ph-item border-0">
                          <div className="ph-col-12">
                            <div className="ph-row">
                              <div className={"ph-col-" + value + " big m-0"} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comment-content">
                        <div className="ph-item border-0">
                          <div className="ph-col-12">
                            <div className="ph-row">
                              <div className="ph-col-10 " />
                              <div className="ph-col-2 empty" />
                              <div className="ph-col-10 " />
                              <div className="ph-col-2 empty" />
                              <div className="ph-col-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </li>
          ))}
        </ul>
      </div>

      // <div className="ph-item p-0 mb-3">
      //   <div className="ph-col-12 p-0">
      //     <div className="ph-picture" />
      //     <div className="ph-row px-3">
      //       <div className="ph-col-4" />
      //       <div className="ph-col-8 empty" />
      //       <div className="ph-col-12" />
      //     </div>
      //   </div>

      //   <div className="ph-col-2">
      //     <div className="ph-avatar" />
      //   </div>

      //   <div>
      //     <div className="ph-row">
      //       <div className="ph-col-12" />
      //       <div className="ph-col-2" />
      //       <div className="ph-col-10 empty" />
      //       <div className="ph-col-8 big" />
      //       <div className="ph-col-4 big empty" />
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default PHCardCourse;
