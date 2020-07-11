import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function AuthRoute({ authToken, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
});

export default connect(mapStateToProps)(AuthRoute);
