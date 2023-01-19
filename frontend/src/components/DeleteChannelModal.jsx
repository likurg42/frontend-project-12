import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useChatContext from '../contexts/chatContext.js';

const DeleteChannelModal = ({
  show, handleClose, channelId, notify,
}) => {
  const { t } = useTranslation();
  const { removeChannel } = useChatContext();

  const handleDelete = () => {
    removeChannel(channelId, () => {
      handleClose();
      notify();
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modal.deleteChannelConfirmation')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancel')}
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          {t('modal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
