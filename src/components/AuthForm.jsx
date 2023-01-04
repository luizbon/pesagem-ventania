import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { firebase } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSuccess = () => {
    resetForm();
    props.onSuccess && props.onSuccess();
  }

  const handleErrors = (reason) => {
    props.onError && props.onError(reason);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.action == "signIn") {
      signInWithEmailAndPassword(firebase.auth, email, password)
        .then(handleSuccess)
        .catch(handleErrors);
    } else {
      signOut(firebase.auth)
        .then(handleSuccess)
        .catch(handleErrors);
    }
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors("");
  }

  return (
    <Row>
      <Col md="auto">
        <Form onSubmit={handleSubmit}>
          <h1>{props.title}</h1>

          <FormGroup>
            <Label for="email" className="mr-sm-2">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" className="mr-sm-2">
              Senha
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="none"
            />
          </FormGroup>
          <Button type="submit">Enviar</Button>
        </Form>
      </Col>
    </Row>
  );
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default AuthForm;
