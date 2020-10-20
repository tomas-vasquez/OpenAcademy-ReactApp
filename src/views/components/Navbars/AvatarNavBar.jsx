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

import Controller_Users from "fetchers/Users";

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
      this.props.userData.blob_pic_url
    ) {
      pic_url = this.props.userData.blob_pic_url;
    } else {
      if (this.props.userData.pic_url) {
        pic_url = this.props.userData.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
    }

    return (
      <UncontrolledDropdown nav className="p-0">
        <DropdownToggle className="p-0" nav>
          <Media className="align-items-center">
            <img
              className="ml-2 avatar rounded-circle"
              alt={this.props.userData.user_name}
              style={{ width: 40 }}
              src={pic_url}
            />
            <Media>
              <span className="mb-0 ml-1 text-muted d-md-none d-lg-block">
                @{this.props.userData.user_name}
              </span>
              <span className="mb-0 ml-1 text-muted">
                <i className="ml-1 fa fa-sort-down"></i>
              </span>
            </Media>
          </Media>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-arrow bg-white mt-3" right>
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
