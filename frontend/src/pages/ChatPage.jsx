import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import {
  fetchChatData, getChannels, getCurrentChannel, getLoadingStatus,
} from '../slices/channelsSlice.js';
import { Channels, Messages } from '../components/index.js';
import useAuth from '../hooks/useAuth.js';
import toastsParams from '../toasts/toastsParams.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const { getHeaders } = useAuth();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const loadingStatus = useSelector(getLoadingStatus);
  const dispatch = useDispatch();

  const notify = (text) => toast.error(text, toastsParams.getDefaultParams());

  useEffect(() => {
    dispatch(fetchChatData(getHeaders()));
  }, [getHeaders, dispatch]);

  if (loadingStatus === 'failed') {
    notify(t('error.authentication'));
    return <Navigate to="/login" />;
  }

  return (
    <Row className="h-100 bg-white flex-nowrap flex-md-row">
      <Col
        sm={3}
        className="col-4 border-end pt-5 px-0 bg-light"
      >
        {channels.length > 0
          && <Channels channels={channels} currentChannel={currentChannel} />}
      </Col>
      <Col sm={9} className="col-8 p-0 h-100 ">
        {channels.length > 0 && <Messages currentChannel={currentChannel} />}
      </Col>
    </Row>
  );
};

export default ChatPage;
