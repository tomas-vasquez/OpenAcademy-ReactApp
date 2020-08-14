import React from "react";
import { Link } from "react-router-dom";
import { myRoutes } from "config";

class DemoNavbar extends React.Component {

  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>

        <header
          className="site-navbar py-4 js-sticky-header site-navbar-target"
          role="banner"
        >
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <div className="site-logo mr-auto w-25">
                <Link to="/">Vikings Academy</Link>
              </div>

              <div className="mx-auto text-center">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
                    <li>
                      <Link to={myRoutes.courses} className="nav-link">
                        Cursos
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="nav-link">
                        Conferencias
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="nav-link">
                        Docentes
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="nav-link">
                        Dicta un curso
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="ml-auto w-25">
                {document.location.pathname !== myRoutes.login &&
                document.location.pathname !== myRoutes.register ? (
                  <nav
                    className="site-navigation position-relative text-right"
                    role="navigation"
                  >
                    <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                      <li className="cta">
                        <Link to={myRoutes.login} className="nav-link">
                          <span>ingresar</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                ) : null}
                <a
                  href="/"
                  className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right"
                >
                  <span className="icon-menu h3"></span>
                </a>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
