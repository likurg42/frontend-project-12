import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useChat from '../hooks/useChat.js';
import { getCurrentChannel, changeCurrentChannel, removeChannel as removeChannelStore } from '../slices/channelsSlice.js';

const RemoveChannelModal = ({
  show, handleClose, channelId, notifySuccess, notifyError,
}) => {
  const [isBlocked, setBlocked] = useState(false);
  const { t } = useTranslation();
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const currentChannel = useSelector(getCurrentChannel);
  const { id } = currentChannel;

  const handleDelete = async () => {
    setBlocked(true);
    try {
      await removeChannel(channelId, () => {
        handleClose();
        dispatch(removeChannelStore(channelId));
        if (id === channelId) {
          dispatch(changeCurrentChannel(1));
        }
        notifySuccess();
      });
    } catch (err) {
      console.error(err);
      notifyError();
    } finally {
      setBlocked(false);
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modal.deleteChannelConfirmation')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isBlocked}>
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
