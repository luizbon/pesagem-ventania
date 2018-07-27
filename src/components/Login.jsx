import React from "react";
import { withRouter } from "react-router-dom";
import Form from "./AuthForm";
import { Consumer } from "./AppProvider";

const Login = props => (
  <Consumer>
    {({ state, ...context }) => (
      <Form
        action="signIn"
        title="Login"
        onSuccess={() => props.history.push("/dashboard")}
        onError={({ message }) =>
          context.setMessage(`Login failed: ${message}`)
        }
      />
    )}
  </Consumer>
);

export default withRouter(Login);
