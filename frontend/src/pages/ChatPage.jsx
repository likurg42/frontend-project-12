import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  fetchChatData,
  getChannels,
  getCurrentChannel, getLoadingError, resetLoadingState,
} from '../slices/channelsSlice.js';
import { Channels, Messages } from '../components/index.js';
import useAuth from '../hooks/useAuth.js';
import toastsParams from '../toasts/toastsParams.js';
import useChat from '../hooks/useChat.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const { getHeaders, logout } = useAuth();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const loadingError = useSelector(getLoadingError);
  const dispatch = useDispatch();
  const { socketConnection } = useChat();

  useEffect(() => {
    dispatch(fetchChatData(getHeaders()));
  }, [socketConnection, dispatch, getHeaders]);

  useEffect(() => {
    if (loadingError) {
      if (loadingError.statusCode === 401) {
        toast.warn(t('error.login'), toastsParams.getDefaultParams());
        dispatch(resetLoadingState());
        logout();
      } else {
        toast.error(t('error.connection'), toastsParams.getDefaultParams());
      }
    }
  }, [loadingError, logout, t, dispatch]);

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
