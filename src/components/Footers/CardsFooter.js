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
/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardImg,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { myRoutes } from "config";

class CardsFooter extends React.Component {
  render() {
    return (
      <footer className="footer-section bg-white pt-5 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>Acerca de Vikings Academy</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                consectetur ut hic ipsum et veritatis corrupti. Itaque eius
                soluta optio dolorum temporibus in, atque, quos fugit sunt sit
                quaerat dicta.
              </p>
            </div>

            <div className="col-md-3 ml-auto">
              <h3>Enlaces</h3>
              <ul className="list-unstyled footer-links">
                <li>
                  <Link to="/">inicio</Link>
                </li>
                <li>
                  <Link to={myRoutes.courses}>Cursos</Link>
                </li>
                <li>
                  <Link to={myRoutes.courses}>Conferencias</Link>
                </li>
                <li>
                  <Link to={myRoutes.courses}>Docentes</Link>
                </li>
                <li>
                  <Link to={myRoutes.courses}>Dicta un curso</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h3>Subscribete a nuestro newsletter</h3>
              <p>
               Recive correos avisandote de nuevos cursos, conferencias y promociones dentro de nuestra academia.
              </p>
              <form action="#" className="footer-subscribe">
                <div className="d-flex mb-5">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Email"
                  />
                  <input
                    type="submit"
                    className="btn btn-primary rounded-0"
                    value="Subscribe"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="row py-0 mb-0 text-center">
            <div className="col-md-12">
              <div className="border-top py-3">
                <p className="m-0 p-0">
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  Copyright &copy;
                  {new Date().getFullYear()} todos los derechos reservados | This proyect
                  is made with <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                  by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Tomy
                  </a>
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default CardsFooter;
