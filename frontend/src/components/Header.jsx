import React from 'react';
import {
  Navbar, Button, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuthContext from '../contexts/authContext.js';

const Header = () => {
  const { logout } = useAuthContext();

  return (
    <Navbar className="shadow-sm" bg="white" variant="light">
      <Container fluid="xl">
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-black">Hexlet Chat</Link>
        </Navbar.Brand>
        <Button onClick={logout}>Выйти</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
