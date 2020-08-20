import React from "react";

import { connect } from "react-redux";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

class Certificates extends React.Component {
  render() {
    return (
      <>
        <Card className="shadow">
          <CardHeader>
            <CardTitle tag="h5" className="m-0">
              <i className="fa fa-medal mr-3" />
              Certificados
            </CardTitle>
          </CardHeader>
          <CardBody>Sin certificados que mostrar...</CardBody>
        </Card>

        <Card className="mt-4 shadow">
          <CardHeader>
            <CardTitle tag="h5" className="m-0">
              <i className="fa fa-book mr-3" />
              Cursos
            </CardTitle>
          </CardHeader>
          <CardBody>Sin certificados que mostrar...</CardBody>
        </Card>

        <Card className="mt-4 shadow">
          <CardHeader>
            <CardTitle tag="h5" className="m-0">
              <i className="fa fa-microphone mr-3" />
              Conferencias
            </CardTitle>
          </CardHeader>
          <CardBody>Sin certificados que mostrar...</CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(Certificates);
