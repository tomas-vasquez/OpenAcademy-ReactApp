import React from "react";
import { storageUrl } from "config";
import SocialButtons from "components/SocialButtons";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const CardAuthor = ({ author }) => {
  let pic_url;

  if (author.pic_url !== null) {
    pic_url = storageUrl + author.pic_url;
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
          <h3 className="h5 text-muted mb-4">{author.name}</h3>
          <p className="text-muted">{author.description}</p>
        </Link>
        <div className="text-center">
          <SocialButtons data={author} />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardAuthor;
