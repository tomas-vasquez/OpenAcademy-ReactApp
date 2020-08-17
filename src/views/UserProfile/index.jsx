import React from "react";

// reactstrap components
import { Row, Col, Container } from "reactstrap";

// import CardAvatar from "components/CardAvatar";
import Header from "components/Headers/Header";

import AuthorData from "./AuthorData";
import Certificates from "./Certificates";
import Controller_Profile from "_controllers/Profile";
import PHUserProfile from "components/Loaders/PHUserProfile";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isBenLoadData: false,
    };
    this.profile = new Controller_Profile();
  }

  componentDidMount() {
    let userName = this.props.match.params.user_name;

    this.profile.getProfile(userName, (response) => {
      this.setState({
        userData: response.user_data,
        isBenLoadData: true,
      });
    });
  }

  render() {
    let userData = this.state.userData;

    return (
      <>
        {this.state.isBenLoadData ? (
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
        ) : (
          <>
            <Header title={"cargando..."} />
            <PHUserProfile />
          </>
        )}
      </>
    );
  }
}

export default UserProfile;
