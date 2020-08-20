import React from "react";
// nodejs library that concatenates classes
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import classnames from "classnames";

// reactstrap components
import { Collapse, Navbar, Nav, Modal, Input } from "reactstrap";

import { myRoutes } from "config";
import AvatarNavBar from "./AvatarNavBar";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
    };
  }

  handleCloseSessionButtom = (e) => {
    e.preventDefault();
    this.user.logout();
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 764 && this.state.collapseOpen) {
      this.setState({
        color: "",
      });
    } else {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };

  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent",
      });
    } else {
      this.setState({
        color: "",
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch,
    });
  };

  render() {
    return (
      <>
        <Navbar
          className={classnames("navbar-absolute ", this.state.color)}
          expand="md"
        >
          <div className="navbar-wrapper">
            <Link to="/">
              <h1 className="h3 text-white">MyAcademy</h1>
            </Link>
          </div>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>

          <Collapse navbar isOpen={this.state.collapseOpen}>
            <Nav className="mx-auto" navbar>
              <NavLink
                tag="li"
                to={myRoutes.courses}
                className="nav-link text-white"
              >
                Cursos
              </NavLink>
              <NavLink
                tag="li"
                to={myRoutes.courses}
                className="nav-link text-white"
              >
                Talleres
              </NavLink>
              <NavLink
                tag="li"
                to={myRoutes.courses}
                className="nav-link text-white"
              >
                Docentes
              </NavLink>
              <NavLink
                tag="li"
                to={myRoutes.courses}
                className="nav-link text-white"
              >
                Dicta un curso
              </NavLink>
            </Nav>

            <Nav
              className="site-navigation position-relative text-right py-3 py-lg-0"
              role="navigation"
            >
              {this.props.userData === null ? (
                document.location.pathname !== myRoutes.login &&
                document.location.pathname !== myRoutes.register ? (
                  <>
                    <li className="cta d-md-none d-lg-block">
                      <Link to={myRoutes.login} className="nav-link p-0 mr-3">
                        <span>registrarme</span>
                      </Link>
                    </li>
                    <li className="cta">
                      <Link to={myRoutes.login} className="nav-link p-0">
                        <span>ingresar</span>
                      </Link>
                    </li>
                  </>
                ) : null
              ) : (
                <AvatarNavBar />
              )}
            </Nav>
          </Collapse>
        </Navbar>

        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(AdminNavbar);
