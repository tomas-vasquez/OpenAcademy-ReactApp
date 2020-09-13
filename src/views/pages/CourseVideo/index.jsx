import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Container } from "reactstrap";

class CourseVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentItem: null };
  }

  render() {
    return this.props.video !== null ? (
      <Container style={{ marginTop: -100 }}>
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
      </Container>
    ) : null;
  }
}

const mapStateToMap = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToMap)(CourseVideo);
