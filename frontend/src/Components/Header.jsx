import React from 'react';
import {
  Navbar, Button, Container,
} from 'react-bootstrap';

const Header = () => (
  <Navbar className="shadow-sm" bg="white" variant="light">
    <Container fluid="xl">
      <Navbar.Brand>Hexlet Chat</Navbar.Brand>
      <Button>Выйти</Button>
    </Container>
  </Navbar>
);

export default Header;
