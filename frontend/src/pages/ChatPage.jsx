import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  fetchChatData,
  getChannels,
  getCurrentChannel, getLoadingStatus,
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
  const dispatch = useDispatch();
  const loadingStatus = useSelector(getLoadingStatus);
  const { socketConnection } = useChat();

  const getData = useCallback(() => {
    dispatch(fetchChatData(getHeaders())).then((res) => {
      if (res.error && res.payload?.statusCode === 401) {
        toast.error(t('error.authentication'), toastsParams.getDefaultParams());
        logout();
      } else if (res.error) {
        toast.error(t('error.connection'), toastsParams.getDefaultParams());
      }
    });
  }, [dispatch, getHeaders, logout, t]);

  useEffect(() => {
    getData();
  }, [getData, socketConnection]);

  return loadingStatus === 'failed' ? (
    <Row className="h-100">
      <Col className="d-flex justify-content-center align-items-center">
        <Button type="button" onClick={getData}>{t('label.reload')}</Button>
      </Col>
    </Row>
  ) : (
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
