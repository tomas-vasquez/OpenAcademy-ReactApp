import React from "react";
import { storageUrl } from "config";
import SocialButtons from "components/SocialButtons";
import { Link } from "react-router-dom";

class CardAuthor extends React.Component {
  render() {
    let author = this.props.author;
    let pic_url;

    if (author !== null) {
      if (author.pic_url !== null) {
        pic_url = storageUrl + author.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
      return (
        <div className="mb-5 text-center border rounded course-instructor bg-white mt-neg p-3 pb-4">
          <h3 className="mb-4 text-black text-uppercase h6 border-bottom pb-3">
            Docente
          </h3>{" "}
          <Link to={"/@" + author.user_name}>
            <div className="mb-4 text-center">
              <img
                src={pic_url}
                alt={author.name}
                className="w-25 rounded-circle mb-4"
              />
              <h3 className="h5 text-black mb-4">{author.name}</h3>
              <p>{author.description}</p>
            </div>
          </Link>
          <SocialButtons data={author} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CardAuthor;
