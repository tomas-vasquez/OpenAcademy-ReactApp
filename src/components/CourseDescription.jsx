import React from "react";

import parser from "html-react-parser";
import { connect } from "react-redux";

import moment from "moment";
import "moment/min/locales";

import Controller_Academy from "_controllers/Academy";
import PHCourseDescription from "./Loaders/PHCourseDescription";

class CourseDescription extends React.Component {
  constructor(props) {
    super(props);
    moment.locale("es");
    this.state = {
      description:
        props.academy.descriptions[props.currentItem.item_content_url],
      itemIndex: props.itemIndex,
      currentItem: props.currentItem,
      error: null,
    };
    this.academy = new Controller_Academy();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (
      this.props.academy.descriptions[
        this.props.currentItem.item_content_url
      ] === undefined
    ) {
      this.academy.loadDescription(
        this.props.currentItem.item_content_url,
        (response, error) => {
          this.setState({
            description: response,
            error: error,
          });
        }
      );
    } else {
      this.setState({
        description: this.props.academy.descriptions[
          this.props.currentItem.item_content_url
        ],
      });
    }
  };

  reloadData = () => {
    this.setState({
      description: undefined,
      itemIndex: this.props.itemIndex,
      currentItem: this.props.currentItem,
      error: null,
    });
    this.loadData();
  };

  componentDidUpdate(e) {
    if (this.state.currentItem !== this.props.currentItem) {
      this.reloadData();
    }
  }

  render() {
    return (
      <>
        <h3 className="text-black">
          {this.state.itemIndex +
            ".- " +
            (
              this.state.currentItem.item_title.charAt(0).toUpperCase() +
              this.state.currentItem.item_title.slice(
                1,
                this.state.currentItem.item_title.length
              )
            ).replace(/_/g, " ")}
        </h3>
        <p className="mb-4">
          <strong className="text-black mr-3">Actualizado: </strong>
          {moment(this.state.currentItem.created_at, "ISO").fromNow()}
        </p>

        <div className="p-2 py-3">
          {this.state.description !== undefined ? (
            parser(this.state.description)
          ) : (
            <PHCourseDescription />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(CourseDescription);
