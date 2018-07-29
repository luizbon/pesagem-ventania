import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from "reactstrap";
import AppProvider, { Consumer } from "./AppProvider";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

import Navbar from "./Navbar";
import FlashMessage from "./FlashMessage";

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Fragment>
            <Navbar />
            <Container>
              <FlashMessage />
              <Route
                exact
                path="/"
                component={() => <h1 className="content">Welcome, Home!</h1>}
              />
              <Route exact path="/login" component={() => <Login />} />
              <Route exact path="/signup" component={() => <Signup />} />
              <Route
                exact
                path="/dashboard"
                component={() => (
                  <Consumer>
                    {({ state }) =>
                      state.currentUser ? (
                        <Dashboard user={state.currentUser} />
                      ) : (
                        <div className="content">
                          <h1>Access denied.</h1>
                          <p>You are not authorized to access this page.</p>
                        </div>
                      )
                    }
                  </Consumer>
                )}
              />
              <Route
                exact
                path="/signedOut"
                component={() => (
                  <h1 className="content">You're now signed out.</h1>
                )}
              />
              <Route
                exact
                path="/accountCreated"
                component={() => (
                  <h1 className="content">
                    Account created.{" "}
                    <Link to="/login">Proceed to Dashboard</Link>
                  </h1>
                )}
              />
            </Container>
          </Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
