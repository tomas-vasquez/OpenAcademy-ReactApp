import React from "react";

import { connect } from "react-redux";

import { userPicUrl } from "config";
import SocialButtons from "components/SocialButtons";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const CardAuthor = ({ currentItem, ...props }) => {
  let author = props.academy.authors.find((author) => {
    return author._id === currentItem.item_author_id;
  });

  if (author) {
    let pic_url;
    if (author.pic_url) {
      pic_url = userPicUrl + author.pic_url;
    } else {
      pic_url = require("assets/img/noPic.jpg");
    }

    return (
      <Card className="mb-4 text-muted shadow">
        <CardHeader>
          <CardTitle tag="h5" className="m-0">
            <i className="fa fa-user mr-3" />
            Docente:
          </CardTitle>
        </CardHeader>{" "}
        <CardBody className="text-center">
          <Link to={"/@" + author.user_name}>
            <img
              src={pic_url}
              alt={author.name}
              className="w-25 rounded-circle mb-4"
            />
            <h3 className="h5 text-muted mb-4">
              {author.name ? author.name : author.user_name}
            </h3>
            <p className="text-muted">{author.description}</p>
          </Link>
          <div className="text-center">
            <SocialButtons data={author} />
          </div>
        </CardBody>
      </Card>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(CardAuthor);
