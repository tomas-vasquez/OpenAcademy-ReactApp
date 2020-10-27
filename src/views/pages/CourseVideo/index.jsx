import React from "react";
import { connect } from "react-redux";
import Invitation from "views/components/Invitation";
import ItemDescription from "../AllCourses/ItemDescription";
import Video from "./Video";

class CourseVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentItem: null };
  }

  render() {
    return this.props.video !== null ? (
      <>
        <div className="video-container shadow d-flex">
          <Video
            className="m-auto"
            controls
            src={this.props.currentItem.item_video_url}
            width="720"
            height="420"
            autoPlay
          />
        </div>
        <ItemDescription
          items={this.props.items.sort((a, b) => a.item_sort - b.item_sort)}
          itemIndex={this.props.itemIndex}
          currentItem={this.props.currentItem}
        />
        <Invitation />
      </>
    ) : null;
  }
}

const mapStateToMap = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToMap)(CourseVideo);
