import React from "react";

import { connect } from "react-redux";

// reactstrap components
import {
  Row,
  Col,
  Container,
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Collapse,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
  InputGroup,
} from "reactstrap";

import { storageUrl } from "config";
import SocialButtons from "../../components/SocialButtons";
import { nameChangedHandler } from "helpers/input";
import Controller_Profile from "_controllers/Profile";
import OptionCountries from "./OptionCountries";

class AuthorData extends React.Component {
  constructor() {
    super();
    this.state = { editing: false };
    this.profile = new Controller_Profile();
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  handlePicPicker = (e) => {
    const file = e.target.files[0];
    this.profile.handle_pic_selected(file);
  };

  handleDataUpdate = (e) => {
    e.preventDefault();
    this.profile.updateUserData(e.target);
  };

  render() {
    let userData = this.props.userData;

    let pic_url;

    if (userData.blob_pic_url !== undefined && userData.blob_pic_url !== null) {
      pic_url = userData.blob_pic_url;
    } else {
      if (userData.pic_url !== null) {
        pic_url = storageUrl + userData.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
    }

    return (
      <>
        <Card>
          <CardBody>
            <Container>
              <Row className="align-items-center">
                <Col xs="8">
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    Hola !!!
                  </h1>
                  <p className="mb-4" data-aos="fade-up" data-aos-delay="200">
                    {userData.description}
                  </p>
                  <p data-aos="fade-up" data-aos-delay="300">
                    <SocialButtons data={userData} />
                  </p>
                </Col>
                <Col xs="auto" className="mx-auto">
                  <img
                    src={pic_url}
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={this.profile.handleClickPic}
                    alt={userData.name}
                  />
                </Col>
              </Row>
            </Container>
          </CardBody>
          <Input
            className="form-control d-none"
            id="input-pic"
            type="file"
            accept="image/*"
            onChange={this.handlePicPicker}
          />
        </Card>

        <Card className="mt-3 mb-5">
          <CardHeader>
            <CardTitle tag="h5" className="d-flex m-0">
              <span className="mr-auto"><i className="fa fa-user"/> Datos del perfíl</span>
              {this.props.userData2.user_name === userData.user_name ? (
                <Button className="m-0  py-2 px-3" onClick={this.toggleEditing}>
                  <i className="fa fa-pencil-alt" /> editar
                </Button>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleDataUpdate} id="form-user-data">
              <h6 className="heading-small text-muted mb-4">
                Información principal
              </h6>

              <div className="form-group row showcase_row_area">
                <div className="col-md-4 text-right">
                  <label htmlFor="input10">Nombre de cuenta:</label>
                </div>
                <div className="col-md-8 showcase_content_area">
                  {this.state.editing ? (
                    <Input
                      id="input10"
                      value={"@" + userData.user_name}
                      type="text"
                      disabled
                    />
                  ) : (
                    <p>@{userData.user_name}</p>
                  )}
                </div>
              </div>

              <div className="form-group row showcase_row_area">
                <div className="col-md-4 text-right">
                  <label htmlFor="input20">Correo electrónico:</label>
                </div>
                <div className="col-md-8 showcase_content_area">
                  {this.state.editing ? (
                    <Input
                      defaultValue={userData.email}
                      type="email"
                      disabled
                    />
                  ) : (
                    <p>{userData.email}</p>
                  )}
                </div>
              </div>

              <div className="form-group row showcase_row_area">
                <div className="col-md-4 text-right">
                  <label htmlFor="input30">Nombre completo:</label>
                </div>
                <div className="col-md-8 showcase_content_area">
                  {this.state.editing ? (
                    <Input
                      name="name"
                      defaultValue={userData.name}
                      placeholder="Mi nombre completo"
                      type="text"
                      onChange={nameChangedHandler}
                      minLength="8"
                      maxLength="60"
                      required
                    />
                  ) : (
                    <p>{userData.name}</p>
                  )}
                </div>
              </div>

              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">Redes Sociales</h6>

              <OptionCountries
                editing={this.state.editing}
                parent_reference={this}
              />

              <div className="form-group row showcase_row_area">
                <div className="col-md-4 text-right">
                  <label htmlFor="input40">Enlace de Facebook:</label>
                </div>
                <div className="col-md-8 showcase_content_area">
                  {this.state.editing ? (
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-facebook-square" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="input40"
                        name="link_facebook"
                        defaultValue={userData.link_facebook}
                        placeholder="Enlace de su perfil de facebook"
                        type="text"
                      />
                      <InputGroupAddon
                        onClick={(e) => {
                          window.open(
                            document.getElementById("input40").value,
                            "blank"
                          );
                        }}
                        id={"tooltip475038074"}
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText>
                          <i className="fa fa-external-link-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <UncontrolledTooltip delay={0} target="tooltip475038074">
                        Provar enlace
                      </UncontrolledTooltip>
                    </InputGroup>
                  ) : userData.link_facebook !== null &&
                    userData.link_facebook !== "" ? (
                    <a href={userData.link_facebook}>
                      {userData.link_facebook}
                    </a>
                  ) : (
                    <p>no definido</p>
                  )}
                </div>
              </div>

              <div className="form-group row showcase_row_area">
                <div className="col-md-4 text-right">
                  <label htmlFor="input50">Enlace de Twitter:</label>
                </div>
                <div className="col-md-8 showcase_content_area">
                  {this.state.editing ? (
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-twitter" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="input50"
                        name="link_twitter"
                        defaultValue={userData.link_twitter}
                        placeholder="Enlace de su perfil de twitter"
                        type="text"
                      />
                      <InputGroupAddon
                        onClick={(e) => {
                          window.open(
                            document.getElementById("input50").value,
                            "blank"
                          );
                        }}
                        id="tooltip475038073"
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText>
                          <i className="fa fa-external-link-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <UncontrolledTooltip delay={0} target="tooltip475038073">
                        Provar enlace
                      </UncontrolledTooltip>
                    </InputGroup>
                  ) : userData.link_twitter !== null &&
                    userData.link_twitter !== "" ? (
                    <a href={userData.link_twitter}>{userData.link_twitter}</a>
                  ) : (
                    <p>no definido</p>
                  )}
                </div>
              </div>

              <div className="form-group row showcase_row_area">
                <div className="col-md-4 text-right">
                  <label htmlFor="input60">Enlace de Instagram:</label>
                </div>
                <div className="col-md-8 showcase_content_area">
                  {this.state.editing ? (
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-instagram" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="input60"
                        name="link_instagram"
                        defaultValue={userData.link_instagram}
                        placeholder="Enlace de su perfil de instagram"
                        type="text"
                      />
                      <InputGroupAddon
                        onClick={(e) => {
                          window.open(
                            document.getElementById("input60").value,
                            "blank"
                          );
                        }}
                        id={"tooltip487838073"}
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText>
                          <i className="fa fa-external-link-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <UncontrolledTooltip delay={0} target="tooltip487838073">
                        Provar enlace
                      </UncontrolledTooltip>
                    </InputGroup>
                  ) : userData.link_instagram !== null &&
                    userData.link_instagram !== "" ? (
                    <a href={userData.link_instagram}>
                      {userData.link_instagram}
                    </a>
                  ) : (
                    <p>no definido</p>
                  )}
                </div>
              </div>

              <Collapse isOpen={this.state.editing}>
                <hr className="my-4" />

                <h6 className="heading-small text-muted">Acerca de tí</h6>

                <div className="form-group row showcase_row_area">
                  <div className="col-md-4 text-right">
                    <label htmlFor="input20">Tu descripción:</label>
                  </div>
                  <div className="col-md-8 showcase_content_area">
                    {this.state.editing ? (
                      <Input
                        className="mb-0"
                        name="description"
                        placeholder="Escribe algo acerca de tí..."
                        rows="3"
                        defaultValue={userData.description}
                        type="textarea"
                        maxLength="160"
                      />
                    ) : (
                      <p>{userData.description}</p>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <Button type="submit" className="my0" color="primary">
                    Guardar cambios <i className="fa fa-save mr-2"></i>
                  </Button>
                </div>
              </Collapse>
            </form>
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData2: state.userData,
});

export default connect(mapStateToProps)(AuthorData);
