import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import { getChannelMessages } from '../slices/messagesSlice';
import { useAuthContext, useChatContext } from '../contexts';

const Messages = ({ currentChannel }) => {
  const { user } = useAuthContext();
  const [isBlocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatContext();
  const { name, id } = currentChannel;
  const messages = useSelector(getChannelMessages(id));

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlocked(true);
    sendMessage(message, id, user.username, () => {
      setMessage('');
      setBlocked(false);
    });
  };

  useEffect(() => {
  }, [messages]);
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {name}
          </b>
        </p>
        <span className="text-muted">2 Сообщения</span>
      </div>
      <div className="message-box overflow-auto mx-5">
        {messages.length > 0 && messages.map(({ body, username }) => (
          <div key={generateId()}>
            <b>{`${username}: `}</b>
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="d-flex gap-2">
            <Form.Control type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button type="submit" disabled={isBlocked}>Отправить</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
