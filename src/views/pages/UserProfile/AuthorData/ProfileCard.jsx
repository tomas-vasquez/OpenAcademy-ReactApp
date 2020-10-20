import React from "react";
import { Col, CardBody, Container, Row, Card } from "reactstrap";
import SocialButtons from "views/components/SocialButtons";

const getPicUrl = (profile) => {
  if (profile.pic_url) {
    return profile.pic_url;
  } else {
    return require("assets/img/noPic.jpg");
  }
};

const ProfileCard = ({ profile, editable, handlePicPicker }) => (
  <Card className="shadow mb-4">
    <CardBody>
      <Container>
        <Row>
          <Col xs="12" lg="4" className="order-lg-2 mx-auto d-flex">
            <img
              src={getPicUrl(profile)}
              style={{
                borderRadius: "50%",
                cursor: "pointer",
                width: 180,
                height: 180,
              }}
              className="m-auto"
              onClick={() => {
                if (editable) {
                  document.getElementById("input-pic").click();
                } else {
                  alert("nooo");
                }
              }}
              alt={profile.name}
            />
          </Col>
          <Col xs="12" lg="8" className="order-lg-1">
            <h1 data-aos="fade-up" data-aos-delay="100">
              Hola !!!
            </h1>
            <p className="mb-4" data-aos="fade-up" data-aos-delay="200">
              {profile.description}
            </p>
            <p data-aos="fade-up" data-aos-delay="300">
              <SocialButtons data={profile} />
            </p>
          </Col>
        </Row>
      </Container>
    </CardBody>
    <input
      className="d-none"
      id="input-pic"
      type="file"
      accept="image/*"
      onChange={handlePicPicker}
    />
  </Card>
);

export default ProfileCard;
