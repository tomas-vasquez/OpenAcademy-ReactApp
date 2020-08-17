import React from "react";

// reactstrap components
import { Row, Col, Container } from "reactstrap";

// import CardAvatar from "components/CardAvatar";
import Header from "components/Headers/Header";

import AuthorData from "./AuthorData";
import Certificates from "./Certificates";
import Controller_Profile from "_controllers/Profile";
import PHUserProfile from "components/Loaders/PHUserProfile";
import ErrorUserProfile from "components/errors/ErrorUserProfile";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      error: null,
    };
    this.profile = new Controller_Profile();
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    let userName = this.props.match.params.user_name;

    this.profile.getProfile(userName, (response, error) => {
      this.setState({
        userData: response ? response.user_data : null,
        error: error,
      });
    });
  };

  reinit = () => {
    this.setState({ userData: null, error: null });
    setTimeout(() => {
      this.init();
    }, 2000);
  };

  render() {
    let userData = this.state.userData;

    return this.state.userData !== null ? (
      <>
        <Header title={userData.name} subTitle={"@" + userData.user_name} />
        <Container className="mt-5">
          <Row
            style={{
              marginTop: -150,
            }}
          >
            <Col xs="12" lg="8" className="order-lg-2">
              <AuthorData userData={userData} />
            </Col>
            <Col xs="12" lg="4" className="order-lg-1">
              <Certificates />
            </Col>
          </Row>
        </Container>
      </>
    ) : this.state.error !== null ? (
      <ErrorUserProfile error={this.state.error} reinit={this.reinit} />
    ) : (
      <>
        <Header title={"cargando..."} subTitle="por favor espere..." />
        <PHUserProfile />
      </>
    );
  }
}

export default UserProfile;
