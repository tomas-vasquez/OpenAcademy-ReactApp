import React from "react";
import { Button } from "reactstrap";
import Controller_Users from "_controllers/Users";
import { myRoutes } from "config";
import { Link } from "react-router-dom";
import { user_nameChangedHandler } from "helpers/input";

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      height: window.innerHeight,
    };
    this.users = new Controller_Users();
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ height: window.innerHeight });
    });
  }

  submitHandlerLogin = (e) => {
    e.preventDefault();
    this.users.login(e.target, this.props.successCallback);
  };

  submitHandlerRegister = (e) => {
    e.preventDefault();
    this.users.register(e.target, this.props.successCallback);
  };

  render() {
    return (
      <div
        className="d-flex"
        id="home-section"
        style={{
          minHeight: this.state.height,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "url(" + require("assets/images/banner.jpg") + ")",
        }}
      >
        <div className="container  my-lg-auto " style={{ height: "100%" }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mt-5 mt-lg-0">
              <h1
                className="pt-5 mt-3 text-white"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Bienvenido !!!
              </h1>
              <p
                className="mb-4 text-white"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Para acceder a todo el contenido de nuestra academia deves
                iniciar sesion en tu cuenta; si no tienes una cuenta, puedes
                crearla en menos de un minuto!
              </p>
            </div>

            <div className="col-lg-5 ml-auto mt-5 mb-5 mb-lg-0">
              {/* inicio de sesion */}
              {document.location.pathname === myRoutes.login ? (
                <form
                  action=""
                  method="post"
                  className="form-box"
                  onSubmit={this.submitHandlerLogin}
                >
                  <h3 className="h4 text-black mb-4">Iniciar sesión:</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email Addresss"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="custom-control custom-checkbox my-3">
                    <input
                      className="custom-control-input"
                      name="remember_token"
                      id="customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label d-inline"
                      htmlFor="customCheckLogin"
                    >
                      Recordarme en este dispositivo
                    </label>
                  </div>
                  <div className="form-group text-center">
                    <Button
                      type="submit"
                      color="primary"
                      className="btn btn-primary btn-pill"
                    >
                      Iniciar sesión
                      <i className="fa fa-sign-in-alt ml-2" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="m-0 text-muted">
                      <Link to={myRoutes.register}>¿No tienes una cuenta?</Link>
                    </p>
                  </div>
                </form>
              ) : null}

              {/* registro de usuarios */}
              {document.location.pathname === myRoutes.register ? (
                <form
                  action=""
                  method="post"
                  className="form-box"
                  onSubmit={this.submitHandlerRegister}
                >
                  <h3 className="h4 text-black mb-4">Crear cuenta:</h3>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="input-email"
                      className="form-control"
                      placeholder="Correo electrónico"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="user_name"
                      type="text"
                      id="input-username"
                      onChange={user_nameChangedHandler}
                      className="form-control"
                      placeholder="Nombre de cuenta"
                      required
                      minLength="8"
                      maxLength="20"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="password"
                      type="text"
                      id="input-password"
                      className="form-control"
                      placeholder="Contraseña"
                      required
                      minLength="8"
                      autoComplete="off"
                    />
                  </div>
                  <div className="custom-control custom-checkbox my-3">
                    <input
                      className="custom-control-input"
                      defaultValue="off"
                      name="accept_the_terms"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label d-inline"
                      htmlFor="customCheckRegister"
                    >
                      Acepto los
                      <Link target="blank" to="/terms">
                        {" "}
                        términos y condiciones.
                      </Link>
                    </label>
                  </div>
                  <div className="form-group text-center">
                    <Button
                      type="submit"
                      color="primary"
                      className="btn btn-primary btn-pill"
                    >
                      Crear cuenta
                      <i className="fa fa-arrow-right ml-2" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="m-0 text-muted">
                      <Link to={myRoutes.login}>¿Ya tienes una cuenta?</Link>
                    </p>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
