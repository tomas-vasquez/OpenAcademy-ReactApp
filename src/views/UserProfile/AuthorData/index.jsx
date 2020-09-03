import React from "react";

import { connect } from "react-redux";

// reactstrap components
import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Collapse,
} from "reactstrap";

import { nameChangedHandler } from "helpers/input";
import Controller_Profile from "_controllers/Profile";

import OptionCountries from "./OptionCountries";
import ProfileCard from "./ProfileCard";
import SingleField from "./SingleField";
import SingleSocialField from "./SingleSocialField";
import DescriptionField from "./DescriptionField";

class AuthorData extends React.Component {
  constructor(props) {
    super();
    this.state = { profile: props.profile };
    this.profile = new Controller_Profile();
  }

  handlePicPicker = (e) => {
    const file = e.target.files[0];
    this.profile.handle_pic_selected(file);
  };

  handleDataUpdate = (e) => {
    e.preventDefault();
    this.profile.updateUserData(e.target, (newProfile) => {
      this.setState({ profile: newProfile });
    });
  };

  render() {
    let profile = this.state.profile;
    let editable =
      this.props.userData &&
      this.props.userData.user_name === profile.user_name;

    return (
      <>
        <ProfileCard
          profile={profile}
          editable={editable}
          handlePicPicker={this.handlePicPicker}
        />

        <Card className="shadow mb-4">
          <CardHeader>
            <CardTitle tag="h5" className="m-0 d-flex">
              <span>
                <i className="fa fa-user mr-3" />
                Datos del perfíl
              </span>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleDataUpdate} id="form-user-data">
              <h5 className="heading-small text-muted mb-4">
                Información principal:
              </h5>

              <SingleField
                disabled
                label="Nombre de cuenta"
                defaultValue={`@${profile.user_name}`}
                isEditing={editable}
              />
              <SingleField
                disabled
                label="Correo electronico"
                defaultValue={profile.email}
                isEditing={editable}
              />
              <SingleField
                name="name"
                label="Nombre completo"
                defaultValue={profile.name}
                isEditing={editable}
                onChange={nameChangedHandler}
              />

              <hr className="my-4" />
              <h5 className="heading-small text-muted mb-4">Redes Sociales:</h5>

              <OptionCountries
                editing={editable}
                parent_reference={this}
                whatsapp_number={profile.whatsapp_number}
                whatsapp_code_area={profile.whatsapp_code_area}
              />

              <SingleSocialField
                name="facebook"
                defaultValue={profile.link_facebook}
                isEditing={editable}
              />
              <SingleSocialField
                name="twitter"
                defaultValue={profile.link_twitter}
                isEditing={editable}
              />
              <SingleSocialField
                name="instagram"
                defaultValue={profile.link_instagram}
                isEditing={editable}
              />

              <DescriptionField
                defaultValue={profile.description}
                isEditing={editable}
              />

              <Collapse isOpen={editable}>
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
  userData: state.userData,
});

export default connect(mapStateToProps)(AuthorData);
