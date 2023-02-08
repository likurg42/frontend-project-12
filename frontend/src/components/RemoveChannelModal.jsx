import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useChat from '../hooks/useChat.js';
import {
  getCurrentChannel,
  changeCurrentChannel,
  removeChannel as removeChannelStore,
} from '../slices/channelsSlice.js';
import toastsParams from '../toasts/toastsParams.js';

const RemoveChannelModal = ({
  show, handleClose, channel,
}) => {
  const [isBlocked, setBlocked] = useState(false);
  const { t } = useTranslation();
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const currentChannel = useSelector(getCurrentChannel);
  const [display, setDisplay] = useState(show);
  const { id } = currentChannel;

  const notifyError = (text) => toast.error(text, toastsParams.getDefaultParams());
  const notifySuccess = (text) => toast.success(text, toastsParams.getDefaultParams());

  const handleDelete = async () => {
    setBlocked(true);
    try {
      await removeChannel(channel.id);
      dispatch(removeChannelStore(channel.id));
      if (id === channel.id) {
        dispatch(changeCurrentChannel(1));
      }
      setDisplay(false);
      notifySuccess(t('toastMessage.channelRemoved'));
    } catch (err) {
      notifyError(t('errors.network'));
    } finally {
      setBlocked(false);
    }
  };

  return (
    <Modal
      size="lg"
      centered
      show={display}
      onHide={() => {
        setDisplay(false);
      }}
      onExited={() => {
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modal.deleteChannelConfirmation')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setDisplay(false)} disabled={isBlocked}>
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
