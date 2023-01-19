import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Col, Row,
} from 'react-bootstrap';
import useAuthContext from '../contexts';
import { fetchChatData, getChannels, getCurrentChannel } from '../slices/channelsSlice';
import { Channels, Messages } from '../components';

const HomePage = () => {
  const { token, getHeaders } = useAuthContext();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigate('/login');
    else {
      dispatch(fetchChatData(getHeaders()));
    }
  }, [navigate, token, getHeaders, dispatch]);

  return (
    <Row className="h-100 bg-white flex-md-row">
      <Col md={2} className="px-0 pt-5 bg-light">
        {channels.length > 0 && <Channels channels={channels} currentChannel={currentChannel} />}
      </Col>
      <Col className="p-0 h-100">
        {channels.length > 0 && <Messages currentChannel={currentChannel} />}
      </Col>
    </Row>
  );
};

export default HomePage;
