import React from "react";

import { connect } from "react-redux";

// core components
import Navbar from "components/Navbars/Navbar";
import CardsFooter from "components/Footers/CardsFooter";

import { Switch, Route } from "react-router";
import routes from "routes";
import DB from "helpers/db";
import Controller_Profile from "_controllers/Profile";

class Main extends React.Component {
  constructor() {
    super();
    this.db = new DB();
    this.profile = new Controller_Profile();
  }

  loadUserData() {
    if (!this.props.userData) {
      if (this.db.get("api-token")) {
        this.profile.getUserData(() => {
          this.forceUpdate();
        });
      }
    }
  }

  componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate() {
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
  userData: state.userData,
});

export default connect(mapStateToProps)(Main);
