import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from "reactstrap";

import Controller_Users from "_controllers/Users";
import { storageUrl } from "config";

class AvatarNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.user = new Controller_Users();
  }

  handleCloseSessionButtom = (e) => {
    e.preventDefault();
    this.user.logout();
  };

  render() {
    let pic_url;

    if (
      this.props.userData.blob_pic_url !== undefined &&
      this.props.userData.blob_pic_url !== null
    ) {
      pic_url = this.props.userData.blob_pic_url;
    } else {
      if (this.props.userData.pic_url !== null) {
        pic_url = storageUrl + this.props.userData.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
    }

    return (
      <UncontrolledDropdown nav className="pr-3">
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <img
              className="ml-2 avatar rounded-circle"
              alt={this.props.userData.user_name}
              style={{ width: 40 }}
              src={pic_url}
            />
            <Media>
              <span className="mb-0 ml-1 text-white">
                @{this.props.userData.user_name}
                <i className="ml-1 fa fa-sort-down"></i>
              </span>
            </Media>
          </Media>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem
            tag={Link}
            replace
            to={"/@" + this.props.userData.user_name}
          >
            <i className="fa fa-user mr-2" />
            <span>Mi perfil</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={this.handleCloseSessionButtom}
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-sign-out-alt mr-2" />
            <span>Cerrar sesión</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(AvatarNavBar);
