import React, { useState, useRef, useEffect } from 'react';
import {
  Form, Button, InputGroup, Spinner,
} from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { getChannelMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import useChat from '../hooks/useChat.js';
import toastsParams from '../toasts/toastsParams.js';
import getMessagesSchema from '../schemas/messagesSchema.js';
import { fetchChatData, getLoadingStatus } from '../slices/channelsSlice.js';

const Messages = ({ currentChannel }) => {
  const { t } = useTranslation();
  const { user, getHeaders } = useAuth();
  const [blocked, setBlocked] = useState(false);
  const { sendMessage } = useChat();
  const { name, id } = currentChannel;
  const dispatch = useDispatch();
  const channelMessages = useSelector(getChannelMessages(id));
  const loadingStatus = useSelector(getLoadingStatus);

  const bottomRef = useRef(null);
  const input = useRef(null);

  const onSubmit = async (values, { resetForm }) => {
    const { message } = values;
    setBlocked(true);
    try {
      await sendMessage(message, id, user.username);
      resetForm();
      input.current.focus();
      bottomRef.current.scrollIntoView({ behaviour: 'smooth', block: 'nearest', inline: 'start' });
    } catch (err) {
      toast.error(t('error.connection'), toastsParams.getDefaultParams());
    } finally {
      setBlocked(false);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behaviour: 'smooth', block: 'nearest', inline: 'start' });
  };

  const {
    values,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: getMessagesSchema(),
    onSubmit,
  });

  useEffect(() => {
    input.current.focus();
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (channelMessages.at(-1).username === user.username) {
      scrollToBottom();
    }
  }, [channelMessages, user]);

  return (
    <div className="d-flex flex-column h-100">
      <div
        className="bg-light mb-4 p-3 shadow-sm small d-flex justify-content-between flex-wrap gap-2"
      >
        <div className="">
          <p className="m-0">
            <b>
              {'# '}
              {name}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.messages', { count: channelMessages.length })}
          </span>
        </div>
        <div>
          {loadingStatus === 'failed' && (
            <Button
              onClick={() => dispatch(fetchChatData(getHeaders()))}
            >
              {t('label.reconnect')}
            </Button>
          )}
          {loadingStatus === 'loading' && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </div>
      <div className="message-box overflow-auto px-5">
        {channelMessages.length > 0 && channelMessages.map(({ body, username }) => (
          <div key={generateId()} className="text-break">
            <b>{`${username}: `}</b>
            {filter.clean(body)}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="d-flex gap-2" controlId="message">
            <InputGroup>
              <Form.Control
                type="text"
                value={values.message}
                onChange={handleChange}
                aria-label={t('messages.messageInput')}
                ref={input}
                disabled={blocked}
              />
              <Button
                type="submit"
                variant="outline-primary"
                className="d-flex align-items-center btn-group-vertical"
                disabled={blocked || values.message.trim() === ''}
              >
                <ArrowRight />
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
