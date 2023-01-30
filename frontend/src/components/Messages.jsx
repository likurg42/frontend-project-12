import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { getChannelMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import useChat from '../hooks/useChat.js';

const Messages = ({ currentChannel }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isBlocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();
  const { name, id } = currentChannel;
  const messages = useSelector(getChannelMessages(id));
  const bottomRef = useRef();

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlocked(true);
    const filteredMessage = filter.clean(message);
    sendMessage(filteredMessage, id, user.username, () => {
      setMessage('');
      setBlocked(false);
    });
  };

  useEffect(
    () => () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behaviour: 'smooth' });
      }
    },
    [messages],
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
          {t('messages.messages', { count: messages.length })}
        </span>
      </div>
      <div className="message-box overflow-auto mx-5">
        {messages.length > 0 && messages.map(({ body, username }) => (
          <div key={generateId()}>
            <b>{`${username}: `}</b>
            {body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="d-flex gap-2">
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label={t('messages.messageInput')}
            />
            <Button
              type="submit"
              disabled={isBlocked || message.trim() === ''}
            >
              {t('messages.send')}

            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
