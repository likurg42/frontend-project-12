import React from 'react';
import {
  Navbar, Button, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const { logout, user } = useAuth();
  const { token } = user;
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" variant="light">
      <Container fluid="xl">
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-black">Hexlet Chat</Link>
        </Navbar.Brand>
        {token && <Button onClick={logout}>{t('label.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
