import React, { useContext, Fragment, useState } from "react";
import { useNavigate, NavLink as RRNavLink } from "react-router-dom";
import { Navbar as BNavBar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { auth, firebase } from "../firebase";
import { AppContext } from "./AppProvider";
import NewGroupModal from "./NewGroupModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { state, ...context } = useContext(AppContext);
  const navigate = useNavigate();
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = context => {
    auth.logout();
    context.destroySession();
    navigate("/signedOut")
  };

  const newGroup = () => {
    setModal(true);
  };

  const modalToggle = () => {
    setModal(!modal);
  }

  return (
    <Fragment>
      <BNavBar color="light" light expand="md" className="mb-2">
        <NavbarBrand to="/">Fazenda Ventania</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        {state.currentUser ? (
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Pesagem
                </DropdownToggle>
                <DropdownMenu end>
                  {state.groups.map(group => (<DropdownItem key={group.key} onClick={() => context.setGroup(group)}>{group.name}</DropdownItem>))}
                  <DropdownItem divider />
                  <DropdownItem onClick={() => newGroup()}>Novo Grupo</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
      </BNavBar>
      <NewGroupModal isOpen={modal} toggle={modalToggle} />
    </Fragment>
  );
}

export default Navbar;
