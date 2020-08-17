import React from "react";

import { connect } from "react-redux";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

import Controller_admin from "_controllers";
import { Switch, Route } from "react-router";
import routes from "routes";
import DB from "helpers/db";

class Main extends React.Component {
  constructor() {
    super();
    this.controlleradmin = new Controller_admin();
    this.db = new DB();
  }

  componentDidMount() {
    // if (!this.props.isBeenLoadedMainData) {
    //   if(this.db.get("api-token"))
    //   this.controlleradmin.initApp(this);
    // }
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

          <Switch>{this.getRoutes(routes)}</Switch>

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
