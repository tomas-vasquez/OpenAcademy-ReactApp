import React from "react";

class Header extends React.Component {
  render() {
    let title = this.props.title;
    let subTitle = this.props.subTitle;
    return (
      <div
        className="intro-section single-cover"
        id="home-section"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "url(" + require("assets/img/banner.jpg") + ")",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row justify-content-center align-items-center text-center">
                <div>
                  <h1>{title ? title : null}</h1>
                  <p className="m-0">{subTitle ? subTitle : null}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
