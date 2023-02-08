import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { getChannelMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import useChat from '../hooks/useChat.js';
import toastsParams from '../toasts/toastsParams.js';

const Messages = ({ currentChannel }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isBlocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();
  const { name, id } = currentChannel;
  const channelMessages = useSelector(getChannelMessages(id));

  const bottomRef = useRef(null);
  const input = useRef(null);

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const notifyError = (text) => toast.error(text, toastsParams.getDefaultParams());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredMessage = filter.clean(message.trim());
    setBlocked(true);
    try {
      await sendMessage(filteredMessage, id, user.username);
      setMessage('');
      input.current.focus();
    } catch (err) {
      notifyError(t('error.connection'));
    } finally {
      setBlocked(false);
    }
  };

  useEffect(
    () => {
      input.current.focus();
      bottomRef.current.scrollIntoView({ behaviour: 'smooth', block: 'nearest', inline: 'start' });
    },
    [channelMessages],
  );

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
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
      <div className="message-box overflow-auto px-5">
        {channelMessages.length > 0 && channelMessages.map(({ body, username }) => (
          <div key={generateId()} className="text-break">
            <b>{`${username}: `}</b>
            {body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="d-flex gap-2">
            <InputGroup>
              <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label={t('messages.messageInput')}
                ref={input}
                disabled={isBlocked}
              />
              <Button
                type="submit"
                variant="outline-primary"
                className="d-flex align-items-center btn-group-vertical"
                disabled={isBlocked || message.trim() === ''}
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
