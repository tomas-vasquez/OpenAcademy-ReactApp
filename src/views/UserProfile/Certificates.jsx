import React from "react";

import { connect } from "react-redux";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";

class Certificates extends React.Component {
  render() {

    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-1">
              <i className="fa fa-medal" /> Certificados 
            </CardTitle>
          </CardHeader>
          <CardBody>Sin certificados que mostrar...</CardBody>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle tag="h5" className="mb-1">
              <i className="fa fa-book" /> Cursos 
            </CardTitle>
          </CardHeader>
          <CardBody>Sin certificados que mostrar...</CardBody>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle tag="h5" className="mb-1">
              <i className="fa fa-microphone" /> Conferencias 
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
