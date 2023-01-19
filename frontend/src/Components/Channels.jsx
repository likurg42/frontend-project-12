import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { changeChannel } from '../slices/channelsSlice.js';
import AddChannelModal from './AddChannelModal.jsx';

const Channels = ({ channels, currentChannel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const dispatch = useDispatch();

  const handleChangeChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeChannel(id));
  };

  return (
    <div className="bg-light overflow-auto">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 ">
        <span>Каналы</span>
        <Button active="false" variant="link" className="p-0 text-primary btn-group-vertical" onClick={handleOpen}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="flex-column px-2 " variant="pills" as="ul">
        {channels.map(({ id, name, removable }) => (
          <Nav.Item key={id} as="li">
            {removable ? (
              <Dropdown as={ButtonGroup} className="w-100 rounded-0">
                <Button
                  variant={currentChannel.id === id ? 'secondary' : 'light'}
                  id="dropdown-split-basic"
                  className="w-100 rounded-0 text-start"
                  onClick={handleChangeChannel(id)}
                >
                  {'# '}
                  {name}
                </Button>
                <Dropdown.Toggle split variant={currentChannel.id === id ? 'secondary' : 'light'} id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item>Удалить</Dropdown.Item>
                  <Dropdown.Item>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant={currentChannel.id === id ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start"
                onClick={handleChangeChannel(id)}
              >
                {'# '}
                {name}
              </Button>
            )}

          </Nav.Item>
        ))}
      </Nav>
      <AddChannelModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default Channels;
