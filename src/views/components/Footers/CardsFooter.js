import React from "react";
// import { Link } from "react-router-dom";

import { myRoutes } from "config";
import { Link } from "react-router-dom";

class CardsFooter extends React.Component {
  render() {
    return document.location.pathname !== myRoutes.login &&
      document.location.pathname !== myRoutes.register ? (
      <>
        <footer className="mt-0 footer text-center">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <h5 className="text-uppercase mb-3">Links</h5>
                <p className=" mb-0">
                  <Link to="/" className="text-white">
                    Empleo
                  </Link>
                  {" - "}
                  <Link to="/" className="text-white">
                    Condiciones
                  </Link>
                  {" - "}
                  <Link to="/" className="text-white">
                    Política de Privacidad
                  </Link>
                  {" - "}
                  <Link to="/" className="text-white">
                    Ayuda y asistencia
                  </Link>
                </p>
              </div>
              <div className="col-12 col-md-6  mt-5 mt-md-0">
                <h5 className="text-uppercase mb-4">Around the Web</h5>
                <a className="btn btn-outline-light btn-social mx-1" href="#!">
                  <i className="fa fa-fw fa-github"></i>
                </a>
                <a className="btn btn-outline-light btn-social mx-1" href="#!">
                  <i className="fa fa-fw fa-youtube-play"></i>
                </a>
                <a className="btn btn-outline-light btn-social mx-1" href="#!">
                  <i className="fa fa-fw fa-linkedin"></i>
                </a>
                <a className="btn btn-outline-light btn-social mx-1" href="#!">
                  <i className="fa fa-fw fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
        <div className="copyright py-2 text-center text-white">
          <div className="container">
            made with <i className="fa fa-heart" /> by{" "}
            <a
              className="badge badge-dark"
              rel="noopener"
              href="https://github.com/tomasdetloging"
              aria-label="My GitHub"
            >
              Tomi
            </a>{" "}
            using <i className="fab fa-react" />
          </div>
        </div>
      </>
    ) : null;
  }
}

export default CardsFooter;
