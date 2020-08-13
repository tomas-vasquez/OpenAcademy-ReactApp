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

class CardsFooter extends React.Component {
  render() {
    return (
      <footer className="footer-section bg-white pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>About OneSchool</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                consectetur ut hic ipsum et veritatis corrupti. Itaque eius
                soluta optio dolorum temporibus in, atque, quos fugit sunt sit
                quaerat dicta.
              </p>
            </div>

            <div className="col-md-3 ml-auto">
              <h3>Links</h3>
              <ul className="list-unstyled footer-links">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Courses</a>
                </li>
                <li>
                  <a href="#">Programs</a>
                </li>
                <li>
                  <a href="#">Teachers</a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h3>Subscribe</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt incidunt iure iusto architecto? Numquam, natus?
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

          <div className="row py-0 mt-5 mb-0 text-center">
            <div className="col-md-12">
              <div className="border-top pt-5">
                <p>
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  Copyright &copy;
                  {new Date().getFullYear()} All
                  rights reserved | This template is made with{" "}
                  <i className="icon-heart" aria-hidden="true"></i> by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
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
