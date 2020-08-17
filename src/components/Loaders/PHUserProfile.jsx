import React from "react";
import { Container, Row, Col } from "reactstrap";

class PHUserProfile extends React.Component {
  render() {
    return (
      <>
        <Container className="mt-5">
          <Row className="mt-neg">
            <Col md="4">
              <div className="ph-item">
                <div className="ph-col-12">
                  <div className="ph-picture"></div>
                  <div className="ph-row">
                    <div className="ph-col-4"></div>
                    <div className="ph-col-8 empty"></div>
                    <div className="ph-col-12"></div>
                  </div>
                </div>
                <div className="ph-col-2">
                  <div className="ph-avatar"></div>
                </div>
                <div>
                  <div className="ph-row">
                    <div className="ph-col-12"></div>
                    <div className="ph-col-2"></div>
                    <div className="ph-col-10 empty"></div>
                    <div className="ph-col-8 big"></div>
                    <div className="ph-col-4 big empty"></div>
                  </div>
                </div>
              </div>
              <div className="ph-item">
                <div className="ph-col-12">
                  <div className="ph-picture"></div>
                  <div className="ph-row">
                    <div className="ph-col-4"></div>
                    <div className="ph-col-8 empty"></div>
                    <div className="ph-col-12"></div>
                  </div>
                </div>
                <div className="ph-col-2">
                  <div className="ph-avatar"></div>
                </div>
                <div>
                  <div className="ph-row">
                    <div className="ph-col-12"></div>
                    <div className="ph-col-2"></div>
                    <div className="ph-col-10 empty"></div>
                    <div className="ph-col-8 big"></div>
                    <div className="ph-col-4 big empty"></div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md="8">
              <div className="ph-item">
                <div className="ph-col-8">
                  <div className="ph-col-12">
                    {/* <div className="ph-picture"></div> */}
                    <div className="ph-row">
                      <div className="ph-col-10 big"></div>
                      <div className="ph-col-2 empty big"></div>
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                    </div>
                    <div className="ph-item border-0 p-0 m-0">
                      <div className="ph-col-2">
                        <div className="ph-avatar"></div>
                      </div>
                      <div className="ph-col-2">
                        <div className="ph-avatar"></div>
                      </div>
                      <div className="ph-col-2">
                        <div className="ph-avatar"></div>
                      </div>
                      <div className="ph-col-2">
                        <div className="ph-avatar"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ph-col-4 d-flex">
                  <div className="ph-avatar m-auto " style={{width:180}}></div>
                </div>
              </div>

              <div className="ph-item">
                <div className="ph-col-12">
                  <div className="ph-col-12">
                    {/* <div className="ph-picture"></div> */}
                    <div className="ph-row">
                      <div className="ph-col-10 big"></div>
                      <div className="ph-col-2 empty big"></div>
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-10 big"></div>
                      <div className="ph-col-2 empty big"></div>
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* <div className="ph-item">
          <div className="ph-col-12">
            <div className="ph-picture"></div>
            <div className="ph-row">
              <div className="ph-col-6 big"></div>
              <div className="ph-col-4 empty big"></div>
              <div className="ph-col-2 big"></div>
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-12"></div>
            </div>
          </div>
        </div>

        <h2 className="h4">Placeholder in a external twitter bootstrap grid</h2>

        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-row">
                  <div className="ph-col-4"></div>
                  <div className="ph-col-8 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>

              <div>
                <div className="ph-row">
                  <div className="ph-col-12"></div>
                  <div className="ph-col-2"></div>
                  <div className="ph-col-10 empty"></div>
                  <div className="ph-col-8 big"></div>
                  <div className="ph-col-4 big empty"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-row">
                  <div className="ph-col-4"></div>
                  <div className="ph-col-8 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              <div className="ph-col-2">
                <div className="ph-avatar"></div>
              </div>
              <div>
                <div className="ph-row">
                  <div className="ph-col-12"></div>
                  <div className="ph-col-2"></div>
                  <div className="ph-col-10 empty"></div>
                  <div className="ph-col-8 big"></div>
                  <div className="ph-col-4 big empty"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="h4">Other placeholder examples</h2>

        <div className="ph-item">
          <div className="ph-col-12">
            <div className="ph-picture"></div>
          </div>

          <div className="ph-col-2">
            <div className="ph-avatar"></div>
          </div>

          <div>
            <div className="ph-row">
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-2"></div>
              <div className="ph-col-10 empty"></div>
            </div>
          </div>

          <div className="ph-col-12">
            <div className="ph-row">
              <div className="ph-col-10 big"></div>
              <div className="ph-col-2 empty big"></div>
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-12"></div>
            </div>
          </div>
        </div>

        <div className="ph-item">
          <div className="ph-col-2">
            <div className="ph-avatar"></div>
          </div>

          <div>
            <div className="ph-row">
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-2"></div>
              <div className="ph-col-10 empty"></div>
            </div>
          </div>

          <div className="ph-col-12">
            <div className="ph-picture"></div>
            <div className="ph-row">
              <div className="ph-col-10 big"></div>
              <div className="ph-col-2 empty big"></div>
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-12"></div>
            </div>
          </div>

          <div className="ph-col-4">
            <div className="ph-picture"></div>
          </div>

          <div>
            <div className="ph-row">
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-2"></div>
              <div className="ph-col-10 empty"></div>
              <div className="ph-col-8"></div>
              <div className="ph-col-4 empty"></div>
              <div className="ph-col-12"></div>
            </div>
          </div>
        </div>

        <div className="ph-item">
          <div className="ph-col-2">
            <div className="ph-avatar"></div>
          </div>

          <div>
            <div className="ph-row">
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-2"></div>
              <div className="ph-col-10 empty"></div>
            </div>
          </div>

          <div className="ph-col-12">
            <div className="ph-picture"></div>
            <div className="ph-row">
              <div className="ph-col-10 big"></div>
              <div className="ph-col-2 empty big"></div>
              <div className="ph-col-4"></div>
              <div className="ph-col-8 empty"></div>
              <div className="ph-col-6"></div>
              <div className="ph-col-6 empty"></div>
              <div className="ph-col-12"></div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default PHUserProfile;
