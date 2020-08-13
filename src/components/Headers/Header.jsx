import React from "react";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ height: window.innerHeight });
    });
  }
setState
  render() {
    return (
      <div
        className="intro-section"
        id="home-section"
        style={{
          height: "auto",
          minHeight: this.state.height,
        }}
      >
        <div
          className="slide-1 p-0"
          style={{
            backgroundImage: "url(" + require("assets/images/hero_1.jpg") + ")",
          }}
        >
          <div className="container py-5 py-lg-0">
            <div
              className="row align-items-center"
              style={{ minHeight: "100%" }}
            >
              <div className="col-lg-6 mt-5">
                <h1 data-aos="fade-up" data-aos-delay="100">
                  Learn From The Expert
                </h1>
                <p className="mb-4" data-aos="fade-up" data-aos-delay="200">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime ipsa nulla sed quis rerum amet natus quas
                  necessitatibus.
                </p>
                <p data-aos="fade-up" data-aos-delay="300">
                  <a href="/" className="btn btn-primary py-3 px-5 btn-pill">
                    Admission Now
                  </a>
                </p>
              </div>

              <div
                className="col-lg-5 ml-auto mt-5"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <form action="" method="post" className="form-box">
                  <h3 className="h4 text-black mb-4">Sign Up</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email Addresss"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-type Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-primary btn-pill"
                      value="Sign up"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
