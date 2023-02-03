import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Nav, Button,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { changeCurrentChannel } from '../slices/channelsSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import ChannelItem from './ChannelItem.jsx';

const Channels = ({ channels, currentChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    openModals: {
      remove: false,
      add: false,
      rename: false,
    },
    channelId: null,
  });

  const notifySuccess = (text) => () => toast.success(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  const notifyError = (text) => () => toast.error(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  const handleModal = (isOpen, name, channelId) => () => setModals(({
    openModals: {
      ...modals.openModals,
      [name]: isOpen,
    },
    channelId,
  }));

  const handleChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel(id));
  };

  return (
    <div className="">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 ">
        <span>{t('channels.channels')}</span>
        <Button active="false" variant="link" className="p-0 text-primary btn-group-vertical" onClick={handleModal(true, 'add')}>
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
              t={t}
              handleChannel={handleChannel}
              handleModal={handleModal}
            />
          </React.Fragment>

        ))}
      </Nav>
      <AddChannelModal
        show={modals.openModals.add}
        handleClose={handleModal(false, 'add')}
        notifySuccess={notifySuccess(t('toastMessage.channelAdded'))}
        notifyError={notifyError(t('error.connection'))}
      />
      <RemoveChannelModal
        show={modals.openModals.remove}
        handleClose={handleModal(false, 'remove')}
        channelId={modals.channelId}
        notifySuccess={notifySuccess(t('toastMessage.channelRemoved'))}
        notifyError={notifyError(t('error.connection'))}
      />
      <RenameChannelModal
        show={modals.openModals.rename}
        handleClose={handleModal(false, 'rename')}
        channelId={modals.channelId}
        notifySuccess={notifySuccess(t('toastMessage.channelRenamed'))}
        notifyError={notifyError(t('error.connection'))}
      />
    </div>
  );
};

export default Channels;
