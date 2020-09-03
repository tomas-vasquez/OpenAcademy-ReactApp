import React from "react";

// reactstrap components
import { Row, Col, Container } from "reactstrap";

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
      profile: null,
      error: null,
    };
    this.profile = new Controller_Profile();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (this.props.match !== undefined) {
      let userName = this.props.match.params.user_name;

      this.profile.getProfile(userName, (response, error) => {
        this.setState({
          profile: response ? response.user_data : null,
          error: error,
        });
      });
    } else {
      this.setState({
        error: {},
      });
    }
  };

  reloadData = () => {
    this.setState({ profile: null, error: null });
    this.loadData();
  };

  render() {
    let profile = this.state.profile;

    return profile ? (
      <>
        <Header
          title={profile.name ? profile.name : `@${profile.user_name}`}
          subTitle={profile.name ? `@${profile.user_name}` : profile.email}
        />
        <Container className="mt-5">
          <Row
            style={{
              marginTop: -150,
            }}
          >
            <Col xs="12" lg="8" className="order-lg-2">
              <AuthorData profile={profile} />
            </Col>
            <Col xs="12" lg="4" className="order-lg-1">
              {/* <Certificates /> */}
            </Col>
          </Row>
        </Container>
      </>
    ) : this.state.error !== null ? (
      <ErrorUserProfile error={this.state.error} reload={this.reload} />
    ) : (
      <>
        <Header title={"cargando..."} subTitle="por favor espere..." />
        <PHUserProfile />
      </>
    );
  }
}

export default UserProfile;
