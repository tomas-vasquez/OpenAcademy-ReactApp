import React from "react";
import classname from "classnames";
import parser from "html-react-parser";
import { connect } from "react-redux";

import moment from "moment";
import "moment/min/locales";

import Controller_Academy from "fetchers/Academy";
import PHItemDescription from "views/components/Loaders/PHItemDescription";
import { Container } from "reactstrap";
import CardAuthor from "views/components/CardAuthor";
import CourseMap from "views/components/CourseMap";

class ItemDescription extends React.Component {
  constructor(props) {
    super(props);
    moment.locale("es");

    this.state = {
      items: props.items,
      description:
        props.academy.descriptions[props.currentItem.item_content_url],
      itemIndex: props.itemIndex,
      currentItem: props.currentItem,
      currentTab: "no",
    };

    this.academy = new Controller_Academy();
  }

  componentDidMount() {
    this.loadData();
    window.addEventListener("resize", () => {
      this.forceUpdate();
    });
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
          if (error) {
            this.setState({
              description: "",
            });
          } else {
            this.setState({
              description: response,
            });
          }
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
    });
    this.loadData();
  };

  componentDidUpdate(e) {
    if (this.state.currentItem !== this.props.currentItem) {
      this.reloadData();
    }
  }

  render() {
    const TabName = ({ title, tabName, icon }) => (
      <>
        <div
          className={classname("p-2 mr-2", {
            "border-bottom2 mx-2": this.state.currentTab === tabName,
          })}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({ currentTab: tabName });
          }}
        >
          <i className={`${icon} mr-2`} />
          <strong className="d-none d-sm-inline">{title}</strong>
          <strong
            className={classname("d-none", {
              "d-inline":
                this.state.currentTab === tabName && window.innerWidth < 576,
            })}
          >
            {title}
          </strong>
        </div>
      </>
    );
    return (
      <>
        <div className="pt-2 ml-md-4 border-bottom d-flex mb-4 mx-2">
          <div className="d-lg-none">
            <TabName title="Contenido" tabName="li" icon="fa fa-list" />
          </div>
          <TabName title="Notas" tabName="no" icon="fa fa-pencil" />
          <TabName title="Preguntas (999)" tabName="pr" icon="fa fa-comments" />
          <TabName title="Docente" tabName="aa" icon="fa fa-user" />
        </div>
        <Container fluid>
          <div
            className={classname("mx-auto", {
              "d-none": this.state.currentTab !== "no",
            })}
            style={{ maxWidth: 650 }}
          >
            {this.state.description !== undefined &&
            typeof this.state.description === "string" ? (
              parser(this.state.description)
            ) : (
              <PHItemDescription />
            )}
          </div>

          <div
            className={classname("mx-auto", {
              "d-none": this.state.currentTab !== "aa",
            })}
            style={{ maxWidth: 650 }}
          >
            <CardAuthor currentItem={this.state.currentItem} />
          </div>

          <div
            className={classname("mx-auto", {
              "d-none": this.state.currentTab !== "li",
            })}
            // style={{ maxWidth: 650 }}
          >
            <CourseMap
              items={this.state.items}
              currentItem={this.state.currentItem}
            />
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(ItemDescription);
