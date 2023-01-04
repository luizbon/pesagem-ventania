import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./AuthForm";
import { AppContext } from "./AppProvider";

const Login = () => {
  const navigate = useNavigate();
  return (
    <AppContext.Consumer>
      {({ state, ...context }) => (
        <Form
          action="signIn"
          title="Login"
          onSuccess={() => navigate('/')}
          onError={({ message }) =>
            context.setMessage(`Login failed: ${message}`)
          }
        />
      )}
    </AppContext.Consumer>
  )
};

export default Login;
