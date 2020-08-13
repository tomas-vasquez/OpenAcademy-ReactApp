import React from "react";

import { connect } from "react-redux";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

import Landing from "views/Landing";

import Controller_admin from "_controllers";
import { Switch, Route } from "react-router";
import routes from "routes";

class Main extends React.Component {
  constructor() {
    super();
    this.controlleradmin = new Controller_admin();
  }

  componentDidMount() {
    if (!this.props.isBeenLoadedMainData) {
      this.controlleradmin.initApp(this);
    }
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "admin") {
        return (
          <Route exact path={prop.path} component={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        <div className="site-wrap">
          <DemoNavbar />

          {!this.props.isBeenLoadedMainData ? 
          <Landing /> : 
          <Switch>{this.getRoutes(routes)}</Switch>}

          <CardsFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isBeenLoadedMainData: state.app.isBeenLoadedMainData,
});

export default connect(mapStateToProps)(Main);
