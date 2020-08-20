import React from "react";

// reactstrap components
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";

import Error500 from "./Error500";
import ErrorConection from "./ErrorConection";
import Header from "components/Headers/Header";

class ErrorUserProfile extends React.Component {
  render() {
    let error = this.props.error;

    if (error.response) {
      return error.response.status === 404 ? (
        <>
          <Header
            title="Ups!... Usuario no encontrado"
            subTitle='"error 404 - contenido no encontrado"'
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
                      src={require("assets/img/undraw_page_not_found_su7k.png")}
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
                        <p>
                          Nuestra base de datos se encuentra en mantenimiento
                        </p>
                      </li>
                    </ul>
                    <div className="d-flex">
                      <Button color="primary" className="mx-auto mt-3" o>
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
      ) : error.response.status === 500 ? (
        <Error500 reload={this.props.reload} />
      ) : null;
    } else {
      return <ErrorConection reload={this.props.reload} />;
    }
  }
}

export default ErrorUserProfile;
