import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { auth } from "../firebase";

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...AuthForm.defaultProps };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSuccess() {
    this.resetForm();
    this.props.onSuccess && this.props.onSuccess();
  }

  handleErrors(reason) {
    this.props.onError && this.props.onError(reason);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      state: { email, password },
      props: { action }
    } = this;

    auth
      .userSession(action, email, password)
      .then(this.handleSuccess)
      .catch(this.handleErrors);
  }

  resetForm() {
    this.setState({ ...AuthForm.defaultProps });
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Row>
        <Col md="auto">
          <Form onSubmit={this.handleSubmit}>
            <h1>{this.props.title}</h1>

            <FormGroup>
              <Label for="email" className="mr-sm-2">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password" className="mr-sm-2">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="none"
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

AuthForm.defaultProps = {
  errors: "",
  email: "",
  password: ""
};

export default AuthForm;
