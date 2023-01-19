import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const Channels = ({ channels, currentChannel }) => (
  <div className="bg-light">
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2 ">
      <span>Каналы</span>
      <Button active="false" variant="link" className="p-0 text-primary btn-group-vertical">
        <PlusSquare size={20} />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
    <Nav className="flex-column px-2" variant="pills" activeKey={`/${currentChannel.id}`} as="ul">
      {channels.map((channel) => (
        <Nav.Item key={channel.id} as="li">
          <Nav.Link href={`/${channel.id}`} onClick={(e) => e.preventDefault()}>
            {'# '}
            {channel.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  </div>
);

export default Channels;
