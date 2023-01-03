import React, { useState } from "react";
import { useNavigate, NavLink as RRNavLink } from "react-router-dom";
import { Navbar as BNavBar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { auth } from "../firebase";
import { Consumer } from "./AppProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = context => {
    auth.logout();
    context.destroySession();
    navigate("/signedOut")
  };

  return (
    <BNavBar color="light" light expand="md" className="mb-2">
      <NavbarBrand to="/">Fazenda Ventania</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Consumer>
        {({ state, ...context }) =>
          state.currentUser ? (
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to="/" tag={RRNavLink}>Pesagem</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => handleLogout(context)}>
                    Sair
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          ) : (
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to="/" tag={RRNavLink}>Pesagem</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/login" tag={RRNavLink}>Entrar</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/signup" tag={RRNavLink}>
                    Criar conta
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          )
        }
      </Consumer>
    </BNavBar>
  );
}

export default Navbar;
