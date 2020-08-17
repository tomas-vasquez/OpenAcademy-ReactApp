import React from "react";

// reactstrap components
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";

import Header from "components/Headers/Header";

class Error500 extends React.Component {
  render() {
    return (
      <>
        <Header
          title="Ups!... no podemos conectarnos"
          subTitle='"ERR_CONECTION_REFUSED - error de conexión"'
        />
        <Container>
          <Card
            style={{
              marginTop: -100,
            }}
          >
            <CardBody>
              <Row className="d-flex">
                <Col xs="12" lg="6" className="order-lg-1">
                  <img
                    className="img-fluid"
                    src={require("assets/img/undraw_server_down_s4lk.png")}
                    alt="undraw 404"
                  />
                </Col>
                <Col xs="12" lg="6" className="order-lg-2 m-lg-auto">
                  <h2>Posibles soluciones:</h2>
                  <ul>
                    <li>
                      <p>Comprobar los cables de red, el módem y el router.</p>
                    </li>
                    <li>
                      <p>Volver a conectarte a una red Wi-Fi.</p>
                    </li>
                    <li>
                      <p>Volver a intentar conectarte en unos minutos.</p>
                    </li>
                  </ul>
                  <div className="d-flex">
                    <Button
                      color="primary"
                      className="mx-auto mt-3"
                      onClick={this.props.reinit}
                    >
                      <i className="fa fa-redo mr-2" />
                      Reintentar
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Error500;
