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

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Header from "components/Headers/Header.jsx";
import CourseSlider from "components/CourseSlider.jsx";
import Programs from "components/Programs.jsx";
import BestAuthors from "components/BestAuthors.jsx";
import WhyChooseUs from "components/WhyChooseUs.jsx";
import ContactUs from "components/ContactUs.jsx";
import HeaderCourse from "components/Headers/HeaderCourse.jsx";
import CardAuthor from "components/CardAuthor";
import CourseDescription from "components/CourseDescription";
import Comments from "components/Course/Comments";

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <div className="site-wrap">
          <DemoNavbar />

          <HeaderCourse />
          <div className="site-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mb-5">
                  <CourseDescription/>

                  <Comments/>
                </div>
                <div className="col-lg-4 pl-lg-3">
                  <CardAuthor />
                </div>
              </div>
            </div>
          </div>

          <Header />

          <CourseSlider />

          <Programs />

          <BestAuthors />

          <WhyChooseUs />

          <ContactUs />
          <CardsFooter />
        </div>
      </>
    );
  }
}

export default Landing;
