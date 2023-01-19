import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { v4 as generateId } from 'uuid';
import { getChannelMessages } from '../slices/messagesSlice';

const Messages = ({ currentChannel }) => {
  const { name, id } = currentChannel;
  const messages = useSelector(getChannelMessages(id));
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
          <span key={generateId()}>
            {username}
            {body}
          </span>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate>
          <Form.Group className="d-flex gap-2">
            <Form.Control type="text" />
            <Button>Отправить</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
