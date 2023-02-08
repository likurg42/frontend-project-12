import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Nav, Button,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from '../slices/channelsSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import ChannelItem from './ChannelItem.jsx';

const renderModal = (modalParams, handleClose) => {
  const { type, channel } = modalParams;
  if (!type) {
    return null;
  }

  const modals = {
    add: (
      <AddChannelModal
        show
        handleClose={handleClose}
      />
    ),
    remove: (<RemoveChannelModal
      show
      channel={channel}
      handleClose={handleClose}
    />),
    rename: (<RenameChannelModal
      show
      channel={channel}
      handleClose={handleClose}
    />),
  };

  return modals[modalParams.type];
};

const Channels = ({ channels, currentChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modalParams, setModalParams] = useState({
    type: null,
    channel: null,
  });

  const handleClose = () => setModalParams({ type: null, channel: null });

  const handleChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel(id));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 ">
        <span>{t('channels.channels')}</span>
        <Button
          active="false"
          variant="link"
          className="p-0 text-primary btn-group-vertical"
          onClick={() => setModalParams({ type: 'add' })}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="flex-column px-2 nav-fill" variant="pills" as="ul" style={{ minWidth: 0 }}>
        {channels.map((channel) => (
          <React.Fragment key={channel.id}>
            <ChannelItem
              channel={channel}
              currentChannel={currentChannel}
              handleChannel={handleChannel}
              setModalParams={setModalParams}
            />
          </React.Fragment>

        ))}
      </Nav>
      {renderModal(modalParams, handleClose)}
    </>
  );
};

export default Channels;
