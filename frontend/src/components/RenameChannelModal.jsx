import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import getChannelSchema from '../schemas/channelNameSchema.js';
import {
  getChannelsNames,
  renameChannel as renameChannelStore,
} from '../slices/channelsSlice.js';
import useChat from '../hooks/useChat.js';
import toastsParams from '../toasts/toastsParams.js';

const RenameChannelModal = ({
  show, handleClose, channel,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useChat();
  const input = useRef(null);
  const channelsNames = useSelector(getChannelsNames);
  const [display, setDisplay] = useState(show);
  const [isBlocked, setBlocked] = useState(false);

  const onSubmit = async (values) => {
    setBlocked(true);
    try {
      await renameChannel(values.name, channel.id);
      dispatch(renameChannelStore({ id: channel.id, changes: { name: values.name } }));
      toast.success(t('toastMessage.channelRenamed'), toastsParams.getDefaultParams());
      setDisplay(false);
    } catch (err) {
      toast.error(t('error.connection'), toastsParams.getDefaultParams());
    } finally {
      setBlocked(false);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: channel.name,
    },
    enableReinitialize: true,
    validationSchema: getChannelSchema(channelsNames),
    onSubmit,
  });

  useEffect(() => {
    if (input.current && show) {
      input.current.focus();
      input.current.select();
    }
  }, [show, channel]);

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
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="visually-hidden">{t('form.channelName')}</Form.Label>
            <Form.Control
              type="text"
              value={values.name}
              placeholder={t('form.channelNewName')}
              onChange={handleChange}
              isInvalid={touched.name && (errors.name)}
              ref={input}
              autoComplete="off"
              disabled={isBlocked}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.name}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => setDisplay(false)} disabled={isBlocked}>
              {t('modal.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isBlocked}>
              {t('modal.rename')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
