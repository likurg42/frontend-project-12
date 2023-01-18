import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  });
  return <h1>Homepage</h1>;
};

export default HomePage;
