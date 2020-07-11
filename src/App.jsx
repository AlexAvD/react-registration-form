import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Home from "./views/Home";
import SuccessMsg from "./components/SuccessMsg";
import AuthRoute from "./components/AuthRoute";
import "./App.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

const App = ({ authToken }) => {
  return (
    <Router>
      <div className="app">
        <Route
          render={({ location }) => (
            <TransitionGroup className="container">
              <CSSTransition key={location.key} timeout={450} classNames="fade">
                <Switch location={location}>
                  <Route path="/signup">
                    {authToken ? <Redirect to="/" /> : <Signup />}
                  </Route>

                  <Route path="/login">
                    {authToken ? <Redirect to="/" /> : <Login />}
                  </Route>
                  <AuthRoute path="/" component={Home} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />

        <SuccessMsg />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
});

export default connect(mapStateToProps)(App);
