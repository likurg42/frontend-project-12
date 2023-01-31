import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useChat from '../hooks/useChat.js';
import { getCurrentChannel, changeCurrentChannel } from '../slices/channelsSlice.js';

const RemoveChannelModal = ({
  show, handleClose, channelId, notify,
}) => {
  const [isBlocked, setBlocked] = useState(false);
  const { t } = useTranslation();
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const currentChannel = useSelector(getCurrentChannel);

  const handleDelete = () => {
    setBlocked(true);
    removeChannel(channelId, () => {
      const { id } = currentChannel;
      handleClose();
      if (id === channelId) {
        dispatch(changeCurrentChannel(1));
      }
      notify();
      setBlocked(false);
    });
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modal.deleteChannelConfirmation')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isBlocked}>
          {t('modal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
