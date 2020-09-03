import "assets/css/style.css";

import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";

import MainLayouth from "layouts/Main";
import CourseLayouth from "layouts/Course";

import { myRoutes } from "config";

import { Provider } from "react-redux";
import store, { history } from "store";
import { ConnectedRouter } from "connected-react-router";

// import PerfectScrollWraper from "components/PerfectScrollWraper";

ReactDOM.render(
  // <PerfectScrollWraper>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path={myRoutes.login}
          render={(props) => <MainLayouth {...props} />}
        />
        <Route
          exact
          path={myRoutes.register}
          render={(props) => <MainLayouth {...props} />}
        />
        <Route exact path="/" render={(props) => <MainLayouth {...props} />} />
        <Route
          exact
          path={myRoutes.profile}
          render={(props) => <MainLayouth {...props} />}
        />
        <Route
          exact
          path={myRoutes.courses}
          render={(props) => <MainLayouth {...props} />}
        />
        <Route
          exact
          path="/@:user_name"
          render={(props) => <MainLayouth {...props} />}
        />

        <Route render={(props) => <CourseLayouth {...props} />} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  // </PerfectScrollWraper>,
  document.getElementById("root")
);
