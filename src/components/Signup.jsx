import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./AuthForm";
import { auth } from "../firebase";
import { AppContext } from "./AppProvider";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <AppContext.Consumer>
      {({ state, ...context }) => (
        <Form
          action="createUser"
          title="Create account"
          onSuccess={() =>
            auth.logout().then(() => {
              context.destroySession();
              context.clearMessage();
              navigate("/accountCreated")
            })
          }
          onError={({ message }) =>
            context.setMessage(`Error occured: ${message}`)
          }
        />
      )}
    </AppContext.Consumer>
  )
};

export default Signup;
