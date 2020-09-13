import { createStore, combineReducers, applyMiddleware } from "redux";

import userDataReducer from "store/userData_store/reducer";
import appReducer from "store/app_store/reducer";
import academyReducer from "store/academy_store/reducer";

import thunk from "redux-thunk";

import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    app: appReducer,
    userData: userDataReducer,
    academy: academyReducer,
    router: connectRouter(history),
  }),
  applyMiddleware(thunk, routerMiddleware(history))
);

store.log = () => {
  console.log(
    "  %c Store > %c estado:%c",
    "background:green; color:white",
    "background:#b6ffa7",
    "",
    store.getState()
  );
};

export { history };
export default store;
