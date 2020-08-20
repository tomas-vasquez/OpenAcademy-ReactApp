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
          backgroundImage: "url(" + require("assets/images/banner.jpg") + ")",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row justify-content-center align-items-center text-center">
                <div className="col-lg-6">
                  <h1 data-aos="fade-up" data-aos-delay="0">
                    {title ? title : null}
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="100" className="m-0">
                    {subTitle ? subTitle : null}
                  </p>
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
