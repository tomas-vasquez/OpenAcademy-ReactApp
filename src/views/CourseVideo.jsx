import React from "react";

import { connect } from "react-redux";

import CourseDescription from "components/CourseDescription";

import { Card, CardBody } from "reactstrap";

class CourseVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentItem: null };
  }

  render() {
    return this.props.video !== null ? (
      <>
        <Card className="mb-4 border-0 bg-black">
          <CardBody className="p-0 p-md-2">
            <div className="video-container shadow">
              <video
                controls={true}
                src={this.props.currentItem.item_video_url}
                width="720"
                height="420"
                autoPlay
              />
            </div>
          </CardBody>
        </Card>
        <CourseDescription
          itemIndex={this.props.itemIndex}
          currentItem={this.props.currentItem}
        />
      </>
    ) : null;
  }
}

const mapStateToMap = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToMap)(CourseVideo);
