import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Container, List } from "reactstrap";
import AppProvider, { AppContext } from "./AppProvider";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

import Navbar from "./Navbar";
import FlashMessage from "./FlashMessage";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Fragment>
          <Navbar />
          <Container>
            <FlashMessage />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route
                exact
                path="/"
                element={(
                  <AppContext.Consumer>
                    {({ state, ...context }) =>
                      state.currentGroup ? (
                        <Dashboard group={state.currentGroup} user={state.currentUser} />
                      ) : state.currentUser ? (
                        <div className="content">
                          <h1>Selecione um grupo</h1>
                          <List>
                            {state.groups.map(group => (<li key={group.key} onClick={(e) => { e.preventDefault(); context.setGroup(group) }}><a href="#">{group.name}</a></li>))}
                          </List>
                        </div>
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
                  </AppContext.Consumer>
                )}
              />
              <Route
                exact
                path="/signedOut"
                element={<h1 className="content">Log out efetuado.</h1>}
              />
              <Route
                exact
                path="/accountCreated"
                element={(
                  <h1 className="content">
                    Conta criada. <Link to="/login">Faça o login</Link>
                  </h1>
                )}
              />
            </Routes>
          </Container>
        </Fragment>
      </Router>
    </AppProvider>
  );
}

export default App;
