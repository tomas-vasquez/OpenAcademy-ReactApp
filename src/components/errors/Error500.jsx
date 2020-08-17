import React from "react";

// reactstrap components
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";

import Header from "components/Headers/Header";

class Error500 extends React.Component {
  render() {
    return (
      <>
        <Header
          title="Ups!... ocurrió un error en nuestro servidor"
          subTitle='"error 500 - error en el servidor"'
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
                <Col xs="12" lg="6" className="order-lg-2 mx-lg-auto">
                  <h2>Posibles causas:</h2>
                  <ul>
                    <li>
                      <p>
                        La dirección o enlace del perfil que busca está mal
                        escrito
                      </p>
                    </li>
                    <li>
                      <p>El usuario nunca fue registro en nuestro sistema.</p>
                    </li>
                    <li>
                      <p>El usuario que busca eliminó su cuenta</p>
                    </li>
                    <li>
                      <p>Nuestra base de datos se encuentra en mantenimiento</p>
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
