import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./AuthForm";
import { Consumer } from "./AppProvider";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Consumer>
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
    </Consumer>
  )
};

export default Login;
