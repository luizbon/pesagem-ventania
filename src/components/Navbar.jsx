import React from "react";
import { withRouter } from "react-router-dom";
import * as Bootstrap from "reactstrap";
import { auth } from "../firebase";
import { Consumer } from "./AppProvider";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const handleLogout = context => {
      auth.logout();
      context.destroySession();
      this.props.history.push("/signedOut");
    };

    return (
      <Bootstrap.Navbar color="light" light expand="md" className="mb-2">
        <Bootstrap.NavbarBrand href="/">Fazenda Ventania</Bootstrap.NavbarBrand>
        <Bootstrap.NavbarToggler onClick={this.toggle} />
        <Consumer>
          {({ state, ...context }) =>
            state.currentUser ? (
              <Bootstrap.Collapse isOpen={this.state.isOpen} navbar>
                <Bootstrap.Nav className="ml-auto" navbar>
                  <Bootstrap.NavItem>
                    <Bootstrap.NavLink href="/">Pesagem</Bootstrap.NavLink>
                  </Bootstrap.NavItem>
                  <Bootstrap.NavItem>
                    <Bootstrap.NavLink onClick={() => handleLogout(context)}>
                      Sair
                    </Bootstrap.NavLink>
                  </Bootstrap.NavItem>
                </Bootstrap.Nav>
              </Bootstrap.Collapse>
            ) : (
              <Bootstrap.Collapse isOpen={this.state.isOpen} navbar>
                <Bootstrap.Nav className="ml-auto" navbar>
                  <Bootstrap.NavItem>
                    <Bootstrap.NavLink href="/">Pesagem</Bootstrap.NavLink>
                  </Bootstrap.NavItem>
                  <Bootstrap.NavItem>
                    <Bootstrap.NavLink href="/login">Entrar</Bootstrap.NavLink>
                  </Bootstrap.NavItem>
                  <Bootstrap.NavItem>
                    <Bootstrap.NavLink href="/signup">
                      Criar conta
                    </Bootstrap.NavLink>
                  </Bootstrap.NavItem>
                </Bootstrap.Nav>
              </Bootstrap.Collapse>
            )
          }
        </Consumer>
      </Bootstrap.Navbar>
    );
  }
}

export default withRouter(Navbar);
