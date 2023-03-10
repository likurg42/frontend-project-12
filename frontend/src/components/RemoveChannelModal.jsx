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
  handleClose, channel,
}) => {
  const [blocked, setBlocked] = useState(false);
  const { t } = useTranslation();
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const currentChannel = useSelector(getCurrentChannel);
  const [display, setDisplay] = useState(true);
  const { id } = currentChannel;

  const handleDelete = async () => {
    setBlocked(true);
    try {
      await removeChannel(channel.id);
      dispatch(removeChannelStore(channel.id));
      if (id === channel.id) {
        dispatch(changeCurrentChannel(1));
      }
      setDisplay(false);
      toast.success(t('toastMessage.channelRemoved'), toastsParams.getDefaultParams());
    } catch (err) {
      toast.error(t('error.connection'), toastsParams.getDefaultParams());
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
        <Button variant="secondary" onClick={() => setDisplay(false)} disabled={blocked}>
          {t('modal.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={blocked}>
          {t('modal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
