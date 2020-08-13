import React from "react";
import Header from "components/Headers/Header";
import CourseSlider from "components/CourseSlider";
import Programs from "components/Programs";
import BestAuthors from "components/BestAuthors";
import WhyChooseUs from "components/WhyChooseUs";
import ContactUs from "components/ContactUs";

class Landing extends React.Component {
  render() {
    return (
      <>
        <Header />

        <CourseSlider />

        <Programs />

        <BestAuthors />

        <WhyChooseUs />

        <ContactUs />
      </>
    );
  }
}

export default Landing;
