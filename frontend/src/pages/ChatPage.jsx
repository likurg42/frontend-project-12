import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import useAuthContext from '../contexts';
import { fetchChannelsData, getChannels } from '../slices/channelsSlice';

const HomePage = () => {
  const { token, getHeaders } = useAuthContext();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
    else {
      dispatch(fetchChannelsData(getHeaders()));
    }
  }, [navigate, token, getHeaders, dispatch]);

  return (
    <div>
      <h1>Chat</h1>
      <h2>Channels</h2>
      {channels && channels.map((channel) => <Card key={channel.id}>{channel.name}</Card>)}
    </div>
  );
};

export default HomePage;
