import React from "react";
import { withRouter } from "react-router-dom";
import Form from "./AuthForm";
import { auth } from "../firebase";
import { Consumer } from "./AppProvider";

const Signup = props => (
  <Consumer>
    {({ state, ...context }) => (
      <Form
        action="createUser"
        title="Create account"
        onSuccess={() =>
          auth.logout().then(() => {
            context.destroySession();
            context.clearMessage();
            props.history.push("/accountCreated");
          })
        }
        onError={({ message }) =>
          context.setMessage(`Error occured: ${message}`)
        }
      />
    )}
  </Consumer>
);

export default withRouter(Signup);
