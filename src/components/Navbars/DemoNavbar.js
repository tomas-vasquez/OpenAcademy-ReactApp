/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { myRoutes } from "config";

class DemoNavbar extends React.Component {
  componentDidMount() {
    // let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    // headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
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
   
    
    <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
      
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="site-logo mr-auto w-25"><Link to="/">Vikings Academy</Link></div>

          <div className="mx-auto text-center">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
                <li><Link to={myRoutes.courses}className="nav-link">Cursos</Link></li>
                <li><Link to="/"  className="nav-link">Conferencias</Link></li>
                <li><Link to="/"  className="nav-link">Docentes</Link></li>
                <li><Link to="/"  className="nav-link">Dicta un curso</Link></li>
              </ul>
            </nav>
          </div>

          <div className="ml-auto w-25">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                <li className="cta"><a href="#contact-section" className="nav-link"><span>Contactanos</span></a></li>
              </ul>
            </nav>
            <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right"><span className="icon-menu h3"></span></a>
          </div>
        </div>
      </div>
      
    </header>
      </>
    );
  }
}

export default DemoNavbar;
