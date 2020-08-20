import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

import { Link, NavLink } from "react-router-dom";
import { replace } from "connected-react-router/lib/actions";
import { setTargetUrl } from "store/app_store/actions";
import { connect } from "react-redux";

// reactstrap components
import { Collapse, Navbar, Nav } from "reactstrap";

import { myRoutes } from "config";
import AvatarNavBar from "./AvatarNavBar";
import DB from "helpers/db";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
    };
    this.db = new DB();
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

  openRegisterPage = (e) => {
    e.preventDefault();
    this.props.setTargetUrl(document.location.pathname);
    this.props.replace(myRoutes.register);
  };

  openLoginPage = (e) => {
    e.preventDefault();
    this.props.setTargetUrl(document.location.pathname);
    this.props.replace(myRoutes.login);
  };

  render() {
    return (
      <>
        <Navbar
          className={classnames("navbar-absolute py-3", this.state.color)}
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
              {this.props.userData !== null ? (
                <>
                  <NavLink
                    tag="li"
                    to={"/@" + this.props.userData.user_name}
                    className="nav-link text-white border-top mt-2 pt-3 d-md-none"
                  >
                    <span>Mi perfil</span>
                  </NavLink>
                  <NavLink
                    tag="li"
                    onClick={this.handleCloseSessionButtom}
                    to={"/"}
                    className="nav-link text-white d-md-none"
                  >
                    <span>Cerrar sesión</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    tag="li"
                    to={myRoutes.login}
                    className="nav-link text-white border-top mt-2 pt-3 d-md-none"
                  >
                    <span>Iniciar sesion</span>
                  </NavLink>
                  <NavLink
                    tag="li"
                    to={myRoutes.register}
                    className="nav-link text-white d-md-none"
                  >
                    <span>Registrame</span>
                  </NavLink>
                </>
              )}
            </Nav>

            <Nav
              className="site-navigation position-relative text-right p-0"
              role="navigation"
            >
              {this.props.userData === null ? (
                document.location.pathname !== myRoutes.login &&
                document.location.pathname !== myRoutes.register ? (
                  !this.db.get(this.db.get("api-token")) ? (
                    <>
                      <li className="cta d-md-none d-lg-block">
                        <Link
                          to={myRoutes.register}
                          onClick={this.openRegisterPage}
                          className="nav-link p-0 mr-3"
                        >
                          <span>registrarme</span>
                        </Link>
                      </li>
                      <li className="cta">
                        <Link
                          to={myRoutes.login}
                          onClick={this.openLoginPage}
                          className="nav-link p-0"
                        >
                          <span>ingresar</span>
                        </Link>
                      </li>
                    </>
                  ) : null
                ) : null
              ) : (
                <AvatarNavBar />
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setTargetUrl: (targetUrl) => dispatch(setTargetUrl(targetUrl)),
  replace: (newLocation) => dispatch(replace(newLocation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
