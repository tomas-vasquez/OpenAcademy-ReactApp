import React from "react";

import { connect } from "react-redux";

// core components
import Navbar from "components/Navbars/Navbar";
import CardsFooter from "components/Footers/CardsFooter";

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

  loadUserData() {
    if (this.props.userData === null) {
      if (this.db.get("api-token")) {
        this.controlleradmin.initApp(this, () => this.forceUpdate());
      }
    }
  }

  componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate() {
    console.log("update");
    this.loadUserData();
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => (
      <Route exact path={prop.path} component={prop.component} key={key} />
    ));
  };

  render() {
    return (
      <div className="site-wrap">
        <Navbar />

        <Switch>{this.getRoutes(routes)}</Switch>

        <CardsFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.app.userData,
});

export default connect(mapStateToProps)(Main);
