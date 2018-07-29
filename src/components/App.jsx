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
              <Route exact path="/login" component={() => <Login />} />
              <Route exact path="/signup" component={() => <Signup />} />
              <Route
                exact
                path="/"
                component={() => (
                  <Consumer>
                    {({ state }) =>
                      state.currentUser ? (
                        <Dashboard user={state.currentUser} />
                      ) : (
                        <div className="content">
                          <h1>Acesso negado.</h1>
                          <p>
                            Faça o <Link to="/login">login</Link> para
                            continuar.
                          </p>
                          <p>
                            Ou <Link to="/signup">crie uma conta</Link>
                          </p>
                        </div>
                      )
                    }
                  </Consumer>
                )}
              />
              <Route
                exact
                path="/signedOut"
                component={() => <h1 className="content">Log out efetuado.</h1>}
              />
              <Route
                exact
                path="/accountCreated"
                component={() => (
                  <h1 className="content">
                    Conta criada. <Link to="/login">Faça o login</Link>
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
