import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../contexts/index.js';
import {
  fetchChatData, getChannels, getCurrentChannel, getLoadingStatus,
} from '../slices/channelsSlice.js';
import { Channels, Messages } from '../components/index.js';
import withChat from '../hoc/withChat.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const { getHeaders } = useAuthContext();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const loadingStatus = useSelector(getLoadingStatus);
  const dispatch = useDispatch();

  const notify = (text) => toast.error(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  useEffect(() => {
    dispatch(fetchChatData(getHeaders()));
  }, [getHeaders, dispatch]);

  if (loadingStatus === 'failed') {
    notify(t('error.connection'));
  }

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

export default withChat(ChatPage);
