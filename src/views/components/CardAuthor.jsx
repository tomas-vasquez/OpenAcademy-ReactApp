import React from "react";

import { connect } from "react-redux";

import SocialButtons from "views/components/SocialButtons";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const CardAuthor = ({ currentItem, ...props }) => {
  let author = props.academy.authors.find((author) => {
    return author._id === currentItem.item_author_id;
  });

  if (author) {
    let pic_url;
    if (author.pic_url) {
      pic_url = author.pic_url;
    } else {
      pic_url = require("assets/img/noPic.jpg");
    }

    return (
      <Row>
        <Col xs="12" md="auto" className="d-flex">
          <div className="mx-auto mt-2">
            <Link to={"/@" + author.user_name}>
              <img
                src={pic_url}
                alt={author.name}
                className="rounded-circle mb-4"
              />
            </Link>
          </div>
        </Col>
        <Col xs="12" md="">
          <div className="">
            <h3 className="h5 text-muted mb-4">
              {author.name ? author.name : author.user_name}
            </h3>
            <p className="text-muted">{author.description}</p>
            <div className="d-flex d-md-block">
              <div className="mx-auto">
                <SocialButtons data={author} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(CardAuthor);
