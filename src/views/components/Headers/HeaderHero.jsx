import React from "react";

class Header extends React.Component {
  render() {
    // let title = this.props.title;
    // let subTitle = this.props.subTitle;
    return (
      <>
        <div
          className="hero"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: "url(" + require("assets/img/banner.jpg") + ")",
          }}
        >
          <div className="contenido-hero contenedor">
            <h2>Aprende algo nuevo</h2>
            <p>Todos los cursos a $15</p>
            <form action="#" id="busqueda" method="post" className="formulario">
              <input
                className=""
                type="text"
                placeholder="¿Que te gustaría Aprender?"
                id="buscador"
              />
              <input
                type="submit"
                id="submit-buscador"
                className="submit-buscador"
              />
            </form>
          </div>
        </div>

        <div className="barra">
          <div className="iconos contenedor">
            <div className="icono icono1">
              <p>
                20,000 Cursos en línea <br /> Explora los temas más recientes
              </p>
            </div>
            <div className="icono icono2">
              <p>
                Instructores Expertos <br /> Aprende con distintos estilos
              </p>
            </div>
            <div className="icono icono3">
              <p>
                Acceso de por vida <br /> Aprende a tu ritmo
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
