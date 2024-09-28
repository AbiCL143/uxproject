// src/components/NavBar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* UXsperience a la izquierda */}
        <Navbar.Brand href="#home">UXsperience</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links a la derecha */}
          <Nav className="ms-auto">
            <Nav.Link href="#perfil">Perfil</Nav.Link>
            <Nav.Link href="#perfil">Bienvenido</Nav.Link>
            <Nav.Link href="#historial">Historial</Nav.Link>
            <Nav.Link href="#evaluando">Evaluando</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
