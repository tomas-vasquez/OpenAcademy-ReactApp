import React from "react";

import { connect } from "react-redux";

import Navbar from "views/components/Navbars/Navbar";
import CardsFooter from "views/components/Footers/CardsFooter";

import { Switch, Route } from "react-router";
import DB from "helpers/db";
import Controller_Profile from "fetchers/Profile";

import { myRoutes } from "config";
import Home from "views/pages/Home";
import Courses from "views/pages/AllCourses";
import Auth from "views/pages/Auth";
import UserProfile from "views/pages/UserProfile";

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

  render() {
    return (
      <div className="site-wrap">
        <Navbar />

        <Switch>
          <Route exact path={myRoutes.login} component={Auth} />
          <Route exact path={myRoutes.register} component={Auth} />
          <Route exact path={myRoutes.home} component={Home} />
          <Route exact path={"/@:user_name"} component={UserProfile} />
          <Route exact path={myRoutes.courses} component={Courses} />
        </Switch>

        <CardsFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(Main);
