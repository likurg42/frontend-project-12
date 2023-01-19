import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import useChatContext from '../contexts/chatContext.js';

const DeleteChannelModal = ({ show, handleClose, channelId }) => {
  const { removeChannel } = useChatContext();

  const handleDelete = () => {
    removeChannel(channelId, () => {
      handleClose();
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
